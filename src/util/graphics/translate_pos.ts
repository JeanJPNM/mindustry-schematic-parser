import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'

export function translatePos(
  tile: SchematicTile,
  canvas: Canvas
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
