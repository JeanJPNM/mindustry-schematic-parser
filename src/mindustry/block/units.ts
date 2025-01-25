import { BlockOutput, BlockOutputDirection } from './helper'
import { RenderingInfo, drawRotatedTile, outlineImage } from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'
import { TileRotation } from '../../schematic/tile'

const category = 'units'
const payloadCategory = 'payload'

abstract class Factory extends Block {
  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
    drawRotatedTile({
      canvas: info.canvas,
      image: info.blockSprite(payloadCategory, 'factory-out-' + this.size),
      tile,
    })
    this.render({
      tile,
      info,
      category: payloadCategory,
      layers: ['factory-top-' + this.size],
    })
  }
}

abstract class Reconstructor extends Block {
  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })

    const input = info.blockSprite(payloadCategory, 'factory-in-' + this.size)
    const output = info.blockSprite(payloadCategory, 'factory-out-' + this.size)
    drawRotatedTile({
      canvas: info.canvas,
      image: input,
      tile,
    })
    drawRotatedTile({
      canvas: info.canvas,
      image: output,
      tile,
    })

    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-top'],
    })
  }
}

abstract class Fabricator extends Block {
  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
    drawRotatedTile({
      canvas: info.canvas,
      image: info.blockSprite(payloadCategory, `factory-out-${this.size}-dark`),
      tile,
    })
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-top'],
    })
  }
}

export class CommandCenter extends Block {
  name = 'command-center'

  requirements = { copper: 200, lead: 250, silicon: 250, graphite: 100 }

  size = 2

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  draw(tile: SchematicTile, info: RenderingInfo): void {}
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

  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-base', this.name],
    })

    const top = outlineImage({
      image: info.blockSprite(category, this.name),
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
export class RepairTurret extends RepairPoint {
  override name = 'repair-turret'

  override requirements = { silicon: 90, thorium: 80, plastanium: 60 }

  override size = 2

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category: 'turrets',
      layers: ['bases/block-2'],
    })
    const top = outlineImage({
      image: info.blockSprite(category, this.name),
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

export class ResupplyPoint extends Block {
  name = 'resupply-point'

  requirements = { lead: 20, copper: 15, silicon: 15 }

  size = 2

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  draw(tile: SchematicTile, info: RenderingInfo): void {}
}

export class TankFabricator extends Fabricator {
  name = 'tank-fabricator'

  requirements = {
    silicon: 200,
    beryllium: 150,
  }

  size = 3

  override powerConsumption = 2
}

export class ShipFabricator extends Fabricator {
  name = 'ship-fabricator'

  requirements = {
    silicon: 250,
    beryllium: 200,
  }

  size = 3

  override powerConsumption = 2
}

export class MechFabricator extends Fabricator {
  name = 'mech-fabricator'

  requirements = {
    silicon: 200,
    graphite: 300,
    tungsten: 60,
  }

  size = 3

  override powerConsumption = 2
}

export class TankRefabricator extends Fabricator {
  name = 'tank-refabricator'

  requirements = {
    beryllium: 200,
    tungsten: 80,
    silicon: 100,
  }

  size = 3

  override powerConsumption = 3
}

export class MechRefabricator extends Fabricator {
  name = 'mech-refabricator'

  requirements = {
    beryllium: 250,
    tungsten: 120,
    silicon: 150,
  }

  size = 3

  override powerConsumption = 2.5
}

export class ShipRefabricator extends Fabricator {
  name = 'ship-refabricator'

  requirements = {
    beryllium: 200,
    tungsten: 100,
    silicon: 40,
  }

  size = 3

  override powerConsumption = 2.5
}

export class PrimeRefabricator extends Fabricator {
  name = 'prime-refabricator'

  requirements = {
    thorium: 250,
    oxide: 200,
    tungsten: 200,
    silicon: 400,
  }

  size = 5

  override powerConsumption = 5
}

export class TankAssembler extends Fabricator {
  name = 'tank-assembler'

  requirements = {
    thorium: 500,
    oxide: 150,
    carbide: 80,
    silicon: 500,
  }

  size = 5

  override powerConsumption = 3
}

export class ShipAssembler extends Fabricator {
  name = 'ship-assembler'

  requirements = {
    carbide: 100,
    oxide: 200,
    tungsten: 500,
    silicon: 800,
    thorium: 400,
  }

  size = 5

  override powerConsumption = 3
}

export class MechAssembler extends Fabricator {
  name = 'mech-assembler'

  requirements = {
    carbide: 200,
    thorium: 600,
    oxide: 200,
    tungsten: 500,
    silicon: 900,
  }

  size = 5

  override powerConsumption = 3
}

export class BasicAssemblerModule extends Block {
  name = 'basic-assembler-module'

  requirements = {
    carbide: 300,
    thorium: 500,
    oxide: 200,
    'phase-fabric': 400,
  }

  size = 5

  override output = BlockOutput.payload

  override outputDirection = BlockOutputDirection.front

  override powerConsumption = 4

  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
    const { rotation } = tile

    const sideName =
      rotation === TileRotation.right || rotation === TileRotation.top
        ? '-side1'
        : '-side2'
    const side = info.blockSprite(category, this.name + sideName)

    drawRotatedTile({
      canvas: info.canvas,
      tile,
      image: side,
    })
  }
}

export class UnitRepairTower extends Block {
  name = 'unit-repair-tower'

  requirements = {
    graphite: 90,
    silicon: 90,
    tungsten: 80,
  }

  size = 2

  override powerConsumption = 1

  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({ tile, info, category, layers: [this.name] })
  }
}
