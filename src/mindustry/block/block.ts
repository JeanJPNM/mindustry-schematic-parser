import {
  BlockImageRenderingOptions,
  BlockOutput,
  BlockOutputDirection,
  BlockRenderingOptions,
} from './helper'
import { RenderingInfo, ticksPerSecond, translatePos } from '../../util'
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
    const block = this.codes.get(code)
    if (block) {
      return block
    }
    throw new Error('the block is not registered not exist')
  }

  protected renderImage({
    info,
    image,
    tile,
  }: BlockImageRenderingOptions): void {
    const context = info.canvas.getContext('2d')
    const { x, y } = translatePos(tile, info.canvas)
    context.drawImage(image, x, y)
  }

  protected async render({
    info,
    category,
    layers,
    tile,
  }: BlockRenderingOptions): Promise<void> {
    for (const layer of layers) {
      const image = await info.blockAsset(category, layer)
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
  abstract draw(tile: SchematicTile, info: RenderingInfo): Promise<void>
}
