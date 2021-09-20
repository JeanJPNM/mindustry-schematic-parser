import { Schematic } from '../schematic'
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
export function mapTiles(schematic: Schematic): SchematicTileMap {
  const { width } = schematic
  const result: SchematicTile[][] = []
  for (let x = 0; x < width; x++) {
    result[x] = []
  }
  for (const tile of schematic.tiles) {
    const { size } = tile.block
    const start = handlePlacement(tile)
    const end = {
      x: start.x + size,
      y: start.y + size,
    }
    for (let { x } = start; x < end.x && x < schematic.width; x++) {
      for (let { y } = start; y < end.y && y < schematic.height; y++) {
        result[x][y] = tile
      }
    }
  }
  return result
}
