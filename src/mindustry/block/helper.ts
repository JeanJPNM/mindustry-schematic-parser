import { CanvasLike, ImageLike } from '../../util'
import { SchematicTile } from '../../schematic'

export interface BlockRenderingOptions {
  tile: SchematicTile
  canvas: CanvasLike
  category: string
  layers: string[]
}
export interface BlockImageRenderingOptions {
  tile: SchematicTile
  canvas: CanvasLike
  image: ImageLike | CanvasLike
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
