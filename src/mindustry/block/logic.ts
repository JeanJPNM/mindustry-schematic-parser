import { Block } from './block'

export class Message extends Block {
  constructor() {
    super({
      name: 'message',
      requirements: { graphite: 5 },
      size: 1,
    })
  }
}
export class SwitchBlock extends Block {
  constructor() {
    super({
      name: 'switch',
      requirements: { graphite: 5 },
      size: 1,
    })
  }
}
export class MicroProcessor extends Block {
  constructor() {
    super({
      name: 'micro-processor',
      requirements: { copper: 80, lead: 50, silicon: 30 },
      size: 1,
    })
  }
}
export class LogicProcessor extends Block {
  constructor() {
    super({
      name: 'logic-processor',
      requirements: { lead: 320, silicon: 60, graphite: 60, thorium: 50 },
      size: 2,
    })
  }
}
export class HyperProcessor extends Block {
  constructor() {
    super({
      name: 'hyper-processor',
      requirements: { lead: 450, silicon: 130, thorium: 75, 'surge-alloy': 50 },
      size: 3,
    })
  }
}
export class MemoryCell extends Block {
  constructor() {
    super({
      name: 'memory-cell',
      requirements: { graphite: 30, silicon: 30 },
      size: 1,
    })
  }
}
export class MemoryBank extends Block {
  constructor() {
    super({
      name: 'memory-bank',
      requirements: { graphite: 80, silicon: 80, 'phase-fabric': 30 },
      size: 2,
    })
  }
}
export class LogicDisplay extends Block {
  constructor() {
    super({
      name: 'logic-display',
      requirements: { lead: 100, silicon: 50, metaglass: 50 },
      size: 3,
    })
  }
}
export class LargeLogicDisplay extends Block {
  constructor() {
    super({
      name: 'large-logic-display',
      requirements: {
        lead: 200,
        silicon: 150,
        metaglass: 100,
        'phase-fabric': 75,
      },
      size: 6,
    })
  }
}
