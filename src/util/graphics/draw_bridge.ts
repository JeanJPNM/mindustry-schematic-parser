import { degreeToAngle, drawRotated, tileRotationToAngle } from './draw_rotated'
import Canvas from 'canvas'
import { Point2 } from '../../arc'
import { RenderingInfo } from '../rendering_info'
import { SchematicTile } from '../..'
import { TileRotation } from '../../schematic/tile'
import { translatePos } from './positioning'

export interface BridgeDrawOptions {
  tile: SchematicTile
  info: RenderingInfo
  category: string
  opacity?: number
}
export async function drawBridge({
  tile,
  info: { canvas, tileMap, blockAsset },
  category,
  opacity,
}: BridgeDrawOptions): Promise<void> {
  const config = tile.config as Point2 | null
  if (!config) return
  const { block } = tile
  const targetPos = config.cpy().add(tile.x, tile.y)
  const target = tileMap[targetPos.x]?.[targetPos.y]

  if (target?.block.name !== block.name) return
  const distance = Math.abs(config.x === 0 ? config.y : config.x)
  const bridge = await blockAsset(category, block.name + '-bridge')
  const arrow = await blockAsset(category, block.name + '-arrow')
  const context = canvas.getContext('2d')
  const tcanvas = Canvas.createCanvas((distance + 1) * 32, 32)
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
  // const opacity =
  //   block instanceof PhaseConduit || block instanceof PhaseConveyor
  //     ? options.phaseBridges?.opacity
  //     : options.bridges?.opacity
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
