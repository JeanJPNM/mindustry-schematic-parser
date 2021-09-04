import { Block, BlockOutput, BlockOutputDirection } from './block'
import { Canvas, createCanvas } from 'canvas'
import { blockAsset, outlineImage, tintImage, translatePos } from '../../util'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'units'
const degrees = [0, -90, 180, 90]

abstract class Factory extends Block {
  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
    const context = canvas.getContext('2d')
    const { x, y } = translatePos(tile, canvas)
    const out = await blockAsset(category, 'factory-out-' + this.size)
    const offset = this.size * 16
    context.save()
    context.translate(x + offset, y + offset)
    context.rotate((degrees[tile.rotation % 4] * Math.PI) / 180)
    context.translate(-offset, -offset)
    context.drawImage(out, 0, 0)
    context.restore()
    await this.render({
      tile,
      canvas,
      category,
      layers: ['factory-top-' + this.size],
    })
  }
}
abstract class Reconstructor extends Block {
  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
    const context = canvas.getContext('2d')
    const { x, y } = translatePos(tile, canvas)
    const input = await blockAsset(category, 'factory-in-' + this.size)
    const output = await blockAsset(category, 'factory-out-' + this.size)
    const offset = this.size * 16
    const angle = degrees[tile.rotation % 4]
    context.save()
    context.translate(x + offset, y + offset)
    context.rotate((angle * Math.PI) / 180)
    context.translate(-offset, -offset)
    context.drawImage(input, 0, 0)
    context.drawImage(output, 0, 0)
    context.restore()
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name + '-top'],
    })
  }
}
export class CommandCenter extends Block {
  name = 'command-center'

  requirements = { copper: 200, lead: 250, silicon: 250, graphite: 100 }

  size = 2

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
    const detail = await blockAsset(category, this.name + '-team')
    this.renderImage({
      canvas,
      image: tintImage(detail, '#ffa600'),
      tile,
    })
  }
}
export class GroundFactory extends Factory {
  name = 'ground-factory'

  requirements = { copper: 50, lead: 120, silicon: 80 }

  size = 3

  override powerConsumption = 1.2
}
export class AirFactory extends Factory {
  name = 'air-factory'

  requirements = { copper: 60, lead: 70 }

  size = 3

  override powerConsumption = 1.2
}
export class NavalFactory extends Factory {
  name = 'naval-factory'

  requirements = { copper: 150, lead: 130, metaglass: 120 }

  size = 3

  override powerConsumption = 1.2
}
export class AdditiveReconstructor extends Reconstructor {
  name = 'additive-reconstructor'

  requirements = { copper: 200, lead: 120, silicon: 90 }

  size = 3

  override powerConsumption = 3.0
}
export class MultiplicativeReconstructor extends Reconstructor {
  name = 'multiplicative-reconstructor'

  requirements = { lead: 650, silicon: 450, titanium: 350, thorium: 650 }

  size = 5

  override powerConsumption = 6.0
}
export class ExponentialReconstructor extends Reconstructor {
  name = 'exponential-reconstructor'

  requirements = {
    lead: 2000,
    silicon: 1000,
    titanium: 2000,
    thorium: 750,
    plastanium: 450,
    'phase-fabric': 600,
  }

  size = 7

  override powerConsumption = 13.0
}
export class TetrativeReconstructor extends Reconstructor {
  name = 'tetrative-reconstructor'

  requirements = {
    lead: 4000,
    silicon: 3000,
    thorium: 1000,
    plastanium: 600,
    'phase-fabric': 600,
    'surge-alloy': 800,
  }

  size = 9

  override powerConsumption = 25.0
}
export class RepairPoint extends Block {
  name = 'repair-point'

  requirements: ItemCost = { lead: 30, copper: 30, silicon: 20 }

  size = 1

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name + '-base', this.name],
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
export class RepairTurret extends RepairPoint {
  override name = 'repair-turret'

  override requirements = { silicon: 90, thorium: 80, plastanium: 60 }

  override size = 2

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category: 'turrets',
      layers: ['bases/block-2'],
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
export class ResupplyPoint extends Block {
  name = 'resupply-point'

  requirements = { lead: 20, copper: 15, silicon: 15 }

  size = 2

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
