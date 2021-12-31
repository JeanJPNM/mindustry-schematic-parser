import { BlockOutput, BlockOutputDirection } from './helper'
import { Block } from './block'
import { ItemCost } from '../item/item_cost'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

const category = 'crafting'
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
  name = 'alloy-smelter'

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
      layers: [this.name, this.name + '-top'],
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
      layers: [this.name, this.name + '-spinner'],
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
