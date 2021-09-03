import { Canvas, Image } from 'canvas'
import { Flags, blockAsset, translatePos } from '../../util'
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

export enum BlockOutput {
  item = 2 << 0,
  liquid = 2 << 1,
  payload = 2 << 2,
  duct = 2 << 3,
}
/**
 * A generic way to represent a block
 */
export abstract class Block extends UnlockableContent {
  abstract override readonly name: string

  abstract requirements: ItemCost

  abstract size: number

  output: Flags<BlockOutput> = new Flags()

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
