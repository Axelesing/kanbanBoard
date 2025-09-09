import { render } from '@/shared/lib/test/render'

import { AboutPage } from '..'

describe('AboutPage', () => {
  test('matches snapshot', () => {
    const { baseElement } = render(<AboutPage />)

    expect(baseElement).toMatchSnapshot()
  })
})
