import { Block } from './block'

export class LaunchPad extends Block {
  constructor() {
    super({
      name: 'launch-pad',
      requirements: { copper: 350, silicon: 140, lead: 200, titanium: 150 },
      size: 3,
      powerConsumption: 4.0,
    })
  }
}
export class LaunchPadLarge extends LaunchPad {
  constructor() {
    super()
    this.name += '-large'
    this.requirements = {
      titanium: 200,
      silicon: 150,
      lead: 250,
      plastanium: 75,
    }
    this.size = 4
    this.powerConsumption = 6
  }
}
export class InterplanetaryAccelerator extends Block {
  constructor() {
    super({
      name: 'interplanetary-accelerator',
      requirements: {
        copper: 16000,
        silicon: 11000,
        thorium: 13000,
        titanium: 12000,
        'surge-alloy': 6000,
        'phase-fabric': 5000,
      },
      size: 7,
      powerConsumption: 10.0,
    })
  }
}
