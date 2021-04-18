import * as campaign from './campaign'
import * as crafting from './crafting'
import * as defense from './defense'
import * as distribution from './distribution'
import * as environment from './environment'
import * as experimental from './experimental'
import * as liquid from './liquid'
import * as logic from './logic'
import * as power from './power'
import * as production from './production'
import * as sandbox from './sandbox'
import * as storage from './storage'
import * as turrets from './turrets'
import * as units from './units'
import { Block } from './block'
type BlockConstructor = new () => Block
type BlockConstructorMap = Record<string, BlockConstructor | undefined>
function registerBlocks(domain: BlockConstructorMap) {
  for (const k in domain) {
    const key = k as keyof typeof domain
    const Class = domain[key]
    if (Class) {
      const block = new Class()
      Block.codes.set(block.name, block)
    }
  }
}
registerBlocks(campaign)
registerBlocks(crafting)
registerBlocks({
  ...defense,
  Wall: undefined,
})
registerBlocks(distribution)
registerBlocks(environment)
registerBlocks(experimental)
registerBlocks(liquid)
registerBlocks(logic)
registerBlocks({
  ...power,
  PowerGenerator: undefined,
})
registerBlocks(production)
registerBlocks({
  ...sandbox,
  LightBlock: undefined,
})
registerBlocks(storage)
registerBlocks(turrets)
registerBlocks(units)

export const Blocks = {
  campaign,
  crafting,
  defense,
  distribution,
  environment,
  experimental,
  liquid,
  logic,
  power,
  production,
  sandbox,
  storage,
  turrets,
  units,
}
