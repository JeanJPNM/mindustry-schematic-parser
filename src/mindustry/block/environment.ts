import { Block } from './block'

export class AirBlock extends Block {
  constructor() {
    super({
      name: 'air',
      requirements: {},
      size: 1,
    })
  }
}
