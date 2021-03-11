import { ItemCode, ItemCost, PowerGenerator } from '../mindustry'
import { SchematicIO } from './io'
import { SchematicTile } from './tile'
/**
 * A simple representation for a mindustry schematic
 */
export class Schematic {
  constructor(
    /**
     * The tiles that compose this schematic
     */
    public tiles: SchematicTile[],
    /**
     * These tags contain the schematic metadata (like its name and description)
     */
    public tags: Map<string, string>,
    /**
     * With of the schematic in tiles
     */
    public width: number,
    /**
     * Height of the schematic in tiles
     */
    public height: number,

    public base64?: string
  ) {
    if (!this.description) {
      this.description = ''
    }
  }

  static decode(base64: string): Schematic {
    return SchematicIO.decode(base64)
  }

  static encode(schematic: Schematic): string {
    return schematic.encode()
  }

  /**
   * The name of this schematic
   *
   * Shorhand for `tags.get('name')`
   */
  get name(): string {
    return this.tags.get('name') as string
  }

  set name(value: string) {
    this.tags.set('name', value)
  }

  /**
   * The description of this schematic
   *
   * Shorhand for `tags.get('name')`
   */
  get description(): string {
    return this.tags.get('description') ?? ''
  }

  set description(value: string) {
    this.tags.set('description', value)
  }

  /**
   * The amount of power this schematic can produce
   *
   * This is a separated measurement that does not interfere with `powerConsumption`
   *
   * This measurement may vary if there is an `OverdriveProjector` or an `OverdriveDome` contained in this schematic
   */
  get powerProduction(): number {
    let result = 0
    for (const tile of this.tiles) {
      result +=
        tile.block instanceof PowerGenerator ? tile.block.powerGeneration : 0
    }
    return result
  }

  /**
   * The amount of power this schematic consumes to work properly
   *
   * This is a separated measurement that does not interfere with `powerConsumption`
   *
   * This measurement may vary if there is an `OverdriveProjector` or an `OverdriveDome` contained in this schematic
   */
  get powerConsumption(): number {
    let result = 0
    for (const tile of this.tiles) {
      result += tile.block.powerConsumption
    }
    return result
  }

  /**
   * The overall power balance of this schematic
   */
  get powerBalance(): number {
    return this.powerProduction - this.powerConsumption
  }

  /**
   * The items needed to build this schematic
   */
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

  /**
   * Converts this schematic to a base 64 string
   */
  encode(): string {
    if (!this.base64)
      throw new Error(
        'by now, the schematic needs to be generated from a SchematicDecoder'
      )
    return SchematicIO.encodeTags(this)
  }
}
