import { StringParsingError } from './errors'
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
    return String.fromCodePoint(this.getUint8())
  }

  /**
   * Reads a string that has been encoded using a
   * modified UTF-8
   * format.
   */
  getString(): string {
    const utflen = this.getUint16()
    let c = 0,
      c2 = 0,
      c3 = 0
    const bytearr = new Uint8Array(
      this.buffer.slice(this.currentOffset, this.currentOffset + utflen)
    )
    this.currentOffset += utflen

    let start = 0
    const end = utflen
    let result = ''
    while (start < end) {
      c = bytearr[start]
      if (c > 127) break
      start++
      result += String.fromCodePoint(c)
    }
    while (start < end) {
      c = bytearr[start]
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          /* 0xxxxxxx*/
          start++
          result += String.fromCodePoint(c)
          break
        case 12:
        case 13:
          /* 110x xxxx   10xx xxxx*/
          start += 2
          if (start > end)
            throw new StringParsingError(
              'malformed input: partial character at end',
              result
            )
          c2 = bytearr[start - 1]
          if ((c2 & 0xc0) !== 0x80)
            throw new StringParsingError(
              'malformed input around byte ' + start,
              result
            )
          result += ((c & 0x1f) << 6) | (c2 & 0x3f)
          break
        case 14:
          /* 1110 xxxx  10xx xxxx  10xx xxxx */
          start += 3
          if (start > end)
            throw new StringParsingError(
              'malformed input: partial character at end',
              result
            )
          c2 = bytearr[start - 2]
          c3 = bytearr[start - 1]
          if ((c2 & 0xc0) !== 0x80 || (c3 & 0xc0) !== 0x80)
            throw new StringParsingError(
              'malformed input around byte ' + (start - 1),
              result
            )
          result += ((c & 0x0f) << 12) | ((c2 & 0x3f) << 6) | ((c3 & 0x3f) << 0)
          break
        default:
          /* 10xx xxxx,  1111 xxxx */
          throw new StringParsingError(
            'malformed input around byte ' + start,
            result
          )
      }
    }
    // The number of chars produced may be less than utflen
    return result
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
