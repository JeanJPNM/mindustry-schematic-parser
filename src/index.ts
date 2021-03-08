import SchematicCode from './schematic_code'
import StreamedDataView from './streamed_data_view'
import pako from 'pako'

function read(encoded: string) {
  const decoded = Buffer.from(encoded, 'base64').toString('binary')
  const u8intArray = new Uint8Array(decoded.length)
  for (let i = 0; i < decoded.length; i++) {
    u8intArray[i] = decoded.codePointAt(i) ?? 0
  }
  const data = new StreamedDataView(u8intArray.buffer)
  const header = 'msch'
  for (const char of header) {
    const value = data.readChar()
    console.log(`${char} == ${value}`)
    if (char !== value) throw new Error('not a valid schematic')
  }
  const version = data.readUint8()
  console.log(version)
  const decompressedBinary = pako.inflate(u8intArray.subarray(data.offset))
  parse(decompressedBinary)
}
function parse(decompressedBinary: Uint8Array) {
  const data = new StreamedDataView(decompressedBinary.buffer)
  const width = data.readShort(),
    height = data.readShort()
  console.log(`width: ${width} height: ${height}`)
  const tags = new Map<string, string>()
  const numberOfTags = data.readByte()
  for (let i = 0; i < numberOfTags; i++) {
    const name = data.readUTF()
    const value = data.readUTF()
    tags.set(name, value)
  }
  console.log(tags)
  const length = data.readByte()
  const blocks: string[] = []
  for (let i = 0; i < length; i++) {
    const block = data.readUTF()
    console.log(block)
    blocks.push(block)
  }
  const total = data.readInt()
  const tiles = []
  // TODO: figure out how to replicate mindustry blocks
  for (let i = 0; i < total; i++) {
    const block = blocks[i]
    const position = data.readInt()
  }
}
const originalCode =
  'bXNjaAF4nD2LAQ6DIAxFP6ImSzbNDsIpdhICdSFBMAym3n5UtzVp+9/vL3p0Am3QM+HySHucfHG2x7jqTEnRlpM2OSbcs8s6uDIrE8Ob9mqN5pdXs9soYSjBUpp8XNWzvuO2FP8ifrDFZQyLr679M3DFWaJ2c0rJJJiawxLyEIKHhGghz2TLt66uL0mmjukDypUqCw=='
const scode = new SchematicCode(originalCode)
console.log(scode.parse().requirements())
// read(
//   'bXNjaAF4nEWNbw6CMAzFH+NvNNHoCbgAn0y8CCeYrBqMbmQMUY/uB7EbJK7rfs1r+4YYmUCi5Z2wOzyPZS21Kp0p68bKDmtFfWPbzrVGAwVW3XB7kG3fZLk2I9lKG0XYtpplR6rqDcNiM2hF9nwzY3WRjlBcB90El2yZyKwZPPOTdMwXgD3+JwoXosiB6QsxTZxMVgUHd6bPMhrPSBD0NPVlHLYjD44kbAWRM2UkYSrjKvUdMVt4d+TLB/zEM4KzWJx/c5A02A=='
// )
