import { Canvas, createCanvas } from 'canvas'
import { blockAsset, tintImage } from '../../util'
import { Block } from './block'
import { Item } from '../item'
import { SchematicTile } from '../../schematic'
const category = 'distribution'

abstract class TransportBlock extends Block {
  output = {
    item: true,
    liquid: false,
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
  }
}
export class Conveyor extends TransportBlock {
  constructor() {
    super({
      name: 'conveyor',
      requirements: { copper: 1 },
      size: 1,
    })
  }

  output = {
    item: false,
    liquid: false,
  }

  // the rendering of this block cannot be done individually
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async draw(): Promise<void> {}
}
export class TitaniumConveyor extends Conveyor {
  constructor() {
    super()
    this.name = `titanium-${this.name}`
    this.requirements = { copper: 1, lead: 1, titanium: 1 }
  }
}
export class PlastaniumConveyor extends TransportBlock {
  constructor() {
    super({
      name: 'plastanium-conveyor',
      requirements: { plastanium: 1, silicon: 1, graphite: 1 },
      size: 1,
    })
  }

  output = {
    item: false,
    liquid: false,
  }

  // the rendering of this block cannot be done individually
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async draw(): Promise<void> {}
}
export class ArmoredConveyor extends Conveyor {
  constructor() {
    super()
    this.name = `armored-${this.name}`
    this.requirements = { plastanium: 1, thorium: 1, metaglass: 1 }
  }
}
export class Junction extends TransportBlock {
  constructor() {
    super({
      name: 'junction',
      requirements: { copper: 2 },
      size: 1,
    })
  }
}
export class ItemBridge extends TransportBlock {
  constructor() {
    super({
      name: 'bridge-conveyor',
      requirements: { lead: 6, copper: 6 },
      size: 1,
    })
  }
}
export class PhaseConveyor extends ItemBridge {
  constructor() {
    super()
    this.name = 'phase-conveyor'
    this.requirements = {
      'phase-fabric': 5,
      silicon: 7,
      lead: 10,
      graphite: 10,
    }
    this.powerConsumption = 0.3 * 60
  }
}
export class Sorter extends TransportBlock {
  constructor() {
    super({
      name: 'sorter',
      requirements: { lead: 2, copper: 2 },
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
export class InvertedSorter extends Sorter {
  constructor() {
    super()
    this.name = `inverted-${this.name}`
  }
}
export class Router extends TransportBlock {
  constructor() {
    super({
      name: 'router',
      requirements: { copper: 3 },
      size: 1,
    })
  }
}
export class Distributor extends TransportBlock {
  constructor() {
    super({
      name: 'distributor',
      requirements: { lead: 4, copper: 4 },
      size: 2,
    })
  }
}
export class OverflowGate extends TransportBlock {
  constructor() {
    super({
      name: 'overflow-gate',
      requirements: { lead: 2, copper: 4 },
      size: 1,
    })
  }
}
export class UnderflowGate extends TransportBlock {
  constructor() {
    super({
      name: 'underflow-gate',
      requirements: { lead: 2, copper: 4 },
      size: 1,
    })
  }
}
export class MassDriver extends TransportBlock {
  constructor() {
    super({
      name: 'mass-driver',
      requirements: { titanium: 125, silicon: 75, lead: 125, thorium: 50 },
      size: 3,
      powerConsumption: 1.75,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      canvas,
      category,
      tile,
      layers: [this.name + '-base'],
    })
    const tcanvas = createCanvas(this.size * 32, this.size * 32)
    const context = tcanvas.getContext('2d')
    const image = await blockAsset(category, this.name)
    const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1], // offset array
      s = 3, // thickness scale
      x = 0, // final position
      y = 0
    let i = 0
    // draw images at offsets from the array scaled by s
    for (; i < dArr.length; i += 2)
      context.drawImage(image, x + dArr[i] * s, y + dArr[i + 1] * s)

    // fill with color
    context.globalCompositeOperation = 'source-in'
    context.fillStyle = '#353535'
    context.fillRect(0, 0, tcanvas.width, tcanvas.height)

    // draw original image in normal mode
    context.globalCompositeOperation = 'source-over'
    context.drawImage(image, x, y)
    this.renderImage({
      canvas,
      image: tcanvas,
      tile,
    })
  }
}
export class PayloadConveyor extends TransportBlock {
  constructor() {
    super({
      name: 'payload-conveyor',
      requirements: { graphite: 10, copper: 20 },
      size: 3,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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
export class PayloadRouter extends TransportBlock {
  constructor() {
    super({
      name: 'payload-router',
      requirements: { graphite: 15, copper: 20 },
      size: 3,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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
