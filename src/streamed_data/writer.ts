export class StreamedDataWriter {
  /**
   * The `DataView` wrapped by this `StreamedDataView`.
   *
   * This is meant to be exposed as a readonly property, writes to the buffer may cause undefined behaviour
   */
  readonly data: DataView

  constructor(public readonly buffer: ArrayBuffer) {
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
   * Writes a 32-bit float in the next 4 bytes. There is
   */
  setFloat32(value: number, littleEndian = false): void {
    this.data.setFloat32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 64-bit float in the next 8 bytes.
   */
  setFloat64(value: number, littleEndian = false): void {
    this.data.setFloat64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Writes a 8-bit int in the next byte.
   */
  setInt8(value: number): void {
    this.data.setInt8(this.currentOffset, value)
    this.currentOffset++
  }

  /**
   * Writes a 16-bit int in the next 2 bytes.
   */
  setInt16(value: number, littleEndian = false): void {
    this.data.setInt16(this.currentOffset, value, littleEndian)
    this.currentOffset += 2
  }

  /**
   * Writes a 32-bit int in the next 2 bytes.
   */
  setInt32(value: number, littleEndian = false): void {
    this.data.setInt32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 8-bit unsigned int in the next byte.
   */
  setUint8(value: number): void {
    this.data.setUint8(this.currentOffset, value)
    this.currentOffset++
  }

  /**
   * Writes a 16-bit unsigned int in the next 2 bytes.
   */
  setUint16(value: number, littleEndian = false): void {
    this.data.setUint16(this.currentOffset, value, littleEndian)
    this.currentOffset += 2
  }

  /**
   * Writes a 32-bit unsigned int in the next 4 bytes.
   */
  setUint32(value: number, littleEndian = false): void {
    this.data.setUint32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 64-bit bigint in the next 8 bytes.
   */
  setBigInt64(value: bigint, littleEndian = false): void {
    this.data.setBigInt64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Writes a 64-bit bigint in the next 8 bytes.
   */
  setBigUint64(value: bigint, littleEndian = false): void {
    this.data.setBigUint64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Returns a unicode character with the code from the next byte
   */
  setChar(value: string): void {
    this.setUint8(value.charCodeAt(0))
  }

  /**
   * Reads a string that has been encoded using a
   * modified UTF-8
   * format.
   */
  setString(str: string): number {
    const offset = this.currentOffset + 2 // reserve space for the 16 bit length value
    const slice = new Uint8Array(this.data.buffer, offset)
    const result = new TextEncoder().encodeInto(str, slice)
    const length = result.written as number
    this.setInt16(length) // writes length of the string before the string bytes
    this.currentOffset += length
    return length
  }

  /**
   * Writes a boolean in the next byte
   */
  setBool(value: boolean): void {
    this.setInt8(value ? 1 : 0)
  }
}
