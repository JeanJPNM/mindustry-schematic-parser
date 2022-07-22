// @ts-check
import fs from 'node:fs'
import { join } from 'node:path'
import { mindustry } from '../dist/index.mjs'

const [, , projectPath] = process.argv

const path = join(projectPath, 'core/src/mindustry/content/Blocks.java')

const lines = fs.readFileSync(path, 'utf-8').split(/(\r\n)|\n/)

const regex = /^ {8}\w+ = new \w+\("([\w-]+)"\)/

for (let i = 10; i < lines.length; i++) {
  const line = lines[i]
  const match = line.match(regex)
  if (!match) continue
  const [, code] = match

  try {
    mindustry.Block.fromCode(code)
  } catch {
    console.log(code)
  }
}
