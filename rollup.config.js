import { defineConfig } from 'rollup'
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
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
})

export default config
