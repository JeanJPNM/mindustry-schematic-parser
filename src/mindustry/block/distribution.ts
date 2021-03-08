import { Block } from './block'

export class Conveyor extends Block {
  constructor() {
    super({
      name: 'conveyor',
      requirements: { copper: 1 },
      size: 1,
    })
  }
}
export class TitaniumConveyor extends Block {
  constructor() {
    super({
      name: 'titanium-conveyor',
      requirements: { copper: 1, lead: 1, titanium: 1 },
      size: 1,
    })
  }
}
export class PlastaniumConveyor extends Block {
  constructor() {
    super({
      name: 'plastanium-conveyor',
      requirements: { plastanium: 1, silicon: 1, graphite: 1 },
      size: 1,
    })
  }
}
export class ArmoredConveyor extends Block {
  constructor() {
    super({
      name: 'armored-conveyor',
      requirements: { plastanium: 1, thorium: 1, metaglass: 1 },
      size: 1,
    })
  }
}
export class Junction extends Block {
  constructor() {
    super({
      name: 'junction',
      requirements: { copper: 2 },
      size: 1,
    })
  }
}
export class ItemBridge extends Block {
  constructor() {
    super({
      name: 'bridge-conveyor',
      requirements: { lead: 6, copper: 6 },
      size: 1,
    })
  }
}
export class PhaseConveyor extends Block {
  constructor() {
    super({
      name: 'phase-conveyor',
      requirements: { 'phase-fabric': 5, silicon: 7, lead: 10, graphite: 10 },
      size: 1,
      powerConsumption: 0.3,
    })
  }
}
export class Sorter extends Block {
  constructor() {
    super({
      name: 'sorter',
      requirements: { lead: 2, copper: 2 },
      size: 1,
    })
  }
}
export class InvertedSorter extends Block {
  constructor() {
    super({
      name: 'inverted-sorter',
      requirements: { lead: 2, copper: 2 },
      size: 1,
    })
  }
}
export class Router extends Block {
  constructor() {
    super({
      name: 'router',
      requirements: { copper: 3 },
      size: 1,
    })
  }
}
export class Distributor extends Block {
  constructor() {
    super({
      name: 'distributor',
      requirements: { lead: 4, copper: 4 },
      size: 2,
    })
  }
}
export class OverflowGate extends Block {
  constructor() {
    super({
      name: 'overflow-gate',
      requirements: { lead: 2, copper: 4 },
      size: 1,
    })
  }
}
export class UnderflowGate extends Block {
  constructor() {
    super({
      name: 'underflow-gate',
      requirements: { lead: 2, copper: 4 },
      size: 1,
    })
  }
}
export class MassDriver extends Block {
  constructor() {
    super({
      name: 'mass-driver',
      requirements: { titanium: 125, silicon: 75, lead: 125, thorium: 50 },
      size: 3,
      powerConsumption: 1.75,
    })
  }
}
export class PayloadConveyor extends Block {
  constructor() {
    super({
      name: 'payload-conveyor',
      requirements: { graphite: 10, copper: 20 },
      size: 1,
    })
  }
}
export class PayloadRouter extends Block {
  constructor() {
    super({
      name: 'payload-router',
      requirements: { graphite: 15, copper: 20 },
      size: 1,
    })
  }
}
