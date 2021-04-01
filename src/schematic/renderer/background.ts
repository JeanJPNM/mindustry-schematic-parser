import { Canvas } from 'canvas'
import { blockAsset } from '../../util'

export async function drawBackground(
  backgroundCanvas: Canvas,
  size: number
): Promise<void> {
  const context = backgroundCanvas.getContext('2d')
  const floor = await blockAsset('environment', 'metal-floor')
  for (let x = 0; x < size; x += 32) {
    for (let y = 0; y < size; y += 32) {
      context.drawImage(floor, x, y)
    }
  }
  context.shadowColor = 'black'
  context.shadowBlur = 20
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
}
