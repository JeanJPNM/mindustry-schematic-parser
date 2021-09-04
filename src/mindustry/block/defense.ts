import { ItemCost, ItemName } from '../item'
import { Block } from './block'
import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'

const category = 'defense'
function multiplyRequirements(requirements: ItemCost, multiplier = 4): void {
  for (const requirement in requirements) {
    const code = requirement as ItemName
    const cost = requirements[code]
    if (cost) {
      requirements[code] = cost * multiplier
    }
  }
}
abstract class DefenseBlock extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [this.name],
    })
  }
}
export abstract class Wall extends DefenseBlock {}
export class CopperWall extends Wall {
  name = 'copper-wall'

  requirements = {
    copper: 6,
  }

  size = 1
}
export class CopperWallLarge extends CopperWall {
  override name = 'copper-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class TitaniumWall extends Wall {
  name = 'titanium-wall'

  requirements = {
    titanium: 6,
  }

  size = 1
}
export class TitaniumWallLarge extends TitaniumWall {
  override name = 'titanium-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}

export class PlastaniumWall extends Wall {
  name = 'plastanium-wall'

  requirements = {
    plastanium: 5,
    metaglass: 2,
  }

  size = 1
}
export class PlastaniumWallLarge extends PlastaniumWall {
  override name = 'plastanium-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class ThoriumWall extends Wall {
  name = 'thorium-wall'

  requirements = {
    thorium: 6,
  }

  size = 1
}
export class ThoriumWallLarge extends ThoriumWall {
  override name = 'thorium-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class PhaseWall extends Wall {
  name = 'phase-wall'

  requirements = {
    'phase-fabric': 6,
  }

  size = 1
}
export class PhaseWallLarge extends PhaseWall {
  override name = 'phase-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class SurgeWall extends Wall {
  name = 'surge-wall'

  requirements = {
    'surge-alloy': 6,
  }

  size = 1
}
export class SurgeWallLarge extends SurgeWall {
  override name = 'surge-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class Door extends DefenseBlock {
  name = 'door'

  requirements = {
    titanium: 6,
    silicon: 4,
  }

  size = 1
}
export class DoorLarge extends Door {
  override name = 'door-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class ScrapWall extends Wall {
  name = 'scrap-wall'

  requirements = { scrap: 6 }

  size = 1
}
export class ScrapWallLarge extends ScrapWall {
  override name = 'scrap-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}
export class ScrapWallHuge extends ScrapWall {
  override name = 'scrap-wall-huge'

  override size = 3

  constructor() {
    super()
    multiplyRequirements(this.requirements, 9)
  }
}
export class ScrapWallGigantic extends ScrapWall {
  override name = 'scrap-wall-gigantic'

  override size = 4

  constructor() {
    super()
    multiplyRequirements(this.requirements, 16)
  }
}

export class Mender extends DefenseBlock {
  name = 'mender'

  requirements = { lead: 30, copper: 25 }

  size = 1

  override powerConsumption = 0.3
}
export class MendProjector extends DefenseBlock {
  name = 'mend-projector'

  requirements = { lead: 100, titanium: 25, silicon: 40 }

  size = 2

  override powerConsumption = 1.5
}
export class OverdriveProjector extends DefenseBlock {
  name = 'overdrive-projector'

  requirements = { lead: 100, titanium: 75, silicon: 75, plastanium: 30 }

  size = 2

  override powerConsumption = 3.5
}
export class OverdriveDome extends DefenseBlock {
  name = 'overdrive-dome'

  requirements = {
    lead: 200,
    titanium: 130,
    silicon: 130,
    plastanium: 80,
    'surge-alloy': 120,
  }

  size = 3

  override powerConsumption = 10.0
}
export class ForceProjector extends DefenseBlock {
  name = 'force-projector'

  requirements = { lead: 100, titanium: 75, silicon: 125 }

  size = 3

  override powerConsumption = 4.0
}
export class ShockMine extends DefenseBlock {
  name = 'shock-mine'

  requirements = { lead: 25, silicon: 12 }

  size = 1
}
