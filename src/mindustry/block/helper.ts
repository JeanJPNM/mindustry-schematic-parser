import { Canvas, Image } from 'canvas'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

export interface BlockRenderingOptions {
  tile: SchematicTile
  info: RenderingInfo
  category: string
  layers: string[]
}
export interface BlockImageRenderingOptions {
  tile: SchematicTile
  info: RenderingInfo
  image: Image | Canvas
}

/**
 * Flagged enum with the different output types that a block can have
 *
 * Because this enum is flagged, it can hold more than one value at a time.
 *
 * You can use the `Flags` class to make value checking easier
 *
 * @example
 *    // check if the value has both item and liquid
 *    Flags.has(myValue, BlockOutput.item | BlockOutput.liquid)
 */
export enum BlockOutput {
  none = 0,
  item = 2 << 0,
  liquid = 2 << 1,
  payload = 2 << 2,
  duct = 2 << 3,
}
export enum BlockOutputDirection {
  none = 0,
  front = 2 << 0,
  back = 2 << 1,
  left = 2 << 2,
  right = 2 << 3,
  all = front | back | left | right,
}

/**
 * Aliases that the game has for some blocks
 */
export const blockAliases = {
  'dart-mech-pad': 'legacy-mech-pad',
  'dart-ship-pad': 'legacy-mech-pad',
  'javelin-ship-pad': 'legacy-mech-pad',
  'trident-ship-pad': 'legacy-mech-pad',
  'glaive-ship-pad': 'legacy-mech-pad',
  'alpha-mech-pad': 'legacy-mech-pad',
  'tau-mech-pad': 'legacy-mech-pad',
  'omega-mech-pad': 'legacy-mech-pad',
  'delta-mech-pad': 'legacy-mech-pad',

  'draug-factory': 'legacy-unit-factory',
  'spirit-factory': 'legacy-unit-factory',
  'phantom-factory': 'legacy-unit-factory',
  'wraith-factory': 'legacy-unit-factory',
  'ghoul-factory': 'legacy-unit-factory-air',
  'revenant-factory': 'legacy-unit-factory-air',
  'dagger-factory': 'legacy-unit-factory',
  'crawler-factory': 'legacy-unit-factory',
  'titan-factory': 'legacy-unit-factory-ground',
  'fortress-factory': 'legacy-unit-factory-ground',

  'mass-conveyor': 'payload-conveyor',
  vestige: 'scepter',
  'turbine-generator': 'steam-generator',

  rocks: 'stone-wall',
  sporerocks: 'spore-wall',
  icerocks: 'ice-wall',
  dunerocks: 'dune-wall',
  sandrocks: 'sand-wall',
  shalerocks: 'shale-wall',
  snowrocks: 'snow-wall',
  saltrocks: 'salt-wall',
  dirtwall: 'dirt-wall',

  ignarock: 'basalt',
  holostone: 'dacite',
  'holostone-wall': 'dacite-wall',
  rock: 'boulder',
  snowrock: 'snow-boulder',
  cliffs: 'stone-wall',
  craters: 'crater-stone',
  deepwater: 'deep-water',
  water: 'shallow-water',
  slag: 'molten-slag',

  cryofluidmixer: 'cryofluid-mixer',
  'block-forge': 'constructor',
  'block-unloader': 'payload-unloader',
  'block-loader': 'payload-loader',
}
