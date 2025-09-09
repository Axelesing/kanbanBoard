import { fork, allSettled } from 'effector'

import { notificationAdded, notificationRemoved, $notifications } from '../core'

describe('Notification System', () => {
  it('should add notification', async () => {
    const scope = fork()

    await allSettled(notificationAdded, {
      scope,
      params: {
        type: 'success',
        title: 'Test notification',
        message: 'Test message',
      },
    })

    const notifications = scope.getState($notifications)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      type: 'success',
      title: 'Test notification',
      message: 'Test message',
    })
    expect(notifications[0].id).toMatch(/^notification_\d+_[a-z0-9]+$/)
  })

  it('should remove notification', async () => {
    const scope = fork()

    await allSettled(notificationAdded, {
      scope,
      params: {
        type: 'info',
        title: 'Test notification',
      },
    })

    const notifications = scope.getState($notifications)
    const notificationId = notifications[0].id

    await allSettled(notificationRemoved, {
      scope,
      params: notificationId,
    })

    const updatedNotifications = scope.getState($notifications)
    expect(updatedNotifications).toHaveLength(0)
  })
})
