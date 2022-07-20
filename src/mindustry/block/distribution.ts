import { BlockOutput, BlockOutputDirection } from './helper'
import {
  ConnectionSupport,
  RenderingInfo,
  drawBridge,
  drawChained,
  drawConfigBridge,
  drawRotated,
  drawRotatedTile,
  getConnections,
  outlineImage,
  tileRotationToAngle,
  tintImage,
  translatePos,
} from '../../util'
import { Item, ItemCost } from '../item'
import { Block } from './block'
import { SchematicTile } from '../../schematic'
import { TileRotation } from '../../schematic/tile'
const category = 'distribution'

abstract class TransportBlock extends Block {
  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
  }
}
export class Conveyor extends TransportBlock {
  name = 'conveyor'

  requirements: ItemCost = { copper: 1 }

  size = 1

  override outputDirection = BlockOutputDirection.front

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, ConnectionSupport.regular)
    await drawChained({
      tile,
      info,
      category: `${category}/conveyors`,
      connections,
      name: index => `${this.name}-${index}-0`,
    })
  }
}
export class TitaniumConveyor extends Conveyor {
  override name = 'titanium-conveyor'

  override requirements = { copper: 1, lead: 1, titanium: 1 }
}
export class PlastaniumConveyor extends TransportBlock {
  name = 'plastanium-conveyor'

  requirements = { plastanium: 1, silicon: 1, graphite: 1 }

  size = 1

  // only the end of a lane actually outputs something
  override outputDirection = BlockOutputDirection.none

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    }
    // scoped variables to get connections for this block
    {
      const { x, y } = tile
      const { size } = tile.block
      const tiles = {
        top: info.tileMap[x]?.[y + size],
        bottom: info.tileMap[x]?.[y - size],
        left: info.tileMap[x - size]?.[y],
        right: info.tileMap[x + size]?.[y],
      }
      for (const k in tiles) {
        const key = k as keyof typeof tiles
        const t = tiles[key]
        if (!t) continue
        connections[key] ||=
          t.block instanceof PlastaniumConveyor &&
          (t.rotation === (TileRotation[key] + 2) % 4 ||
            key === TileRotation[tile.rotation])
      }
    }
    const { canvas } = info
    const { block } = tile
    const { x, y } = translatePos(tile, canvas)
    const base = await info.blockAsset(
      `${category}/stack-conveyors`,
      block.name + '-0'
    )
    const edge = await info.blockAsset(
      `${category}/stack-conveyors`,
      block.name + '-edge'
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
  }
}
export class ArmoredConveyor extends Conveyor {
  override name = 'armored-conveyor'

  override requirements = { plastanium: 1, thorium: 1, metaglass: 1 }

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, [
      ConnectionSupport.strict,
      Conveyor,
    ])
    await drawChained({
      tile,
      info,
      category: `${category}/conveyors`,
      connections,
      name: index => `${this.name}-${index}-0`,
    })
  }
}
export class Junction extends TransportBlock {
  name = 'junction'

  requirements = { copper: 2 }

  size = 1
}
export class ItemBridge extends TransportBlock {
  name = 'bridge-conveyor'

  requirements: ItemCost = { lead: 6, copper: 6 }

  size = 1

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await super.draw(tile, info)

    const type = this instanceof PhaseConveyor ? 'phaseBridges' : 'bridges'
    if (info.options[type]?.render) {
      info.renderingQueue.add(1, () =>
        drawConfigBridge({
          tile,
          info,
          category,
          opacity: info.options[type]?.opacity,
        })
      )
    }
  }
}
export class PhaseConveyor extends ItemBridge {
  override name = 'phase-conveyor'

  override requirements = {
    'phase-fabric': 5,
    silicon: 7,
    lead: 10,
    graphite: 10,
  }

  override powerConsumption = 0.3
}
export class Sorter extends TransportBlock {
  name = 'sorter'

  requirements = { lead: 2, copper: 2 }

  size = 1

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
    const config = tile.config as Item | null
    const imgName = config ? 'center' : 'cross'
    const image = await info.blockAsset(category, imgName)
    this.renderImage({
      info,
      tile,
      image: config ? tintImage(image, config.color, 1) : image,
    })
  }
}
export class InvertedSorter extends Sorter {
  override name = 'inverted-sorter'
}
export class Router extends TransportBlock {
  name = 'router'

  requirements = { copper: 3 }

  size = 1
}
export class Distributor extends TransportBlock {
  name = 'distributor'

  requirements = { lead: 4, copper: 4 }

  size = 2
}
export class OverflowGate extends TransportBlock {
  name = 'overflow-gate'

  requirements = { lead: 2, copper: 4 }

  size = 1
}
export class UnderflowGate extends TransportBlock {
  name = 'underflow-gate'

  requirements = { lead: 2, copper: 4 }

  size = 1
}
export class MassDriver extends TransportBlock {
  name = 'mass-driver'

  requirements = { titanium: 125, silicon: 75, lead: 125, thorium: 50 }

  size = 3

  override powerConsumption = 1.75

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name + '-base'],
    })

    const top = outlineImage({
      image: await info.blockAsset(category, this.name),
      fillStyle: '#353535',
      thickness: 3,
    })

    this.renderImage({
      info,
      image: top,
      tile,
    })
  }
}
export class Duct extends TransportBlock {
  name = 'duct'

  override outputDirection = BlockOutputDirection.front

  override requirements: ItemCost = {
    graphite: 5,
    metaglass: 2,
  }

  size = 1

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, ConnectionSupport.regular)
    await drawChained({
      tile,
      info,
      category: `${category}/ducts`,
      connections,
      name: index => `${this.name}-top-${index}`,
    })
  }
}

export class DuctRouter extends TransportBlock {
  name = 'duct-router'

  requirements = {
    graphite: 10,
    metaglass: 4,
  }

  size = 1

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [`ducts/${this.name}`],
    })
    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: await info.blockAsset(category, `ducts/${this.name}-top`),
    })
  }
}
export class DuctBridge extends TransportBlock {
  name = 'duct-bridge'

  requirements = {
    graphite: 20,
    metaglass: 8,
  }

  size = 1

  override outputDirection = BlockOutputDirection.front

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [`ducts/${this.name}`],
    })

    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: await info.blockAsset(category, `ducts/${this.name}-dir`),
    })

    if (info.options.bridges?.render) {
      const range = 4
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

        if (t.block.name !== this.name) continue

        info.renderingQueue.add(1, () =>
          drawBridge({
            tile,
            info,
            category: `${category}/ducts`,
            opacity: info.options.bridges?.opacity,
            distance,
            rotation: tile.rotation,
          })
        )

        break
      }
    }
  }
}
