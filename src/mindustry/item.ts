/**
 * Represents the items in the vanilla game
 */
export type ItemCode =
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
  [x in ItemCode]?: number
}
/** A wrapper for `ItemCode`, can be useful with `instanceof` */
export default class Item {
  constructor(public readonly code: ItemCode) {}
}
