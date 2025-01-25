import { ItemCost, ItemName } from '../item'
import {
  RenderingInfo,
  defaultTeamColor,
  drawRotatedTile,
  tintImage,
} from '../../util'
import { Block } from './block'
import { SchematicTile } from '../../schematic'

const category = 'defense'

const wallCategory = 'walls'

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
  draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })
  }
}

export abstract class Wall extends DefenseBlock {
  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category: wallCategory,
      layers: [this.name],
    })
  }
}

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
export class Door extends Wall {
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

  hasVariants = true

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category: wallCategory,
      layers: [this.hasVariants ? this.name + '1' : this.name],
    })
  }
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

  override hasVariants = false

  constructor() {
    super()
    multiplyRequirements(this.requirements, 16)
  }
}

export class Thruster extends Wall {
  name = 'thruster'

  requirements = { scrap: 96 }

  size = 4

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      category: wallCategory,
      info,
      layers: [this.name],
    })

    drawRotatedTile({
      canvas: info.canvas,
      image: info.blockSprite(wallCategory, this.name + '-top'),
      tile,
    })
  }
}

export class BerylliumWall extends Wall {
  name = 'beryllium-wall'

  requirements = {
    beryllium: 6,
  }

  size = 1
}

export class BerylliumWallLarge extends BerylliumWall {
  override name = 'beryllium-wall-large'

  override size = 4

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}

export class TungstenWall extends Wall {
  name = 'tungsten-wall'

  requirements = {
    tungsten: 6,
  }

  size = 1
}

export class TungstenWallLarge extends TungstenWall {
  override name = 'tungsten-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}

export class BlastDoor extends Wall {
  name = 'blast-door'

  requirements = {
    tungsten: 24,
    silicon: 24,
  }

  size = 2
}

export class ReinforcedSurgeWall extends Wall {
  name = 'reinforced-surge-wall'

  requirements = {
    surgeAlloy: 6,
    tungsten: 2,
  }

  size = 1
}

export class ReinforcedSurgeWallLarge extends ReinforcedSurgeWall {
  override name = 'reinforced-surge-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}

export class CarbideWall extends Wall {
  name = 'carbide-wall'

  requirements = {
    thorium: 6,
    carbide: 6,
  }

  size = 1
}

export class CarbideWallLarge extends CarbideWall {
  override name = 'carbide-wall-large'

  override size = 2

  constructor() {
    super()
    multiplyRequirements(this.requirements)
  }
}

export class ShieldedWall extends Wall {
  name = 'shielded-wall'

  requirements = {
    'phase-fabric': 20,
    'surge-alloy': 12,
  }

  size = 2

  override powerConsumption = 3 / 60
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

export class Radar extends DefenseBlock {
  name = 'radar'

  requirements = {
    silicon: 60,
    graphite: 50,
    beryllium: 10,
  }

  size = 1

  override powerConsumption = 0.6

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-base', this.name],
    })
  }
}

export class BuildTower extends DefenseBlock {
  name = 'build-tower'

  requirements = {
    silicon: 150,
    oxide: 40,
    thorium: 60,
  }

  size = 3

  override powerConsumption = 3

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name + '-base', this.name],
    })
  }
}

export class RegenProjector extends DefenseBlock {
  name = 'regen-projector'

  requirements = {
    silicon: 80,
    tungsten: 60,
    oxide: 40,
    beryllium: 80,
  }

  size = 3

  override powerConsumption = 1
}

export class BarrierProjector extends DefenseBlock {
  name = 'barrier-projector'

  requirements = {
    'surge-alloy': 100,
    silicon: 125,
  }

  size = 3

  override powerConsumption = 4

  override draw(tile: SchematicTile, info: RenderingInfo): void {
    this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })

    const detail = info.blockSprite(category, this.name + '-team')
    this.renderImage({
      tile,
      info,
      image: tintImage(detail, defaultTeamColor),
    })
  }
}

export class ShockwaveTower extends DefenseBlock {
  name = 'shockwave-tower'

  requirements = {
    'surge-alloy': 50,
    silicon: 150,
    oxide: 30,
    tungsten: 100,
  }

  size = 3

  override powerConsumption = 80 / 60
}

export class ShieldProjector extends DefenseBlock {
  name = 'shield-projector'

  //  TODO: this hasn't been defined on the game's source code yet
  requirements = {}

  size = 3

  override powerConsumption = 5
}

export class LargeShieldProjector extends DefenseBlock {
  name = 'large-shield-projector'

  //  TODO: this hasn't been defined on the game's source code yet
  requirements = {}

  size = 4

  override powerConsumption = 5
}
