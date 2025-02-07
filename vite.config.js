// @ts-check
import { dirname, join, resolve } from 'node:path'
import Spritesmith from 'spritesmith'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import pkg from './package.json' with { type: 'json' }
import { readdir } from 'node:fs/promises'
import dtsPlugin from 'vite-plugin-dts'

const coordsModule = 'virtual:sprites'
const __dirname = dirname(fileURLToPath(import.meta.url))

const config = defineConfig({
  plugins: [spritesheetPlugin(), dtsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName(format, entryName) {
        const ext = format === 'es' ? 'mjs' : 'cjs'
        return `${entryName}.${ext}`
      },
    },
    minify: false,
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), /node:*/],
    },
  },
})

export default config

/**
 * @returns {import("vite").Plugin}
 */
function spritesheetPlugin() {
  /** @type {Record<string, {x: number, y: number, width: number, height: number}>}} */
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
