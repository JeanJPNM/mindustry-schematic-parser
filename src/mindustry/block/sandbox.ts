import { Block, BlockOutput, BlockOutputDirection } from './block'
import { RenderingInfo, blockAsset, tintImage } from '../../util'
import { Item } from '../item'
import { Liquid } from '../liquid'
import { SchematicTile } from '../../schematic'

const category = 'sandbox'
abstract class SandBoxBlock extends Block {
  async draw(tile: SchematicTile, { canvas }: RenderingInfo): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class PowerSource extends SandBoxBlock {
  name = 'power-source'

  requirements = {}

  size = 1
}
export class PowerVoid extends SandBoxBlock {
  name = 'power-void'

  requirements = {}

  size = 1
}
export class ItemSource extends SandBoxBlock {
  name = 'item-source'

  requirements = {}

  size = 1

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override async draw(
    tile: SchematicTile,
    { canvas }: RenderingInfo
  ): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
    const config = tile.config as Item | null
    const imgName = config ? 'center' : 'cross'
    const image = await blockAsset(category, imgName)
    this.renderImage({
      canvas,
      tile,
      image: config ? tintImage(image, config.color, 1) : image,
    })
  }
}
export class ItemVoid extends SandBoxBlock {
  name = 'item-void'

  requirements = {}

  size = 1
}

export class LiquidSource extends SandBoxBlock {
  name = 'liquid-source'

  requirements = {}

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  override async draw(
    tile: SchematicTile,
    { canvas }: RenderingInfo
  ): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
    const config = tile.config as Liquid | null
    const imgName = config ? 'center' : 'cross'
    const image = await blockAsset(category, imgName)
    this.renderImage({
      canvas,
      tile,
      image: config ? tintImage(image, config.color, 1) : image,
    })
  }
}
export class LiquidVoid extends SandBoxBlock {
  name = 'liquid-void'

  requirements = {}

  size = 1
}
export abstract class LightBlock extends SandBoxBlock {}
export class Illuminator extends LightBlock {
  name = 'illuminator'

  requirements = { graphite: 12, silicon: 8 }

  size = 1

  override powerConsumption = 0.05
}
export class PayloadSource extends SandBoxBlock {
  name = 'payload-source'

  requirements = {}

  size = 5

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(
    tile: SchematicTile,
    { canvas }: RenderingInfo
  ): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name, `${this.name}-top`],
    })
  }
}
export class PayloadVoid extends SandBoxBlock {
  name = 'payload-void'

  requirements = {}

  size = 5

  override async draw(
    tile: SchematicTile,
    { canvas }: RenderingInfo
  ): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name, `${this.name}-top`],
    })
  }
}
