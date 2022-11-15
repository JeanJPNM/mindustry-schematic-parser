import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, drawRotatedTile, outlineImage } from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'payload'

export class PayloadConveyor extends Block {
  name = 'payload-conveyor'

  requirements = { graphite: 10, copper: 20 }

  size = 3

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(
    tile: SchematicTile,
    { canvas, blockAsset }: RenderingInfo
  ): Promise<void> {
    drawRotatedTile({
      canvas,
      image: await blockAsset(category, this.name + '-icon'),
      tile,
    })
  }
}
export class PayloadRouter extends Block {
  name = 'payload-router'

  requirements = { graphite: 15, copper: 20 }

  size = 3

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-over'],
    })
    drawRotatedTile({
      canvas: info.canvas,
      image: await info.blockAsset(category, this.name + '-top'),
      tile,
    })
  }
}

export class ReinforcedPayloadConveyor extends Block {
  name = 'reinforced-payload-conveyor'

  requirements = {
    tungsten: 10,
  }

  size = 3

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    drawRotatedTile({
      canvas: info.canvas,
      image: await info.blockAsset(category, this.name + '-icon'),
      tile,
    })
  }
}

export class ReinforcedPayloadRouter extends Block {
  name = 'reinforced-payload-router'

  requirements = {
    tungsten: 15,
  }

  size = 3

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-over'],
    })
    drawRotatedTile({
      canvas: info.canvas,
      image: await info.blockAsset(category, this.name + '-top'),
      tile,
    })
  }
}

export class PayloadMassDriver extends Block {
  name = 'payload-mass-driver'

  requirements: ItemCost = {
    tungsten: 120,
    silicon: 120,
    graphite: 50,
  }

  size = 3

  override powerConsumption = 0.5

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  // TODO: complete later
  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [`${this.name}-base`],
    })
    const top = outlineImage({
      image: await info.blockAsset(category, this.name),
      fillStyle: '#353535',
      thickness: 3,
    })
    this.renderImage({
      tile,
      info,
      image: top,
    })
  }
}

export class LargePayloadMassDriver extends Block {
  name = 'large-payload-mass-driver'

  requirements = {
    thorium: 200,
    tungsten: 200,
    silicon: 200,
    graphite: 100,
    oxide: 30,
  }

  size = 5

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [`${this.name}-base`, `${this.name}-top`],
    })
    const top = outlineImage({
      image: await info.blockAsset(category, this.name),
      fillStyle: '#353535',
      thickness: 3,
    })
    this.renderImage({
      tile,
      info,
      image: top,
    })
  }
}

export class PayloadPropulsionTower extends Block {
  name = 'payload-propulsion-tower'

  requirements = {
    thorium: 300,
    silicon: 200,
    plastanium: 200,
    'phase-fabric': 50,
  }

  size = 5

  override powerConsumption = 6

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [`${this.name}-base`],
    })
    const top = outlineImage({
      image: await info.blockAsset(category, this.name),
      fillStyle: '#353535',
      thickness: 3,
    })
    this.renderImage({
      tile,
      info,
      image: top,
    })
  }
}

export class SmallDeconstructor extends Block {
  name = 'small-deconstructor'

  requirements = {
    beryllium: 100,
    silicon: 100,
    oxide: 40,
    graphite: 80,
  }

  size = 3

  override powerConsumption = 1

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-top'],
    })
  }
}

export class Deconstructor extends Block {
  name = 'deconstructor'

  requirements = {
    beryllium: 250,
    oxide: 100,
    silicon: 250,
    carbide: 250,
  }

  size = 5

  override powerConsumption = 3

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-top'],
    })
  }
}

export class Constructor extends Block {
  name = 'constructor'

  requirements = { thorium: 100 }

  size = 3

  override powerConsumption = 2.0

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      layers: [this.name, this.name + '-top'],
      tile,
    })
  }
}

export class LargeConstructor extends Block {
  name = 'large-constructor'

  requirements = {
    silicon: 150,
    oxide: 150,
    tungsten: 200,
    'phase-fabric': 40,
  }

  size = 5

  override powerConsumption = 2

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name, this.name + '-top'],
    })
  }
}
export class PayloadLoader extends Block {
  name = 'payload-loader'

  requirements = { thorium: 100 }

  size = 3

  override powerConsumption = 2.0

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      layers: [this.name, this.name + '-top'],
      tile,
    })
  }
}
export class PayloadUnloader extends Block {
  name = 'payload-unloader'

  requirements = { thorium: 100 }

  size = 3

  override powerConsumption = 2.0

  override output = BlockOutput.item

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category,
      layers: [this.name, this.name + '-top'],
      tile,
    })
  }
}
