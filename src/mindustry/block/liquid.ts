import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, drawBridge } from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'liquid'
abstract class Pump extends Block {
  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
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
export class ThermalPump extends Pump {
  name = 'thermal-pump'

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

  // this block cannot be rendered individually
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async draw(): Promise<void> {}
}
export class PulseConduit extends Conduit {
  override name = 'pulse-conduit'

  override requirements = { titanium: 2, metaglass: 1 }
}
export class PlatedConduit extends Conduit {
  override name = 'plated-conduit'

  override requirements = { thorium: 2, metaglass: 1, plastanium: 1 }
}
export class LiquidRouter extends Block {
  name = 'liquid-router'

  requirements: ItemCost = { graphite: 4, metaglass: 2 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name + '-bottom', this.name + '-top'],
    })
  }
}
export class LiquidTank extends LiquidRouter {
  override name = 'liquid-tank'

  override requirements = { titanium: 25, metaglass: 25 }

  override size = 3
}
export class LiquidJunction extends Block {
  name = 'liquid-junction'

  requirements = { graphite: 2, metaglass: 2 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
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
      canvas: info.canvas,
      category,
      layers: [this.name],
    })

    const type = this instanceof PhaseConduit ? 'phaseBridges' : 'bridges'
    if (info.options[type]?.render) {
      await drawBridge({
        tile,
        info,
        category,
        opacity: info.options[type]?.opacity,
      })
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
