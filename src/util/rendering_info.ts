import { Schematic, SchematicTile } from '../schematic'
import { SchematicTileMap, handlePlacement } from './graphics'
import { CanvasLike } from './canvas_types'
import { SchematicRenderingOptions } from '../schematic/schematic'

export class RenderingInfo {
  private _tileMap: SchematicTileMap | null = null

  readonly renderingQueue = new RenderingQueue()

  constructor(
    public readonly schematic: Schematic,
    public readonly canvas: CanvasLike,
    public readonly options: SchematicRenderingOptions<CanvasLike>
  ) {}

  get tileMap(): SchematicTileMap {
    if (this._tileMap === null) this._tileMap = mapTiles(this.schematic)
    return this._tileMap
  }
}
type RenderingExecutor = () => Promise<void>
class RenderingQueue {
  private _map: Map<number, RenderingExecutor[]> = new Map()

  add(level: number, executor: RenderingExecutor) {
    if (!this._map.has(level)) {
      this._map.set(level, [])
    }
    const executors = this._map.get(level) as RenderingExecutor[]
    executors.push(executor)
  }

  async execute(): Promise<void> {
    if (this._map.size === 0) return
    const keys = Array.from(this._map.keys()).sort((a, b) => a - b)

    for (const key of keys) {
      const executors = this._map.get(key) as RenderingExecutor[]
      for (const executor of executors) {
        await executor()
      }
    }
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
