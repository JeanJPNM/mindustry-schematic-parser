import * as campaign from './campaign'
import * as crafting from './crafting'
import * as defense from './defense'
import * as distribution from './distribution'
import * as environment from './environment'
import * as experimental from './experimental'
import * as liquid from './liquid'
import * as logic from './logic'
import * as power from './power'
import * as production from './production'
import * as sandbox from './sandbox'
import * as storage from './storage'
import * as turrets from './turrets'
import * as units from './units'

import { Block } from './block'

const codes: Map<string, Block> = new Map()
export function BlockfromCode(code: string): Block {
  const block = codes.get(code)
  if (block) {
    return block
  }
  throw new Error('the block is not registered not exist')
}
export const Blocks = {
  launchPad: new campaign.LaunchPad(),
  launchPadLarge: new campaign.LaunchPadLarge(),
  interplanetaryAccelerator: new campaign.InterplanetaryAccelerator(),
  graphitePress: new crafting.GraphitePress(),
  multiPress: new crafting.MultiPress(),
  siliconSmelter: new crafting.SiliconSmelter(),
  siliconCrucible: new crafting.SiliconCrucible(),
  kiln: new crafting.Kiln(),
  plastaniumCompressor: new crafting.PlastaniumCompressor(),
  phaseWeaver: new crafting.PhaseWeaver(),
  surgeSmelter: new crafting.SurgeSmelter(),
  cryofluidMixer: new crafting.CryofluidMixer(),
  pyratiteMixer: new crafting.PyratiteMixer(),
  blastMixer: new crafting.BlastMixer(),
  melter: new crafting.Melter(),
  separator: new crafting.Separator(),
  disassembler: new crafting.Disassembler(),
  sporePress: new crafting.SporePress(),
  pulverizer: new crafting.Pulverizer(),
  coalCentrifuge: new crafting.CoalCentrifuge(),
  incinerator: new crafting.Incinerator(),
  copperWall: new defense.CopperWall(),
  copperWallLarge: new defense.CopperWallLarge(),
  titaniumWall: new defense.TitaniumWall(),
  titaniumWallLarge: new defense.TitaniumWallLarge(),
  plastaniumWall: new defense.PlastaniumWall(),
  plastaniumWallLarge: new defense.PlastaniumWallLarge(),
  thoriumWall: new defense.ThoriumWall(),
  thoriumWallLarge: new defense.ThoriumWallLarge(),
  phaseWall: new defense.PhaseWall(),
  phaseWallLarge: new defense.PhaseWallLarge(),
  surgeWall: new defense.SurgeWall(),
  surgeWallLarge: new defense.SurgeWallLarge(),
  door: new defense.Door(),
  doorLarge: new defense.DoorLarge(),
  scrapWall: new defense.ScrapWall(),
  scrapWallLarge: new defense.ScrapWallLarge(),
  scrapWallHuge: new defense.ScrapWallHuge(),
  scrapWallGigantic: new defense.ScrapWallGigantic(),
  mender: new defense.Mender(),
  mendProjector: new defense.MendProjector(),
  overdriveProjector: new defense.OverdriveProjector(),
  overdriveDome: new defense.OverdriveDome(),
  forceProjector: new defense.ForceProjector(),
  shockMine: new defense.ShockMine(),
  conveyor: new distribution.Conveyor(),
  titaniumConveyor: new distribution.TitaniumConveyor(),
  plastaniumConveyor: new distribution.PlastaniumConveyor(),
  armoredConveyor: new distribution.ArmoredConveyor(),
  junction: new distribution.Junction(),
  itemBridge: new distribution.ItemBridge(),
  phaseConveyor: new distribution.PhaseConveyor(),
  sorter: new distribution.Sorter(),
  invertedSorter: new distribution.InvertedSorter(),
  router: new distribution.Router(),
  distributor: new distribution.Distributor(),
  overflowGate: new distribution.OverflowGate(),
  underflowGate: new distribution.UnderflowGate(),
  massDriver: new distribution.MassDriver(),
  payloadConveyor: new distribution.PayloadConveyor(),
  payloadRouter: new distribution.PayloadRouter(),
  air: new environment.AirBlock(),
  blockForge: new experimental.BlockForge(),
  blockLoader: new experimental.BlockLoader(),
  blockUnloader: new experimental.BlockUnloader(),
  mechanicalPump: new liquid.MechanicalPump(),
  rotaryPump: new liquid.RotaryPump(),
  thermalPump: new liquid.ThermalPump(),
  conduit: new liquid.Conduit(),
  pulseConduit: new liquid.PulseConduit(),
  platedConduit: new liquid.PlatedConduit(),
  liquidRouter: new liquid.LiquidRouter(),
  liquidTank: new liquid.LiquidTank(),
  liquidJunction: new liquid.LiquidJunction(),
  bridgeConduit: new liquid.BridgeConduit(),
  phaseConduit: new liquid.PhaseConduit(),
  message: new logic.Message(),
  switchBlock: new logic.SwitchBlock(),
  microProcessor: new logic.MicroProcessor(),
  logicProcessor: new logic.LogicProcessor(),
  hyperProcessor: new logic.HyperProcessor(),
  memoryCell: new logic.MemoryCell(),
  memoryBank: new logic.MemoryBank(),
  logicDisplay: new logic.LogicDisplay(),
  largeLogicDisplay: new logic.LargeLogicDisplay(),
  powerNode: new power.PowerNode(),
  powerNodeLarge: new power.PowerNodeLarge(),
  surgeTower: new power.SurgeTower(),
  diode: new power.Diode(),
  battery: new power.Battery(),
  batteryLarge: new power.BatteryLarge(),
  combustionGenerator: new power.CombustionGenerator(),
  thermalGenerator: new power.ThermalGenerator(),
  steamGenerator: new power.SteamGenerator(),
  differentialGenerator: new power.DifferentialGenerator(),
  rtgGenerator: new power.RtgGenerator(),
  solarPanel: new power.SolarPanel(),
  solarPanelLarge: new power.SolarPanelLarge(),
  thoriumReactor: new power.ThoriumReactor(),
  impactReactor: new power.ImpactReactor(),
  mechanicalDrill: new production.MechanicalDrill(),
  pneumaticDrill: new production.PneumaticDrill(),
  laserDrill: new production.LaserDrill(),
  blastDrill: new production.BlastDrill(),
  waterExtractor: new production.WaterExtractor(),
  cultivator: new production.Cultivator(),
  oilExtractor: new production.OilExtractor(),
  powerSource: new sandbox.PowerSource(),
  powerVoid: new sandbox.PowerVoid(),
  itemSource: new sandbox.ItemSource(),
  itemVoid: new sandbox.ItemVoid(),
  liquidSource: new sandbox.LiquidSource(),
  liquidVoid: new sandbox.LiquidVoid(),
  illuminator: new sandbox.Illuminator(),
  coreShard: new storage.CoreShard(),
  coreFoundation: new storage.CoreFoundation(),
  coreNucleus: new storage.CoreNucleus(),
  vault: new storage.Vault(),
  container: new storage.Container(),
  unloader: new storage.Unloader(),
  duo: new turrets.Duo(),
  scatter: new turrets.Scatter(),
  scorch: new turrets.Scorch(),
  hail: new turrets.Hail(),
  wave: new turrets.Wave(),
  lancer: new turrets.Lancer(),
  arc: new turrets.Arc(),
  parallax: new turrets.Parallax(),
  swarmer: new turrets.Swarmer(),
  salvo: new turrets.Salvo(),
  segment: new turrets.Segment(),
  tsunami: new turrets.Tsunami(),
  fuse: new turrets.Fuse(),
  ripple: new turrets.Ripple(),
  cyclone: new turrets.Cyclone(),
  foreshadow: new turrets.Foreshadow(),
  spectre: new turrets.Spectre(),
  meltdown: new turrets.Meltdown(),
  commandCenter: new units.CommandCenter(),
  groundFactory: new units.GroundFactory(),
  airFactory: new units.AirFactory(),
  navalFactory: new units.NavalFactory(),
  additiveReconstructor: new units.AdditiveReconstructor(),
  multiplicativeReconstructor: new units.MultiplicativeReconstructor(),
  exponentialReconstructor: new units.ExponentialReconstructor(),
  tetrativeReconstructor: new units.TetrativeReconstructor(),
  repairPoint: new units.RepairPoint(),
  resupplyPoint: new units.ResupplyPoint(),
}
for (const key in Blocks) {
  const name = key as keyof typeof Blocks
  codes.set(Blocks[name].name, Blocks[name])
}
