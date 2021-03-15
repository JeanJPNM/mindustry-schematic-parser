import { Block } from './block'
import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'
const category = 'production'
class Drill extends Block {
  output = {
    item: true,
    liquid: false,
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name, this.name + '-rotator', this.name + '-top'],
    })
  }
}
export class MechanicalDrill extends Drill {
  constructor() {
    super({
      name: 'mechanical-drill',
      requirements: { copper: 12 },
      size: 2,
    })
  }
}
export class PneumaticDrill extends Drill {
  constructor() {
    super({
      name: 'pneumatic-drill',
      requirements: { copper: 18, graphite: 10 },
      size: 2,
    })
  }
}
export class LaserDrill extends Drill {
  constructor() {
    super({
      name: 'laser-drill',
      requirements: { copper: 35, graphite: 30, silicon: 30, titanium: 20 },
      size: 3,
      powerConsumption: 1.1,
    })
  }
}
export class BlastDrill extends Drill {
  constructor() {
    super({
      name: 'blast-drill',
      requirements: { copper: 65, silicon: 60, titanium: 50, thorium: 75 },
      size: 4,
      powerConsumption: 3.0,
    })
  }
}
export class WaterExtractor extends Drill {
  constructor() {
    super({
      name: 'water-extractor',
      requirements: { metaglass: 30, graphite: 30, lead: 30 },
      size: 2,
      powerConsumption: 1.5,
    })
  }

  output = {
    item: false,
    liquid: true,
  }
}
export class Cultivator extends Block {
  constructor() {
    super({
      name: 'cultivator',
      requirements: { copper: 25, lead: 25, silicon: 10 },
      size: 2,
      powerConsumption: 0.9,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name, this.name + '-top'],
    })
  }
}
export class OilExtractor extends Drill {
  constructor() {
    super({
      name: 'oil-extractor',
      requirements: {
        copper: 150,
        graphite: 175,
        lead: 115,
        thorium: 115,
        silicon: 75,
      },
      size: 3,
      powerConsumption: 3.0,
    })
  }
}
