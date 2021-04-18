import { Block, Blocks, Liquid, UnitCommand } from '../mindustry'
import {
  StreamedDataReader,
  StreamedDataWriter,
  StringParsingError,
} from '../streamed_data'
import { Item } from '../mindustry/item'
import Pako from 'pako'
import { Point2 } from '../arc'
import { Schematic } from './schematic'
import { SchematicTile } from './tile'

const {
  distribution: {
    Sorter,
    InvertedSorter,
    MassDriver,
    ItemBridge,
    PhaseConveyor,
  },
  storage: { Unloader },
  sandbox: { ItemSource, LiquidSource, LightBlock },
  environment: { AirBlock },
} = Blocks
export abstract class SchematicIO {
  static readonly header = 'msch'

  static readonly version = 1

  private static isValid(
    data: StreamedDataReader,
    consumeData = false
  ): boolean {
    const { header } = SchematicIO
    if (consumeData) {
      for (const char of header) {
        if (char !== data.getChar()) return false
      }
      return true
    }
    for (let i = 0; i < header.length; i++) {
      if (header[i] !== String.fromCodePoint(data.data.getUint8(i))) {
        return false
      }
    }
    return true
  }

  private static compressedData(data: StreamedDataReader): StreamedDataReader {
    const bytes = Pako.inflate(
      new Uint8Array(data.buffer).subarray(data.offset)
    )
    return new StreamedDataReader(bytes.buffer)
  }

  private static tags(cData: StreamedDataReader): Map<string, string> {
    const tags = new Map<string, string>()
    const numberOfTags = cData.getInt8()
    for (let i = 0; i < numberOfTags; i++) {
      const name = cData.getString()
      const value = cData.getString()
      tags.set(name, value)
    }
    return tags
  }

  private static blocks(cData: StreamedDataReader) {
    const length = cData.getInt8()
    const blocks: Block[] = []
    for (let i = 0; i < length; i++) {
      const block = Block.fromCode(cData.getString())
      blocks.push(block)
    }
    return blocks
  }

