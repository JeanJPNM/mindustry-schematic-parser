import * as Canvas from 'canvas'
import { Sprite, drawImage } from '../sprite'
export interface OutlineOptions {
  image: Canvas.Image | Sprite
  fillStyle?: string | Canvas.CanvasGradient | Canvas.CanvasPattern
  x?: number
  y?: number
  thickness?: number
}
/**
 * Outlines an image using an offset array.
 *
 * This function modifies the canvas and returns it.
 *
 */
export function outlineImage({
  image,
  fillStyle = 'black',
  thickness = 2,
}: OutlineOptions): Canvas.Canvas {
  const canvas = Canvas.createCanvas(image.width, image.height)
  const context = canvas.getContext('2d')
  const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1] // offset array
  let i = 0 // iterator
  // draw images at offsets from the array scaled by thickness
  for (; i < dArr.length; i += 2)
    drawImage(context, image, dArr[i] * thickness, dArr[i + 1] * thickness)

  // fill with color
  context.globalCompositeOperation = 'source-in'
  context.fillStyle = fillStyle
  context.fillRect(0, 0, canvas.width, canvas.height)

  // draw original image in normal mode
  context.globalCompositeOperation = 'source-over'
  drawImage(context, image, 0, 0)
  return canvas
}
