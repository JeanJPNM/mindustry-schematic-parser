import { Block, BlockOutput, BlockOutputDirection } from './block'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

const category = 'experimental'
abstract class ExperimentalBlock extends Block {
  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class BlockForge extends ExperimentalBlock {
  name = 'block-forge'

  requirements = { thorium: 100 }

  size = 3

  override powerConsumption = 2.0
}
export class BlockLoader extends ExperimentalBlock {
  name = 'block-loader'

  requirements = { thorium: 100 }

  size = 3

  override powerConsumption = 2.0
}
export class BlockUnloader extends ExperimentalBlock {
  name = 'block-unloader'

  requirements = { thorium: 100 }

  size = 3

  override powerConsumption = 2.0

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all
}
