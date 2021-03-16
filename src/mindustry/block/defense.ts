import { Block, BlockProperties } from './block'
import { ItemCost, ItemName } from '../item'
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
interface WallProperties extends BlockProperties {
  name: string
}
export abstract class Wall extends DefenseBlock {
  constructor(properties: WallProperties) {
    const { requirements, size } = properties
    super({
      name: `${properties.name}-wall`,
      requirements,
      size,
    })
  }
}
export class CopperWall extends Wall {
  constructor() {
    super({
      name: 'copper',
      requirements: {
        copper: 6,
      },
      size: 1,
    })
  }
}
export class CopperWallLarge extends CopperWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class TitaniumWall extends Wall {
  constructor() {
    super({
      name: 'titanium',
      requirements: {
        titanium: 6,
      },
      size: 1,
    })
  }
}
export class TitaniumWallLarge extends TitaniumWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class PlastaniumWall extends Wall {
  constructor() {
    super({
      name: 'plastanium',
      requirements: {
        plastanium: 5,
        metaglass: 2,
      },
      size: 1,
    })
  }
}
export class PlastaniumWallLarge extends PlastaniumWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class ThoriumWall extends Wall {
  constructor() {
    super({
      name: 'thorium',
      requirements: {
        thorium: 6,
      },
      size: 1,
    })
  }
}
export class ThoriumWallLarge extends ThoriumWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class PhaseWall extends Wall {
  constructor() {
    super({
      name: 'phase',
      requirements: {
        'phase-fabric': 6,
      },
      size: 1,
    })
  }
}
export class PhaseWallLarge extends PhaseWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class SurgeWall extends Wall {
  constructor() {
    super({
      name: 'surge',
      requirements: {
        'surge-alloy': 6,
      },
      size: 1,
    })
  }
}
export class SurgeWallLarge extends SurgeWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class Door extends DefenseBlock {
  constructor() {
    super({
      name: 'door',
      requirements: {
        titanium: 6,
        silicon: 4,
      },
      size: 1,
    })
  }
}
export class DoorLarge extends Door {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class ScrapWall extends Wall {
  constructor() {
    super({
      name: 'scrap',
      requirements: {
        scrap: 6,
      },
      size: 1,
    })
  }
}
export class ScrapWallLarge extends ScrapWall {
  constructor() {
    super()
    this.name += '-large'
    this.size = 2
    multiplyRequirements(this.requirements)
  }
}
export class ScrapWallHuge extends ScrapWall {
  constructor() {
    super()
    this.name += '-huge'
    this.size = 3
    multiplyRequirements(this.requirements, 9)
  }
}
export class ScrapWallGigantic extends ScrapWall {
  constructor() {
    super()
    this.name += '-gigantic'
    this.size = 4
    multiplyRequirements(this.requirements, 16)
  }
}

export class Mender extends DefenseBlock {
  constructor() {
    super({
      name: 'mender',
      requirements: { lead: 30, copper: 25 },
      size: 1,
      powerConsumption: 0.3,
    })
  }
}
export class MendProjector extends DefenseBlock {
  constructor() {
    super({
      name: 'mend-projector',
      requirements: { lead: 100, titanium: 25, silicon: 40 },
      size: 2,
      powerConsumption: 1.5,
    })
  }
}
export class OverdriveProjector extends DefenseBlock {
  constructor() {
    super({
      name: 'overdrive-projector',
      requirements: { lead: 100, titanium: 75, silicon: 75, plastanium: 30 },
      size: 2,
      powerConsumption: 3.5,
    })
  }
}
export class OverdriveDome extends DefenseBlock {
  constructor() {
    super({
      name: 'overdrive-dome',
      requirements: {
        lead: 200,
        titanium: 130,
        silicon: 130,
        plastanium: 80,
        'surge-alloy': 120,
      },
      size: 3,
      powerConsumption: 10.0,
    })
  }
}
export class ForceProjector extends DefenseBlock {
  constructor() {
    super({
      name: 'force-projector',
      requirements: { lead: 100, titanium: 75, silicon: 125 },
      size: 3,
      powerConsumption: 4.0,
    })
  }
}
export class ShockMine extends DefenseBlock {
  constructor() {
    super({
      name: 'shock-mine',
      requirements: { lead: 25, silicon: 12 },
      size: 1,
    })
  }
}
