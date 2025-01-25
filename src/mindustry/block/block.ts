import {
  BlockImageRenderingOptions,
  BlockOutput,
  BlockOutputDirection,
  BlockRenderingOptions,
  blockAliases,
} from './helper'
import { RenderingInfo, Sprite, ticksPerSecond, translatePos } from '../../util'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'
import { UnlockableContent } from '../content'

/**
 * A generic way to represent a block
 */
export abstract class Block extends UnlockableContent {
  abstract override readonly name: string

  abstract requirements: ItemCost

  abstract size: number

  output = BlockOutput.none

  outputDirection = BlockOutputDirection.none

  powerConsumption = 0

  get energyUsage(): number {
    return this.powerConsumption * ticksPerSecond
  }

  /**
   * @internal
   */
  static readonly codes = new Map<string, Block>()

  static fromCode(code: string): Block {
    const id = blockAliases.get(code) ?? code
    const block = this.codes.get(id)
    if (block) {
      return block
    }
    throw new Error(`The block "${code}" could not be found in the registry`)
  }

  protected renderImage({
    info,
    image,
    tile,
  }: BlockImageRenderingOptions): void {
    const context = info.canvas.getContext('2d')
    const { x, y } = translatePos(tile, info.canvas)

    if (image instanceof Sprite) {
      image.draw(context, x, y)
    } else {
      context.drawImage(image, x, y)
    }
  }

  protected render({
    info,
    category,
    layers,
    tile,
  }: BlockRenderingOptions): void {
    for (const layer of layers) {
      const image = info.blockSprite(category, layer)
      this.renderImage({
        info,
        image,
        tile,
      })
    }
  }

  /** Renders this block's sprite on the `canvas` using the info contained in the `tile`
   *
   * DO NOT call this method directly, as it was made for internal use
   * @package
   * @internal
   */
  abstract draw(tile: SchematicTile, info: RenderingInfo): void
}
