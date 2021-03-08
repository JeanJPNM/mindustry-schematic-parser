import * as fs from 'fs'
import * as p from 'path'
const folderPath = 'src/mindustry/block'
const files = fs
  .readdirSync(folderPath)
  .filter(e => !(e.startsWith('block') || e.startsWith('index')))
/** @type {Map<string, string>} */
const declarations = new Map()
for (const file of files) {
  console.log(file)
  const text = fs.readFileSync(p.join(folderPath, file), 'utf-8')
  const classes = text.match(/export class \w+/g).map(e => e.split(' ')[2])
  const names = classes.map(e => e[0].toLowerCase() + e.substring(1))
  for (let i = 0; i < classes.length; i++) {
    const name = names[i]
    const className = classes[i]
    console.log(className)
    declarations.set(name, className)
  }
}
let output = 'export const blocks = {'
declarations.forEach((val, key) => (output += `${key}: new ${val}(),`))
output += '}'
fs.appendFileSync(p.join(folderPath, 'blocks.ts'), output)
