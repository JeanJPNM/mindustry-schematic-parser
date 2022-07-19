import { BlockOutput, BlockOutputDirection } from './helper'
import {
  ConnectionSupport,
  RenderingInfo,
  drawConfigBridge,
  getChainedSpriteVariation,
  getConnections,
  tileRotationToAngle,
  translatePos,
} from '../../util'
import { Block } from './block'
import { ItemCost } from '../item'
import { SchematicTile } from '../../schematic'

const category = 'liquid'
abstract class Pump extends Block {
  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
  }
}

export class MechanicalPump extends Pump {
  name = 'mechanical-pump'

  requirements = { copper: 15, metaglass: 10 }

  size = 1
}
export class RotaryPump extends Pump {
  name = 'rotary-pump'

  requirements = { copper: 70, metaglass: 50, silicon: 20, titanium: 35 }

  size = 2

  override powerConsumption = 0.3
}
export class ImpulsePump extends Pump {
  name = 'impulse-pump'

  requirements = {
    copper: 80,
    metaglass: 90,
    silicon: 30,
    titanium: 40,
    thorium: 35,
  }

  size = 3

  override powerConsumption = 1.3
}
export class Conduit extends Block {
  name = 'conduit'

  requirements = { metaglass: 1 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.front

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, ConnectionSupport.regular)
    const { imageIndex, scaleX, scaleY } = getChainedSpriteVariation(
      tile,
      connections
    )
    const { x, y } = translatePos(tile, info.canvas)
    const context = info.canvas.getContext('2d')
    const image = await info.blockAsset(
      `${category}/conduits`,
      `${tile.block.name}-top-${imageIndex}`
    )
    context.save()
    context.translate(x + 16, y + 16)
    context.scale(scaleX, scaleY)
    context.rotate(tileRotationToAngle(tile.rotation))
    context.translate(-16, -16)
    context.drawImage(image, 0, 0)
    context.restore()
  }
}
export class PulseConduit extends Conduit {
  override name = 'pulse-conduit'

  override requirements = { titanium: 2, metaglass: 1 }
}
export class PlatedConduit extends Conduit {
  override name = 'plated-conduit'

  override requirements = { thorium: 2, metaglass: 1, plastanium: 1 }

  override async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const connections = getConnections(tile, info, [
      ConnectionSupport.strict,
      Conduit,
    ])
    const { imageIndex, scaleX, scaleY } = getChainedSpriteVariation(
      tile,
      connections
    )
    const { x, y } = translatePos(tile, info.canvas)
    const context = info.canvas.getContext('2d')
    const image = await info.blockAsset(
      `${category}/conduits`,
      `${tile.block.name}-top-${imageIndex}`
    )
    context.save()
    context.translate(x + 16, y + 16)
    context.scale(scaleX, scaleY)
    context.rotate(tileRotationToAngle(tile.rotation))
    context.translate(-16, -16)
    context.drawImage(image, 0, 0)
    context.restore()
  }
}
export class LiquidRouter extends Block {
  name = 'liquid-router'

  requirements: ItemCost = { graphite: 4, metaglass: 2 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name + '-bottom', this.name],
    })
  }
}
export class LiquidTank extends LiquidRouter {
  override name = 'liquid-tank'

  override requirements = { titanium: 25, metaglass: 25 }

  override size = 3
}
export class LiquidJunction extends Block {
  name = 'liquid-junction'

  requirements = { graphite: 2, metaglass: 2 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({ tile, info, category, layers: [this.name] })
  }
}
export class BridgeConduit extends Block {
  name = 'bridge-conduit'

  requirements: ItemCost = { graphite: 4, metaglass: 8 }

  size = 1

  override output = BlockOutput.liquid

  override outputDirection = BlockOutputDirection.all

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    await this.render({
      tile,
      info,
      category,
      layers: [this.name],
    })

    const type = this instanceof PhaseConduit ? 'phaseBridges' : 'bridges'
    if (info.options[type]?.render) {
      info.renderingQueue.add(1, () =>
        drawConfigBridge({
          tile,
          info,
          category,
          opacity: info.options[type]?.opacity,
        })
      )
    }
  }
}
export class PhaseConduit extends BridgeConduit {
  override name = 'phase-conduit'

  override powerConsumption = 0.3

  override requirements = {
    'phase-fabric': 5,
    silicon: 7,
    metaglass: 20,
    titanium: 10,
  }
}
