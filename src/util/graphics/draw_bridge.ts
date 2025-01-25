import * as Canvas from 'canvas'
import { degreeToAngle, drawRotated, tileRotationToAngle } from './draw_rotated'
import { Point2 } from '../../arc'
import { RenderingInfo } from '../rendering_info'
import { SchematicTile } from '../..'
import { TileRotation } from '../../schematic/tile'
import { drawImage } from '../sprite'
import { translatePos } from './positioning'

export interface ConfigBridgeDrawOptions {
  tile: SchematicTile
  info: RenderingInfo
  category: string
  opacity?: number
  enableEnd?: boolean
}

export function drawConfigBridge({
  tile,
  info,
  category,
  opacity,
  enableEnd,
}: ConfigBridgeDrawOptions): void {
  const config = tile.config as Point2 | null
  if (!config) return
  const { block } = tile
  const targetPos = config.cpy().add(tile.x, tile.y)
  const target = info.tileMap[targetPos.x]?.[targetPos.y]

  if (target?.block.name !== block.name) return
  const distance = Math.abs(config.x === 0 ? config.y : config.x)
  let rotation: TileRotation
  if (config.x) {
    rotation = config.x > 0 ? TileRotation.right : TileRotation.left
  } else {
    rotation = config.y > 0 ? TileRotation.top : TileRotation.bottom
  }
  drawBridge({
    tile,
    info,
    category,
    opacity,
    rotation,
    distance,
    enableEnd,
  })
}

export interface BridgeDrawOptions {
  tile: SchematicTile
  info: RenderingInfo
  distance: number
  category: string
  rotation: TileRotation
  opacity?: number
  enableEnd?: boolean
}

export function drawBridge({
  tile,
  info: { canvas, blockSprite },
  category,
  opacity,
  distance,
  rotation,
  enableEnd = true,
}: BridgeDrawOptions) {
  const { block } = tile
  const bridge = blockSprite(category, block.name + '-bridge')
  const arrow = blockSprite(category, block.name + '-arrow')
  const context = canvas.getContext('2d')
  const tcanvas = Canvas.createCanvas((distance + 1) * 32, 32)
  const tcontext = tcanvas.getContext('2d')

  if (enableEnd) {
    const end = blockSprite(category, block.name + '-end')
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
  }
  for (let i = 1; i < distance; i++) {
    drawImage(tcontext, bridge, i * 32, 0)
  }
  const { x, y } = translatePos(tile, canvas)
  drawImage(tcontext, arrow, (tcanvas.width - arrow.width) / 2, 0)
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

// TODO: find a better name
/**
 * Finds the next bridge that this tile is facing,
 * the tile block must also be a bridge.
 */
export function findNextBridge(
  tile: SchematicTile,
  info: RenderingInfo,
  range: number
): { tile: SchematicTile; distance: number } | null {
  const { tileMap } = info

  let { x, y } = tile

  const advance = {
    [TileRotation.bottom]: () => y--,
    [TileRotation.left]: () => x--,
    [TileRotation.right]: () => x++,
    [TileRotation.top]: () => y++,
  }[tile.rotation]

  advance() // we start at the tile this block faces

  // finds the nearest duct bridge in front of this one to connect
  for (let distance = 1; distance <= range; advance(), distance++) {
    const t = tileMap[x]?.[y]
    if (!t) continue

    if (t.block.name === tile.block.name) return { tile: t, distance }
  }

  return null
}
