import { Block } from './index'
import { Item } from '../item'
import { SchematicTile } from '../../schematic'
import { createCanvas } from 'canvas'

test('individual block rendering', async () => {
  const canvas = createCanvas(500, 500)
  for (const pair of Block.codes) {
    const [, block] = pair
    // items are the only configuration value curretly used, this might change in the future
    const tile = new SchematicTile(block, 0, 0, Item.create('copper'), 0)
    await block.draw(tile, canvas)
  }
})
