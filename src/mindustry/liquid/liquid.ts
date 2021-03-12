import { LiquidName } from './liquid_name'

type LiquidColorMap = {
  [x in LiquidName]: string
}

const liquidColors: LiquidColorMap = {
  water: '#596ab8',
  slag: '#ffa166',
  oil: '#313131',
  cryofluid: '#6ecdec',
}

export class Liquid {
  private static liquidMap: Map<LiquidName, Liquid> = new Map()

  readonly color: string

  private constructor(public readonly name: LiquidName) {
    this.color = liquidColors[name]
  }

  static create(name: LiquidName): Liquid {
    let liquid = this.liquidMap.get(name)
    if (!liquid) {
      liquid = new Liquid(name)
      this.liquidMap.set(name, liquid)
    }
    return liquid
  }

  static fromCode(code: number): Liquid {
    const liquids: LiquidName[] = ['water', 'slag', 'oil', 'cryofluid']
    if (code > liquids.length - 1)
      throw new Error('Unknown liquid code: ' + code)
    const name = liquids[code]
    return this.liquidMap.get(name) ?? this.create(name)
  }
}
