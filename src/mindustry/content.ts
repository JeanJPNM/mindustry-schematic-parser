export abstract class Content {}
export abstract class MappableContent extends Content {
  constructor(public name: string) {
    super()
  }

  toString(): string {
    return this.name
  }
}
export abstract class UnlockableContent extends MappableContent {}
