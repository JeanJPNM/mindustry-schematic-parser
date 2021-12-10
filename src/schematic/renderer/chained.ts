import { BlockOutput, BlockOutputDirection } from '../../mindustry/block/helper'
import {
  Flags,
  SchematicTileMap,
  blockAsset,
  drawRotated,
  rotateOutputDirection,
  tileRotationToAngle,
  translatePos,
} from '../../util'
import { Schematic, SchematicRenderingOptions } from '../schematic'
import { SchematicTile, TileRotation } from '../tile'
import { Blocks } from '../../mindustry'
import { Canvas } from 'canvas'

const {
  distribution: { ArmoredConveyor, Conveyor, PlastaniumConveyor, Duct },
  liquid: { Conduit, PlatedConduit },
} = Blocks

type ConnectionMode =
  | 'conveyor'
  | 'armored-conveyor'
  | 'conduit'
  | 'plated-conduit'
  | 'plastanium-conveyor'
  | 'duct'
function getConnections(
  tile: SchematicTile,
  mappedTiles: SchematicTileMap,
  mode: ConnectionMode
) {
  const blockType = {
    conveyor: Conveyor,
    'armored-conveyor': Conveyor,
    conduit: Conduit,
    'plated-conduit': Conduit,
    'plastanium-conveyor': PlastaniumConveyor,
    duct: Duct,
  }[mode]
  const result = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  }

  const { x, y } = tile
  const { size } = tile.block
  const tiles = {
    top: mappedTiles[x]?.[y + size],
    bottom: mappedTiles[x]?.[y - size],
    left: mappedTiles[x - size]?.[y],
    right: mappedTiles[x + size]?.[y],
  }
  switch (mode) {
    case 'conveyor':
    case 'conduit': {
      const { rotation } = tile

      const key = TileRotation[rotation] as keyof typeof result
      result[key] ||= tile.block instanceof PlastaniumConveyor
      const content =
        mode === 'conveyor' ? BlockOutput.item : BlockOutput.liquid
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
      break
    }
    case 'plastanium-conveyor':
      for (const k in tiles) {
        const key = k as keyof typeof tiles
        const t = tiles[key]
        if (!t) continue
        result[key] ||=
          t.block instanceof blockType &&
          t.rotation === (TileRotation[key] + 2) % 4
      }
      break
    case 'armored-conveyor':
    case 'plated-conduit':
    case 'duct':
      for (const k in tiles) {
        const key = k as keyof typeof tiles
        const t = tiles[key]
        if (!t) continue
        result[key] ||=
          (Flags.has(t.block.output, BlockOutput.item) &&
            key === TileRotation[(tile.rotation + 2) % 4]) ||
          (t.block instanceof blockType &&
            t.rotation === (TileRotation[key] + 2) % 4)
      }
      break
  }
  if (mode === 'plastanium-conveyor') {
    const { rotation } = tile
    let { x, y } = tile
    switch (rotation) {
      case TileRotation.right:
        x++
        break
      case TileRotation.top:
        y++
        break
      case TileRotation.left:
        x--
        break
      case TileRotation.bottom:
        y--
        break
    }
    const mappedTile = mappedTiles[x]?.[y]
    const key = TileRotation[rotation] as keyof typeof result
    result[key] ||= mappedTile?.block instanceof PlastaniumConveyor
  }
  return result
}

