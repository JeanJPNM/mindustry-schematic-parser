import { BlockOutput, BlockOutputDirection } from './helper'
import { Block } from './block'
import { ItemCost } from '../item/item_cost'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

const category = 'production'
abstract class GenericCrafter extends Block {
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
export class GraphitePress extends GenericCrafter {
  name = 'graphite-press'

  requirements = {
    copper: 75,
    lead: 30,
  }

  size = 2
}
export class MultiPress extends GenericCrafter {
  override name = 'multi-press'

  override requirements = {
    titanium: 100,
    silicon: 25,
    lead: 100,
    graphite: 50,
  }

  override size = 3

  override powerConsumption = 1.8
}
export class SiliconSmelter extends GenericCrafter {
  name = 'silicon-smelter'

  requirements = { copper: 30, lead: 25 }

  size = 2

  override powerConsumption = 0.5
}
export class SiliconCrucible extends GenericCrafter {
  name = 'silicon-crucible'

  requirements = {
    titanium: 120,
    metaglass: 80,
    plastanium: 35,
    silicon: 60,
  }

  size = 3

  override powerConsumption = 4.0
}
export class Kiln extends GenericCrafter {
  name = 'kiln'

  requirements = {
    copper: 60,
    graphite: 30,
    lead: 30,
  }

  size = 2

  override powerConsumption = 0.6
}
export class PlastaniumCompressor extends GenericCrafter {
  name = 'plastanium-compressor'

  requirements = { silicon: 80, lead: 115, graphite: 60, titanium: 80 }

  size = 2

  override powerConsumption = 3.0
}
export class PhaseWeaver extends GenericCrafter {
  name = 'phase-weaver'

  requirements = { silicon: 130, lead: 120, thorium: 75 }

  size = 2

  override powerConsumption = 5.0

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name + '-bottom', this.name, this.name + '-weave'],
    })
  }
}
export class SurgeSmelter extends GenericCrafter {
  name = 'surge-smelter'

  requirements = { silicon: 80, lead: 80, thorium: 70 }

  size = 3

  override powerConsumption = 4.0
}
export class CryofluidMixer extends GenericCrafter {
  name = 'cryofluid-mixer'

  requirements = { lead: 65, silicon: 40, titanium: 60 }

  size = 2

  override powerConsumption = 1.0

  override output = BlockOutput.liquid

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name + '-bottom', this.name],
    })
  }
}
export class PyratiteMixer extends GenericCrafter {
  name = 'pyratite-mixer'

  requirements = { copper: 50, lead: 25 }

  size = 2

  override powerConsumption = 0.2
}
export class BlastMixer extends GenericCrafter {
  name = 'blast-mixer'

  requirements = { lead: 30, titanium: 20 }

  size = 2

  override powerConsumption = 0.4
}
export class Melter extends GenericCrafter {
  name = 'melter'

  requirements = { copper: 30, lead: 35, graphite: 45 }

  size = 1

  override powerConsumption = 1.0

  override output = BlockOutput.liquid

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name + '-bottom', this.name],
    })
  }
}
export class Separator extends GenericCrafter {
  name = 'separator'

  requirements: ItemCost = { copper: 30, titanium: 25 }

  size = 2

  override powerConsumption = 1.1

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name + '-bottom', this.name, this.name + '-spinner'],
    })
  }
}
export class Disassembler extends Separator {
  override name = 'disassembler'

  override requirements = {
    plastanium: 40,
    titanium: 100,
    silicon: 150,
    thorium: 80,
  }

  override size = 3

  override powerConsumption = 4
}
export class SporePress extends GenericCrafter {
  name = 'spore-press'

  requirements = { lead: 35, silicon: 30 }

  size = 2

  override powerConsumption = 0.7

  override output = BlockOutput.liquid

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name, this.name + '-top'],
    })
  }
}
export class Pulverizer extends GenericCrafter {
  name = 'pulverizer'

  requirements = { copper: 30, lead: 25 }

  size = 1

  override powerConsumption = 0.5

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      tile,
      layers: [this.name, this.name + '-rotator'],
    })
  }
}
export class CoalCentrifuge extends GenericCrafter {
  name = 'coal-centrifuge'

  requirements = { titanium: 20, graphite: 40, lead: 30 }

  size = 2

  override powerConsumption = 0.7
}
export class Incinerator extends GenericCrafter {
  name = 'incinerator'

  requirements = { graphite: 5, lead: 15 }

