import { BlockOutputDirection } from '../../mindustry/block/block'
import { Flags } from '../../util'
import { SchematicTile } from '../tile'

export function handlePlacement(tile: SchematicTile): { x: number; y: number } {
  const { size } = tile.block
  const { x, y } = tile
  const offset = Math.ceil(size / 2) - 1
  return {
    x: x - offset,
    y: y - offset,
  }
}
export type SchematicTileMap = ((SchematicTile | undefined)[] | undefined)[]

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