export async function drawChained(
  schematic: Schematic,
  canvas: Canvas,
  mappedTiles: SchematicTileMap,
  options: SchematicRenderingOptions
): Promise<void> {
  const context = canvas.getContext('2d')

  const allowed = {
    conveyor: options.conveyors?.render,
    'titanium-conveyor': options.conveyors?.render,
    'plastanium-conveyor': options.conveyors?.render,
    'armored-conveyor': options.conveyors?.render,
    conduit: options.conduits?.render,
    'pulse-conduit': options.conduits?.render,
    'plated-conduit': options.conduits?.render,
    'payload-conveyor': options.conveyors?.render,
  }
  for (const tile of schematic.tiles) {
    const { block } = tile
    const { x, y } = translatePos(tile, canvas)
    if (!(block.name in allowed && allowed[block.name as keyof typeof allowed]))
      continue
    if (block instanceof PlastaniumConveyor) {
      const base = await blockAsset('distribution/conveyors', block.name + '-0')
      const edge = await blockAsset(
        'distribution/conveyors',
        block.name + '-edge'
      )
      const connections = getConnections(
        tile,
        mappedTiles,
        'plastanium-conveyor'
      )
      drawRotated({
        canvas,
        image: base,
        x,
        y,
        offset: 16,
        angle: tileRotationToAngle(tile.rotation),
      })
      for (const k in connections) {
        const key = k as keyof typeof connections
        if (connections[key]) continue
        drawRotated({
          canvas,
          image: edge,
          x,
          y,
          offset: 16,
          angle: tileRotationToAngle(TileRotation[key]),
        })
      }
    } else if (
      block instanceof Conveyor ||
      block instanceof Conduit ||
      block instanceof Duct
    ) {
      let mode: ConnectionMode
      if (block instanceof ArmoredConveyor) {
        mode = 'armored-conveyor'
      } else if (block instanceof Conveyor) {
        mode = 'conveyor'
      } else if (block instanceof PlatedConduit) {
        mode = 'plated-conduit'
      } else if (block instanceof Duct) {
        mode = 'duct'
      } else {
        mode = 'conduit'
      }
      const category =
        block instanceof Conveyor
          ? 'distribution/conveyors'
          : block instanceof Duct
          ? 'distribution/ducts'
          : 'liquid'
      const connections = getConnections(tile, mappedTiles, mode)
      const { rotation } = tile
      type ckey = keyof typeof connections
      const right = TileRotation[rotation % 4] as ckey
      const top = TileRotation[(rotation + 1) % 4] as ckey
      const left = TileRotation[(rotation + 2) % 4] as ckey
      const bottom = TileRotation[(rotation + 3) % 4] as ckey
      let scaleX = 1,
        scaleY = 1
      const c = connections
      let activeConnections = 0
      for (const k in connections) {
        const key = k as keyof typeof connections
        if (rotation === TileRotation[key]) continue
        if (connections[key]) activeConnections++
      }
      let imgIndex = 0
      switch (activeConnections) {
        case 1:
          if (c[top]) {
            imgIndex = 1
          } else if (c[bottom]) {
            if (
              rotation === TileRotation.bottom ||
              rotation === TileRotation.top
            )
              scaleX = -1
            else if (
              rotation === TileRotation.left ||
              rotation === TileRotation.right
            )
              scaleY = -1
            imgIndex = 1
          }
          break
        case 2:
          if (c[top] && c[bottom]) {
            imgIndex = 4
          } else if (c[left] && c[bottom]) {
            imgIndex = 2
          } else if (c[left] && c[top]) {
            imgIndex = 2
            if (
              rotation === TileRotation.bottom ||
              rotation === TileRotation.top
            )
              scaleX = -1
            else if (
              rotation === TileRotation.right ||
              rotation === TileRotation.left
            )
              scaleY = -1
          } else if (c[right] && c[bottom]) {
            imgIndex = 2
          } else if (c[right] && c[top]) {
            imgIndex = 2
          }
          break
        case 3:
          imgIndex = 3
          break
      }
      const prefix = block instanceof Conveyor ? '-' : '-top-'
      const suffix = block instanceof Conveyor ? '-0' : ''
      const image = await blockAsset(
        category,
        `${block.name}${prefix}${imgIndex}${suffix}`
      )
      context.save()
      context.translate(x + 16, y + 16)
      context.scale(scaleX, scaleY)
      context.rotate(tileRotationToAngle(tile.rotation))
      context.translate(-16, -16)
      context.drawImage(image, 0, 0)
      context.restore()
    }
  }
}