  private static mapConfig(block: Block, value: number, position: number) {
    // by now, lets just throw the config info away
    if (
      block instanceof Sorter ||
      block instanceof InvertedSorter ||
      block instanceof Unloader ||
      block instanceof ItemSource
    ) {
      return Item.fromCode(value)
    }
    if (block instanceof LiquidSource) {
      return Liquid.fromCode(value)
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

  private static readConfigObject(cData: StreamedDataReader) {
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
      case 4: {
        const exists = cData.getInt8()
        if (exists !== 0) {
          try {
            return cData.getString()
          } catch (e) {
            if (e instanceof StringParsingError) {
              return e.parsedText
            }
            throw e
          }
        }
        return null
      }
      case 5: {
        const value = cData.getInt8()
        const code = cData.getInt16()
        switch (value) {
          case 0:
            return Item.fromCode(code)
          case 4:
            return Liquid.fromCode(code)
          default:
            // consume the short to avoid errors
            cData.getInt16()
            return
        }
      }
      // return Vars.content.getByID(
      //   (ContentType[
      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     ContentType[cData.getInt8()] as any
      //   ] as unknown) as ContentType,
      //   cData.getInt16()
      // )
      // original code:
      // return content.getByID(ContentType.all[read.b()], read.s());
      case 6: {
        const length = cData.getInt16()
        const arr = []
        for (let i = 0; i < length; i++) {
          arr.push(cData.getInt32())
        }
        return arr
      }

      // original code
      // short length = read.s(); IntSeq arr = new IntSeq(); for (int i = 0; i < length; i++) arr.add(read.i()); return arr;
      case 7:
        return new Point2(cData.getInt32(), cData.getInt32())
      case 8: {
        const len = cData.getInt8()
        const out = []
        for (let i = 0; i < len; i++) {
          out.push(Point2.unpack(cData.getInt32()))
        }
        // byte len = read.b(); Point2[] out = new Point2[len]; for (int i = 0; i < len; i++) out[i] = Point2.unpack(read.i());
        return out
      }

      // TODO: somehow implement java code bellow
      case 9:
        //  by now just ignore the config data
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
      case 14: {
        const blen = cData.getInt32()
        const bytes = []
        for (let i = 0; i < blen; i++) bytes.push(cData.getInt8())
        return bytes
      }
      // int blen = read.i(); byte[] bytes = new byte[blen]; read.b(bytes); return bytes;
      case 15:
        return UnitCommand[cData.getInt8()]
      default:
        throw new Error('Unknown object type: ' + type)
      // throw new IllegalArgumentException('Unknown object type: ' + type)
    }
  }

  private static tiles(
    cData: StreamedDataReader,
    blocks: Block[],
    version: number
  ) {
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
      if (block instanceof AirBlock) continue
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
    return tiles
  }

  private static schematicSize(cData: StreamedDataReader) {
    const width = cData.getInt16(),
      height = cData.getInt16()
    return { width, height }
  }

  /**
   * Parses the data and returns a schematic
   *  @param encoded The encoded schematic data
   */
  static decode(encoded: string | Buffer): Schematic {
    const decoded =
      typeof encoded === 'string'
        ? Buffer.from(encoded.trim(), 'base64')
        : encoded
    const arr = new Uint8Array(decoded)
    const data = new StreamedDataReader(arr.buffer)
    if (!this.isValid(data, true)) {
      throw new Error('Parsing error: this is not a valid schematic')
    }
    const version = data.getInt8()
    const cData = this.compressedData(data)
    const { width, height } = this.schematicSize(cData)
    const tags = this.tags(cData)
    const blocks = this.blocks(cData)
    const tiles = this.tiles(cData, blocks, version)
    const base64 =
      typeof encoded === 'string' ? encoded : encoded.toString('base64')
    return new Schematic({
      height,
      tags,
      tiles,
      width,
      base64,
      version: version === 0 ? 'v5' : 'v6',
    })
  }

  /** Takes a decoded schematic and saves its new tags
   * @param schematic A decoded schematic in wich the tags were modified
   */
  static encodeTags(schematic: Schematic): string {
    if (!schematic.base64)
      throw new Error('cannot save the tags of a non parsed schematic')
    const decoded = Buffer.from(schematic.base64, 'base64')
    const arr = new Uint8Array(decoded)
    const data = new StreamedDataReader(arr.buffer)
    // read header
    this.isValid(data, true)
    // read version
    data.getInt8()
    const cData = this.compressedData(data)
    // read size
    this.schematicSize(cData)
    const tagsStart = cData.offset
    // read old tags
    this.tags(cData)
    const tagsEnd = cData.offset
    const newTags = schematic.tags
    let tagSafeSize = 0
    newTags.forEach((val, key) => {
      tagSafeSize += val.length + key.length
    })
    const writer = new StreamedDataWriter(new ArrayBuffer(tagSafeSize * 2))
    writer.setInt8(newTags.size)
    newTags.forEach((value, key) => {
      writer.setString(key)
      writer.setString(value ?? '')
    })
    const newBuffer = writer.buffer.slice(0, writer.offset)
    const result = concatBytes(
      new Uint8Array(cData.buffer).subarray(0, tagsStart),
      new Uint8Array(newBuffer).subarray(0, writer.offset),
      new Uint8Array(cData.buffer).subarray(tagsEnd)
    )
    const bytes = Pako.deflate(result)
    const resultWriter = new StreamedDataWriter(
      new ArrayBuffer(bytes.byteLength + 5)
    )
    resultWriter.setChar('m')
    resultWriter.setChar('s')
    resultWriter.setChar('c')
    resultWriter.setChar('h')
    resultWriter.setInt8(schematic.version === 'v5' ? 0 : 1)
    for (let i = 0; i < bytes.byteLength; i++) {
      resultWriter.setUint8(bytes[i])
    }
    return Buffer.from(
      resultWriter.buffer.slice(0, resultWriter.offset)
    ).toString('base64')
  }
}
/**
 * A simple way to decode schematics
 * @deprecated The use of this class is deprecated, use `Schematic.decode` instead
 */
export class SchematicDecoder extends SchematicIO {
  private readonly data: StreamedDataReader

  /** The parsed schematic, will be `undefined` until parsing is complete */
  private schematic?: Schematic

  constructor(public readonly value: string) {
    super()
    const decoded = Buffer.from(value.trim(), 'base64').toString('binary')

    const arr = new Uint8Array(decoded.length)
    for (let i = 0; i < decoded.length; i++) {
      const char = decoded.codePointAt(i)
      if (char === null || char === undefined)
        throw new Error('unknown character at: ' + i)
      arr[i] = char
    }
    this.data = new StreamedDataReader(arr.buffer)
  }

  /**
   * Parses the text and returns a schematic
   *
   * If called multiple times, the same `Schematic` instance will be returned
   *
   * @deprecated This class is deprecated use `Schematic.decode` instead
   */
  decode(): Schematic {
    if (this.schematic) return this.schematic
    this.schematic = SchematicIO.decode(this.value)
    return this.schematic
  }

  /**
   * @deprecated The use of this method is deprecated, use `Schematic.encode` instead
   */
  encodeWithTags(schematic: Schematic): string {
    return SchematicIO.encodeTags(schematic)
  }
}
function concatBytes(...arrays: Uint8Array[]) {
  let totalLength = 0
  for (const arr of arrays) {
    totalLength += arr.byteLength
  }
  const result = new Uint8Array(totalLength)
  let currentOffset = 0
  for (const arr of arrays) {
    result.set(arr, currentOffset)
    currentOffset += arr.length
  }
  return result
}
