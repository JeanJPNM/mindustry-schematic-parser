import { BlockOutput, BlockOutputDirection } from './helper'
import {
  ConnectionSupport,
  RenderingInfo,
  drawBridge,
  drawChained,
  drawConfigBridge,
  drawRotatedTile,
  findNextBridge,
  getConnections,
} from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'liquid'
const conduitCategory = `${category}/conduits`

abstract class Pump extends Block {
  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
  }
}

export class MechanicalPump extends Pump {
  name = 'mechanical-pump'

  requirements = { copper: 15, metaglass: 10 }

  size = 1
}
export class RotaryPump extends Pump {
  name = 'rotary-pump'

  requirements = { copper: 70, metaglass: 50, silicon: 20, titanium: 35 }

  size = 2

  override powerConsumption = 0.3
}
export class ImpulsePump extends Pump {
  name = 'impulse-pump'

  requirements = {
    copper: 80,
    metaglass: 90,
    silicon: 30,
    titanium: 40,
    thorium: 35,
  }

  size = 3

  override powerConsumption = 1.3
}
export class Conduit extends Block {
  name = 'conduit'

  requirements = { metaglass: 1 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.front

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, ConnectionSupport.regular)
    await drawChained({
      tile,
      info,
      category: conduitCategory,
      connections,
      name: index => `${this.name}-top-${index}`,
    })
  }
}
export class PulseConduit extends Conduit {
  override name = 'pulse-conduit'

  override requirements = { titanium: 2, metaglass: 1 }
}
export class PlatedConduit extends Conduit {
  override name = 'plated-conduit'

  override requirements = { thorium: 2, metaglass: 1, plastanium: 1 }

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, [
      ConnectionSupport.strict,
      Conduit,
    ])
    await drawChained({
      tile,
      info,
      connections,
      category: conduitCategory,
      name: index => `${this.name}-top-${index}`,
    })
  }
}
export class LiquidRouter extends Block {
  name = 'liquid-router'

  requirements: ItemCost = { graphite: 4, metaglass: 2 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}

export class LiquidContainer extends LiquidRouter {
  override name = 'liquid-container'

  override requirements = {
    titanium: 10,
    metaglass: 15,
  }

  override size = 2
}

export class LiquidTank extends LiquidRouter {
  override name = 'liquid-tank'

  override requirements = { titanium: 30, metaglass: 40 }

  override size = 3
}
export class LiquidJunction extends Block {
  name = 'liquid-junction'

  requirements = { graphite: 2, metaglass: 2 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
  }
}
export class BridgeConduit extends Block {
  name = 'bridge-conduit'

  requirements: ItemCost = { graphite: 4, metaglass: 8 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })

    const type = this instanceof PhaseConduit ? 'phaseBridges' : 'bridges'
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
export class PhaseConduit extends BridgeConduit {
  override name = 'phase-conduit'

  override powerConsumption = 0.3

  override requirements = {
    'phase-fabric': 5,
    silicon: 7,
    metaglass: 20,
    titanium: 10,
  }
}

export class ReinforcedPump extends Pump {
  name = 'reinforced-pump'

  requirements = {
    beryllium: 40,
    tungsten: 30,
    silicon: 20,
  }

  size = 2
}

export class ReinforcedConduit extends Block {
  name = 'reinforced-conduit'

  requirements = {
    beryllium: 2,
  }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.front

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, [
      ConnectionSupport.strict,
      ReinforcedConduit,
    ])

    await drawChained({
      tile,
      info,
      category: conduitCategory,
      connections,
      name: index => `${this.name}-top-${index}`,
    })
  }
}

export class ReinforcedLiquidJunction extends Block {
  name = 'reinforced-liquid-junction'

  requirements = {
    graphite: 4,
    beryllium: 8,
  }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
  }
}

export class ReinforcedBridgeConduit extends Block {
  name = 'reinforced-bridge-conduit'

  requirements = {
    graphite: 8,
    beryllium: 20,
  }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.front

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })

    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: await info.blockAsset(category, `${this.name}-dir`),
    })

    if (info.options.bridges?.render) {
      const result = findNextBridge(tile, info, 4)
      if (result) {
        info.renderingQueue.add(1, () =>
          drawBridge({
            tile,
            info,
            category,
            opacity: info.options.bridges?.opacity,
            distance: result.distance,
            rotation: tile.rotation,
            enableEnd: false,
          })
        )
      }
    }
  }
}

export class ReinforcedLiquidRouter extends Block {
  name = 'reinforced-liquid-router'

  requirements: ItemCost = {
    graphite: 8,
    beryllium: 4,
  }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}

export class ReinforcedLiquidContainer extends ReinforcedLiquidRouter {
  override name = 'reinforced-liquid-container'

  override requirements = {
    tungsten: 10,
    beryllium: 16,
  }

  override size = 2
}

export class ReinforcedLiquidTank extends ReinforcedLiquidRouter {
  override name = 'reinforced-liquid-tank'

  override requirements = {
    tungsten: 40,
    beryllium: 50,
  }

  override size = 3
}
