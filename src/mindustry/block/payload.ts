import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, drawRotatedTile, outlineImage } from '../../util'
import { Block } from './block'
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
      createCanvas: info.options.createCanvas,
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
