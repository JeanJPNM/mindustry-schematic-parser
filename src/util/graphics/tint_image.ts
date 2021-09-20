import { Canvas, Image, createCanvas } from 'canvas'
export function tintImage(image: Image, color: string, opacity = 0.5): Canvas {
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
