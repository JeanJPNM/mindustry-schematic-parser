import { Block } from './block'

export class GraphitePress extends Block {
  constructor() {
    super({
      name: 'graphite-press',
      requirements: { copper: 75, lead: 30 },
      size: 2,
    })
  }
}
export class MultiPress extends Block {
  constructor() {
    super({
      name: 'multi-press',
      requirements: { titanium: 100, silicon: 25, lead: 100, graphite: 50 },
      size: 3,
      powerConsumption: 1.8,
    })
  }
}
export class SiliconSmelter extends Block {
  constructor() {
    super({
      name: 'silicon-smelter',
      requirements: { copper: 30, lead: 25 },
      size: 2,
      powerConsumption: 0.5,
    })
  }
}
export class SiliconCrucible extends Block {
  constructor() {
    super({
      name: 'silicon-crucible',
      requirements: {
        titanium: 120,
        metaglass: 80,
        plastanium: 35,
        silicon: 60,
      },
      size: 3,
      powerConsumption: 4.0,
    })
  }
}
export class Kiln extends Block {
  constructor() {
    super({
      name: 'kiln',
      requirements: { copper: 60, graphite: 30, lead: 30 },
      size: 2,
      powerConsumption: 0.6,
    })
  }
}
export class PlastaniumCompressor extends Block {
  constructor() {
    super({
      name: 'plastanium-compressor',
      requirements: { silicon: 80, lead: 115, graphite: 60, titanium: 80 },
      size: 2,
      powerConsumption: 3.0,
    })
  }
}
export class PhaseWeaver extends Block {
  constructor() {
    super({
      name: 'phase-weaver',
      requirements: { silicon: 130, lead: 120, thorium: 75 },
      size: 2,
      powerConsumption: 5.0,
    })
  }
}
export class SurgeSmelter extends Block {
  constructor() {
    super({
      name: 'alloy-smelter',
      requirements: { silicon: 80, lead: 80, thorium: 70 },
      size: 3,
      powerConsumption: 4.0,
    })
  }
}
export class CryofluidMixer extends Block {
  constructor() {
    super({
      name: 'cryofluid-mixer',
      requirements: { lead: 65, silicon: 40, titanium: 60 },
      size: 2,
      powerConsumption: 1.0,
    })
  }
}
export class PyratiteMixer extends Block {
  constructor() {
    super({
      name: 'pyratite-mixer',
      requirements: { copper: 50, lead: 25 },
      size: 2,
      powerConsumption: 0.2,
    })
  }
}
export class BlastMixer extends Block {
  constructor() {
    super({
      name: 'blast-mixer',
      requirements: { lead: 30, titanium: 20 },
      size: 2,
      powerConsumption: 0.4,
    })
  }
}
export class Melter extends Block {
  constructor() {
    super({
      name: 'melter',
      requirements: { copper: 30, lead: 35, graphite: 45 },
      size: 1,
      powerConsumption: 1.0,
    })
  }
}
export class Separator extends Block {
  constructor() {
    super({
      name: 'separator',
      requirements: { copper: 30, titanium: 25 },
      size: 2,
      powerConsumption: 1.0,
    })
  }
}
export class Disassembler extends Separator {
  constructor() {
    super()
    this.name = 'disassembler'
    this.requirements = {
      graphite: 140,
      titanium: 100,
      silicon: 150,
      'surge-alloy': 70,
    }
    this.size = 3
    this.powerConsumption = 4
  }
}
export class SporePress extends Block {
  constructor() {
    super({
      name: 'spore-press',
      requirements: { lead: 35, silicon: 30 },
      size: 2,
      powerConsumption: 0.7,
    })
  }
}
export class Pulverizer extends Block {
  constructor() {
    super({
      name: 'pulverizer',
      requirements: { copper: 30, lead: 25 },
      size: 1,
      powerConsumption: 0.5,
    })
  }
}
export class CoalCentrifuge extends Block {
  constructor() {
    super({
      name: 'coal-centrifuge',
      requirements: { titanium: 20, graphite: 40, lead: 30 },
      size: 2,
      powerConsumption: 0.7,
    })
  }
}
export class Incinerator extends Block {
  constructor() {
    super({
      name: 'incinerator',
      requirements: { graphite: 5, lead: 15 },
      size: 1,
      powerConsumption: 0.5,
    })
  }
}
