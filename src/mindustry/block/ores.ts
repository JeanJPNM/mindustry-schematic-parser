import { Block } from './block'
import { ItemName } from '../item'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

abstract class Ore extends Block {
  name: string

  requirements = {}

  size = 1

  constructor(public item: ItemName | string) {
    super()
    this.name = `ore-${item}`
  }

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category: 'environment',
      layers: [`${this.name}1`],
      tile,
    })
  }
}

export class OreCopper extends Ore {
  constructor() {
    super('copper')
  }
}
export class OreLead extends Ore {
  constructor() {
    super('lead')
  }
}
export class OreScrap extends Ore {
  constructor() {
    super('scrap')
  }
}
export class OreCoal extends Ore {
  constructor() {
    super('coal')
  }
}
export class OreTitanium extends Ore {
  constructor() {
    super('titanium')
  }
}
export class OreThorium extends Ore {
  constructor() {
    super('thorium')
  }
}

export class OreBeryllium extends Ore {
  constructor() {
    super('beryllium')
  }
}

export class OreTungsten extends Ore {
  constructor() {
    super('tungsten')
  }
}

export class OreCrystalThorium extends Ore {
  constructor() {
    super('crystal-thorium')
  }
}

export class WallOreThorium extends Ore {
  constructor() {
    super('wall-thorium')
  }
}

export class WallOreBeryllium extends Ore {
  constructor() {
    super('wall-beryllium')
  }
}

export class GraphiticWall extends Block {
  name = 'graphitic-wall'

  requirements = {}

  size = 1

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      category: 'environment',
      info,
      layers: [this.name + '1'],
      tile,
    })
  }
}

export class OreWallTungsten extends Ore {
  constructor() {
    super('wall-tungsten')
  }
}
