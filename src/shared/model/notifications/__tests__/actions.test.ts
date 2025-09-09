import { fork, allSettled } from 'effector'

import { $notifications, notificationRequested } from '../core'

describe('Notification Actions', () => {
  it('should show success notification', async () => {
    const scope = fork()

    await allSettled(notificationRequested, {
      scope,
      params: {
        type: 'success',
        title: 'Success!',
        message: 'Operation completed',
      },
    })

    const notifications = scope.getState($notifications)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed',
    })
  })

  it('should show error notification', async () => {
    const scope = fork()

    await allSettled(notificationRequested, {
      scope,
      params: {
        type: 'error',
        title: 'Error!',
        message: 'Something went wrong',
      },
    })

    const notifications = scope.getState($notifications)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong',
    })
  })

  it('should show warning notification', async () => {
    const scope = fork()

    await allSettled(notificationRequested, {
      scope,
      params: {
        type: 'warning',
        title: 'Warning!',
        message: 'Please check this',
      },
    })

    const notifications = scope.getState($notifications)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      type: 'warning',
      title: 'Warning!',
      message: 'Please check this',
    })
  })

  it('should show info notification', async () => {
    const scope = fork()

    await allSettled(notificationRequested, {
      scope,
      params: {
        type: 'info',
        title: 'Info',
        message: 'Just for your information',
      },
    })

    const notifications = scope.getState($notifications)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      type: 'info',
      title: 'Info',
      message: 'Just for your information',
    })
  })

  it('should work with options', async () => {
    const scope = fork()
    const mockAction = jest.fn()

    await allSettled(notificationRequested, {
      scope,
      params: {
        type: 'success',
        title: 'Success!',
        message: 'With action',
        options: {
          duration: 10000,
          action: {
            label: 'Undo',
            onClick: mockAction,
          },
        },
      },
    })

    const notifications = scope.getState($notifications)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      type: 'success',
      title: 'Success!',
      message: 'With action',
      duration: 10000,
      action: {
        label: 'Undo',
        onClick: mockAction,
      },
    })
  })
})
