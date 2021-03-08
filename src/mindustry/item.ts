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

export type ItemCost = {
  [x in ItemCode]?: number
}
export default class Item {
  constructor(public readonly code: ItemCode) {}
}
