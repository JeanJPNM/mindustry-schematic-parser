/**
 * Similar to a DataView, but it has an auto incrementing offset.
 * A mix of `DataView` and the `DataInputStream` java class
 */
export class StreamedDataReader {
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
   * Reads the next 4 bytes as a 32-bit float value. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getFloat32(littleEndian = false): number {
    const value = this.data.getFloat32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  /**
   * Reads the next 8 bytes as a 64-bit float value. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getFloat64(littleEndian = false): number {
    const value = this.data.getFloat64(this.currentOffset, littleEndian)
    this.currentOffset += 8
    return value
  }

  /**
   * Reads the next byte as a 8-bit int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getInt8(): number {
    const value = this.data.getInt8(this.currentOffset)
    this.currentOffset++
    return value
  }

  /**
   * Reads the next 2 bytes as a 16-bit int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getInt16(littleEndian = false): number {
    const value = this.data.getInt16(this.currentOffset, littleEndian)
    this.currentOffset += 2
    return value
  }

  /**
   * Reads the next 4 bytes as a 32-bit int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getInt32(littleEndian = false): number {
    const value = this.data.getInt32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  /**
   * Reads the next byte as a 8-bit unsigned int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getUint8(): number {
    const value = this.data.getUint8(this.currentOffset)
    this.currentOffset++
    return value
  }

  /**
   * Reads the next 2 bytes as a 16-bit unsigned int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getUint16(littleEndian = false): number {
    const value = this.data.getUint16(this.currentOffset, littleEndian)
    this.currentOffset += 2
    return value
  }

  /**
   * Reads the next 4 bytes as a 32-bit unsigned int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getUint32(littleEndian = false): number {
    const value = this.data.getUint32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  /**
   * Reads the next 8 bytes as a 64-bit int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getBigInt64(littleEndian = false): bigint {
    const value = this.data.getBigInt64(this.currentOffset, littleEndian)
    this.currentOffset += 8
    return value
  }

  /**
   * Reads the next 8 bytes as a 64-bit unsigned int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getBigUint64(littleEndian = false): bigint {
    const value = this.data.getBigUint64(this.currentOffset, littleEndian)
    this.currentOffset += 8
    return value
  }

  /**
   * Returns a unicode character with the code from the next byte
   */
  getChar(): string {
    return String.fromCharCode(this.getUint8())
  }

  /**
   * Reads a string that has been encoded using a
   * modified UTF-8
   * format.
   */
  getString(): string {
    const utflen = this.getUint16()
    const buffer = this.buffer.slice(
      this.currentOffset,
      this.currentOffset + utflen
    )
    this.currentOffset += utflen
    return new TextDecoder().decode(buffer)
  }

  /**
   * Reads the next byte as a boolean
   */
  getBool(): boolean {
    const value = this.getInt8()
    if (value < 0) throw new Error('Bat byte input')
    return value !== 0
  }
}
