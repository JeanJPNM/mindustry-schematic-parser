import { Image, loadImage } from 'canvas'
import { RenderingInfo } from './rendering_info'
import { WebSchematicRenderingOptions } from '../schematic/schematic'
import { basicJoin } from './basic_join'

let assetsFolder: string | null
export async function resolveAssets(
  info: RenderingInfo
): Promise<(name: string) => Promise<Image>> {
  if (typeof window !== 'undefined') {
    const { assetsBaseUrl } = info.options as WebSchematicRenderingOptions
    const base = new URL(assetsBaseUrl, location.href)
    return path => loadImage(new URL(basicJoin(base.pathname, path), base).href)
  }
  if (!assetsFolder) {
    const { default: pkgDir } = await import('pkg-dir')
    assetsFolder = basicJoin((await pkgDir()) as string, 'assets')
  }
  return path => loadImage(basicJoin(assetsFolder as string, path))
}
