import { Flags, blockAsset, translatePos } from '../../util'
import { Schematic, SchematicRenderingOptions } from '../schematic'
import { SchematicTile, TileRotation } from '../tile'
import { BlockOutput } from '../../mindustry/block/block'
import { Blocks } from '../../mindustry'
import { Canvas } from 'canvas'
import { SchematicTileMap } from './util'

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
      for (const k in tiles) {
        const key = k as keyof typeof tiles
        const t = tiles[key]
        if (!t) continue
        result[key] ||=
          (t.block instanceof blockType &&
            t.rotation === (TileRotation[key] + 2) % 4) ||
          (t && Flags.has(t.block.output, content) && t !== tile)
      }
      break
    }
    case 'armored-conveyor':
    case 'plated-conduit':
    case 'plastanium-conveyor':
      for (const k in tiles) {
        const key = k as keyof typeof tiles
        const tile = tiles[key]
        if (!tile) continue
        result[key] ||=
          tile.block instanceof blockType &&
          tile.rotation === (TileRotation[key] + 2) % 4
      }
      break
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
  const degrees = [0, -90, 180, 90]

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
      context.save()
      context.translate(x + 16, y + 16)
      context.rotate((degrees[tile.rotation % 4] * Math.PI) / 180)
      context.translate(-16, -16)
      context.drawImage(base, 0, 0)
      context.restore()
      for (const k in connections) {
        const key = k as keyof typeof connections
        if (connections[key]) continue
        context.save()
        context.translate(x + 16, y + 16)
        context.rotate((degrees[TileRotation[key] % 4] * Math.PI) / 180)
        context.translate(-16, -16)
        context.drawImage(edge, 0, 0)
        context.restore()
      }
    } else if (block instanceof Conveyor || block instanceof Conduit) {
      let mode: ConnectionMode
      if (block instanceof ArmoredConveyor) {
        mode = 'armored-conveyor'
      } else if (block instanceof Conveyor) {
        mode = 'conveyor'
      } else if (block instanceof PlatedConduit) {
        mode = 'plated-conduit'
      } else {
        mode = 'conduit'
      }
      const category =
        block instanceof Conveyor ? 'distribution/conveyors' : 'liquid'
      const connections = getConnections(tile, mappedTiles, mode)
      const rotation = tile.rotation as TileRotation
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
      context.rotate((degrees[tile.rotation % 4] * Math.PI) / 180)
      context.translate(-16, -16)
      context.drawImage(image, 0, 0)
      context.restore()
    }
  }
}
