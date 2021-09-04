import { Canvas, Image } from 'canvas'
import { blockAsset, translatePos } from '../../util'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'
import { UnlockableContent } from '../content'
import path from 'path'
import { sync as pkgDir } from 'pkg-dir'

export interface BlockRenderingOptions {
  tile: SchematicTile
  canvas: Canvas
  category: string
  layers: string[]
}
export interface BlockImageRenderingOptions {
  tile: SchematicTile
  canvas: Canvas
  image: Image | Canvas
}

/**
 * Flagged enum with the different output types that a block can have
 *
 * Because this enum is flagged, it can hold more than one value at a time.
 *
 * You can use the `Flags` class to make value checking easier
 *
 * @example
 *    // check if the value has both item and liquid
 *    Flags.has(myValue, BlockOutput.item | BlockOutput.liquid)
 */
export enum BlockOutput {
  none = 0,
  item = 2 << 0,
  liquid = 2 << 1,
  payload = 2 << 2,
  duct = 2 << 3,
}
export enum BlockOutputDirection {
  none = 0,
  front = 2 << 0,
  back = 2 << 1,
  left = 2 << 2,
  right = 2 << 3,
  all = front | back | left | right,
}
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
    return this.powerConsumption * 60
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
    canvas,
    image,
    tile,
  }: BlockImageRenderingOptions): void {
    const context = canvas.getContext('2d')
    const { x, y } = translatePos(tile, canvas)
    context.drawImage(image, x, y)
  }

  protected async render({
    canvas,
    category,
    layers,
    tile,
  }: BlockRenderingOptions): Promise<void> {
    for (const layer of layers) {
      const image = await blockAsset(category, layer)
      this.renderImage({
        canvas,
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
  abstract draw(tile: SchematicTile, canvas: Canvas): Promise<void>
}

export const blocksFolder = path.join(
  pkgDir(__dirname) as string,
  'assets/sprites/blocks'
)
