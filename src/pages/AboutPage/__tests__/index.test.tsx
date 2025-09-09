import { render } from '@testing-library/react'

import { AboutPage } from '..'

describe('AboutPage', () => {
  test('matches snapshot', () => {
    const { baseElement } = render(<AboutPage />)

    expect(baseElement).toMatchSnapshot()
  })
})
