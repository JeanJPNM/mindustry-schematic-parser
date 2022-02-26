# Mindustry Schematic Parser

A simple way to parse mindustry schematics

## Install
```shell
npm install mindustry-schematic-parser
```

## Usage

```javascript
import * as fs from 'fs'
import { Schematic } from 'mindustry-schematic-parser'

const base64 =
'bXNjaAF4nE2N227CMAyGf9KjhrRpSNznBXqFtBfhCUJjUBEklUkH7NG5oDhppWHH+Rwf/iBDqZA7cyZ8b24/emuc1cHrbcumx9LSpeWuD513WL899MFrvWOxGh/9cPol7v6IJfdX4sZ5S/jqnJQD2ebiBYzPwVni/clfm4MJhPo4uDZJl/NEyX6IrHYmCO8AVvi3RTpQdQWMT6hxlBBKVYlLZ3zMo9mEHKleFDHN0vYiQjxPW6koUQjyNFVKVsSOmiSiOqr5A7myCUlZzcovD0488Q=='

const schematic = Schematic.decode(base64)
console.log('name: ', schematic.name)
console.log('description: ', schematic.description)
console.log('power balance: ', schematic.powerBalance)
console.log('item cost:', schematic.requirements)

// save a preview of the schematic
schematic
  .render({
    background: false // disable background
  })
  .then(nodeCanvas => nodeCanvas.toBuffer())
  .then(buffer => fs.writeFileSync('my_file.png', buffer))

```

## Rendering options

Bellow are the type definitions for 
```ts
export interface SchematicRenderingOptions {
  /** Options for rendering coveyors */
  conveyors?: {
    render: boolean
  }
  /** Options for rendering conduits */
  conduits?: {
    render: boolean
  }
  /** Options for rendering normal bridges */
  bridges?: {
    render?: boolean
    opacity: number
  }
  /** Options for rendering phase bridges */
  phaseBridges?: {
    render?: boolean
    opacity: number
  }
  /** The max size in pixels for this image */
  maxSize?: number
  /**
   * The size the preview must have.
   * Using this option overshadows `maxSize`
   */
  size?: number
  /** Whether the image should have a background */
  background?: boolean
  /** Browser only,  */
  assetsBaseUrl: string
}
```