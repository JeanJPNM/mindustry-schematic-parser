import { Block, Item, Liquid } from '../mindustry'
import { Point2 } from '../arc'

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
    public config:
      | string
      | number
      | bigint
      | boolean
      | number[]
      | Point2
      | Point2[]
      | Item
      | Liquid
      | null
      | undefined,
    /**
     * The rotation of this tile
     */
    public rotation: number
  ) {}
}
