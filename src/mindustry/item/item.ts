import { ItemName } from './item_name'

/** A wrapper for `ItemCode`, can be useful with `instanceof` */
export class Item {
  private static itemMap: Map<ItemName, Item> = new Map()

  private constructor(public readonly code: ItemName) {}

  static create(name: ItemName): Item {
    let item = this.itemMap.get(name)
    if (!item) {
      item = new Item(name)
      this.itemMap.set(name, item)
    }
    return item
  }

  static fromCode(code: number): Item {
    const items: ItemName[] = [
      'copper',
      'lead',
      'metaglass',
      'graphite',
      'sand',
      'coal',
      'titanium',
      'scrap',
      'silicon',
      'plastanium',
      'phase-fabric',
      'surge-alloy',
      'spore-pod',
      'blast-compound',
      'pyratite',
    ]
    if (code > items.length - 1) throw new Error('Unknown item code: ' + code)
    const name = items[code]
    const item = this.itemMap.get(name) ?? this.create(name)
    return item
  }
}
