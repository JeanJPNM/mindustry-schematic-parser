# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased]

## [4.1.4]
### Fixed
- Fixed error during rendering when using the cjs version of the package.

## [4.1.3] - 2022-02-20
### Fixed
- Fixed broken imports for esm and cjs formats.

## [4.1.2] - 2022-01-29
### Fixed
- Fixed missing `type` field in package.json

## [4.1.1] - 2022-01-29
### Fixed
- Fix `prePublish` script not building esm modules

## [4.1.0] - 2021-09-22
### Added
- Compatibility with browser environments
- ESM module exports
### Fixed
- Fixed the decoding of non ascii character strings
### Deprecated
- `schematic.toImagerBuffer()` was deprecated, please use `schematic.render()` instead.

## [4.0.4] - 2021-09-22
### Fixed
- Fixed rendered conveyors connecting to all nearby blocks
## [4.0.3] - 2021-09-20
### Fixed
- Fixed decoding of non ascii characters
## [4.0.2] - 2021-09-16
### Fixed
- Removed import helpers from `tslib`
## [4.0.1] - 2021-09-10
### Fixed
- Schematic power metrics
## [4.0.0] - 2021-09-04
### Added
- Support for Mindustry v7 blocks
- `outputDirection` property on blocks
- A `payload` namespace for payload transport blocks

### Removed
- The `BlockProperties` interface no longer exists (incorporated into the `Block` class)
- The `SchematicDecoder` class was removed

### Changed
- Blocks now use an enum to determine their output
- The `Block` class no longer receives an object with options as a parameter
- `PayloadConveyor` and `PayloadRouter` were moved to the `payload` namespace

## [3.0.1] - 2021-05-03
### Fixed
- dist directory not included on package, causing it to fail
### Fixed
- Package contents not updated on previous version
## [3.0.0] - 2021-05-03
### Added
- Start and end of rendered bridges
- Option to read a raw schematic buffer
- Top details of water turrets
- A `Block.fromCode` method to get a block by its id

### Fixed
- Error when rendering bridges with a `null` config
### Changed
- Blocks are now namespaced under their respective functions
- Blocks are now exposed as classes instead of singletons
- The `mindustry` namespace no longer contains the classes of blocks

Example of use: 

```typescript
// old
import { Conduit, BridgeConduit, Conveyor } from "mindustry-schematic-parser";

// new
import { Blocks } from "mindustry-schematic-parser"

const {
liquid: { Conduit, BridgeConduit },
distribution: { Conveyor },
} = Blocks

```
## [2.1.0] - 2021-03-23
### Added
- Added schematic rendering options
## [2.0.1] - 2021-03-15
### Fixed
- Fixed crash when rendering adjacent bridges
- Fixed bridge connecting to unexisting bridges
- Fixed rendering of interplanetary accelerator
## [2.0.0] - 2021-03-15
### Added
- schematic generation version
### Changed
- Schematics now use named constructor parameters
### Fixed 
- Fixed block sprite rendering
## [1.2.2] - 2021-03-15
### Fixed
- Assets not delivered with package
## [1.2.1] - 2021-03-15
### Fixed
- Conveyor and conduit connection rendering
- Parser crash when dealing with logic blocks
## [1.2.0] - 2021-03-15
### Added
- Support for schematic preview generation
- List of game items
- List of game liquids
### Changed
- Mindustry related content is now under the `mindustry` namespace
- Arc related content is now under the `arc` namespace
## [1.1.2] - 2021-03-11
### Fixed
- Fixed types not being distributed with the package
### Changed
- The distribution folder is now `dist`
## [1.1.1] - 2021-03-11
### Added
- Default empty schematic description
### Changed
- Blocks now have a coherent inheritance
### Deprecated
- The use of `SchematicDecoder` was deprecated, use `Schematic.decode` instead
### Fixed
- Fixed buffer offset overflow when the tags of the schematic were too long

## [1.1.0] - 2021-03-10
### Added
- Added CHANGELOG.md to project
- Added schematic tag edition feature

## [1.0.2] - 2021-03-08
### Changed
- Changed compilation target from `ES2020` to `ES5`

## [1.0.1] -  2021-03-08
### Added
- Added README.md to project

## 1.0.0 - 2021-03-08
### Added
  - First release

[4.1.4]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.1.3...v4.1.4
[4.1.3]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.1.2...v4.1.3
[4.1.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.1.1...v4.1.2
[4.1.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.0.4...v4.1.0
[4.0.4]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.0.3...v4.0.4
[4.0.3]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.0.2...v4.0.3
[4.0.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v3.0.2...v4.0.0
[3.0.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v2.1.0...v3.0.0
[2.0.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.2.2...v2.0.0
[1.2.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/releases/tag/v1.0.1
