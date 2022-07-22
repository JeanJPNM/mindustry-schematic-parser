import { RenderingInfo, outlineImage } from '../../util'
import { Block } from './block'
import { SchematicTile } from '../../schematic'

const category = 'turrets'
const defenseCategory = 'defense'
abstract class Turret extends Block {
  category = category

  reinforced = false

  get asset() {
    return this.name
  }

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [
        `bases/${this.reinforced ? 'reinforced-' : ''}block-${this.size}`,
      ],
    })

    const top = outlineImage({
      image: await info.blockAsset(this.category, this.asset),
      fillStyle: '#353535',
      thickness: 3,
    })

    this.renderImage({
      info,
      image: top,
      tile,
    })
  }
}
export class Duo extends Turret {
  name = 'duo'

  requirements = { copper: 35 }

  size = 1
}
export class Scatter extends Turret {
  name = 'scatter'

  requirements = { copper: 85, lead: 45 }

  size = 2
}
export class Scorch extends Turret {
  name = 'scorch'

  requirements = { copper: 25, graphite: 22 }

  size = 1
}
export class Hail extends Turret {
  name = 'hail'

  requirements = { copper: 40, graphite: 17 }

  size = 1
}
export class Wave extends Turret {
  name = 'wave'

  requirements = { metaglass: 45, lead: 75 }

  size = 2

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await super.draw(tile, info)
    await this.render({
      info,
      category,
      layers: [this.name + '-top'],
      tile,
    })
  }
}
export class Lancer extends Turret {
  name = 'lancer'

  requirements = { copper: 60, lead: 70, silicon: 50 }

  size = 2
}
export class Arc extends Turret {
  name = 'arc'

  requirements = { copper: 50, lead: 50 }

  size = 1
}
export class Parallax extends Turret {
  name = 'parallax'

  requirements = { silicon: 120, titanium: 90, graphite: 30 }

  size = 2

  override category = defenseCategory
}
export class Swarmer extends Turret {
  name = 'swarmer'

  requirements = { graphite: 35, titanium: 35, plastanium: 45, silicon: 30 }

  size = 2
}
export class Salvo extends Turret {
  name = 'salvo'

  requirements = { copper: 100, graphite: 80, titanium: 50 }

  size = 2
}
export class Segment extends Turret {
  name = 'segment'

  requirements = { silicon: 130, thorium: 80, 'phase-fabric': 40 }

  size = 2

  override category = defenseCategory
}
export class Tsunami extends Turret {
  name = 'tsunami'

  requirements = { metaglass: 100, lead: 400, titanium: 250, thorium: 100 }

  size = 3

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await super.draw(tile, info)
    await this.render({
      info,
      category,
      layers: [this.name + '-top'],
      tile,
    })
  }
}
export class Fuse extends Turret {
  name = 'fuse'

  requirements = { copper: 225, graphite: 225, thorium: 100 }

  size = 3
}
export class Ripple extends Turret {
  name = 'ripple'

  requirements = { copper: 150, graphite: 135, titanium: 60 }

  size = 3
}
export class Cyclone extends Turret {
  name = 'cyclone'

  requirements = { copper: 200, titanium: 125, plastanium: 80 }

  size = 3
}
export class Foreshadow extends Turret {
  name = 'foreshadow'

  requirements = {
    copper: 1000,
    metaglass: 600,
    'surge-alloy': 300,
    plastanium: 200,
    silicon: 600,
  }

  size = 4
}
export class Spectre extends Turret {
  name = 'spectre'

  requirements = {
    copper: 900,
    graphite: 300,
    'surge-alloy': 250,
    plastanium: 175,
    thorium: 250,
  }

  size = 4
}
export class Meltdown extends Turret {
  name = 'meltdown'

  requirements = {
    copper: 1200,
    lead: 350,
    graphite: 300,
    'surge-alloy': 325,
    silicon: 325,
  }

  size = 4
}

export class Breach extends Turret {
  name = 'breach'

  requirements = {
    beryllium: 150,
    silicon: 150,
    graphite: 250,
  }

  size = 3

  override reinforced = true
}

export class Diffuse extends Turret {
  name = 'diffuse'

  requirements = {
    beryllium: 150,
    silicon: 200,
    graphite: 200,
    tungsten: 50,
  }

  size = 3

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Sublimate extends Turret {
  name = 'sublimate'

  requirements = {
    tungsten: 150,
    silicon: 200,
    oxide: 40,
    beryllium: 400,
  }

  size = 3

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Titan extends Turret {
  name = 'titan'

  requirements = {
    tungsten: 250,
    silicon: 300,
    thorium: 400,
  }

  size = 4

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Disperse extends Turret {
  name = 'disperse'

  requirements = {
    thorium: 50,
    oxide: 150,
    silicon: 200,
    beryllium: 350,
  }

  size = 4

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Afflict extends Turret {
  name = 'afflict'

  requirements = {
    'surge-alloy': 100,
    silicon: 200,
    graphite: 250,
    oxide: 40,
  }

  size = 4

  override powerConsumption = 2

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Lustre extends Turret {
  name = 'lustre'

  requirements = {
    silicon: 250,
    graphite: 200,
    oxide: 50,
    carbide: 90,
  }

  size = 4

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Scathe extends Turret {
  name = 'scathe'

  requirements = {
    silicon: 300,
    graphite: 400,
    tungsten: 450,
    carbide: 250,
  }

  size = 4

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Smite extends Turret {
  name = 'smite'

  requirements = {
    oxide: 200,
    'surge-alloy': 400,
    silicon: 800,
    carbide: 500,
    'phase-fabric': 300,
  }

  size = 5

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}

export class Malign extends Turret {
  name = 'malign'

  requirements = {
    carbide: 400,
    beryllium: 2000,
    silicon: 800,
    graphite: 800,
    'phase-fabric': 300,
  }

  size = 5

  override powerConsumption = 5

  override reinforced = true

  override category = `${category}/${this.name}`

  override get asset(): string {
    return `${this.name}-preview`
  }
}
