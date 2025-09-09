import { configure } from '@testing-library/react'
import '@testing-library/jest-dom'

configure({
  testIdAttribute: 'data-test',
})

global.fetch = global.fetch || jest.fn()
