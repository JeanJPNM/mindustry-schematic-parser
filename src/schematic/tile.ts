import { Block } from '../mindustry'

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
    public config: unknown,
    /**
     * The rotation of this tile
     */
    public rotation: number
  ) {}
}
