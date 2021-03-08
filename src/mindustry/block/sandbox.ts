import { Block } from './block'

export class PowerSource extends Block {
  constructor() {
    super({
      name: 'power-source',
      requirements: {},
      size: 1,
    })
  }
}
export class PowerVoid extends Block {
  constructor() {
    super({
      name: 'power-void',
      requirements: {},
      size: 1,
    })
  }
}
export class ItemSource extends Block {
  constructor() {
    super({
      name: 'item-source',
      requirements: {},
      size: 1,
    })
  }
}
export class ItemVoid extends Block {
  constructor() {
    super({
      name: 'item-void',
      requirements: {},
      size: 1,
    })
  }
}
export class LiquidSource extends Block {
  constructor() {
    super({
      name: 'liquid-source',
      requirements: {},
      size: 1,
    })
  }
}
export class LiquidVoid extends Block {
  constructor() {
    super({
      name: 'liquid-void',
      requirements: {},
      size: 1,
    })
  }
}
export class LightBlock extends Block {}
export class Illuminator extends LightBlock {
  constructor() {
    super({
      name: 'illuminator',
      requirements: { graphite: 12, silicon: 8 },
      size: 1,
      powerConsumption: 0.05,
    })
  }
}
