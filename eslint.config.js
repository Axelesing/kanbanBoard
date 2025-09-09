import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import tsPlugin from 'typescript-eslint'
import imports from 'eslint-plugin-import-x'

export default [
  // Игнорируем сборку
  { ignores: ['dist', 'build'] },

  js.configs.recommended,
  ...tsPlugin.configs.recommendedTypeChecked,

  imports.flatConfigs.recommended,
  imports.flatConfigs.typescript,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsPlugin.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      'object-shorthand': 'warn',
      'linebreak-style': 'off',
    },
  },

  // import
  {
    rules: {
      'import-x/namespace': 'off', // checked by ts
      'import-x/no-default-export': 'error',

      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: false, optionalDependencies: false },
      ],

      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          'distinctGroup': true,

          'alphabetize': { order: 'asc', caseInsensitive: true },
          // prettier-ignore
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],

          'pathGroupsExcludedImportTypes': ['react'],

          'pathGroups': [
            { pattern: 'react', group: 'builtin', position: 'before' },

            { pattern: '@shared/**', group: 'internal', position: 'before' },
            { pattern: '@entities/**', group: 'internal', position: 'before' },
            { pattern: '@features/**', group: 'internal', position: 'before' },
            { pattern: '@widgets/**', group: 'internal', position: 'before' },
            { pattern: '@pages/**', group: 'internal', position: 'before' },
            { pattern: '@processes/**', group: 'internal', position: 'before' },
            { pattern: '@app/**', group: 'internal', position: 'before' },
          ],
        },
      ],
    },
  },

  // React
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    settings: {
      react: { version: 'detect' },
    },
  },

  // Tests
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', 'src/setupTests.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...require('jest').environments.globals.globals,
      },
    },
    plugins: {
      'jest': require('eslint-plugin-jest'),
      'testing-library': require('eslint-plugin-testing-library'),
    },
    rules: {
      ...require('eslint-plugin-jest').configs.recommended.rules,
      ...require('eslint-plugin-testing-library').configs.react.rules,
      'no-restricted-imports': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'testing-library/prefer-screen-queries': 'off',
      'jest/unbound-method': 'off',
      'jest/prefer-strict-equal': 'warn',
      'jest/prefer-expect-assertions': [
        'warn',
        { onlyFunctionsWithAsyncKeyword: true },
      ],
    },
  },
]
