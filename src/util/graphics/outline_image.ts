import { Canvas, CanvasGradient, CanvasPattern, Image } from 'canvas'
export interface OutlineOptions {
  image: Image
  canvas: Canvas
  fillStyle?: string | CanvasGradient | CanvasPattern
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
  canvas,
  image,
  fillStyle = 'black',
  x = 0,
  y = 0,
  thickness = 2,
}: OutlineOptions): Canvas {
  const context = canvas.getContext('2d')
  const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1] // offset array
  let i = 0 // iterator
  // draw images at offsets from the array scaled by thickness
  for (; i < dArr.length; i += 2)
    context.drawImage(
      image,
      x + dArr[i] * thickness,
      y + dArr[i + 1] * thickness
    )

  // fill with color
  context.globalCompositeOperation = 'source-in'
  context.fillStyle = fillStyle
  context.fillRect(0, 0, canvas.width, canvas.height)

  // draw original image in normal mode
  context.globalCompositeOperation = 'source-over'
  context.drawImage(image, x, y)
  return canvas
}
