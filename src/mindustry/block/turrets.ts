import { Canvas, createCanvas } from 'canvas'
import { Block } from './block'
import { SchematicTile } from '../../schematic'
import { blockAsset } from '../../util'

const category = 'turrets'
abstract class Turret extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: ['bases/block-' + this.size],
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
    context.fillRect(0, 0, canvas.width, canvas.height)

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
export class Duo extends Turret {
  constructor() {
    super({
      name: 'duo',
      requirements: { copper: 35 },
      size: 1,
    })
  }
}
export class Scatter extends Turret {
  constructor() {
    super({
      name: 'scatter',
      requirements: { copper: 85, lead: 45 },
      size: 2,
    })
  }
}
export class Scorch extends Turret {
  constructor() {
    super({
      name: 'scorch',
      requirements: { copper: 25, graphite: 22 },
      size: 1,
    })
  }
}
export class Hail extends Turret {
  constructor() {
    super({
      name: 'hail',
      requirements: { copper: 40, graphite: 17 },
      size: 1,
    })
  }
}
export class Wave extends Turret {
  constructor() {
    super({
      name: 'wave',
      requirements: { metaglass: 45, lead: 75 },
      size: 2,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await super.draw(tile, canvas)
    await this.render({
      canvas,
      category,
      layers: [this.name + '-top'],
      tile,
    })
  }
}
export class Lancer extends Turret {
  constructor() {
    super({
      name: 'lancer',
      requirements: { copper: 60, lead: 70, silicon: 50 },
      size: 2,
    })
  }
}
export class Arc extends Turret {
  constructor() {
    super({
      name: 'arc',
      requirements: { copper: 50, lead: 50 },
      size: 1,
    })
  }
}
export class Parallax extends Turret {
  constructor() {
    super({
      name: 'parallax',
      requirements: { silicon: 120, titanium: 90, graphite: 30 },
      size: 2,
    })
  }
}
export class Swarmer extends Turret {
  constructor() {
    super({
      name: 'swarmer',
      requirements: { graphite: 35, titanium: 35, plastanium: 45, silicon: 30 },
      size: 2,
    })
  }
}
export class Salvo extends Turret {
  constructor() {
    super({
      name: 'salvo',
      requirements: { copper: 100, graphite: 90, titanium: 60 },
      size: 2,
    })
  }
}
export class Segment extends Turret {
  constructor() {
    super({
      name: 'segment',
      requirements: { silicon: 130, thorium: 80, 'phase-fabric': 40 },
      size: 2,
    })
  }
}
export class Tsunami extends Turret {
  constructor() {
    super({
      name: 'tsunami',
      requirements: { metaglass: 100, lead: 400, titanium: 250, thorium: 100 },
      size: 3,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await super.draw(tile, canvas)
    await this.render({
      canvas,
      category,
      layers: [this.name + '-top'],
      tile,
    })
  }
}
export class Fuse extends Turret {
  constructor() {
    super({
      name: 'fuse',
      requirements: { copper: 225, graphite: 225, thorium: 100 },
      size: 3,
    })
  }
}
export class Ripple extends Turret {
  constructor() {
    super({
      name: 'ripple',
      requirements: { copper: 150, graphite: 135, titanium: 60 },
      size: 3,
    })
  }
}
export class Cyclone extends Turret {
  constructor() {
    super({
      name: 'cyclone',
      requirements: { copper: 200, titanium: 125, plastanium: 80 },
      size: 3,
    })
  }
}
export class Foreshadow extends Turret {
  constructor() {
    super({
      name: 'foreshadow',
      requirements: {
        copper: 1000,
        metaglass: 600,
        'surge-alloy': 300,
        plastanium: 200,
        silicon: 600,
      },
      size: 4,
    })
  }
}
export class Spectre extends Turret {
  constructor() {
    super({
      name: 'spectre',
      requirements: {
        copper: 900,
        graphite: 300,
        'surge-alloy': 250,
        plastanium: 175,
        thorium: 250,
      },
      size: 4,
    })
  }
}
export class Meltdown extends Turret {
  constructor() {
    super({
      name: 'meltdown',
      requirements: {
        copper: 1200,
        lead: 350,
        graphite: 300,
        'surge-alloy': 325,
        silicon: 325,
      },
      size: 4,
    })
  }
}
