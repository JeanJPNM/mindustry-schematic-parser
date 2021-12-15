import { CanvasLike, blockAsset } from '../../util'

export async function drawBackground(
  backgroundCanvas: CanvasLike,
  size: number
): Promise<void> {
  const context = backgroundCanvas.getContext('2d')
  const floor = await blockAsset('environment', 'metal-floor')
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
