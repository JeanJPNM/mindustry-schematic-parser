import { Image, loadImage } from 'canvas'
import { blocksFolder } from '../../mindustry/block/block'
import path from 'path'

export function blockAsset(category: string, name: string): Promise<Image> {
  return loadImage(path.join(blocksFolder, category, name + '.png'))
}
