import { Block } from './block'

export class CommandCenter extends Block {
  constructor() {
    super({
      name: 'command-center',
      requirements: { copper: 200, lead: 250, silicon: 250, graphite: 100 },
      size: 2,
    })
  }
}
export class GroundFactory extends Block {
  constructor() {
    super({
      name: 'ground-factory',
      requirements: { copper: 50, lead: 120, silicon: 80 },
      size: 3,
      powerConsumption: 1.2,
    })
  }
}
export class AirFactory extends Block {
  constructor() {
    super({
      name: 'air-factory',
      requirements: { copper: 60, lead: 70 },
      size: 3,
      powerConsumption: 1.2,
    })
  }
}
export class NavalFactory extends Block {
  constructor() {
    super({
      name: 'naval-factory',
      requirements: { copper: 150, lead: 130, metaglass: 120 },
      size: 3,
      powerConsumption: 1.2,
    })
  }
}
export class AdditiveReconstructor extends Block {
  constructor() {
    super({
      name: 'additive-reconstructor',
      requirements: { copper: 200, lead: 120, silicon: 90 },
      size: 3,
      powerConsumption: 3.0,
    })
  }
}
export class MultiplicativeReconstructor extends Block {
  constructor() {
    super({
      name: 'multiplicative-reconstructor',
      requirements: { lead: 650, silicon: 450, titanium: 350, thorium: 650 },
      size: 5,
      powerConsumption: 6.0,
    })
  }
}
export class ExponentialReconstructor extends Block {
  constructor() {
    super({
      name: 'exponential-reconstructor',
      requirements: {
        lead: 2000,
        silicon: 1000,
        titanium: 2000,
        thorium: 750,
        plastanium: 450,
        'phase-fabric': 600,
      },
      size: 7,
      powerConsumption: 13.0,
    })
  }
}
export class TetrativeReconstructor extends Block {
  constructor() {
    super({
      name: 'tetrative-reconstructor',
      requirements: {
        lead: 4000,
        silicon: 3000,
        thorium: 1000,
        plastanium: 600,
        'phase-fabric': 600,
        'surge-alloy': 800,
      },
      size: 9,
      powerConsumption: 25.0,
    })
  }
}
export class RepairPoint extends Block {
  constructor() {
    super({
      name: 'repair-point',
      requirements: { lead: 15, copper: 15, silicon: 15 },
      size: 1,
    })
  }
}
export class ResupplyPoint extends Block {
  constructor() {
    super({
      name: 'resupply-point',
      requirements: { lead: 20, copper: 15, silicon: 15 },
      size: 2,
    })
  }
}
