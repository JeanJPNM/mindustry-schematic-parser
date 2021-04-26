import { blockAsset, tintImage } from '../../util'
import { Block } from './block'
import { Canvas } from 'canvas'
import { Item } from '../item'
import { Liquid } from '../liquid'
import { SchematicTile } from '../../schematic'

const category = 'sandbox'
abstract class SandBoxBlock extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class PowerSource extends SandBoxBlock {
  constructor() {
    super({
      name: 'power-source',
      requirements: {},
      size: 1,
    })
  }
}
export class PowerVoid extends SandBoxBlock {
  constructor() {
    super({
      name: 'power-void',
      requirements: {},
      size: 1,
    })
  }
}
export class ItemSource extends SandBoxBlock {
  constructor() {
    super({
      name: 'item-source',
      requirements: {},
      size: 1,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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
  constructor() {
    super({
      name: 'item-void',
      requirements: {},
      size: 1,
    })
  }
}

export class LiquidSource extends SandBoxBlock {
  constructor() {
    super({
      name: 'liquid-source',
      requirements: {},
      size: 1,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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
  constructor() {
    super({
      name: 'liquid-void',
      requirements: {},
      size: 1,
    })
  }
}
export abstract class LightBlock extends SandBoxBlock {}
export class Illuminator extends LightBlock {
  constructor() {
    super({
      name: 'illuminator',
      requirements: { graphite: 12, silicon: 8 },
      size: 1,
      powerConsumption: 0.05,
    })
  }
}
