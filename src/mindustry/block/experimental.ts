import { Block } from './block'

export class BlockForge extends Block {
  constructor() {
    super({
      name: 'block-forge',
      requirements: { thorium: 100 },
      size: 3,
      powerConsumption: 2.0,
    })
  }
}
export class BlockLoader extends Block {
  constructor() {
    super({
      name: 'block-loader',
      requirements: { thorium: 100 },
      size: 3,
      powerConsumption: 2.0,
    })
  }
}
export class BlockUnloader extends Block {
  constructor() {
    super({
      name: 'block-unloader',
      requirements: { thorium: 100 },
      size: 3,
      powerConsumption: 2.0,
    })
  }
}
