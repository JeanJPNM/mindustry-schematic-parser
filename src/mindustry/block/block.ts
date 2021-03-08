import { ItemCost } from '../item'
import { UnlockableContent } from '../content'
export interface BlockProperties {
  name: string
  requirements: ItemCost
  size: number
  powerConsumption?: number
}
/**
 * A generic way to represent a block
 */
export abstract class Block
  extends UnlockableContent
  implements BlockProperties {
  constructor(properties: BlockProperties) {
    super(properties.name)
    Object.assign(this, properties)
    // converts the consumption in ticks to seconds
    this.powerConsumption *= 60
  }

  requirements!: ItemCost

  size!: number

  powerConsumption = 0
}
