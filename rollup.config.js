import { defineConfig } from 'rollup'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

const config = defineConfig({
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.dependencies),
})

export default config
