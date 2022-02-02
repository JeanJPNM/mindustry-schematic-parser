import { Schematic, SchematicTile } from '../../schematic'
import { Block } from './index'
import Canvas from 'canvas'
import { Item } from '../item'
import { RenderingInfo } from '../../util'

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
    {}
  )
  await info.init()
  for (const pair of Block.codes) {
    const [, block] = pair
    // items are the only configuration value curretly used, this might change in the future
    const tile = new SchematicTile(block, 0, 0, Item.create('copper'), 0)
    await block.draw(tile, info)
  }
  await info.renderingQueue.execute()
})
