import { RenderingInfo, blockAsset, drawRotatedTile } from '../../util'
import { Block } from './block'
import { SchematicTile } from '../../schematic'
const category = 'power'
abstract class PowerBlock extends Block {
  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class PowerNode extends PowerBlock {
  name = 'power-node'

  requirements = {
    copper: 1,
    lead: 3,
  }

  size = 1
}
export class PowerNodeLarge extends PowerBlock {
  name = 'power-node-large'

  requirements = {
    titanium: 5,
    lead: 10,
    silicon: 3,
  }

  size = 2
}
export class SurgeTower extends PowerBlock {
  name = 'surge-tower'

  requirements = {
    titanium: 7,
    lead: 10,
    silicon: 15,
    'surge-alloy': 15,
  }

  size = 2
}
export class Diode extends PowerBlock {
  name = 'diode'

  requirements = {
    silicon: 10,
    plastanium: 5,
    metaglass: 10,
  }

  size = 1

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await super.draw(tile, info)
    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: await blockAsset(category, this.name + '-arrow'),
    })
  }
}
export class Battery extends PowerBlock {
  name = 'battery'

  requirements = {
    copper: 5,
    lead: 20,
  }

  size = 1
}
export class BatteryLarge extends PowerBlock {
  name = 'battery-large'

  requirements = {
    titanium: 20,
    lead: 40,
    silicon: 20,
  }

  size = 3
}

export abstract class PowerGenerator extends PowerBlock {
  abstract powerGeneration: number
}
export class CombustionGenerator extends PowerGenerator {
  name = 'combustion-generator'

  requirements = {
    copper: 25,
    lead: 15,
  }

  size = 1

  powerGeneration = 1
}
export class ThermalGenerator extends PowerGenerator {
  name = 'thermal-generator'

  requirements = {
    copper: 40,
    graphite: 35,
    lead: 50,
    silicon: 35,
    metaglass: 40,
  }

  size = 2

  powerGeneration = 1.8
}
export class SteamGenerator extends PowerGenerator {
  name = 'steam-generator'

  requirements = {
    copper: 35,
    graphite: 25,
    lead: 40,
    silicon: 30,
  }

  size = 2

  powerGeneration = 5.5

  override async draw(
    tile: SchematicTile,
    { canvas }: RenderingInfo
  ): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [
        this.name,
        this.name + '-turbine0',
        this.name + '-turbine1',
        this.name + '-cap',
      ],
    })
  }
}
export class DifferentialGenerator extends PowerGenerator {
  name = 'differential-generator'

  requirements = {
    copper: 70,
    titanium: 50,
    lead: 100,
    silicon: 65,
    metaglass: 50,
  }

  size = 3

  powerGeneration = 18
}
export class RtgGenerator extends PowerGenerator {
  name = 'rtg-generator'

  requirements = {
    lead: 100,
    silicon: 75,
    'phase-fabric': 25,
    plastanium: 75,
    thorium: 50,
  }

  size = 2

  powerGeneration = 4.5
}
export class SolarPanel extends PowerGenerator {
  name = 'solar-panel'

  requirements = {
    lead: 10,
    silicon: 15,
  }

  size = 1

  powerGeneration = 0.1
}
export class SolarPanelLarge extends PowerGenerator {
  name = 'solar-panel-large'

  requirements = {
    lead: 80,
    silicon: 110,
    'phase-fabric': 15,
  }

  size = 3

  powerGeneration = 1.3
}
export class ThoriumReactor extends PowerGenerator {
  name = 'thorium-reactor'

  requirements = {
    lead: 300,
    silicon: 200,
    graphite: 150,
    thorium: 150,
    metaglass: 50,
  }

  size = 3

  powerGeneration = 15
}
export class ImpactReactor extends PowerGenerator {
  name = 'impact-reactor'

  requirements = {
    lead: 500,
    silicon: 300,
    graphite: 400,
    thorium: 100,
    'surge-alloy': 250,
    metaglass: 250,
  }

  size = 4

  powerGeneration = 130

  override powerConsumption = 25

  override async draw(
    tile: SchematicTile,
    { canvas }: RenderingInfo
  ): Promise<void> {
    await this.render({
      canvas,
      category,
      tile,
      layers: [this.name + '-bottom', this.name],
    })
  }
}
