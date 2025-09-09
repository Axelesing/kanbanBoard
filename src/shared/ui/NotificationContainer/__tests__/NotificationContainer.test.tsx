import { screen } from '@testing-library/react'
import { fork, allSettled } from 'effector'

import { render } from '@/shared/lib/test/render'
import { $$notifications } from '@/shared/model'
import { NotificationContainer } from '../NotificationContainer'

jest.mock('@consta/uikit/Layout', () => ({
  Layout: ({
    children,
    verticalSpace,
    horizontalSpace,
    shadow,
    ...props
  }: any) => (
    <div data-testid="layout" {...props}>
      {children}
    </div>
  ),
}))

jest.mock('@consta/uikit/Card', () => ({
  Card: ({
    children,
    verticalSpace,
    horizontalSpace,
    shadow,
    ...props
  }: any) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
}))

jest.mock('@consta/uikit/Badge', () => ({
  Badge: ({ label, status, size, ...props }: any) => (
    <span data-testid="badge" {...props}>
      {label}
    </span>
  ),
}))

jest.mock('@consta/uikit/Button', () => ({
  Button: ({
    children,
    label,
    size,
    view,
    iconLeft,
    onClick,
    ...props
  }: any) => (
    <button data-testid="button" onClick={onClick} {...props}>
      {iconLeft && <span data-testid="icon-left">×</span>}
      {children || label}
    </button>
  ),
}))

jest.mock('@consta/uikit/Text', () => ({
  Text: ({ children, size, weight, ...props }: any) => (
    <span data-testid="text" {...props}>
      {children}
    </span>
  ),
}))

jest.mock('@consta/icons/IconClose', () => ({
  IconClose: () => <span data-testid="icon-close">Х</span>,
}))

describe('NotificationContainer', () => {
  it('should render notifications', async () => {
    const scope = fork()

    await allSettled($$notifications.notificationRequested, {
      scope,
      params: {
        type: 'success',
        title: 'Success notification',
        message: 'Operation completed successfully',
      },
    })

    await allSettled($$notifications.notificationRequested, {
      scope,
      params: {
        type: 'error',
        title: 'Error notification',
        message: 'Something went wrong',
      },
    })

    render(<NotificationContainer />, { effectorScope: scope })

    expect(screen.getByText('Success notification')).toBeInTheDocument()
    expect(
      screen.getByText('Operation completed successfully'),
    ).toBeInTheDocument()
    expect(screen.getByText('Error notification')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should render empty when no notifications', () => {
    const scope = fork()

    render(<NotificationContainer />, { effectorScope: scope })

    expect(screen.queryByText('Success notification')).not.toBeInTheDocument()
    expect(screen.queryByText('Error notification')).not.toBeInTheDocument()
  })

  it('should handle empty notifications array safely', () => {
    const scope = fork()

    expect(() =>
      render(<NotificationContainer />, { effectorScope: scope }),
    ).not.toThrow()
  })
})
