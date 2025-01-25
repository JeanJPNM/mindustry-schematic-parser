import * as Canvas from 'canvas'
import { Schematic, SchematicTile } from '../schematic'
import { SchematicTileMap, handlePlacement } from './graphics'
import { Sprite, isSpritesheetLoaded, loadSpritesheet } from './sprite'
import { SchematicRenderingOptions } from '../schematic/schematic'
import { coordinates } from 'virtual:sprites'
import { resolveAssets } from './resolve_assets'
import { spriteSheetName } from './constants'

export class RenderingInfo {
  private _tileMap: SchematicTileMap | null = null

  readonly renderingQueue = new RenderingQueue()

  constructor(
    public readonly schematic: Schematic,
    public readonly canvas: Canvas.Canvas,
    public readonly options: SchematicRenderingOptions
  ) {
    this.blockSprite = this.blockSprite.bind(this)
  }

  get tileMap(): SchematicTileMap {
    if (this._tileMap === null) this._tileMap = mapTiles(this.schematic)
    return this._tileMap
  }

  async init(): Promise<void> {
    if (isSpritesheetLoaded()) return

    const getAsset = await resolveAssets(this)
    loadSpritesheet(await getAsset(spriteSheetName))
  }

  blockSprite(category: string, name: string): Sprite {
    const { x, y, width, height } = coordinates[`blocks/${category}/${name}`]

    return Sprite.block(x, y, width, height)
  }
}
type RenderingExecutor = () => void
class RenderingQueue {
  private _map: Map<number, RenderingExecutor[]> = new Map()

  add(level: number, executor: RenderingExecutor) {
    if (!this._map.has(level)) {
      this._map.set(level, [])
    }
    const executors = this._map.get(level) as RenderingExecutor[]
    executors.push(executor)
  }

  execute(): void {
    if (this._map.size === 0) return
    const keys = Array.from(this._map.keys()).sort((a, b) => a - b)

    for (const key of keys) {
      const executors = this._map.get(key) as RenderingExecutor[]
      for (const executor of executors) {
        executor()
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
