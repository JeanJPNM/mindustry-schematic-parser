import { RenderingInfo, blockAsset, tintImage } from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../..'
const category = 'campaign'
abstract class Pad extends Block {
  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
  }
}
export class LaunchPad extends Pad {
  name = 'launch-pad'

  requirements: ItemCost = {
    copper: 350,
    silicon: 140,
    lead: 200,
    titanium: 150,
  }

  size = 3

  override powerConsumption = 4.0
}

export class InterplanetaryAccelerator extends Block {
  name = 'interplanetary-accelerator'

  requirements = {
    copper: 16000,
    silicon: 11000,
    thorium: 13000,
    titanium: 12000,
    'surge-alloy': 6000,
    'phase-fabric': 5000,
  }

  size = 7

  override powerConsumption = 10.0

  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
    const image = await blockAsset(category, this.name + '-team')
    this.renderImage({
      canvas,
      tile,
      image: tintImage(image, '#ffa600'),
    })
  }
}
