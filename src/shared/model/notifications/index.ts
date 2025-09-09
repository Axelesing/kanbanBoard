import {
  $notifications,
  notificationAdded,
  notificationRemoved,
  notificationRequested,
} from './core'
import { showError, showInfo, showSuccess, showWarning } from './actions'

// --- exports
export const $$notifications = {
  $notifications,
  notificationAdded,
  notificationRemoved,
  notificationRequested,
  showSuccess,
  showError,
  showWarning,
  showInfo,
}

// Re-export types
export type {
  Notification,
  NotificationType,
  NotificationOptions,
} from './types'
