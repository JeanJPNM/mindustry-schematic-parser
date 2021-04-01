import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'

export function translatePos(
  tile: SchematicTile,
  canvas: Canvas
): { x: number; y: number } {
  let { x, y } = tile
  y++
  const { size } = tile.block

  // "fix" coordinates
  x -= Math.floor(size / 2 - 0.1)
  y += Math.floor(size / 2)

  y *= 32
  x *= 32
  y = canvas.height - y
  return { x, y }
}
