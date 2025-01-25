import { Canvas } from 'canvas'
import { RenderingInfo } from '../../util'

export function drawBackground(
  { blockSprite }: RenderingInfo,
  backgroundCanvas: Canvas,
  size: number
): void {
  const context = backgroundCanvas.getContext('2d')
  const floor = blockSprite('environment', 'metal-floor').toCanvas()

  const pattern = context.createPattern(floor, 'repeat')

  context.save()
  context.fillStyle = pattern
  context.fillRect(0, 0, size, size)
  context.restore()

  context.shadowColor = 'black'
  context.shadowBlur = 20
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
}
