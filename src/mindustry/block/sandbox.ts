import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, tintImage } from '../../util'
import { Block } from './block'
import { Item } from '../item'
import { Liquid } from '../liquid'
import { SchematicTile } from '../../schematic'

// TODO: move those blocks to their correct categories
// do this on a major version change
const category = 'sandbox'
const powerCategory = 'power'
const distributionCategory = 'distribution'
const payloadCategory = 'payload'

abstract class SandBoxBlock extends Block {
  category = category

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category: this.category,
      layers: [this.name],
    })
  }
}
export class PowerSource extends SandBoxBlock {
  name = 'power-source'

  requirements = {}

  size = 1

  override category = powerCategory
}
export class PowerVoid extends SandBoxBlock {
  name = 'power-void'

  requirements = {}

  size = 1

  override category = powerCategory
}
export class ItemSource extends SandBoxBlock {
  name = 'item-source'

  requirements = {}

  size = 1

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const config = tile.config as Item | null
    const imgName = config ? 'center' : 'cross-full'
    const image = await info.blockAsset(distributionCategory, imgName)
    this.renderImage({
      info,
      tile,
      image: config ? tintImage(image, config.color, 1) : image,
    })
    await this.render({ tile, info, category, layers: [this.name] })
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

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const config = tile.config as Liquid | null
    const imgName = config ? 'center' : 'cross-full'
    const image = await info.blockAsset(distributionCategory, imgName)
    this.renderImage({
      info,
      tile,
      image: config ? tintImage(image, config.color, 1) : image,
    })
    await this.render({ tile, info, category, layers: [this.name] })
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

  override category = powerCategory
}
export class PayloadSource extends SandBoxBlock {
  name = 'payload-source'

  requirements = {}

  size = 5

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category: payloadCategory,
      layers: [this.name, `${this.name}-top`],
    })
  }
}
export class PayloadVoid extends SandBoxBlock {
  name = 'payload-void'

  requirements = {}

  size = 5

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category: payloadCategory,
      layers: [this.name, `${this.name}-top`],
    })
  }
}

export class HeatSource extends SandBoxBlock {
  name = 'heat-source'

  requirements = {}

  size = 1
}
