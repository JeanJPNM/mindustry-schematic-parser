import Spritesmith from 'spritesmith'
import { defineConfig } from 'rollup'
import { join } from 'node:path'
import pkg from './package.json' assert { type: 'json' }
import { readdir } from 'node:fs/promises'
import typescript from '@rollup/plugin-typescript'

const coordsModule = 'virtual:sprites'

const config = defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      plugins: [preserveEsmImports('pkg-dir')],
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [...Object.keys(pkg.dependencies), 'node:url', 'node:path'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    spritesheetPlugin(),
  ],
})

export default config

/**
 * @param {string[]} targets
 * @returns {import("rollup").Plugin}
 */
function preserveEsmImports(...targets) {
  const ids = new Set(targets)
  return {
    name: 'preserve-esm-imports',
    renderDynamicImport({ targetModuleId }) {
      if (ids.has(targetModuleId)) return { left: 'import(', right: ')' }
    },
  }
}

/**
 * @returns {import("rollup").Plugin}
 */
function spritesheetPlugin() {
  /** @type {Record<string, {x: number, y: number, width: number, height: number>}} */
  let coordinates = {}
  return {
    name: 'spritesheet',
    async buildStart() {
      const files = (await getAssetFiles()).map(file =>
        file.replace(/\\/g, '/')
      )

      /** @type {Spritesmith.SpritesmithResult<Buffer<ArrayBufferLike>>} */
      const result = await new Promise((resolve, reject) => {
        Spritesmith.run({ src: files }, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })

      // eslint-disable-next-line prefer-destructuring
      coordinates = Object.fromEntries(
        Object.entries(result.coordinates).map(([key, value]) => [
          key.replace('assets/sprites/', '').replace('.png', ''),
          value,
        ])
      )

      this.emitFile({
        type: 'asset',
        fileName: 'spritesheet.png',
        source: result.image,
      })
    },
    resolveId(id) {
      if (id === coordsModule) return id
      return null
    },
    load(id) {
      if (id === coordsModule) {
        return `export const coordinates = ${JSON.stringify(coordinates)}`
      }
      return null
    },
  }
}

/**
 * Recursively reads the assets directory and lists all files.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function getAssetFiles(dir = 'assets') {
  let files = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files = files.concat(await getAssetFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }
  return files
}
