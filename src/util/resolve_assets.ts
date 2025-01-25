import * as Canvas from 'canvas'
import { RenderingInfo } from './rendering_info'
import { WebSchematicRenderingOptions } from '../schematic/schematic'
import { basicJoin } from './basic_join'
import { buildDirName } from './constants'

let assetsFolder: string | null
export async function resolveAssets(
  info: RenderingInfo
): Promise<(name: string) => Promise<Canvas.Image>> {
  if (typeof window !== 'undefined') {
    const { assetsBaseUrl } = info.options as WebSchematicRenderingOptions
    const base = new URL(assetsBaseUrl, location.href)
    return path =>
      Canvas.loadImage(new URL(basicJoin(base.pathname, path), base).href)
  }
  if (!assetsFolder) {
    const { extname } = await import('node:path')
    const { fileURLToPath } = await import('node:url')

    const { url } = import.meta
    const file = (url ? fileURLToPath(url) : __filename).replace(/\\/g, '/')
    const codeDirName = extname(file) === '.ts' ? 'src' : buildDirName
    const rootFolder = file.slice(0, file.lastIndexOf(codeDirName))

    // assets are bundled in the dist folder
    assetsFolder = basicJoin(rootFolder, 'dist')
  }
  return path => Canvas.loadImage(basicJoin(assetsFolder as string, path))
}
