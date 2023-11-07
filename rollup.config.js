import { defineConfig } from 'rollup'
import pkg from './package.json' assert { type: 'json' }
import typescript from '@rollup/plugin-typescript'

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
