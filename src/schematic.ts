import { Block, PowerGenerator } from './mindustry/block'
import { ItemCode, ItemCost } from './mindustry/item'

export default class Schematic {
  constructor(
    public tiles: SchematicTile[],
    public tags: Map<string, string>,
    public width: number,
    public height: number
  ) {}

  get powerProduction(): number {
    let result = 0
    for (const tile of this.tiles) {
      result +=
        tile.block instanceof PowerGenerator ? tile.block.powerGeneration : 0
    }
    return result
  }

  get powerConsumption(): number {
    let result = 0
    for (const tile of this.tiles) {
      result += tile.block.powerConsumption
    }
    return result
  }

  get requirements(): ItemCost {
    const requirements: ItemCost = {}
    for (const tile of this.tiles) {
      const { block } = tile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req = block.requirements
      for (const key in req) {
        // console.log(block.name, req)
        const item = key as ItemCode
        const cost = req[item] as number
        const currentCost = requirements[item] ?? 0
        requirements[item] = currentCost + cost
      }
    }
    return requirements
  }
}
export class SchematicTile {
  constructor(
    public block: Block,
    public x: number,
    public y: number,
    public config: unknown,
    public rotation: number
  ) {}
}
