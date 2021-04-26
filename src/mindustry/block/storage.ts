import { blockAsset, tintImage } from '../../util'
import { Block } from './block'
import { Canvas } from 'canvas'
import { Item } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'storage'

abstract class StorageBlock extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
    const image = await blockAsset(category, this.name + '-team')
    this.renderImage({
      canvas,
      image: tintImage(image, '#ffa600'),
      tile,
    })
  }
}
export class CoreShard extends StorageBlock {
  constructor() {
    super({
      name: 'core-shard',
      requirements: { copper: 1000, lead: 800 },
      size: 3,
    })
  }
}
export class CoreFoundation extends StorageBlock {
  constructor() {
    super({
      name: 'core-foundation',
      requirements: { copper: 3000, lead: 3000, silicon: 2000 },
      size: 4,
    })
  }
}
export class CoreNucleus extends StorageBlock {
  constructor() {
    super({
      name: 'core-nucleus',
      requirements: { copper: 8000, lead: 8000, silicon: 5000, thorium: 4000 },
      size: 5,
    })
  }
}
export class Container extends StorageBlock {
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

  output = {
    item: true,
    liquid: false,
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
    const config = tile.config as Item | null
    if (config) {
      const image = await blockAsset(category, this.name + '-center')
      this.renderImage({
        canvas,
        image: tintImage(image, config.color, 1),
        tile,
      })
    }
  }
}
