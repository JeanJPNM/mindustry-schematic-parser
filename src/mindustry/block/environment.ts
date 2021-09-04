import { Block } from './block'

export class AirBlock extends Block {
  name = 'air'

  requirements = {}

  size = 1

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async draw(): Promise<void> {}
}
