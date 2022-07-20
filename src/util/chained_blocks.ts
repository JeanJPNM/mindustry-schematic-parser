import { SchematicTile, TileRotation } from '../schematic/tile'
import {
  rotateOutputDirection,
  tileRotationToAngle,
  translatePos,
} from './graphics'
import { Block } from '../mindustry/block'
import { BlockOutputDirection } from '../mindustry/block/helper'
import { Flags } from './flags'
import { RenderingInfo } from './rendering_info'

export enum ConnectionSupport {
  regular,
  strict,
}
export interface ConnectionData {
  top: boolean
  left: boolean
  right: boolean
  bottom: boolean
}
export interface ChainedDrawOptions {
  tile: SchematicTile
  info: RenderingInfo
  connections: ConnectionData
  category: string
  name(this: void, imageIndex: number): string
}

export function getConnections(
  tile: SchematicTile,
  info: RenderingInfo,
  support:
    | ConnectionSupport.regular
    | [ConnectionSupport.strict, new () => Block]
): ConnectionData {
  const result: ConnectionData = {
    bottom: false,
    left: false,
    right: false,
    top: false,
  }
  const { x, y } = tile
  const { size } = tile.block
  const tiles = {
    top: info.tileMap[x]?.[y + size],
    bottom: info.tileMap[x]?.[y - size],
    left: info.tileMap[x - size]?.[y],
    right: info.tileMap[x + size]?.[y],
  }
  if (support === ConnectionSupport.regular) {
    const content = tile.block.output
    const directions = {
      top: BlockOutputDirection.right,
      bottom: BlockOutputDirection.left,
      left: BlockOutputDirection.front,
      right: BlockOutputDirection.back,
    }
    for (const k in tiles) {
      const key = k as keyof typeof tiles
      const t = tiles[key]
      if (!t) continue
      const direction = rotateOutputDirection(t)
      result[key] ||=
        Flags.has(t.block.output, content) &&
        t !== tile &&
        Flags.has(direction, directions[key])
    }
  } else {
    const [, type] = support
    for (const k in tiles) {
      const key = k as keyof typeof tiles
      const t = tiles[key]
      if (!t) continue
      result[key] ||=
        (Flags.has(t.block.output, tile.block.output) &&
          key === TileRotation[(tile.rotation + 2) % 4]) ||
        (t.block instanceof type && t.rotation === (TileRotation[key] + 2) % 4)
    }
  }
  return result
}

export function getChainedSpriteVariation(
  tile: SchematicTile,
  connections: ConnectionData
): {
  imageIndex: number
  scaleX: number
  scaleY: number
} {
  const { rotation } = tile
  const right = TileRotation[rotation % 4] as keyof ConnectionData
  const top = TileRotation[(rotation + 1) % 4] as keyof ConnectionData
  const left = TileRotation[(rotation + 2) % 4] as keyof ConnectionData
  const bottom = TileRotation[(rotation + 3) % 4] as keyof ConnectionData
  const c = connections
  let activeConnections = 0
  for (const k in connections) {
    const key = k as keyof typeof connections
    if (rotation === TileRotation[key]) continue
    if (connections[key]) activeConnections++
  }
  let imageIndex = 0,
    scaleX = 1,
    scaleY = 1
  switch (activeConnections) {
    case 1:
      if (c[top]) {
        imageIndex = 1
      } else if (c[bottom]) {
        if (rotation === TileRotation.bottom || rotation === TileRotation.top)
          scaleX = -1
        else if (
          rotation === TileRotation.left ||
          rotation === TileRotation.right
        )
          scaleY = -1
        imageIndex = 1
      }
      break
    case 2:
      if (c[top] && c[bottom]) {
        imageIndex = 4
      } else if (c[left] && c[bottom]) {
        imageIndex = 2
      } else if (c[left] && c[top]) {
        imageIndex = 2
        if (rotation === TileRotation.bottom || rotation === TileRotation.top)
          scaleX = -1
        else if (
          rotation === TileRotation.right ||
          rotation === TileRotation.left
        )
          scaleY = -1
      } else if (c[right] && c[bottom]) {
        imageIndex = 2
      } else if (c[right] && c[top]) {
        imageIndex = 2
      }
      break
    case 3:
      imageIndex = 3
      break
  }

  return { imageIndex, scaleX, scaleY }
}

/**
 * Draws regular chained blocks like conveyors and conduits.
 *
 * This function is only intended to work with blocks that have a size equal to 1
 */
export async function drawChained({
  tile,
  info,
  connections,
  category,
  name,
}: ChainedDrawOptions) {
  const { imageIndex, scaleX, scaleY } = getChainedSpriteVariation(
    tile,
    connections
  )
  const { x, y } = translatePos(tile, info.canvas)
  const context = info.canvas.getContext('2d')
  const image = await info.blockAsset(category, name(imageIndex))
  const offset = tile.block.size * 16

  context.save()
  context.translate(x + offset, y + offset)
  context.scale(scaleX, scaleY)
  context.rotate(tileRotationToAngle(tile.rotation))
  context.translate(-offset, -offset)
  context.drawImage(image, 0, 0)
  context.restore()
}
