import * as renderer from './renderer'
import { Blocks, ItemCost, ItemName } from '../mindustry'
import {
  ImageLike,
  RenderingInfo,
  SafeCanvasLike,
  ticksPerSecond,
} from '../util'
import { MindustryVersion } from './version'
import { SchematicIO } from './io'
import { SchematicTile } from './tile'

const {
  power: { PowerGenerator },
} = Blocks
export interface SchematicProperties {
  /**
   * The tiles that compose this schematic
   */
  tiles: SchematicTile[]

  /** These tags contain the schematic metadata (like its name and description) */
  tags: Map<string, string>

  /** With of the schematic in tiles */
  width: number

  /** Height of the schematic in tiles */
  height: number

  /** The base64 code that generated this schematic */
  base64?: string

  /** The version of mindustry that encoded this schematic */
  version?: MindustryVersion
}
export interface SchematicRenderingOptions<Canvas> {
  /** Options for rendering coveyors */
  conveyors?: {
    render: boolean
  }
  /** Options for rendering conduits */
  conduits?: {
    render: boolean
  }
  /** Options for rendering normal bridges */
  bridges?: {
    render?: boolean
    opacity: number
  }
  /** Options for rendering phase bridges */
  phaseBridges?: {
    render?: boolean
    opacity: number
  }
  /** The max size in pixels for this image */
  maxSize?: number
  /**
   * The size the preview must have.
   * Using this option overshadows `maxSize`
   */
  size?: number
  /** Whether the image should have a background */
  background?: boolean

  /**
   * Creates a canvas with the specified size.
   *
   * To find examples on how to use this parameter, please look at {@link getAsset}
   *  */
  createCanvas(width: number, height: number): Canvas

  /**
   * This handler must be provided to load images.
   *
   * This package does not cache images or their contents,
   * in most scenarios (like in web browsers), you won't need to cache them manually.
   * @param path The path of the asset relative to this packages' `assets` folder
   *
   * Example for web browsers
   * @example
   * schematic.render({
   *    createCanvas(width, height) {
   *      const canvas = document.createElement("canvas");
   *      canvas.width = width;
   *      canvas.height = height;
   *      return canvas;
   *    },
   *    getAsset(assetPath) {
   *      const img = document.createElement("image"); // or new Image()
   *      img.src = new URL(assetPath, "/url/to/package/assets").href;
   *      return img;
   *    }
   * });
   *
   * The example bellow runs on nodejs, using the `canvas` library.
   * @example
   *  schematic.render({
   *    createCanvas, // `createCanvas` from `canvas`
   *    getAsset(assetPath) {
   *      return loadImage(path.join("path/to/assets/folder", assetPath)); // `loadImage` from `canvas`
   *    }
   * });
   */
  getAsset(path: string): Promise<ImageLike> | ImageLike
}
/**
 * A simple representation for a mindustry schematic
 */
export class Schematic implements SchematicProperties {
  constructor(properties: SchematicProperties) {
    // this prevents the user for assignin any property through the constructor
    let version: MindustryVersion
    ;({
      tiles: this.tiles,
      height: this.height,
      tags: this.tags,
      width: this.width,
      base64: this.base64,
      version = 'v6',
    } = properties)
    this.version = version
    if (!this.description) {
      this.description = ''
    }
  }

  readonly tiles: SchematicTile[]

  readonly tags: Map<string, string>

  readonly width: number

  readonly height: number

  base64?: string

  version: MindustryVersion

  static decode(data: string | Buffer): Schematic {
    return SchematicIO.decode(data)
  }

  static encode(schematic: Schematic): string {
    return schematic.encode()
  }

  /**
   * The name of this schematic
   *
   * Shorhand for `tags.get('name')`
   */
  get name(): string {
    return this.tags.get('name') as string
  }

  set name(value: string) {
    this.tags.set('name', value)
  }

  /**
   * The description of this schematic
   *
   * Shorhand for `tags.get('name')`
   */
  get description(): string {
    return this.tags.get('description') ?? ''
  }

  set description(value: string) {
    this.tags.set('description', value)
  }

  /**
   * The amount of power this schematic can produce
   *
   * This is a separated measurement that does not interfere with `powerConsumption`
   *
   * This measurement may vary if there is an `OverdriveProjector` or an `OverdriveDome` contained in this schematic
   */
  get powerProduction(): number {
    let result = 0
    for (const tile of this.tiles) {
      result +=
        tile.block instanceof PowerGenerator
          ? tile.block.powerGeneration * ticksPerSecond
          : 0
    }
    return result
  }

  /**
   * The amount of power this schematic consumes to work properly
   *
   * This is a separated measurement that does not interfere with `powerConsumption`
   *
   * This measurement may vary if there is an `OverdriveProjector` or an `OverdriveDome` contained in this schematic
   */
  get powerConsumption(): number {
    let result = 0
    for (const tile of this.tiles) {
      result += tile.block.powerConsumption * ticksPerSecond
    }
    return result
  }

  /**
   * The overall power balance of this schematic
   */
  get powerBalance(): number {
    return this.powerProduction - this.powerConsumption
  }

  /**
   * The items needed to build this schematic
   */
  get requirements(): ItemCost {
    const requirements: ItemCost = {}
    for (const tile of this.tiles) {
      const { block } = tile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req = block.requirements
      for (const key in req) {
        // console.log(block.name, req)
        const item = key as ItemName
        const cost = req[item] as number
        const currentCost = requirements[item] ?? 0
        requirements[item] = currentCost + cost
      }
    }
    return requirements
  }

  /**
   * Converts this schematic to a base 64 string
   */
  encode(): string {
    if (!this.base64)
      throw new Error(
        'by now, the schematic needs to be generated from a SchematicDecoder'
      )
    return SchematicIO.encodeTags(this)
  }

  /**
   * Creates an image that represents this schematic's preview
   */
  async render<Canvas>(
    options: SchematicRenderingOptions<Canvas>
  ): Promise<Canvas> {
    // default options
    options.background ??= true
    options.bridges ??= { opacity: 0.7, render: true }
    options.bridges.render ??= true
    options.conduits ??= { render: true }
    options.conveyors ??= { render: true }
    options.phaseBridges ??= { opacity: 1, render: true }
    options.phaseBridges.render ??= true

    const canvas = options.createCanvas(
      this.width * 32,
      this.height * 32
    ) as unknown as SafeCanvasLike
    let size = Math.max(this.width, this.height) * 32
    if (options.background) size += 64
    if (options.size) {
      ;({ size } = options)
    } else if (options.maxSize) {
      size = Math.min(options.maxSize, size)
    }
    const renderingInfo = new RenderingInfo(
      this,
      canvas,
      options as unknown as SchematicRenderingOptions<SafeCanvasLike>
    )
    for (const tile of this.tiles) {
      await tile.block.draw(tile, renderingInfo)
    }
    await renderingInfo.renderingQueue.execute()
    const background = options.createCanvas(
      size,
      size
    ) as unknown as SafeCanvasLike
    if (options.background) {
      await renderer.drawBackground(renderingInfo, background, size)
    }
    const bcontext = background.getContext('2d')
    const border = options.background ? 64 : 0
    const scale = (size - border) / Math.max(canvas.height, canvas.width)
    const width = canvas.width * scale,
      height = canvas.height * scale
    bcontext.drawImage(
      canvas,
      (size - width) / 2,
      (size - height) / 2,
      width,
      height
    )
    return background as unknown as Canvas
  }
}
