import { ItemName } from './item_name'

type ItemColorMap = {
  [x in ItemName]: string
}
const itemColors: ItemColorMap = {
  copper: '#d99d73',
  lead: '#8c7fa9',
  metaglass: '#ebeef5',
  graphite: '#b2c6d2',
  sand: '#f7cba4',
  coal: '#272727',
  titanium: '#8da1e3',
  thorium: '#f9a3c7',
  scrap: '#777777',
  silicon: '#53565c',
  plastanium: '#cbd97f',
  'phase-fabric': '#f4ba6e',
  'surge-alloy': '#f3e979',
  'spore-pod': '#7457ce',
  'blast-compound': '#ff795e',
  pyratite: '#ffaa5f',
}

/** A wrapper for `ItemCode`, can be useful with `instanceof` */
export class Item {
  private static itemMap: Map<ItemName, Item> = new Map()

  readonly color: string

  private constructor(public readonly code: ItemName) {
    this.color = itemColors[code]
  }

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
      'thorium',
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
