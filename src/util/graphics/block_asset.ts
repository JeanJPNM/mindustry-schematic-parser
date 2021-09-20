import { Image, loadImage } from 'canvas'
import path from 'path'
import { sync as pkgDir } from 'pkg-dir'

const blocksFolder = path.join(
  pkgDir(__dirname) as string,
  'assets/sprites/blocks'
)

export function blockAsset(category: string, name: string): Promise<Image> {
  return loadImage(path.join(blocksFolder, category, name + '.png'))
}
