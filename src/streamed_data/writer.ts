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
