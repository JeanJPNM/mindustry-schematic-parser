import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, tintImage } from '../../util'
import { Block } from './block'
import { Item } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'storage'

abstract class StorageBlock extends Block {
  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
    const image = await info.blockAsset(category, this.name + '-team')
    this.renderImage({
      info,
      image: tintImage(image, '#ffa600'),
      tile,
    })
  }
}
export class CoreShard extends StorageBlock {
  name = 'core-shard'

  requirements = { copper: 1000, lead: 800 }

  size = 3
}
export class CoreFoundation extends StorageBlock {
  name = 'core-foundation'

  requirements = { copper: 3000, lead: 3000, silicon: 2000 }

  size = 4
}
export class CoreNucleus extends StorageBlock {
  name = 'core-nucleus'

  requirements = { copper: 8000, lead: 8000, silicon: 5000, thorium: 4000 }

  size = 5
}
export class Container extends StorageBlock {
  name = 'container'

  requirements = { titanium: 100 }

  size = 2
}
export class Vault extends Container {
  override name = 'vault'

  override requirements = { titanium: 250, thorium: 125 }

  override size = 3
}

export class Unloader extends Block {
  name = 'unloader'

  requirements = { titanium: 25, silicon: 30 }

  size = 1

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
    const config = tile.config as Item | null
    if (config) {
      const image = await info.blockAsset(category, this.name + '-center')
      this.renderImage({
        info,
        image: tintImage(image, config.color, 1),
        tile,
      })
    }
  }
}
