import { BlockOutputDirection } from '../../mindustry/block/helper'
import { CanvasLike } from '../canvas_types'
import { Flags } from '../flags'
import { SchematicTile } from '../../schematic'

export type SchematicTileMap = ((SchematicTile | undefined)[] | undefined)[]

export function handlePlacement(tile: SchematicTile): { x: number; y: number } {
  const { size } = tile.block
  const { x, y } = tile
  const offset = Math.ceil(size / 2) - 1
  return {
    x: x - offset,
    y: y - offset,
  }
}

export function translatePos(
  tile: SchematicTile,
  canvas: CanvasLike
): { x: number; y: number } {
  const { x, y } = tile
  const { size } = tile.block
  const offsetX = -Math.ceil(size / 2) + 1
  const offsetY = Math.floor(size / 2) + 1

  return {
    x: (x + offsetX) * 32,
    y: canvas.height - (y + offsetY) * 32,
  }
}
const directions = [
  BlockOutputDirection.front,
  BlockOutputDirection.left,
  BlockOutputDirection.back,
  BlockOutputDirection.right,
]
export function rotateOutputDirection(
  tile: SchematicTile
): BlockOutputDirection {
  const { rotation } = tile
  const { outputDirection } = tile.block
  if (outputDirection === BlockOutputDirection.all) return outputDirection

  let result = BlockOutputDirection.none
  // rotates the output direction
  for (let i = 0; i < directions.length; i++) {
    if (Flags.has(outputDirection, directions[i]))
      result |= directions[(rotation + i) % 4]
  }
  return result
}
