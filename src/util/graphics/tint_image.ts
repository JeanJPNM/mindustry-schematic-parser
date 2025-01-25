import * as Canvas from 'canvas'
import { Sprite, drawImage } from '../sprite'
export function tintImage(
  image: Canvas.Image | Sprite,
  color: string,
  opacity = 0.5
): Canvas.Canvas {
  const canvas = Canvas.createCanvas(image.width, image.height)
  const context = canvas.getContext('2d')
  context.save()
  context.fillStyle = color
  context.globalAlpha = opacity
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.globalCompositeOperation = 'destination-atop'
  context.globalAlpha = 1
  drawImage(context, image, 0, 0)
  context.restore()
  return canvas
}
