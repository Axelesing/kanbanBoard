import { createEvent, createStore, sample } from 'effector'

import type {
  Notification,
  NotificationOptions,
  NotificationType,
} from './types'

// Events
export const notificationAdded = createEvent<{
  type: NotificationType
  title: string
  message?: string
  options?: NotificationOptions
}>()

export const notificationRemoved = createEvent<string>()

// Convenience event
export const notificationRequested = createEvent<{
  type: NotificationType
  title: string
  message?: string
  options?: NotificationOptions
}>()

// Store
export const $notifications = createStore<Notification[]>([]).on(
  notificationRemoved,
  (notifications, id) =>
    notifications.filter((notification) => notification.id !== id),
)

sample({
  clock: notificationAdded,
  source: $notifications,
  fn: (notifications, { type, title, message, options }) => {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    const duration = options?.duration ?? getDefaultDuration(type)

    const newNotification = {
      id,
      type,
      title,
      message,
      duration,
      action: options?.action,
    }

    return [...notifications, newNotification]
  },
  target: $notifications,
})

// Convenience sample
sample({
  clock: notificationRequested,
  fn: ({ type, title, message, options }) => ({
    type,
    title,
    message,
    options,
  }),
  target: notificationAdded,
})

// Helper functions
function getDefaultDuration(type: NotificationType): number {
  switch (type) {
    case 'success':
      return 3000
    case 'error':
      return 5000
    case 'warning':
      return 4000
    case 'info':
      return 3000
    default:
      return 3000
  }
}
