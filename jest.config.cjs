// Set timezone to UTC only
// eslint-disable-next-line no-undef
process.env.TZ = 'UTC'

/** @type {import("@swc/core").Config} */
const swcrc = {
  module: { type: 'commonjs' },
  jsc: {
    target: 'esnext',
    parser: { syntax: 'typescript', tsx: true },
    transform: {
      react: { runtime: 'automatic', development: true },
      useDefineForClassFields: true,
    },
    experimental: {
      plugins: [['@effector/swc-plugin', {}]],
    },
  },
}

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  roots: ['./src'],
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@(shared|entities|features|widgets|pages|processes|app)/(.*)$':
      '<rootDir>/src/$1/$2',
  },

  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transform: {
    '\\.[jt]sx?$': ['@swc/jest', swcrc],
  },

  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'src/*.{js,jsx,ts,tsx}',
    '!**/mocks/*.{js,ts}',
    '!**/api/mocks.ts',
  ],

  coverageDirectory: './coverage',
  coverageReporters: ['html'],

  // Beneficial for sharding and local jest usage
  cacheDirectory: 'node_modules/.cache/jest',
}

// eslint-disable-next-line no-undef
module.exports = config
