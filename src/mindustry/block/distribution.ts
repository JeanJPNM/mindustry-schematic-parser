import { Block, BlockOutput } from './block'
import { Canvas, createCanvas } from 'canvas'
import { Item, ItemCost } from '../item'
import { blockAsset, outlineImage, tintImage } from '../../util'
import { SchematicTile } from '../../schematic'
const category = 'distribution'

abstract class TransportBlock extends Block {
  override output = BlockOutput.item

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
  name = 'conveyor'

  requirements: ItemCost = { copper: 1 }

  size = 1

  // the rendering of this block cannot be done individually
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override async draw(): Promise<void> {}
}
export class TitaniumConveyor extends Conveyor {
  override name = 'titanium-conveyor'

  override requirements = { copper: 1, lead: 1, titanium: 1 }
}
export class PlastaniumConveyor extends TransportBlock {
  name = 'plastanium-conveyor'

  requirements = { plastanium: 1, silicon: 1, graphite: 1 }

  size = 1

  // the rendering of this block cannot be done individually
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override async draw(): Promise<void> {}
}
export class ArmoredConveyor extends Conveyor {
  override name = 'armored-conveyor'

  override requirements = { plastanium: 1, thorium: 1, metaglass: 1 }
}
export class Junction extends TransportBlock {
  name = 'junction'

  requirements = { copper: 2 }

  size = 1
}
export class ItemBridge extends TransportBlock {
  name = 'bridge-conveyor'

  requirements: ItemCost = { lead: 6, copper: 6 }

  size = 1
}
export class PhaseConveyor extends ItemBridge {
  override name = 'phase-conveyor'

  override requirements = {
    'phase-fabric': 5,
    silicon: 7,
    lead: 10,
    graphite: 10,
  }

  override powerConsumption = 0.3
}
export class Sorter extends TransportBlock {
  name = 'sorter'

  requirements = { lead: 2, copper: 2 }

  size = 1

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
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
  override name = 'inverted-sorter'
}
export class Router extends TransportBlock {
  name = 'router'

  requirements = { copper: 3 }

  size = 1
}
export class Distributor extends TransportBlock {
  name = 'distributor'

  requirements = { lead: 4, copper: 4 }

  size = 2
}
export class OverflowGate extends TransportBlock {
  name = 'overflow-gate'

  requirements = { lead: 2, copper: 4 }

  size = 1
}
export class UnderflowGate extends TransportBlock {
  name = 'underflow-gate'

  requirements = { lead: 2, copper: 4 }

  size = 1
}
export class MassDriver extends TransportBlock {
  name = 'mass-driver'

  requirements = { titanium: 125, silicon: 75, lead: 125, thorium: 50 }

  size = 3

  override powerConsumption = 1.75

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      canvas,
      category,
      tile,
      layers: [this.name + '-base'],
    })

    const top = outlineImage({
      canvas: createCanvas(this.size * 32, this.size * 32),
      image: await blockAsset(category, this.name),
      fillStyle: '#353535',
      thickness: 3,
    })

    this.renderImage({
      canvas,
      image: top,
      tile,
    })
  }
}
export class Duct extends TransportBlock {
  name = 'duct'

  override output = BlockOutput.none

  override requirements = {
    graphite: 5,
    metaglass: 2,
  }

  size = 1

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override async draw(): Promise<void> {}
}
export class DuctRouter extends TransportBlock {
  name = 'duct-router'

  requirements = {
    graphite: 10,
    metaglass: 4,
  }

  size = 1

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [`ducts/${this.name}`, `ducts/${this.name}-top`],
    })
  }
}
export class DuctBridge extends TransportBlock {
  name = 'duct-bridge'

  requirements = {
    graphite: 20,
    metaglass: 8,
  }

  size = 1

  override async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [`ducts/${this.name}`],
    })
  }
}
