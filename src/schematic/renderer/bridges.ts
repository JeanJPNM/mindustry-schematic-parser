import { Canvas, createCanvas } from 'canvas'
import { Schematic, SchematicRenderingOptions } from '../schematic'
import {
  blockAsset,
  degreeToAngle,
  drawRotated,
  tileRotationToAngle,
  translatePos,
} from '../../util'
import { Blocks } from '../../mindustry'
import { Point2 } from '../../arc'
import { SchematicTileMap } from './util'
import { TileRotation } from '../tile'

const {
  distribution: { ItemBridge, PhaseConveyor, DuctBridge },
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
    if (
      !(
        block instanceof ItemBridge ||
        block instanceof BridgeConduit ||
        block instanceof DuctBridge
      )
    )
      continue
    const category =
      block instanceof ItemBridge
        ? 'distribution'
        : block instanceof DuctBridge
        ? 'distribution/ducts'
        : 'liquid'
    const config = tile.config as Point2 | null
    if (!config) continue
    const targetPos = config.cpy().add(tile.x, tile.y)
    const target = mappedTiles[targetPos.x]?.[targetPos.y]
    const distance = Math.abs(config.x === 0 ? config.y : config.x)
    if (target?.block.name !== block.name) continue
    const bridge = await blockAsset(category, block.name + '-bridge')
    const arrow = await blockAsset(category, block.name + '-arrow')
    const context = canvas.getContext('2d')
    const tcanvas = createCanvas((distance + 1) * 32, 32)
    const tcontext = tcanvas.getContext('2d')
    let rotation: TileRotation
    if (config.x) {
      rotation = config.x > 0 ? TileRotation.right : TileRotation.left
    } else {
      rotation = config.y > 0 ? TileRotation.top : TileRotation.bottom
    }

    const end = await blockAsset(category, block.name + '-end')
    drawRotated({
      canvas: tcanvas,
      image: end,
      x: 0,
      y: 0,
      offset: 16,
      angle: degreeToAngle(-90),
    })
    drawRotated({
      canvas: tcanvas,
      image: end,
      x: distance * 32,
      y: 0,
      offset: 16,
      angle: degreeToAngle(90),
    })
    for (let i = 0; i < distance - 1; i++) {
      tcontext.drawImage(bridge, (i + 1) * 32, 0)
    }
    const { x, y } = translatePos(tile, canvas)
    tcontext.drawImage(arrow, (tcanvas.width - arrow.width) / 2, 0)
    const opacity =
      block instanceof PhaseConduit || block instanceof PhaseConveyor
        ? options.phaseBridges?.opacity
        : options.bridges?.opacity
    context.save()
    context.globalAlpha = opacity ?? 1
    drawRotated({
      canvas,
      image: tcanvas,
      x,
      y,
      angle: tileRotationToAngle(rotation),
      offset: 16,
    })
    context.restore()
  }
}
