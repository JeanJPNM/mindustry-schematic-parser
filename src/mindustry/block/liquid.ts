import { Block } from './block'
import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'
const category = 'liquid'
class Pump extends Block {
  output = {
    item: false,
    liquid: true,
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}

export class MechanicalPump extends Pump {
  constructor() {
    super({
      name: 'mechanical-pump',
      requirements: { copper: 15, metaglass: 10 },
      size: 1,
    })
  }
}
export class RotaryPump extends Pump {
  constructor() {
    super({
      name: 'rotary-pump',
      requirements: { copper: 70, metaglass: 50, silicon: 20, titanium: 35 },
      size: 2,
      powerConsumption: 0.3,
    })
  }
}
export class ThermalPump extends Pump {
  constructor() {
    super({
      name: 'thermal-pump',
      requirements: {
        copper: 80,
        metaglass: 90,
        silicon: 30,
        titanium: 40,
        thorium: 35,
      },
      size: 3,
      powerConsumption: 1.3,
    })
  }
}
export class Conduit extends Block {
  constructor() {
    super({
      name: 'conduit',
      requirements: { metaglass: 1 },
      size: 1,
    })
  }

  // this block cannot be rendered individually
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async draw(): Promise<void> {}
}
export class PulseConduit extends Conduit {
  constructor() {
    super()
    this.name = `pulse-${this.name}`
    this.requirements = { titanium: 2, metaglass: 1 }
  }
}
export class PlatedConduit extends Conduit {
  constructor() {
    super()
    this.name = `plated-${this.name}`
    this.requirements = { thorium: 2, metaglass: 1, plastanium: 1 }
  }
}
export class LiquidRouter extends Block {
  constructor() {
    super({
      name: 'liquid-router',
      requirements: { graphite: 4, metaglass: 2 },
      size: 1,
    })
  }

  output = {
    item: false,
    liquid: true,
  }

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
  constructor() {
    super()
    this.name = 'liquid-tank'
    this.requirements = { titanium: 25, metaglass: 25 }
    this.size = 3
  }
}
export class LiquidJunction extends Block {
  constructor() {
    super({
      name: 'liquid-junction',
      requirements: { graphite: 2, metaglass: 2 },
      size: 1,
    })
  }

  output = {
    item: false,
    liquid: true,
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class BridgeConduit extends Block {
  constructor() {
    super({
      name: 'bridge-conduit',
      requirements: { graphite: 4, metaglass: 8 },
      size: 1,
    })
  }

  output = {
    item: false,
    liquid: true,
  }

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
