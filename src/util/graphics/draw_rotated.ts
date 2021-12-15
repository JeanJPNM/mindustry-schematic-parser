import { CanvasLike, ImageLike } from '../canvas_types'
import { SchematicTile } from '../../schematic'
import { TileRotation } from '../../schematic/tile'
import { translatePos } from './positioning'

export interface TileRotatedDrawOptions {
  canvas: CanvasLike
  tile: SchematicTile
  image: ImageLike
  angle?: number
}
export function drawRotatedTile({
  canvas,
  image,
  tile,
  angle = tileRotationToAngle(tile.rotation),
}: TileRotatedDrawOptions): void {
  drawRotated({
    canvas,
    image,
    ...translatePos(tile, canvas),
    offset: tile.block.size * 16,
    angle,
  })
}
interface RotatedDrawOptions {
  canvas: CanvasLike
  image: ImageLike | CanvasLike
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
export function degreeToAngle(degree: number): number {
  return (degree * Math.PI) / 180
}
