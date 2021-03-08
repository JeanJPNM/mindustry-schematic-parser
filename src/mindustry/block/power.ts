import { Block, BlockProperties } from './block'

export class PowerNode extends Block {
  constructor() {
    super({
      name: 'power-node',
      requirements: {
        copper: 1,
        lead: 3,
      },
      size: 1,
    })
  }
}
export class PowerNodeLarge extends Block {
  constructor() {
    super({
      name: 'power-node-large',
      requirements: {
        titanium: 5,
        lead: 10,
        silicon: 3,
      },
      size: 2,
    })
  }
}
export class SurgeTower extends Block {
  constructor() {
    super({
      name: 'surge-tower',
      requirements: {
        titanium: 7,
        lead: 10,
        silicon: 15,
        'surge-alloy': 15,
      },
      size: 2,
    })
  }
}
export class Diode extends Block {
  constructor() {
    super({
      name: 'diode',
      requirements: {
        silicon: 10,
        plastanium: 5,
        metaglass: 10,
      },
      size: 1,
    })
  }
}
export class Battery extends Block {
  constructor() {
    super({
      name: 'battery',
      requirements: {
        copper: 5,
        lead: 20,
      },
      size: 1,
    })
  }
}
export class BatteryLarge extends Block {
  constructor() {
    super({
      name: 'battery-large',
      requirements: {
        titanium: 20,
        lead: 40,
        silicon: 20,
      },
      size: 3,
    })
  }
}
interface PowerGeneratorProperties extends BlockProperties {
  powerGeneration: number
}
export class PowerGenerator extends Block {
  constructor(properties: PowerGeneratorProperties) {
    super(properties)
    /// gets the actual amount consumed per second
    this.powerGeneration *= 60
  }

  powerGeneration!: number
}
export class CombustionGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'combustion-generator',
      requirements: {
        copper: 25,
        lead: 15,
      },
      size: 1,
      powerGeneration: 1,
    })
  }
}
export class ThermalGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'thermal-generator',
      requirements: {
        copper: 40,
        graphite: 35,
        lead: 50,
        silicon: 35,
        metaglass: 40,
      },
      size: 2,
      powerGeneration: 1.8,
    })
  }
}
export class SteamGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'steam-generator',
      requirements: {
        copper: 35,
        graphite: 25,
        lead: 40,
        silicon: 30,
      },
      size: 2,
      powerGeneration: 5.5,
    })
  }
}
export class DifferentialGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'differential-generator',
      requirements: {
        copper: 70,
        titanium: 50,
        lead: 100,
        silicon: 65,
        metaglass: 50,
      },
      size: 3,
      powerGeneration: 18,
    })
  }
}
export class RtgGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'rtg-generator',
      requirements: {
        lead: 100,
        silicon: 75,
        'phase-fabric': 25,
        plastanium: 75,
        thorium: 50,
      },
      size: 2,
      powerGeneration: 4.5,
    })
  }
}
export class SolarPanel extends PowerGenerator {
  constructor() {
    super({
      name: 'solar-panel',
      requirements: {
        lead: 10,
        silicon: 15,
      },
      size: 1,
      powerGeneration: 0.1,
    })
  }
}
export class SolarPanelLarge extends PowerGenerator {
  constructor() {
    super({
      name: 'solar-panel-large',
      requirements: {
        lead: 80,
        silicon: 110,
        'phase-fabric': 15,
      },
      size: 3,
      powerGeneration: 1.3,
    })
  }
}
export class ThoriumReactor extends PowerGenerator {
  constructor() {
    super({
      name: 'thorium-reactor',
      requirements: {
        lead: 300,
        silicon: 200,
        graphite: 150,
        thorium: 150,
        metaglass: 50,
      },
      size: 3,
      powerGeneration: 15,
    })
  }
}
export class ImpactReactor extends PowerGenerator {
  constructor() {
    super({
      name: 'impact-reactor',
      requirements: {
        lead: 500,
        silicon: 300,
        graphite: 400,
        thorium: 100,
        'surge-alloy': 250,
        metaglass: 250,
      },
      size: 4,
      powerGeneration: 130,
      powerConsumption: 25,
    })
  }
}
