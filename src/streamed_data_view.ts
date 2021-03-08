/**
 * Similar to a DataView, but it has an auto incrementing offset.
 * A mix of `DataView` and the `DataInputStream` java class
 */
export default class StreamedDataView {
  readonly data: DataView

  constructor(public readonly buffer: ArrayBuffer) {
    this.data = new DataView(buffer)
  }

  private currentOffset = 0

  get offset(): number {
    return this.currentOffset
  }

  getFloat32(): number {
    const value = this.data.getFloat32(this.currentOffset)
    this.currentOffset += 4
    return value
  }

  getFloat64(littleEndian?: boolean): number {
    const value = this.data.getFloat64(this.currentOffset, littleEndian)
    this.currentOffset += 8
    return value
  }

  getInt8(): number {
    const value = this.data.getInt8(this.currentOffset)
    this.currentOffset++
    return value
  }

  getInt16(littleEndian?: boolean): number {
    const value = this.data.getInt16(this.currentOffset, littleEndian)
    this.currentOffset += 2
    return value
  }

  getInt32(littleEndian?: boolean): number {
    const value = this.data.getInt32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  getUint8(): number {
    const value = this.data.getUint8(this.currentOffset)
    this.currentOffset++
    return value
  }

  getUint16(littleEndian?: boolean): number {
    const value = this.data.getUint16(this.currentOffset, littleEndian)
    this.currentOffset += 2
    return value
  }

  getUint32(littleEndian?: boolean): number {
    const value = this.data.getUint32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  getBigInt64(littleEndian?: boolean): bigint {
    const value = this.data.getBigInt64(this.currentOffset, littleEndian)
    this.currentOffset += 8
    return value
  }

  getBigUint64(littleEndian?: boolean): bigint {
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

  getString(): string {
    const utflen = this.getUint16()
    let c = 0,
      c2 = 0,
      c3 = 0
    let start = this.currentOffset
    const end = utflen + this.currentOffset
    let result = ''
    while (start < end) {
      c = this.getUint8()
      if (c > 127) break
      start++
      result += String.fromCodePoint(c)
    }
    while (start < end) {
      c = this.getUint8()
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
            throw new Error('malformed input: partial character at end')
          c2 = this.data.getUint8(this.currentOffset - 1)
          if ((c2 & 0xc0) !== 0x80)
            throw new Error('malformed input around byte ' + start)
          result += ((c & 0x1f) << 6) | (c2 & 0x3f)
          break
        case 14:
          /* 1110 xxxx  10xx xxxx  10xx xxxx */
          start += 3
          if (start > end)
            throw new Error('malformed input: partial character at end')
          c2 = this.data.getUint8(start - 2)
          c3 = this.data.getUint8(start - 1)
          if ((c2 & 0xc0) !== 0x80 || (c3 & 0xc0) !== 0x80)
            throw new Error('malformed input around byte ' + (start - 1))
          result += ((c & 0x0f) << 12) | ((c2 & 0x3f) << 6) | ((c3 & 0x3f) << 0)
          break
        default:
          /* 10xx xxxx,  1111 xxxx */
          throw new Error('malformed input around byte ' + start)
      }
    }
    // The number of chars produced may be less than utflen
    return result
  }

  getBool(): boolean {
    const value = this.data.getInt32(this.currentOffset)
    this.currentOffset += 4
    return value !== 0
  }
}
