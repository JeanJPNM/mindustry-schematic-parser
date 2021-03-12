/**
 * Represents the items in the vanilla game
 */
export type ItemName =
  | 'copper'
  | 'lead'
  | 'metaglass'
  | 'scrap'
  | 'graphite'
  | 'coal'
  | 'titanium'
  | 'thorium'
  | 'silicon'
  | 'plastanium'
  | 'phase-fabric'
  | 'surge-alloy'
  | 'spore-pod'
  | 'sand'
  | 'blast-compound'
  | 'pyratite'
  | 'metaglass'
/**
 * Represents item usage by an action
 */
export type ItemCost = {
  [x in ItemName]?: number
}
/** A wrapper for `ItemCode`, can be useful with `instanceof` */
export default class Item {
  constructor(public readonly code: ItemName) {}

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
    return new Item(items[code])
  }
}
