import { Block } from './block'

export class CoreShard extends Block {
  constructor() {
    super({
      name: 'core-shard',
      requirements: { copper: 1000, lead: 800 },
      size: 3,
    })
  }
}
export class CoreFoundation extends Block {
  constructor() {
    super({
      name: 'core-foundation',
      requirements: { copper: 3000, lead: 3000, silicon: 2000 },
      size: 4,
    })
  }
}
export class CoreNucleus extends Block {
  constructor() {
    super({
      name: 'core-nucleus',
      requirements: { copper: 8000, lead: 8000, silicon: 5000, thorium: 4000 },
      size: 5,
    })
  }
}
export class Container extends Block {
  constructor() {
    super({
      name: 'container',
      requirements: { titanium: 100 },
      size: 2,
    })
  }
}
export class Vault extends Container {
  constructor() {
    super()
    this.name = 'vault'
    this.requirements = { titanium: 250, thorium: 125 }
    this.size = 3
  }
}

export class Unloader extends Block {
  constructor() {
    super({
      name: 'unloader',
      requirements: { titanium: 25, silicon: 30 },
      size: 1,
    })
  }
}
