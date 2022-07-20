import { Schematic, SchematicTile } from '../../schematic'
import { Block } from './index'
import Canvas from 'canvas'
import { Items } from '../item'
import { Point2 } from '../../arc'
import { RenderingInfo } from '../../util'
import { test } from 'uvu'

test('individual block rendering', async () => {
  const canvas = Canvas.createCanvas(500, 500)
  const info = new RenderingInfo(
    new Schematic({
      height: 100,
      tags: new Map(),
      tiles: [],
      width: 100,
    }),
    canvas,
    {
      phaseBridges: {
        opacity: 1,
        render: true,
      },
      bridges: {
        opacity: 1,
        render: true,
      },
      background: true,
      conduits: {
        render: true,
      },
      conveyors: {
        render: true,
      },
    }
  )
  await info.init()
  for (const pair of Block.codes) {
    const [, block] = pair
    // items are the only configuration value curretly used, this might change in the future
    const config = /bridge|phase/.test(block.name)
      ? new Point2(3, 0)
      : Items.copper
    const tile = new SchematicTile(block, 0, 0, config, 0)
    await block.draw(tile, info)
  }
  await info.renderingQueue.execute()
})

test.run()
