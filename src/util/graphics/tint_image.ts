import { CanvasLike, ImageLike } from '../canvas_types'
import { RenderingInfo } from '../rendering_info'

export function tintImage(
  createCanvas: RenderingInfo['options']['createCanvas'],
  image: ImageLike,
  color: string,
  opacity = 0.5
): CanvasLike {
  const canvas = createCanvas(image.width, image.height)
  const context = canvas.getContext('2d')
  context.save()
  context.fillStyle = color
  context.globalAlpha = opacity
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.globalCompositeOperation = 'destination-atop'
  context.globalAlpha = 1
  context.drawImage(image, 0, 0)
  context.restore()
  return canvas
}
