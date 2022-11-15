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
    const { fileURLToPath } = await import('url')
    const { packageDirectory } = await import('pkg-dir')
    let cwd: string
    const { url } = import.meta
    if (url) {
      const path = fileURLToPath(url).replace(/\\/g, '/')
      cwd = path.substring(0, path.lastIndexOf('/'))
    } else {
      cwd = __dirname
    }
    const rootFolder = await packageDirectory({
      cwd,
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    assetsFolder = basicJoin(rootFolder!, 'assets')
  }
  return path => Canvas.loadImage(basicJoin(assetsFolder as string, path))
}
