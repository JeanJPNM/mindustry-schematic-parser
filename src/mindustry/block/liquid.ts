import { Block } from './block'

export class MechanicalPump extends Block {
  constructor() {
    super({
      name: 'mechanical-pump',
      requirements: { copper: 15, metaglass: 10 },
      size: 1,
    })
  }
}
export class RotaryPump extends Block {
  constructor() {
    super({
      name: 'rotary-pump',
      requirements: { copper: 70, metaglass: 50, silicon: 20, titanium: 35 },
      size: 2,
      powerConsumption: 0.3,
    })
  }
}
export class ThermalPump extends Block {
  constructor() {
    super({
      name: 'thermal-pump',
      requirements: {
        copper: 80,
        metaglass: 90,
        silicon: 30,
        titanium: 40,
        thorium: 35,
      },
      size: 3,
      powerConsumption: 1.3,
    })
  }
}
export class Conduit extends Block {
  constructor() {
    super({
      name: 'conduit',
      requirements: { metaglass: 1 },
      size: 1,
    })
  }
}
export class PulseConduit extends Block {
  constructor() {
    super({
      name: 'pulse-conduit',
      requirements: { titanium: 2, metaglass: 1 },
      size: 1,
    })
  }
}
export class PlatedConduit extends Block {
  constructor() {
    super({
      name: 'plated-conduit',
      requirements: { thorium: 2, metaglass: 1, plastanium: 1 },
      size: 1,
    })
  }
}
export class LiquidRouter extends Block {
  constructor() {
    super({
      name: 'liquid-router',
      requirements: { graphite: 4, metaglass: 2 },
      size: 1,
    })
  }
}
export class LiquidTank extends Block {
  constructor() {
    super({
      name: 'liquid-tank',
      requirements: { titanium: 25, metaglass: 25 },
      size: 3,
    })
  }
}
export class LiquidJunction extends Block {
  constructor() {
    super({
      name: 'liquid-junction',
      requirements: { graphite: 2, metaglass: 2 },
      size: 1,
    })
  }
}
export class BridgeConduit extends Block {
  constructor() {
    super({
      name: 'bridge-conduit',
      requirements: { graphite: 4, metaglass: 8 },
      size: 1,
    })
  }
}
export class PhaseConduit extends Block {
  constructor() {
    super({
      name: 'phase-conduit',
      requirements: {
        'phase-fabric': 5,
        silicon: 7,
        metaglass: 20,
        titanium: 10,
      },
      size: 1,
      powerConsumption: 0.3,
    })
  }
}