  size = 1

  override powerConsumption = 0.5

  override output = BlockOutput.none

  override outputDirection = BlockOutputDirection.none
}

export class SiliconArcFurnace extends GenericCrafter {
  name = 'silicon-arc-furnace'

  requirements = { beryllium: 70, graphite: 80 }

  size = 3

  override powerConsumption = 6
}

export class Electrolyzer extends GenericCrafter {
  name = 'electrolyzer'

  requirements = {
    silicon: 50,
    graphite: 40,
    beryllium: 130,
    tungsten: 80,
  }

  size = 3

  override powerConsumption = 1

  // TODO: this block has specific output directions for each liquid
  // doesn't affect rendering too much, but is something that should
  // be fixed in the future
  override output = BlockOutput.item | BlockOutput.liquid
}

export class AtmosphericConcentrator extends GenericCrafter {
  name = 'atmospheric-concentrator'

  requirements = {
    oxide: 60,
    beryllium: 180,
    silicon: 150,
  }

  size = 3

  override powerConsumption = 2

  override output = BlockOutput.liquid
}

export class OxidationChamber extends GenericCrafter {
  name = 'oxidation-chamber'

  requirements: ItemCost = {
    tungsten: 120,
    graphite: 100,
    silicon: 100,
    beryllium: 120,
  }

  size = 3

  override powerConsumption = 0.5
}

export class ElectricHeater extends GenericCrafter {
  name = 'electric-heater'

  requirements = {
    tungsten: 30,
    oxide: 30,
  }

  size = 2

  override powerConsumption = 50 / 60

  override output = BlockOutput.none

  override outputDirection = BlockOutputDirection.none
}

export class SlagHeater extends GenericCrafter {
  name = 'slag-heater'

  requirements = {
    tungsten: 50,
    oxide: 20,
    beryllium: 20,
  }

  size = 3

  override output = BlockOutput.none

  override outputDirection = BlockOutputDirection.none
}

export class PhaseHeater extends GenericCrafter {
  name = 'phase-heater'

  requirements = {
    oxide: 30,
    carbide: 30,
    beryllium: 30,
  }

  size = 2

  override output = BlockOutput.none

  override outputDirection = BlockOutputDirection.none
}

export class HeatRedirector extends GenericCrafter {
  name = 'heat-redirector'

  requirements = {
    tungsten: 10,
    graphite: 10,
  }

  size = 3

  override output = BlockOutput.none

  override outputDirection = BlockOutputDirection.none
}

export class HeatRouter extends GenericCrafter {
  name = 'heat-router'

  requirements = {
    tungsten: 15,
    graphite: 10,
  }

  size = 3

  override output = BlockOutput.none

  override outputDirection = BlockOutputDirection.none
}

export class SlagIncinerator extends GenericCrafter {
  name = 'slag-incinerator'

  requirements = {
    tungsten: 15,
  }

  size = 1
}

export class CarbideCrucible extends GenericCrafter {
  name = 'carbide-crucible'

  requirements = {
    tungsten: 110,
    thorium: 150,
    oxide: 60,
  }

  size = 3

  override powerConsumption = 2
}

export class SlagCentrifuge extends GenericCrafter {
  name = 'slag-centrifuge'

  requirements = {
    carbide: 70,
    graphite: 60,
    silicon: 40,
    oxide: 40,
  }

  size = 3

  override powerConsumption = 2 / 60

  override output = BlockOutput.liquid
}

export class SurgeCrucible extends GenericCrafter {
  name = 'surge-crucible'

  requirements = {
    silicon: 100,
    graphite: 80,
    tungsten: 80,
    oxide: 80,
  }

  size = 3

  override powerConsumption = 2
}

export class CyanogenSynthesizer extends GenericCrafter {
  name = 'cyanogen-synthesizer'

  requirements = {
    carbide: 50,
    silicon: 80,
    beryllium: 90,
  }

  size = 3

  override powerConsumption = 2

  override output = BlockOutput.liquid
}

export class PhaseSynthesizer extends GenericCrafter {
  name = 'phase-synthesizer'

  requirements = {
    carbide: 90,
    silicon: 100,
    thorium: 100,
    tungsten: 200,
  }

  size = 3

  override powerConsumption = 8
}

export class HeatReactor extends GenericCrafter {
  name = 'heat-reactor'

  requirements = {
    oxide: 70,
    graphite: 20,
    carbide: 10,
    thorium: 80,
  }

  size = 3
}
