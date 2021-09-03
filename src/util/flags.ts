export class Flags<T extends number> {
  value: number

  constructor(value: 0 | T = 0) {
    this.value = value
  }

  add(value: T): void {
    this.value |= value
  }

  remove(value: T): void {
    this.value &= ~value
  }

  /**
   * Use it to check whether this has one or more flag values
   *
   * @example
   *    flags.has(1 | 4 | 8); // check if the flags has all of those values
   */
  has(value: number): boolean {
    return (this.value & value) === value
  }

  valueOf(): number {
    return this.value
  }
}
