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
  getFloat32(littleEndian?: boolean): number {
    const value = this.data.getFloat32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  /**
   * Reads the next 8 bytes as a 64-bit float value. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getFloat64(littleEndian?: boolean): number {
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
  getInt16(littleEndian?: boolean): number {
    const value = this.data.getInt16(this.currentOffset, littleEndian)
    this.currentOffset += 2
    return value
  }

  /**
   * Reads the next 4 bytes as a 32-bit int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getInt32(littleEndian?: boolean): number {
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
  getUint16(littleEndian?: boolean): number {
    const value = this.data.getUint16(this.currentOffset, littleEndian)
    this.currentOffset += 2
    return value
  }

  /**
   * Reads the next 4 bytes as a 32-bit unsigned int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getUint32(littleEndian?: boolean): number {
    const value = this.data.getUint32(this.currentOffset, littleEndian)
    this.currentOffset += 4
    return value
  }

  /**
   * Reads the next 8 bytes as a 64-bit int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
  getBigInt64(littleEndian?: boolean): bigint {
    const value = this.data.getBigInt64(this.currentOffset, littleEndian)
    this.currentOffset += 8
    return value
  }

  /**
   * Reads the next 8 bytes as a 64-bit unsigned int. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   */
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

  /**
   * Reads the next byte as a boolean
   */
  getBool(): boolean {
    const value = this.getInt8()
    if (value < 0) throw new Error('Bat byte input')
    return value !== 0
  }
}
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
  setFloat32(value: number, littleEndian?: boolean): void {
    this.data.setFloat32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 64-bit float in the next 8 bytes.
   */
  setFloat64(value: number, littleEndian?: boolean): void {
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
  setInt16(value: number, littleEndian?: boolean): void {
    this.data.setInt16(this.currentOffset, value, littleEndian)
    this.currentOffset += 2
  }

  /**
   * Writes a 32-bit int in the next 2 bytes.
   */
  setInt32(value: number, littleEndian?: boolean): void {
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
  setUint16(value: number, littleEndian?: boolean): void {
    this.data.setUint16(this.currentOffset, value, littleEndian)
    this.currentOffset += 2
  }

  /**
   * Writes a 32-bit unsigned int in the next 4 bytes.
   */
  setUint32(value: number, littleEndian?: boolean): void {
    this.data.setUint32(this.currentOffset, value, littleEndian)
    this.currentOffset += 4
  }

  /**
   * Writes a 64-bit bigint in the next 8 bytes.
   */
  setBigInt64(value: bigint, littleEndian?: boolean): void {
    this.data.setBigInt64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Writes a 64-bit bigint in the next 8 bytes.
   */
  setBigUint64(value: bigint, littleEndian?: boolean): void {
    this.data.setBigUint64(this.currentOffset, value, littleEndian)
    this.currentOffset += 8
  }

  /**
   * Returns a unicode character with the code from the next byte
   */
  setChar(value: string): void {
    this.setUint8(value.codePointAt(0) as number)
  }

  /**
   * Reads a string that has been encoded using a
   * modified UTF-8
   * format.
   */
  setString(str: string): number {
    // code copied from DataOutputStream java implementation
    const strlen = str.length
    let utflen = strlen // optimized for ASCII

    for (let i = 0; i < strlen; i++) {
      const c = str.charCodeAt(i)
      if (c >= 0x80 || c === 0) utflen += c >= 0x800 ? 2 : 1
    }

    if (utflen > 65535 || /* overflow */ utflen < strlen)
      throw new Error('the input string is too long')

    const bytearr: number[] = []

    let count = 0
    bytearr[count++] = (utflen >>> 8) & 0xff
    bytearr[count++] = (utflen >>> 0) & 0xff

    let i = 0
    for (i = 0; i < strlen; i++) {
      // optimized for initial run of ASCII
      const c = str.charCodeAt(i)
      if (c >= 0x80 || c === 0) break
      bytearr[count++] = c
    }

    for (; i < strlen; i++) {
      const c = str.charCodeAt(i)
      if (c < 0x80 && c !== 0) {
        bytearr[count++] = c
      } else if (c >= 0x800) {
        bytearr[count++] = 0xe0 | ((c >> 12) & 0x0f)
        bytearr[count++] = 0x80 | ((c >> 6) & 0x3f)
        bytearr[count++] = 0x80 | ((c >> 0) & 0x3f)
      } else {
        bytearr[count++] = 0xc0 | ((c >> 6) & 0x1f)
        bytearr[count++] = 0x80 | ((c >> 0) & 0x3f)
      }
    }
    for (const byte of bytearr) {
      this.setUint8(byte)
    }
    return utflen + 2
  }

  /**
   * Writes a boolean in the next byte
   */
  setBool(value: boolean): void {
    this.setInt8(value ? 1 : 0)
  }
}
