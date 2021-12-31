import { RenderingInfo, outlineImage } from '../../util'
import { Block } from './block'
import { SchematicTile } from '../../schematic'

const category = 'turrets'
abstract class Turret extends Block {
  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: ['bases/block-' + this.size],
    })

    const top = outlineImage({
      createCanvas: info.options.createCanvas,
      image: await info.blockAsset(category, this.name),
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
