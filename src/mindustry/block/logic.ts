import { Block } from './block'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'
const category = 'logic'
abstract class LogicBlock extends Block {
  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({ tile, info, category, layers: [this.name] })
  }
}
export class Message extends LogicBlock {
  name = 'message'

  requirements = { graphite: 5 }

  size = 1
}
export class SwitchBlock extends LogicBlock {
  name = 'switch'

  requirements = { graphite: 5 }

  size = 1
}
export class MicroProcessor extends LogicBlock {
  name = 'micro-processor'

  requirements = { copper: 90, lead: 50, silicon: 50 }

  size = 1
}
export class LogicProcessor extends LogicBlock {
  name = 'logic-processor'

  requirements = { lead: 320, silicon: 80, graphite: 60, thorium: 50 }

  size = 2
}
export class HyperProcessor extends LogicBlock {
  name = 'hyper-processor'

  requirements = { lead: 450, silicon: 150, thorium: 75, 'surge-alloy': 50 }

  size = 3
}
export class MemoryCell extends LogicBlock {
  name = 'memory-cell'

  requirements = { graphite: 30, silicon: 30 }

  size = 1
}
export class MemoryBank extends MemoryCell {
  override name = 'memory-bank'

  override requirements = { graphite: 80, silicon: 80, 'phase-fabric': 30 }

  override size = 2
}
export class LogicDisplay extends LogicBlock {
  name = 'logic-display'

  requirements = { lead: 100, silicon: 50, metaglass: 50 }

  size = 3
}
export class LargeLogicDisplay extends LogicDisplay {
  override name = 'large-logic-display'

  override requirements = {
    lead: 200,
    silicon: 150,
    metaglass: 100,
    'phase-fabric': 75,
  }

  override size = 6
}

export class Canvas extends LogicBlock {
  name = 'canvas'

  requirements = {
    silicon: 50,
  }

  size = 2
}

export class ReinforcedMessage extends LogicBlock {
  name = 'reinforced-message'

  requirements = {
    graphite: 10,
    beryllium: 5,
  }

  size = 1
}

export class WorldProcessor extends LogicBlock {
  name = 'world-processor'

  requirements = {}

  size = 1
}

export class WorldCell extends LogicBlock {
  name = 'world-cell'

  requirements = {}

  size = 1
}

export class WorldMessage extends LogicBlock {
  name = 'world-message'

  requirements = {}

  size = 1
}
