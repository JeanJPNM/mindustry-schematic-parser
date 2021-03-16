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
  .toImageBuffer()
  .then(buffer => fs.writeFileSync('my_file.png', buffer))

```