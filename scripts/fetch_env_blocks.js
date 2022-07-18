// @ts-check
import fs from 'node:fs'
import { join } from 'node:path'
const [, , projectPath] = process.argv

const path = join(projectPath, 'core/src/mindustry/content/Blocks.java')

const outFile = 'out.ts'

const lines = fs.readFileSync(path, 'utf-8').split(/(\r\n)|\n/)
const start = lines.findIndex(line => {
  return line.includes('//region environment')
})
const end = lines.findIndex((line, i) => {
  return i > start && line.includes('//endregion')
})

const regex = /(\w+) = new (\w+)\("([\w-]+)"\)/

for (let i = start + 1; i < end; i++) {
  const line = lines[i]
  const match = line.match(regex)
  if (!match) continue
  const [, name, , code] = match
  fs.appendFileSync(outFile, generate(name, code), 'utf-8')
}

/**
 *
 * @param {string} code
 * @param {boolean} isProp
 */
function getSpriteName(code, isProp) {
  const folder = join(
    projectPath,
    'core/assets-raw/sprites/blocks',
    isProp ? 'props' : 'environment'
  )
  if (fs.existsSync(join(folder, `${code}.png`))) return code
  return `${code}1`
}

/**
 *
 * @param {string} code
 */
function isBlockProp(code) {
  const parent = join(projectPath, 'core/assets-raw/sprites/blocks')

  return (
    fs.existsSync(join(parent, 'props', `${code}.png`)) ||
    fs.existsSync(join(parent, 'props', `${code}1.png`))
  )
}

/**
 *
 * @param {string} name
 * @param {string} code
 * @returns
 */
// eslint-disable-next-line func-style
function generate(name, code) {
  const isProp = isBlockProp(code)
  const sprite = getSpriteName(code, isProp)
  const result = `
  export class ${name[0].toUpperCase() + name.slice(1)} extends ${
    isProp ? 'PropBlock' : 'EnvBlock'
  } {
    name = '${code}'
    
    ${sprite.endsWith('1') ? '' : 'override sprite = this.name'}
  }
  `
  return result
}
