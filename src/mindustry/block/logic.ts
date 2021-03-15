import { Block } from './block'
import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'
const category = 'logic'
abstract class LogicBlock extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class Message extends LogicBlock {
  constructor() {
    super({
      name: 'message',
      requirements: { graphite: 5 },
      size: 1,
    })
  }
}
export class SwitchBlock extends LogicBlock {
  constructor() {
    super({
      name: 'switch',
      requirements: { graphite: 5 },
      size: 1,
    })
  }
}
export class MicroProcessor extends LogicBlock {
  constructor() {
    super({
      name: 'micro-processor',
      requirements: { copper: 80, lead: 50, silicon: 30 },
      size: 1,
    })
  }
}
export class LogicProcessor extends LogicBlock {
  constructor() {
    super({
      name: 'logic-processor',
      requirements: { lead: 320, silicon: 60, graphite: 60, thorium: 50 },
      size: 2,
    })
  }
}
export class HyperProcessor extends LogicBlock {
  constructor() {
    super({
      name: 'hyper-processor',
      requirements: { lead: 450, silicon: 130, thorium: 75, 'surge-alloy': 50 },
      size: 3,
    })
  }
}
export class MemoryCell extends LogicBlock {
  constructor() {
    super({
      name: 'memory-cell',
      requirements: { graphite: 30, silicon: 30 },
      size: 1,
    })
  }
}
export class MemoryBank extends MemoryCell {
  constructor() {
    super()
    this.name = 'memory-bank'
    this.requirements = { graphite: 80, silicon: 80, 'phase-fabric': 30 }
    this.size = 2
  }
}
export class LogicDisplay extends LogicBlock {
  constructor() {
    super({
      name: 'logic-display',
      requirements: { lead: 100, silicon: 50, metaglass: 50 },
      size: 3,
    })
  }
}
export class LargeLogicDisplay extends LogicDisplay {
  constructor() {
    super()
    this.name = `large-${this.name}`
    this.requirements = {
      lead: 200,
      silicon: 150,
      metaglass: 100,
      'phase-fabric': 75,
    }
    this.size = 6
  }
}
