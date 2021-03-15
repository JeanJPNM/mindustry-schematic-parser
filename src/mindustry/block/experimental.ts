import { Block } from './block'
import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'

const category = 'experimental'
abstract class ExperimentalBlock extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class BlockForge extends ExperimentalBlock {
  constructor() {
    super({
      name: 'block-forge',
      requirements: { thorium: 100 },
      size: 3,
      powerConsumption: 2.0,
    })
  }
}
export class BlockLoader extends ExperimentalBlock {
  constructor() {
    super({
      name: 'block-loader',
      requirements: { thorium: 100 },
      size: 3,
      powerConsumption: 2.0,
    })
  }
}
export class BlockUnloader extends ExperimentalBlock {
  constructor() {
    super({
      name: 'block-unloader',
      requirements: { thorium: 100 },
      size: 3,
      powerConsumption: 2.0,
    })
  }
}
