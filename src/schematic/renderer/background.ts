import { Canvas } from 'canvas'
import { blockAsset } from '../../mindustry/block/block'

export async function drawBackground(
  backgroundCanvas: Canvas,
  size: number,
  schematicCanvas: Canvas
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
  context.drawImage(
    schematicCanvas,
    (size - schematicCanvas.width) / 2,
    (size - schematicCanvas.height) / 2
  )
}
