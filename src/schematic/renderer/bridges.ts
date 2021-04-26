import { Canvas, Image, createCanvas } from 'canvas'
import { Schematic, SchematicRenderingOptions } from '../schematic'
import { blockAsset, translatePos } from '../../util'
import { BlockRotation } from './rotation'
import { Blocks } from '../../mindustry'
import { Point2 } from '../../arc'
import { SchematicTileMap } from './util'

const {
  distribution: { ItemBridge, PhaseConveyor },
  liquid: { BridgeConduit, PhaseConduit },
} = Blocks
export async function drawBridges(
  schematic: Schematic,
  canvas: Canvas,
  mappedTiles: SchematicTileMap,
  options: SchematicRenderingOptions
): Promise<void> {
  for (const tile of schematic.tiles) {
    const { block } = tile
    if (!(block instanceof ItemBridge || block instanceof BridgeConduit))
      continue
    const category = block instanceof ItemBridge ? 'distribution' : 'liquid'
    const config = tile.config as Point2 | null
    if (!config) continue
    const targetPos = config.cpy().add(tile.x, tile.y)
    const target = mappedTiles[targetPos.x]?.[targetPos.y]
    const degrees = [0, -90, 180, 90]
    const distance = Math.abs(config.x === 0 ? config.y : config.x)
    if (target?.block.name !== block.name) continue
    const bridge = await blockAsset(category, block.name + '-bridge')
    const arrow = await blockAsset(category, block.name + '-arrow')
    const context = canvas.getContext('2d')
    const tcanvas = createCanvas((distance + 1) * 32, 32)
    const tcontext = tcanvas.getContext('2d')
    let rotation: BlockRotation
    if (config.x) {
      rotation = config.x > 0 ? BlockRotation.right : BlockRotation.left
    } else {
      rotation = config.y > 0 ? BlockRotation.top : BlockRotation.bottom
    }

    const end = await blockAsset(category, block.name + '-end')
    drawRotated(tcanvas, end, 0, 0, -90)
    drawRotated(tcanvas, end, distance * 32, 0, 90)
    for (let i = 0; i < distance - 1; i++) {
      tcontext.drawImage(bridge, (i + 1) * 32, 0)
    }
    const { x, y } = translatePos(tile, canvas)
    const offset = {
      x: -16,
      y: -16,
    }
    tcontext.drawImage(arrow, (tcanvas.width - arrow.width) / 2, 0)
    context.save()
    const opacity =
      block instanceof PhaseConduit || block instanceof PhaseConveyor
        ? options.phaseBridges?.opacity
        : options.bridges?.opacity
    context.globalAlpha = opacity ?? 1
    drawRotated(canvas, tcanvas, x, y, degrees[rotation], offset.x, offset.y)
    context.restore()
  }
}
function drawRotated(
  canvas: Canvas,
  image: Image | Canvas,
  x: number,
  y: number,
  degrees: number,
  offsetX = -16,
  offsetY = -16
) {
  const context = canvas.getContext('2d')
  context.save()
  context.translate(x + 16, y + 16)
  context.rotate((degrees * Math.PI) / 180)
  context.translate(offsetX, offsetY)
  context.drawImage(image, 0, 0)
  context.restore()
}
