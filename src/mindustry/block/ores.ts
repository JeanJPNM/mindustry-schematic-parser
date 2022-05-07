import { Block } from './block'
import { ItemName } from '../item'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

abstract class Ore extends Block {
  name: string

  requirements = {}

  size = 1

  constructor(public item: ItemName) {
    super()
    this.name = `ore-${item}`
  }

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      info,
      category: 'environment',
      layers: [`${this.item}1`],
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
