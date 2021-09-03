import { Block, BlockOutput } from './block'
import { Canvas } from 'canvas'
import { Flags } from '../../util'
import { SchematicTile } from '../../schematic'
const category = 'production'
abstract class Drill extends Block {
  override output = new Flags(BlockOutput.item)

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
  name = 'mechanical-drill'

  requirements = { copper: 12 }

  size = 2
}
export class PneumaticDrill extends Drill {
  name = 'pneumatic-drill'

  requirements = { copper: 18, graphite: 10 }

  size = 2
}
export class LaserDrill extends Drill {
  name = 'laser-drill'

  requirements = { copper: 35, graphite: 30, silicon: 30, titanium: 20 }

  size = 3

  override powerConsumption = 1.1
}
export class BlastDrill extends Drill {
  name = 'blast-drill'

  requirements = { copper: 65, silicon: 60, titanium: 50, thorium: 75 }

  size = 4

  override powerConsumption = 3.0
}
export class WaterExtractor extends Drill {
  name = 'water-extractor'

  requirements = { metaglass: 30, graphite: 30, lead: 30 }

  size = 2

  override powerConsumption = 1.5

  override output = new Flags(BlockOutput.liquid)
}
export class Cultivator extends Block {
  name = 'cultivator'

  requirements = { copper: 25, lead: 25, silicon: 10 }

  size = 2

  override powerConsumption = 0.9

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
  name = 'oil-extractor'

  requirements = {
    copper: 150,
    graphite: 175,
    lead: 115,
    thorium: 115,
    silicon: 75,
  }

  size = 3

  override powerConsumption = 3.0
}
