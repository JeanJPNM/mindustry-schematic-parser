import { Block, BlockOutput, BlockOutputDirection } from './block'
import { Canvas, createCanvas } from 'canvas'
import { blockAsset, outlineImage } from '../../util'
import { SchematicTile } from '../../schematic'

const category = 'payload'

export class PayloadConveyor extends Block {
  name = 'payload-conveyor'

  requirements = { graphite: 10, copper: 20 }

  size = 3

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    const size = this.size * 32
    const image = await blockAsset(category, this.name + '-icon')
    const tcanvas = createCanvas(size, size)
    const context = tcanvas.getContext('2d')
    let { rotation } = tile
    if (rotation % 2) {
      rotation += 2
    }
    context.save()
    context.translate(size / 2, size / 2)
    context.rotate((rotation * Math.PI) / 2)
    context.drawImage(image, -size / 2, -size / 2)
    context.restore()
    this.renderImage({
      canvas,
      tile,
      image: tcanvas,
    })
  }
}
export class PayloadRouter extends Block {
  name = 'payload-router'

  requirements = { graphite: 15, copper: 20 }

  size = 3

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.all

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name, this.name + '-over'],
    })
    const size = this.size * 32
    const image = await blockAsset(category, this.name + '-top')
    const tcanvas = createCanvas(size, size)
    const context = tcanvas.getContext('2d')
    let { rotation } = tile
    if (rotation % 2) {
      rotation += 2
    }
    context.save()
    context.translate(size / 2, size / 2)
    context.rotate((rotation * Math.PI) / 2)
    context.drawImage(image, -size / 2, -size / 2)
    context.restore()
    this.renderImage({
      canvas,
      tile,
      image: tcanvas,
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

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [`${this.name}-base`],
    })
    const top = outlineImage({
      canvas: createCanvas(this.size * 32, this.size * 32),
      image: await blockAsset(category, this.name),
      fillStyle: '#353535',
      thickness: 3,
    })
    this.renderImage({
      tile,
      canvas,
      image: top,
    })
  }
}
