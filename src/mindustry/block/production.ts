import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, drawRotatedTile } from '../../util'
import { Block } from './block'
import { SchematicTile } from '../../schematic'
const category = 'drills'
const prodCategory = 'production'
abstract class Drill extends Block {
  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
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

  override output = BlockOutput.liquid
}
export class Cultivator extends Block {
  name = 'cultivator'

  requirements = { copper: 25, lead: 25, silicon: 10 }

  size = 2

  override powerConsumption = 0.9

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category: prodCategory,
      layers: [this.name + '-bottom', this.name, this.name + '-top'],
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

export class VentCondenser extends Block {
  name = 'vent-condenser'

  requirements = {
    graphite: 20,
    beryllium: 60,
  }

  size = 3

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  override powerConsumption = 0.5

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category: prodCategory,
      layers: [this.name + '-bottom', this.name + '-rotator', this.name],
    })
  }
}

export class CliffCrusher extends Block {
  name = 'cliff-crusher'

  requirements = {
    graphite: 25,
    beryllium: 20,
  }

  size = 2

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override powerConsumption = 11 / 60

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
    const top = await info.blockAsset(category, this.name + '-top')
    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: top,
    })
  }
}

export class PlasmaBore extends Block {
  name = 'plasma-bore'

  requirements = {
    beryllium: 40,
  }

  size = 2

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override powerConsumption = 0.15

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
    const top = await info.blockAsset(category, this.name + '-top')
    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: top,
    })
  }
}
export class LargePlasmaBore extends Block {
  name = 'large-plasma-bore'

  requirements = {
    silicon: 100,
    oxide: 25,
    beryllium: 100,
    tungsten: 70,
  }

  size = 3

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override powerConsumption = 0.8

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
    const top = await info.blockAsset(category, this.name + '-top')
    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: top,
    })
  }
}

export class ImpactDrill extends Block {
  name = 'impact-drill'

  requirements = {
    silicon: 70,
    beryllium: 90,
    graphite: 60,
  }

  size = 4

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override powerConsumption = 160 / 60

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-top'],
    })
  }
}

export class EruptionDrill extends Block {
  name = 'eruption-drill'

  requirements = { silicon: 200, oxide: 20, tungsten: 200, thorium: 120 }

  size = 5

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override powerConsumption = 6

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-top'],
    })
  }
}
