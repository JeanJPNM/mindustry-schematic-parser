import {
  BridgeConduit,
  ItemBridge,
  PhaseConduit,
  PhaseConveyor,
} from '../../mindustry'
import { Canvas, createCanvas } from 'canvas'
import { Schematic, SchematicRenderingOptions } from '../schematic'
import { blockAsset, translatePos } from '../../mindustry/block/block'
import { BlockRotation } from './rotation'
import { Point2 } from '../../arc'
import { SchematicTileMap } from './util'

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
    const config = tile.config as Point2
    const targetPos = config.cpy().add(tile.x, tile.y)
    const target = mappedTiles[targetPos.x]?.[targetPos.y]
    const degrees = [0, -90, 180, 90]
    const distance = Math.abs(config.x === 0 ? config.y : config.x)
    if (target?.block.name !== block.name || distance < 1) continue
    const bridge = await blockAsset(category, block.name + '-bridge')
    const arrow = await blockAsset(category, block.name + '-arrow')
    const context = canvas.getContext('2d')
    const tcanvas = createCanvas((distance - 1) * 32, 32)
    const tcontext = tcanvas.getContext('2d')
    let rotation: BlockRotation
    if (config.x) {
      rotation = config.x > 0 ? BlockRotation.right : BlockRotation.left
    } else {
      rotation = config.y > 0 ? BlockRotation.top : BlockRotation.bottom
    }
    for (let i = 0; i < distance; i++) {
      tcontext.drawImage(bridge, i * 32, 0)
    }
    const { x, y } = translatePos(tile, canvas)
    const offset = {
      x: 16,
      y: -16,
    }
    tcontext.drawImage(arrow, (tcanvas.width - arrow.width) / 2, 0)
    context.save()
    const opacity =
      block instanceof PhaseConduit || block instanceof PhaseConveyor
        ? options.phaseBridges?.opacity
        : options.bridges?.opacity
    context.globalAlpha = opacity ?? 1
    context.translate(x + 16, y + 16)
    context.rotate((degrees[rotation] * Math.PI) / 180)
    context.translate(offset.x, offset.y)
    context.drawImage(tcanvas, 0, 0)
    context.restore()
  }
}
