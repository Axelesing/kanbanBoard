import type { NotificationOptions } from './types'
import { notificationRequested } from './core'

/**
 * Показать уведомление об успехе
 * @param title - Заголовок уведомления
 * @param message - Дополнительное сообщение
 * @param options - Дополнительные опции (длительность, действие)
 */
export const showSuccess = (
  title: string,
  message?: string,
  options?: NotificationOptions,
) => {
  notificationRequested({ type: 'success', title, message, options })
}

/**
 * Показать уведомление об ошибке
 * @param title - Заголовок уведомления
 * @param message - Дополнительное сообщение
 * @param options - Дополнительные опции (длительность, действие)
 */
export const showError = (
  title: string,
  message?: string,
  options?: NotificationOptions,
) => {
  notificationRequested({ type: 'error', title, message, options })
}

/**
 * Показать предупреждение
 * @param title - Заголовок уведомления
 * @param message - Дополнительное сообщение
 * @param options - Дополнительные опции (длительность, действие)
 */
export const showWarning = (
  title: string,
  message?: string,
  options?: NotificationOptions,
) => {
  notificationRequested({ type: 'warning', title, message, options })
}

/**
 * Показать информационное уведомление
 * @param title - Заголовок уведомления
 * @param message - Дополнительное сообщение
 * @param options - Дополнительные опции (длительность, действие)
 */
export const showInfo = (
  title: string,
  message?: string,
  options?: NotificationOptions,
) => {
  notificationRequested({ type: 'info', title, message, options })
}
