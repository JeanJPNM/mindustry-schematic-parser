import { Block, BlockOutput } from './block'
import { Canvas } from 'canvas'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'
const category = 'liquid'
abstract class Pump extends Block {
  override output = BlockOutput.liquid

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class BridgeConduit extends Block {
  name = 'bridge-conduit'

  requirements: ItemCost = { graphite: 4, metaglass: 8 }

  size = 1

  override output = BlockOutput.liquid

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class PhaseConduit extends BridgeConduit {
  constructor() {
    super()
    this.name = 'phase-conduit'
    this.requirements = {
      'phase-fabric': 5,
      silicon: 7,
      metaglass: 20,
      titanium: 10,
    }
    this.powerConsumption = 0.3 * 60
  }
}
