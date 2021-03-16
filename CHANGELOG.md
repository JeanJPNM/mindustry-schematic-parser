# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
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

[2.0.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.2.2...v2.0.0
[1.2.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/JeanJPNM/mindustry-schematic-parser/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/JeanJPNM/mindustry-schematic-parser/releases/tag/v1.0.1
