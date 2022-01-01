import { Image, loadImage } from 'canvas'
import { RenderingInfo } from './rendering_info'
import { WebSchematicRenderingOptions } from '../schematic/schematic'
import { join } from 'path'

let assetsFolder: string | null
export async function resolveAssets(
  info: RenderingInfo
): Promise<(name: string) => Promise<Image>> {
  if (typeof window !== 'undefined') {
    const { assetsBaseUrl } = info.options as WebSchematicRenderingOptions
    return path => loadImage(new URL(path, assetsBaseUrl).href)
  }
  if (!assetsFolder) {
    const { default: pkgDir } = await import('pkg-dir')
    assetsFolder = join((await pkgDir()) as string, 'assets')
  }
  return path => loadImage(join(assetsFolder as string, path))
}
