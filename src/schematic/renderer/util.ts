import { Schematic } from '../schematic'
import { SchematicTile } from '../tile'

export function handlePlacement(tile: SchematicTile): { x: number; y: number } {
  let { x, y } = tile
  const { size } = tile.block
  x -= Math.floor(size / 2 - 0.1)
  y -= Math.floor(size / 2 - 0.1)
  return { x, y }
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
