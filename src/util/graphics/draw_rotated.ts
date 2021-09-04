import { Canvas, Image } from 'canvas'
import { SchematicTile } from '../../schematic'
import { TileRotation } from '../../schematic/tile'
import { translatePos } from './translate_pos'

export interface TileRotatedDrawOptions {
  canvas: Canvas
  tile: SchematicTile
  image: Image
  angle?: number
}
export function drawRotatedTile({
  canvas,
  image,
  tile,
  angle = tileRotationToAngle(tile.rotation),
}: TileRotatedDrawOptions): void {
  const context = canvas.getContext('2d')
  const { x, y } = translatePos(tile, canvas)
  const size = tile.block.size * 32
  const offset = size / 2
  context.save()
  context.translate(x + offset, y + offset)
  context.rotate(angle)
  context.translate(-offset, -offset)
  context.drawImage(image, 0, 0)
  context.restore()
}
interface RotatedDrawOptions {
  canvas: Canvas
  image: Image | Canvas
  x: number
  y: number
  offset: number
  angle: number
}

export function drawRotated({
  canvas,
  image,
  x,
  y,
  offset,
  angle,
}: RotatedDrawOptions): void {
  const context = canvas.getContext('2d')
  context.save()
  context.translate(x + offset, y + offset)
  context.rotate(angle)
  context.translate(-offset, -offset)
  context.drawImage(image, 0, 0)
  context.restore()
}
export function tileRotationToAngle(rotation: TileRotation): number {
  return ((rotation % 2 ? rotation + 2 : rotation) * Math.PI) / 2
}
