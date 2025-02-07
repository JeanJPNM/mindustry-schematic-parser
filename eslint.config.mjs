// @ts-check
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import eslint from '@eslint/js'

export default [
  {
    ignores: ['**/node_modules/', '**/dist/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      eqeqeq: 'error',
      'func-style': ['error', 'declaration'],
      'linebreak-style': ['error', 'windows'],
      'lines-between-class-members': 'error',
      'no-compare-neg-zero': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'prefer-destructuring': 'warn',
      'require-await': 'error',
      'object-shorthand': 'error',
    },
  },
]

