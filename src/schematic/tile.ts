import { Block, Item, Liquid } from '../mindustry'
import { Point2, Vec2 } from '../arc'

export type SchematicTileConfig =
  | Liquid
  | Item
  | Point2
  | Vec2
  | null
  | undefined
  | number
  | bigint
  | string
  | boolean
  | SchematicTileConfig[]

export class SchematicTile {
  constructor(
    /**
     * The block occupying this tile
     */
    public block: Block,
    /**
     * The x coordinate of this tile
     */
    public x: number,
    /**
     * The y coordinate of this tile
     */
    public y: number,
    /**
     * The configuration of this tile (varies according to the block), may be `undefined` or `null`
     */
    public config: SchematicTileConfig,
    /**
     * The rotation of this tile
     */
    public rotation: TileRotation
  ) {}
}
export enum TileRotation {
  right,
  top,
  left,
  bottom,
}
