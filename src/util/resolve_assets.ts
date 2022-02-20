import Canvas from 'canvas'
import { RenderingInfo } from './rendering_info'
import { WebSchematicRenderingOptions } from '../schematic/schematic'
import { basicJoin } from './basic_join'

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
    const { packageDirectory } = await import('pkg-dir')
    assetsFolder = basicJoin((await packageDirectory()) as string, 'assets')
  }
  return path => Canvas.loadImage(basicJoin(assetsFolder as string, path))
}
