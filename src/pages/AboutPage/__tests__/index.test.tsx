import { render } from '@/shared/lib'

import { AboutPage } from '..'

describe('AboutPage', () => {
  test('matches snapshot', () => {
    const { baseElement } = render(<AboutPage />)

    expect(baseElement).toMatchSnapshot()
  })
})
