import { render } from '@testing-library/react'

import { BoardPage } from '..'

jest.mock('@/features/kanban', () => ({
  Board: () => <div>Board</div>,
}))

jest.mock('@/widgets/Modal', () => ({
  TaskModal: () => <div>TaskModal</div>,
}))

describe('BoardPage', () => {
  test('matches snapshot', () => {
    const { baseElement } = render(<BoardPage />)

    expect(baseElement).toMatchSnapshot()
  })
})
