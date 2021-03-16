import {
  Conduit,
  Conveyor,
  ItemCost,
  ItemName,
  PlastaniumConveyor,
  PowerGenerator,
} from '../mindustry'
import { drawBridges, drawConveyors } from './renderer'
import { SchematicIO } from './io'
import { SchematicTile } from './tile'
import { blockAsset } from '../mindustry/block/block'
import { createCanvas } from 'canvas'

interface SchematicProperties {
  /**
   * The tiles that compose this schematic
   */
  tiles: SchematicTile[]
  /**
   * These tags contain the schematic metadata (like its name and description)
   */
  tags: Map<string, string>
  /**
   * With of the schematic in tiles
   */
  width: number
  /**
   * Height of the schematic in tiles
   */
  height: number

  base64?: string
}

/**
 * A simple representation for a mindustry schematic
 */
export class Schematic implements SchematicProperties {
  constructor(properties: SchematicProperties) {
    // this prevents the user for assignin any property through the constructor
    ;({
      tiles: this.tiles,
      height: this.height,
      tags: this.tags,
      width: this.width,
      base64: this.base64,
    } = properties)
    if (!this.description) {
      this.description = ''
    }
  }

  readonly tiles: SchematicTile[]

  readonly tags: Map<string, string>

  readonly width: number

  readonly height: number

  base64?: string

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
        const item = key as ItemName
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

  /**
   * Creates an image that represents this schematic's preview
   */
  async toImageBuffer(): Promise<Buffer> {
    const canvas = createCanvas(this.width * 32, this.height * 32)
    const size = (Math.max(this.width, this.height) + 2) * 32
    const background = createCanvas(size, size)
    const bcontext = background.getContext('2d')
    const floor = await blockAsset('environment', 'metal-floor')
    for (let x = 0; x < size; x += 32) {
      for (let y = 0; y < size; y += 32) {
        bcontext.drawImage(floor, x, y)
      }
    }
    for (const tile of this.tiles) {
      const { block } = tile
      if (
        block instanceof Conveyor ||
        block instanceof PlastaniumConveyor ||
        block instanceof Conduit
      )
        continue
      await block.draw(tile, canvas)
    }
    await drawConveyors(this, canvas)
    await drawBridges(this, canvas)
    bcontext.shadowColor = 'black'
    bcontext.shadowBlur = 20
    bcontext.shadowOffsetX = 0
    bcontext.shadowOffsetY = 0
    bcontext.drawImage(
      canvas,
      (size - canvas.width) / 2,
      (size - canvas.height) / 2
    )
    return background.toBuffer()
  }
}
