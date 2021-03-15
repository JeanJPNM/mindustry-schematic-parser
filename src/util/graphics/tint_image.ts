import { Canvas, Image, createCanvas } from 'canvas'
export function tintImage(image: Image, color: string, opacity = 0.5): Canvas {
  const newCanvas = createCanvas(image.width, image.height)
  const context = newCanvas.getContext('2d')
  context.save()
  context.fillStyle = color
  context.globalAlpha = opacity
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  context.globalCompositeOperation = 'destination-atop'
  context.globalAlpha = 1
  context.drawImage(image, 0, 0)
  context.restore()
  return newCanvas
}
