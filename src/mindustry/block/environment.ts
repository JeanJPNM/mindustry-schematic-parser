import { Block } from './block'
import { RenderingInfo } from '../../util'
import { SchematicTile } from '../../schematic'

const envCategory = 'environment'
const propCategory = 'props'

export class AirBlock extends Block {
  name = 'air'

  requirements = {}

  size = 1

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async draw(): Promise<void> {}
}

abstract class EnvBlock extends Block {
  sprite?: string

  requirements = {}

  size = 1

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const name = this.sprite ?? `${this.name}1`
    await this.render({
      info,
      category: envCategory,
      layers: [name],
      tile,
    })
  }
}
abstract class PropBlock extends Block {
  sprite?: string

  requirements = {}

  size = 1

  async draw(tile: SchematicTile, info: RenderingInfo): Promise<void> {
    const name = this.sprite ?? `${this.name}1`
    await this.render({
      info,
      category: propCategory,
      layers: [name],
      tile,
    })
  }
}
export class Spawn extends EnvBlock {
  name = 'spawn'

  override sprite = this.name
}

export class Cliff extends EnvBlock {
  name = 'cliff'
}

export class Deepwater extends EnvBlock {
  name = 'deep-water'

  override sprite = this.name
}

export class Water extends EnvBlock {
  name = 'shallow-water'

  override sprite = this.name
}

export class TaintedWater extends EnvBlock {
  name = 'tainted-water'

  override sprite = this.name
}

export class DeepTaintedWater extends EnvBlock {
  name = 'deep-tainted-water'

  override sprite = this.name
}

export class DarksandTaintedWater extends EnvBlock {
  name = 'darksand-tainted-water'

  override sprite = this.name
}

export class SandWater extends EnvBlock {
  name = 'sand-water'

  override sprite = this.name
}

export class DarksandWater extends EnvBlock {
  name = 'darksand-water'

  override sprite = this.name
}

export class Tar extends EnvBlock {
  name = 'tar'

  override sprite = this.name
}

export class Cryofluid extends EnvBlock {
  name = 'pooled-cryofluid'

  override sprite = this.name
}

export class Slag extends EnvBlock {
  name = 'molten-slag'

  override sprite = this.name
}

export class Space extends EnvBlock {
  name = 'space'

  override sprite = this.name
}

export class Empty extends EnvBlock {
  name = 'empty'

  override sprite = this.name

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override async draw(): Promise<void> {}
}

export class Stone extends EnvBlock {
  name = 'stone'
}

export class Craters extends EnvBlock {
  name = 'crater-stone'
}

export class Charr extends EnvBlock {
  name = 'char'
}

export class Basalt extends EnvBlock {
  name = 'basalt'
}

export class Hotrock extends EnvBlock {
  name = 'hotrock'
}

export class Magmarock extends EnvBlock {
  name = 'magmarock'
}

export class Sand extends EnvBlock {
  name = 'sand-floor'
}

export class Darksand extends EnvBlock {
  name = 'darksand'
}

export class Dirt extends EnvBlock {
  name = 'dirt'
}

export class Mud extends EnvBlock {
  name = 'mud'
}

export class Dacite extends EnvBlock {
  name = 'dacite'
}

export class Rhyolite extends EnvBlock {
  name = 'rhyolite'
}

export class RhyoliteCrater extends EnvBlock {
  name = 'rhyolite-crater'
}

export class RoughRhyolite extends EnvBlock {
  name = 'rough-rhyolite'
}

export class Regolith extends EnvBlock {
  name = 'regolith'
}

export class YellowStone extends EnvBlock {
  name = 'yellow-stone'
}

export class CarbonStone extends EnvBlock {
  name = 'carbon-stone'
}

export class FerricStone extends EnvBlock {
  name = 'ferric-stone'
}

export class FerricCraters extends EnvBlock {
  name = 'ferric-craters'
}

export class BeryllicStone extends EnvBlock {
  name = 'beryllic-stone'
}

export class CrystallineStone extends EnvBlock {
  name = 'crystalline-stone'
}

export class CrystalFloor extends EnvBlock {
  name = 'crystal-floor'
}

export class YellowStonePlates extends EnvBlock {
  name = 'yellow-stone-plates'
}

export class RedStone extends EnvBlock {
  name = 'red-stone'
}

export class DenseRedStone extends EnvBlock {
  name = 'dense-red-stone'
}

export class RedIce extends EnvBlock {
  name = 'red-ice'
}

export class ArkyciteFloor extends EnvBlock {
  name = 'arkycite-floor'

  override sprite = this.name
}

export class ArkyicStone extends EnvBlock {
  name = 'arkyic-stone'
}

export class RhyoliteVent extends EnvBlock {
  name = 'rhyolite-vent'
}

export class CarbonVent extends EnvBlock {
  name = 'carbon-vent'
}

export class ArkyicVent extends EnvBlock {
  name = 'arkyic-vent'
}

export class YellowStoneVent extends EnvBlock {
  name = 'yellow-stone-vent'
}

export class RedStoneVent extends EnvBlock {
  name = 'red-stone-vent'
}

export class Redmat extends EnvBlock {
  name = 'redmat'
}

export class Bluemat extends EnvBlock {
  name = 'bluemat'
}

export class Grass extends EnvBlock {
  name = 'grass'
}

