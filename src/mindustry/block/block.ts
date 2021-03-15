import { Canvas, Image, loadImage } from 'canvas'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'
import { UnlockableContent } from '../content'
import path from 'path'
import { sync as pkgDir } from 'pkg-dir'

export type BlockOutput = {
  item?: boolean
  liquid?: boolean
}
export interface BlockProperties {
  name: string
  requirements: ItemCost
  size: number
  powerConsumption?: number
  output?: BlockOutput
}
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
 * A generic way to represent a block
 */
export abstract class Block
  extends UnlockableContent
  implements BlockProperties {
  constructor(properties: BlockProperties) {
    super(properties.name)
    Object.assign(this, properties)
    // converts the consumption in ticks to seconds
    this.powerConsumption *= 60
  }

  requirements!: ItemCost

  size!: number

  powerConsumption = 0

  output = {
    item: false,
    liquid: false,
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
export function translatePos(
  tile: SchematicTile,
  canvas: Canvas
): { x: number; y: number } {
  let { x, y } = tile
  y++
  const { size } = tile.block
  if (size > 2) {
    if (size === 4) {
      x -= 1
      y += 2
    } else {
      const dif = Math.floor(size / 2)
      x -= dif
      y += dif
    }
  } else if (size > 1) {
    y++
  }
  y *= 32
  x *= 32
  y = canvas.height - y
  return { x, y }
}
export const blocksFolder = path.join(
  pkgDir(__dirname) as string,
  'assets/sprites/blocks'
)
export function blockAsset(category: string, name: string): Promise<Image> {
  return loadImage(path.join(blocksFolder, category, name + '.png'))
}
