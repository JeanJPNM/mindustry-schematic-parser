import * as Pako from 'pako'
import { Block, Blocks, Liquid, UnitCommand } from '../mindustry'
import { Point2, Vec2 } from '../arc'
import { SchematicTile, SchematicTileConfig } from './tile'
import { StreamedDataReader, StreamedDataWriter } from '../streamed_data'
import { Item } from '../mindustry/item'
import { MindustryVersion } from '.'
import { Schematic } from './schematic'

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
const header = 'msch'

function isValid(data: StreamedDataReader, consumeData = false): boolean {
  if (consumeData) {
    for (const char of header) {
      if (char !== data.getChar()) return false
    }
    return true
  }
  for (let i = 0; i < header.length; i++) {
    if (header[i] !== String.fromCharCode(data.data.getUint8(i))) {
      return false
    }
  }
  return true
}

function decodeCompressedData(data: StreamedDataReader): StreamedDataReader {
  const bytes = Pako.inflate(new Uint8Array(data.buffer).subarray(data.offset))
  return new StreamedDataReader(bytes.buffer)
}

function decodeTags(cData: StreamedDataReader): Map<string, string> {
  const tags = new Map<string, string>()
  const numberOfTags = cData.getInt8()
  for (let i = 0; i < numberOfTags; i++) {
    const name = cData.getString()
    const value = cData.getString()
    tags.set(name, value)
  }
  return tags
}

function decodeBlocks(cData: StreamedDataReader) {
  const length = cData.getInt8()
  const blocks: Block[] = []
  for (let i = 0; i < length; i++) {
    const block = Block.fromCode(cData.getString())
    blocks.push(block)
  }
  return blocks
}

function mapConfig(block: Block, value: number, position: number) {
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

function readConfigObject(cData: StreamedDataReader): SchematicTileConfig {
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
        return cData.getString()
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
      return readArray(length, () => cData.getInt32())
    }

    // original code
    // short length = read.s(); IntSeq arr = new IntSeq(); for (int i = 0; i < length; i++) arr.add(read.i()); return arr;
    case 7:
      return new Point2(cData.getInt32(), cData.getInt32())
    case 8: {
      const len = cData.getInt8()
      return readArray(len, () => Point2.unpack(cData.getInt32()))
    }

    // TODO: somehow implement java code bellow
    case 9:
      //  by now just ignore the config data
      cData.getInt8()
      cData.getInt16()
      return
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
      return readArray(blen, () => cData.getInt8())
    }
    // int blen = read.i(); byte[] bytes = new byte[blen]; read.b(bytes); return bytes;
    case 15:
      return UnitCommand[cData.getInt8()]
    case 16: {
      const len = cData.getInt32()
      return readArray(len, () => cData.getBool())
    }
    case 17: {
      cData.getInt32()
      return
    }
    case 18: {
      const len = cData.getInt16()
      return readArray(
        len,
        () => new Vec2(cData.getFloat32(), cData.getFloat32())
      )
    }
    case 19:
      return new Vec2(cData.getFloat32(), cData.getFloat32())
    case 20: {
      cData.getUint8()
      return
    }
    case 21: {
      const len = cData.getInt16()
      return readArray(len, () => cData.getInt32())
    }
    case 22: {
      const len = cData.getInt32()
      return readArray(len, () => readConfigObject(cData))
    }
    case 23: {
      cData.getUint16()
      return
    }
    default:
      throw new Error('Unknown object type: ' + type)
    // throw new IllegalArgumentException('Unknown object type: ' + type)
  }
}

function readArray<T>(length: number, fn: () => T) {
  const result = new Array<T>(length)

  for (let i = 0; i < length; i++) {
    result[i] = fn()
  }
  return result
}

function decodeTiles(
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
        ? mapConfig(block, cData.getInt32(), position)
        : readConfigObject(cData)
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

function decodeSchematicSize(cData: StreamedDataReader) {
  const width = cData.getInt16(),
    height = cData.getInt16()
  return { width, height }
}

/**
 * Parses the data and returns a schematic
 *  @param encoded The encoded schematic data
 */
export function decodeSchematic(encoded: string | Uint8Array) {
  const decoded =
    typeof encoded === 'string' ? base64ToBytes(encoded.trim()) : encoded

  const arr = new Uint8Array(decoded)
  const data = new StreamedDataReader(arr.buffer)
  if (!isValid(data, true)) {
    throw new Error('Parsing error: this is not a valid schematic')
  }
  const version = data.getInt8()
  const cData = decodeCompressedData(data)
  const { width, height } = decodeSchematicSize(cData)
  const tags = decodeTags(cData)
  const blocks = decodeBlocks(cData)
  const tiles = decodeTiles(cData, blocks, version)
  const base64 = typeof encoded === 'string' ? encoded : bytesToBase64(encoded)
  return {
    height,
    tags,
    tiles,
    width,
    base64,
    version: `v${version + 5}` as MindustryVersion,
  }
}

/** Takes a decoded schematic and saves its new tags
 * @param schematic A decoded schematic in wich the tags were modified
 */
export function encodeTags(schematic: Schematic): string {
  if (!schematic.base64)
    throw new Error('cannot save the tags of a non parsed schematic')
  const decoded = base64ToBytes(schematic.base64)
  const arr = new Uint8Array(decoded)
  const data = new StreamedDataReader(arr.buffer)
  // read header
  isValid(data, true)
  // read version
  data.getInt8()
  const cData = decodeCompressedData(data)
  // read size
  decodeSchematicSize(cData)
  const tagsStart = cData.offset
  // read old tags
  decodeTags(cData)
  const tagsEnd = cData.offset
  const newTags = schematic.tags
  const writer = new StreamedDataWriter(new ArrayBuffer(1024))
  writer.setInt8(newTags.size)
  newTags.forEach((value, key) => {
    writer.setString(key)
    writer.setString(value ?? '')
  })
  const result = concatBytes(
    new Uint8Array(cData.buffer).subarray(0, tagsStart),
    new Uint8Array(writer.buffer).subarray(0, writer.offset),
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

  const resultBuffer = new Uint8Array(resultWriter.buffer)
  resultBuffer.set(bytes, 5)
  return bytesToBase64(resultBuffer)
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

function base64ToBytes(source: string) {
  if (typeof window === 'undefined') return Buffer.from(source, 'base64')

  const binaryString = atob(source)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

function bytesToBase64(source: Buffer | Uint8Array) {
  if ('write' in source) return source.toString('base64')
  if (typeof window === 'undefined')
    return Buffer.from(source).toString('base64')

  let result = ''
  for (let i = 0; i < source.length; i++) {
    result += String.fromCharCode(source[i])
  }
  return btoa(result)
}
