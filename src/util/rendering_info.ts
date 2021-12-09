import { Schematic, SchematicTile } from '../schematic'
import { SchematicTileMap, handlePlacement } from '../schematic/renderer'
import { Canvas } from 'canvas'

export class RenderingInfo {
  private _tileMap: SchematicTileMap | null = null

  constructor(
    public readonly schematic: Schematic,
    public readonly canvas: Canvas
  ) {}

  get tileMap(): SchematicTileMap {
    if (this._tileMap === null) this._tileMap = mapTiles(this.schematic)
    return this._tileMap
  }
}

function mapTiles(schematic: Schematic): SchematicTileMap {
  const { width } = schematic
  const result: SchematicTile[][] = []
  for (let x = 0; x < width; x++) {
    result[x] = []
  }
  for (const tile of schematic.tiles) {
    const { size } = tile.block
    const start = handlePlacement(tile)
    const end = {
      x: start.x + size,
      y: start.y + size,
    }
    for (let { x } = start; x < end.x && x < schematic.width; x++) {
      for (let { y } = start; y < end.y && y < schematic.height; y++) {
        result[x][y] = tile
      }
    }
  }
  return result
}
