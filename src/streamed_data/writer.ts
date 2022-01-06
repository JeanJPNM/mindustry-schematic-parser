export class StreamedDataWriter {
  /**
   * The `DataView` wrapped by this `StreamedDataView`.
   *
   * This is meant to be exposed as a readonly property, writes to the buffer may cause undefined behaviour
   */
  data: DataView

  constructor(public buffer: ArrayBuffer) {
    this.data = new DataView(buffer)
  }

  /**
   * Internal byte offset of this `StreamedDataView`
   */
  private currentOffset = 0

  /**
   * The current byte offset of this `StreamedDataView`
   */
  get offset(): number {
    return this.currentOffset
  }

  /**
   * Ensures that `min` bytes are avaliable for write
   */
  private ensure(min: number): void {
    const length = this.buffer.byteLength
    if (this.currentOffset + min <= length) return

    // get the minimum power of 2 that can multiply length
    const p = Math.ceil(Math.log2((length + min) / length))
    const result = new Uint8Array(length * Math.pow(2, p))

    result.set(new Uint8Array(this.buffer))
    this.buffer = result.buffer
    this.data = new DataView(this.buffer)
  }

  /**
   * Writes a 32-bit float in the next 4 bytes. There is
   */
  setFloat32(value: number, littleEndian = false): void {
    this.ensure(4)
    this.data.setFloat32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 64-bit float in the next 8 bytes.
   */
  setFloat64(value: number, littleEndian = false): void {
    this.ensure(8)
    this.data.setFloat64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Writes a 8-bit int in the next byte.
   */
  setInt8(value: number): void {
    this.ensure(1)
    this.data.setInt8(this.currentOffset, value)
    this.currentOffset++
  }

  /**
   * Writes a 16-bit int in the next 2 bytes.
   */
  setInt16(value: number, littleEndian = false): void {
    this.ensure(2)
    this.data.setInt16(this.currentOffset, value, littleEndian)
    this.currentOffset += 2
  }

  /**
   * Writes a 32-bit int in the next 2 bytes.
   */
  setInt32(value: number, littleEndian = false): void {
    this.ensure(4)
    this.data.setInt32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 8-bit unsigned int in the next byte.
   */
  setUint8(value: number): void {
    this.ensure(1)
    this.data.setUint8(this.currentOffset, value)
    this.currentOffset++
  }

  /**
   * Writes a 16-bit unsigned int in the next 2 bytes.
   */
  setUint16(value: number, littleEndian = false): void {
    this.ensure(2)
    this.data.setUint16(this.currentOffset, value, littleEndian)
    this.currentOffset += 2
  }

  /**
   * Writes a 32-bit unsigned int in the next 4 bytes.
   */
  setUint32(value: number, littleEndian = false): void {
    this.ensure(4)
    this.data.setUint32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 64-bit bigint in the next 8 bytes.
   */
  setBigInt64(value: bigint, littleEndian = false): void {
    this.ensure(8)
    this.data.setBigInt64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Writes a 64-bit bigint in the next 8 bytes.
   */
  setBigUint64(value: bigint, littleEndian = false): void {
    this.ensure(8)
    this.data.setBigUint64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Returns a unicode character with the code from the next byte
   */
  setChar(value: string): void {
    this.ensure(1)
    this.setUint8(value.charCodeAt(0))
  }

  /**
   * Reads a string that has been encoded using a
   * modified UTF-8
   * format.
   */
  setString(str: string): number {
    const result = new TextEncoder().encode(str)
    const length = result.byteLength
    this.ensure(length + 2)
    this.setInt16(length)
    new Uint8Array(this.buffer).set(result, this.currentOffset)
    this.currentOffset += length

    return length
  }

  /**
   * Writes a boolean in the next byte
   */
  setBool(value: boolean): void {
    this.ensure(1)
    this.setInt8(value ? 1 : 0)
  }
}