export class Salt extends EnvBlock {
  name = 'salt'

  override sprite = this.name
}

export class Snow extends EnvBlock {
  name = 'snow'
}

export class Ice extends EnvBlock {
  name = 'ice'
}

export class IceSnow extends EnvBlock {
  name = 'ice-snow'
}

export class Shale extends EnvBlock {
  name = 'shale'
}

export class Moss extends EnvBlock {
  name = 'moss'
}

export class CoreZone extends EnvBlock {
  name = 'core-zone'

  override sprite = this.name
}

export class SporeMoss extends EnvBlock {
  name = 'spore-moss'
}

export class StoneWall extends EnvBlock {
  name = 'stone-wall'
}

export class SporeWall extends EnvBlock {
  name = 'spore-wall'
}

export class DirtWall extends EnvBlock {
  name = 'dirt-wall'
}

export class DaciteWall extends EnvBlock {
  name = 'dacite-wall'
}

export class IceWall extends EnvBlock {
  name = 'ice-wall'
}

export class SnowWall extends EnvBlock {
  name = 'snow-wall'
}

export class DuneWall extends EnvBlock {
  name = 'dune-wall'
}

export class RegolithWall extends EnvBlock {
  name = 'regolith-wall'
}

export class YellowStoneWall extends EnvBlock {
  name = 'yellow-stone-wall'
}

export class RhyoliteWall extends EnvBlock {
  name = 'rhyolite-wall'
}

export class CarbonWall extends EnvBlock {
  name = 'carbon-wall'
}

export class FerricStoneWall extends EnvBlock {
  name = 'ferric-stone-wall'
}

export class BeryllicStoneWall extends EnvBlock {
  name = 'beryllic-stone-wall'
}

export class ArkyicWall extends EnvBlock {
  name = 'arkyic-wall'
}

export class CrystallineStoneWall extends EnvBlock {
  name = 'crystalline-stone-wall'
}

export class RedIceWall extends EnvBlock {
  name = 'red-ice-wall'
}

export class RedStoneWall extends EnvBlock {
  name = 'red-stone-wall'
}

export class RedDiamondWall extends EnvBlock {
  name = 'red-diamond-wall'
}

export class SandWall extends EnvBlock {
  name = 'sand-wall'
}

export class SaltWall extends EnvBlock {
  name = 'salt-wall'
}

export class Shrubs extends EnvBlock {
  name = 'shrubs'
}

export class ShaleWall extends EnvBlock {
  name = 'shale-wall'
}

export class SporePine extends EnvBlock {
  name = 'spore-pine'

  override sprite = this.name
}

export class SnowPine extends EnvBlock {
  name = 'snow-pine'

  override sprite = this.name
}

export class Pine extends EnvBlock {
  name = 'pine'

  override sprite = this.name
}

export class WhiteTreeDead extends PropBlock {
  name = 'white-tree-dead'

  override sprite = this.name
}

export class WhiteTree extends PropBlock {
  name = 'white-tree'

  override sprite = this.name
}

export class SporeCluster extends PropBlock {
  name = 'spore-cluster'
}

export class Redweed extends PropBlock {
  name = 'redweed'
}

export class Purbush extends PropBlock {
  name = 'pur-bush'

  override sprite = this.name
}

export class YellowCoral extends EnvBlock {
  name = 'yellowcoral'

  override sprite = this.name
}

export class Boulder extends PropBlock {
  name = 'boulder'
}

export class SnowBoulder extends PropBlock {
  name = 'snow-boulder'
}

export class ShaleBoulder extends PropBlock {
  name = 'shale-boulder'
}

export class SandBoulder extends PropBlock {
  name = 'sand-boulder'
}

export class DaciteBoulder extends PropBlock {
  name = 'dacite-boulder'
}

export class BasaltBoulder extends PropBlock {
  name = 'basalt-boulder'
}

export class CarbonBoulder extends PropBlock {
  name = 'carbon-boulder'
}

export class FerricBoulder extends PropBlock {
  name = 'ferric-boulder'
}

export class BeryllicBoulder extends PropBlock {
  name = 'beryllic-boulder'
}

export class YellowStoneBoulder extends PropBlock {
  name = 'yellow-stone-boulder'
}

export class ArkyicBoulder extends PropBlock {
  name = 'arkyic-boulder'
}

export class CrystalCluster extends PropBlock {
  name = 'crystal-cluster'
}

export class VibrantCrystalCluster extends PropBlock {
  name = 'vibrant-crystal-cluster'
}

export class CrystalBlocks extends PropBlock {
  name = 'crystal-blocks'
}

export class CrystalOrbs extends PropBlock {
  name = 'crystal-orbs'
}

export class CrystallineBoulder extends PropBlock {
  name = 'crystalline-boulder'
}

export class RedIceBoulder extends PropBlock {
  name = 'red-ice-boulder'
}

export class RhyoliteBoulder extends PropBlock {
  name = 'rhyolite-boulder'
}

export class RedStoneBoulder extends PropBlock {
  name = 'red-stone-boulder'
}

export class DarkMetal extends EnvBlock {
  name = 'dark-metal'
}

export class Pebbles extends EnvBlock {
  name = 'pebbles'
}

export class Tendrils extends EnvBlock {
  name = 'tendrils'
}

export class GraphiticWall extends EnvBlock {
  name = 'graphitic-wall'
}
