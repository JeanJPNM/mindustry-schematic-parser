// @ts-check
import fs from 'node:fs'

const [, , path] = process.argv
const outFile = 'out.ts'

const lines = fs.readFileSync(path, 'utf-8').split(/(\r\n)|\n/)
const start = lines.findIndex(line => {
  return line.includes('//region environment')
})
const end = lines.findIndex((line, i) => {
  return i > start && line.includes('//endregion')
})

/**
 *
 * @param {string} name
 * @param {string} code
 * @returns
 */
// eslint-disable-next-line func-style
const generate = (name, code, prop = false) =>
  `
export class ${name[0].toUpperCase() + name.slice(1)} extends ${
    prop ? 'PropBlock' : 'EnvBlock'
  } {
    name = '${code}'
}
`
const regex = /(\w+) = new (\w+)\("([\w-]+)"\)/

for (let i = start + 1; i < end; i++) {
  const line = lines[i]
  const match = line.match(regex)
  if (!match) continue
  const [, name, kind, code] = match
  const isProp = /prop/i.test(kind)
  fs.appendFileSync(outFile, generate(name, code, isProp), 'utf-8')
}
