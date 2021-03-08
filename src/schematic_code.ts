import {
  Block,
  Blocks,
  InvertedSorter,
  ItemBridge,
  ItemSource,
  LightBlock,
  LiquidSource,
  MassDriver,
  PhaseConveyor,
  Sorter,
  Unloader,
} from './mindustry/block'
import Schematic, { SchematicTile } from './schematic'
import { BlockfromCode } from './mindustry/block/blocks'
import Pako from 'pako'
import { Point2 } from './arc'
import StreamedDataView from './streamed_data_view'
export default class SchematicCode {
  private readonly data: StreamedDataView

  private schematic?: Schematic

  constructor(public readonly value: string) {
    let decoded: string
    if (typeof window === 'undefined') {
      decoded = Buffer.from(value, 'base64').toString('binary')
    } else {
      decoded = atob(value)
    }
    const arr = new Uint8Array(decoded.length)
    for (let i = 0; i < decoded.length; i++) {
      arr[i] = decoded.codePointAt(i) || 0
    }
    this.data = new StreamedDataView(arr.buffer)
  }

  private isValid(consumeData = false) {
    const header = 'msch'
    if (consumeData) {
      for (const char of header) {
        if (char !== this.data.getChar()) return false
      }
      return true
    }
    for (let i = 0; i < header.length; i++) {
      if (header[i] !== String.fromCodePoint(this.data.data.getUint8(i))) {
        return false
      }
    }
    return true
  }

  private compressedData(): StreamedDataView {
    const bytes = Pako.inflate(
      new Uint8Array(this.data.buffer).subarray(this.data.offset)
    )
    return new StreamedDataView(bytes.buffer)
  }

  private schematicSize(cData: StreamedDataView) {
    const width = cData.getInt16(),
      height = cData.getInt16()
    return { width, height }
  }

  private tags(cData: StreamedDataView): Map<string, string> {
    const tags = new Map<string, string>()
    const numberOfTags = cData.getInt8()
    for (let i = 0; i < numberOfTags; i++) {
      const name = cData.getString()
      const value = cData.getString()
      tags.set(name, value)
    }
    return tags
  }

  private blocks(cData: StreamedDataView) {
    const length = cData.getInt8()
    const blocks: Block[] = []
    for (let i = 0; i < length; i++) {
      const block = BlockfromCode(cData.getString())
      blocks.push(block)
    }
    return blocks
  }

  private mapConfig(block: Block, value: number, position: number) {
    // by now, lets just throw the config info away
    if (
      block instanceof Sorter ||
      block instanceof InvertedSorter ||
      block instanceof Unloader ||
      block instanceof ItemSource
    ) {
      // return Vars.content.item(value)
      return
    }
    if (block instanceof LiquidSource) {
      // return Vars.content.liquid(value)
      return
    }
    if (
      block instanceof MassDriver ||
      block instanceof ItemBridge ||
      block instanceof PhaseConveyor
    ) {
      return Point2.unpack(value).sub(Point2.x(position), Point2.y(position))
    }
    if (block instanceof LightBlock) return value

    return null
  }

  private readConfigObject(cData: StreamedDataView) {
    const type = cData.getInt8()
    switch (type) {
      case 0:
        return null
      case 1:
        return cData.getInt32()
      case 2:
        return cData.getBigInt64()
      case 3:
        return cData.getFloat32()
      case 4:
        return (() => {
          const exists = cData.getInt8()
          if (exists !== 0) {
            return cData.getString()
          }
        })()
      case 5:
        cData.getInt8()
        cData.getInt16()
        // original code:
        // return content.getByID(ContentType.all[read.b()], read.s());
        return
      case 6:
        return (() => {
          const length = cData.getInt16()
          const arr = []
          for (let i = 0; i < length; i++) {
            arr.push(cData.getInt32())
          }
          return arr
        })()

      // original code
      // short length = read.s(); IntSeq arr = new IntSeq(); for (int i = 0; i < length; i++) arr.add(read.i()); return arr;
      case 7:
        return new Point2(cData.getInt32(), cData.getInt32())
      case 8:
        return (() => {
          const len = cData.getInt8()
          const out = []
          for (let i = 0; i < len; i++) {
            out.push(Point2.unpack(cData.getInt32()))
          }
          // byte len = read.b(); Point2[] out = new Point2[len]; for (int i = 0; i < len; i++) out[i] = Point2.unpack(read.i());
          return out
        })()

      // TODO: somehow implement java code bellow
      case 9:
        cData.getInt8()
        cData.getInt16()
        break
      // return TechTree.getNotNull(content.getByID(ContentType.all[read.b()], read.s()));
      case 10:
        return cData.getBool()
      // return read.bool();
      case 11:
        return cData.getFloat64()
      // return read.d();
      case 12:
        cData.getInt32()
        return
      // return world.build(read.i());
      case 13:
        cData.getInt16()
        return
      // return LAccess.all[read.s()];
      case 14:
        return (() => {
          const blen = cData.getInt32()
          for (let i = 0; i < blen; i++) cData.getInt8()
        })()
      // int blen = read.i(); byte[] bytes = new byte[blen]; read.b(bytes); return bytes;
      // case 15: return UnitCommand.all[read.b()];
      default:
        // throw new IllegalArgumentException('Unknown object type: ' + type)
        return
    }
  }

  private tiles(cData: StreamedDataView, blocks: Block[], version: number) {
    const total = cData.getInt32()
    const tiles: SchematicTile[] = []
    for (let i = 0; i < total; i++) {
      const block = blocks[cData.getInt8()]
      const position = cData.getInt32()
      const config =
        version === 0
          ? this.mapConfig(block, cData.getInt32(), position)
          : this.readConfigObject(cData)
      const rotation = cData.getInt8()
      if (block !== Blocks.air) {
        tiles.push(
          new SchematicTile(
            block,
            Point2.x(position),
            Point2.y(position),
            config,
            rotation
          )
        )
      }
    }
    return tiles
  }

  parse(): Schematic {
    if (this.schematic) return this.schematic
    if (!this.isValid(true)) {
      throw new Error('Parsing error: this is not a valid schematic')
    }
    const version = this.data.getUint8()
    const cData = this.compressedData()
    const { width, height } = this.schematicSize(cData)
    const tags = this.tags(cData)
    const blocks = this.blocks(cData)
    const tiles = this.tiles(cData, blocks, version)
    this.schematic = new Schematic(tiles, tags, width, height)
    return this.schematic
  }
}
