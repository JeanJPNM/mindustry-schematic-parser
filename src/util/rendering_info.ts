import { Schematic, SchematicTile } from '../schematic'
import { SchematicTileMap, handlePlacement } from './graphics'
import Canvas from 'canvas'
import { SchematicRenderingOptions } from '../schematic/schematic'
import { basicJoin } from './basic_join'
import { resolveAssets } from './resolve_assets'

export class RenderingInfo {
  private _tileMap: SchematicTileMap | null = null

  readonly renderingQueue = new RenderingQueue()

  getAsset!: (path: string) => Promise<Canvas.Image>

  constructor(
    public readonly schematic: Schematic,
    public readonly canvas: Canvas.Canvas,
    public readonly options: SchematicRenderingOptions
  ) {
    this.blockAsset = this.blockAsset.bind(this)
  }

  get tileMap(): SchematicTileMap {
    if (this._tileMap === null) this._tileMap = mapTiles(this.schematic)
    return this._tileMap
  }

  async init(): Promise<void> {
    this.getAsset = await resolveAssets(this)
  }

  blockAsset(category: string, name: string): Promise<Canvas.Image> {
    const path = basicJoin('sprites/blocks', category, name + '.png')
    return this.getAsset(path)
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
