import { BlockOutput, BlockOutputDirection } from './helper'
import {
  RenderingInfo,
  degreeToAngle,
  drawRotated,
  drawRotatedTile,
  translatePos,
} from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'
const category = 'power'
abstract class PowerBlock extends Block {
  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({ tile, info, category, layers: [this.name] })
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

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    super.draw(tile, info)
    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: info.blockSprite(category, this.name + '-arrow'),
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

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
    const turbine = info.blockSprite(category, this.name + '-turbine')
    this.renderImage({
      tile,
      image: turbine,
      info,
    })
    drawRotated({
      canvas: info.canvas,
      angle: degreeToAngle(45),
      image: turbine,
      offset: 32,
      ...translatePos(tile, info.canvas),
    })
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-cap'],
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

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      info,
      category,
      tile,
      layers: [this.name + '-bottom', this.name],
    })
  }
}

export class BeamNode extends PowerBlock {
  name = 'beam-node'

  requirements = {
    beryllium: 8,
  }

  size = 1
}

export class BeamTower extends PowerBlock {
  name = 'beam-tower'

  requirements = {
    beryllium: 30,
    oxide: 20,
    silicon: 10,
  }

  size = 3
}

export class BeamLink extends PowerBlock {
  name = 'beam-link'

  // TODO: to be defined in the game's source code
  requirements = {}

  size = 3
}

export class TurbineCondenser extends PowerGenerator {
  name = 'turbine-condenser'

  requirements = {
    beryllium: 60,
  }

  size = 3

  powerGeneration = 3 / 9

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-rotator'],
    })
  }
}

export class ChemicalCombustionChamber extends PowerGenerator {
  name = 'chemical-combustion-chamber'

  requirements = {
    graphite: 40,
    tungsten: 40,
    oxide: 40,
    silicon: 30,
  }

  size = 3

  powerGeneration = 10

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}

export class PyrolysisGenerator extends PowerGenerator {
  name = 'pyrolysis-generator'

  requirements = {
    graphite: 50,
    carbide: 50,
    oxide: 60,
    silicon: 50,
  }

  size = 3

  powerGeneration = 25

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}

export class FluxReactor extends PowerGenerator {
  name = 'flux-reactor'

  requirements: ItemCost = {
    graphite: 300,
    carbide: 200,
    oxide: 100,
    silicon: 600,
    'surge-alloy': 300,
  }

  powerGeneration = 120

  size = 5

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}

export class NeoplasiaReactor extends PowerGenerator {
  name = 'neoplasia-reactor'

  requirements: ItemCost = {
    tungsten: 1000,
    carbide: 300,
    oxide: 150,
    silicon: 500,
    'phase-fabric': 300,
    'surge-alloy': 200,
  }

  powerGeneration = 140

  size = 5

  override output = BlockOutput.liquid

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}
