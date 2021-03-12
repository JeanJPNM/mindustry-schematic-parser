export type LiquidName = 'water' | 'slag' | 'oil' | 'cryofluid'
export class Liquid {
  constructor(public readonly name: LiquidName) {}

  static fromCode(code: number): Liquid {
    const liquids: LiquidName[] = ['water', 'slag', 'oil', 'cryofluid']
    if (code > liquids.length - 1)
      throw new Error('Unknown liquid code: ' + code)
    return new Liquid(liquids[code])
  }
}
