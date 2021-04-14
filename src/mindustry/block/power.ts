import { Block, BlockProperties } from './block'
import { blockAsset, translatePos } from '../../util'
import { Canvas } from 'canvas'
import { SchematicTile } from '../../schematic'
const category = 'power'
abstract class PowerBlock extends Block {
  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({ tile, canvas, category, layers: [this.name] })
  }
}
export class PowerNode extends PowerBlock {
  constructor() {
    super({
      name: 'power-node',
      requirements: {
        copper: 1,
        lead: 3,
      },
      size: 1,
    })
  }
}
export class PowerNodeLarge extends PowerBlock {
  constructor() {
    super({
      name: 'power-node-large',
      requirements: {
        titanium: 5,
        lead: 10,
        silicon: 3,
      },
      size: 2,
    })
  }
}
export class SurgeTower extends PowerBlock {
  constructor() {
    super({
      name: 'surge-tower',
      requirements: {
        titanium: 7,
        lead: 10,
        silicon: 15,
        'surge-alloy': 15,
      },
      size: 2,
    })
  }
}
export class Diode extends PowerBlock {
  constructor() {
    super({
      name: 'diode',
      requirements: {
        silicon: 10,
        plastanium: 5,
        metaglass: 10,
      },
      size: 1,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await super.draw(tile, canvas)
    const degrees = [0, -90, 180, 90]
    const rotation = tile.rotation % 4
    // avoid re rendering the arrow, because in this case its in the
    // correct rotation
    if (rotation === 2) return
    const context = canvas.getContext('2d')
    const { x, y } = translatePos(tile, canvas)
    const arrow = await blockAsset(category, this.name + '-arrow')
    const offset = this.size * 16
    context.save()
    context.translate(x + offset, y + offset)
    context.rotate((degrees[rotation] * Math.PI) / 180)
    context.translate(-offset, -offset)
    context.drawImage(arrow, 0, 0)
    context.restore()
  }
}
export class Battery extends PowerBlock {
  constructor() {
    super({
      name: 'battery',
      requirements: {
        copper: 5,
        lead: 20,
      },
      size: 1,
    })
  }
}
export class BatteryLarge extends PowerBlock {
  constructor() {
    super({
      name: 'battery-large',
      requirements: {
        titanium: 20,
        lead: 40,
        silicon: 20,
      },
      size: 3,
    })
  }
}
interface PowerGeneratorProperties extends BlockProperties {
  powerGeneration: number
}
export class PowerGenerator extends PowerBlock {
  constructor(properties: PowerGeneratorProperties) {
    super(properties)
    /// gets the actual amount consumed per second
    this.powerGeneration *= 60
  }

  powerGeneration!: number
}
export class CombustionGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'combustion-generator',
      requirements: {
        copper: 25,
        lead: 15,
      },
      size: 1,
      powerGeneration: 1,
    })
  }
}
export class ThermalGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'thermal-generator',
      requirements: {
        copper: 40,
        graphite: 35,
        lead: 50,
        silicon: 35,
        metaglass: 40,
      },
      size: 2,
      powerGeneration: 1.8,
    })
  }
}
export class SteamGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'steam-generator',
      requirements: {
        copper: 35,
        graphite: 25,
        lead: 40,
        silicon: 30,
      },
      size: 2,
      powerGeneration: 5.5,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      tile,
      canvas,
      category,
      layers: [
        this.name,
        this.name + '-turbine0',
        this.name + '-turbine1',
        this.name + '-cap',
      ],
    })
  }
}
export class DifferentialGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'differential-generator',
      requirements: {
        copper: 70,
        titanium: 50,
        lead: 100,
        silicon: 65,
        metaglass: 50,
      },
      size: 3,
      powerGeneration: 18,
    })
  }
}
export class RtgGenerator extends PowerGenerator {
  constructor() {
    super({
      name: 'rtg-generator',
      requirements: {
        lead: 100,
        silicon: 75,
        'phase-fabric': 25,
        plastanium: 75,
        thorium: 50,
      },
      size: 2,
      powerGeneration: 4.5,
    })
  }
}
export class SolarPanel extends PowerGenerator {
  constructor() {
    super({
      name: 'solar-panel',
      requirements: {
        lead: 10,
        silicon: 15,
      },
      size: 1,
      powerGeneration: 0.1,
    })
  }
}
export class SolarPanelLarge extends PowerGenerator {
  constructor() {
    super({
      name: 'solar-panel-large',
      requirements: {
        lead: 80,
        silicon: 110,
        'phase-fabric': 15,
      },
      size: 3,
      powerGeneration: 1.3,
    })
  }
}
export class ThoriumReactor extends PowerGenerator {
  constructor() {
    super({
      name: 'thorium-reactor',
      requirements: {
        lead: 300,
        silicon: 200,
        graphite: 150,
        thorium: 150,
        metaglass: 50,
      },
      size: 3,
      powerGeneration: 15,
    })
  }
}
export class ImpactReactor extends PowerGenerator {
  constructor() {
    super({
      name: 'impact-reactor',
      requirements: {
        lead: 500,
        silicon: 300,
        graphite: 400,
        thorium: 100,
        'surge-alloy': 250,
        metaglass: 250,
      },
      size: 4,
      powerGeneration: 130,
      powerConsumption: 25,
    })
  }

  async draw(tile: SchematicTile, canvas: Canvas): Promise<void> {
    await this.render({
      canvas,
      category,
      tile,
      layers: [this.name + '-bottom', this.name],
    })
  }
}
