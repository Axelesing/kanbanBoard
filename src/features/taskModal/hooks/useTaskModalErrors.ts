import { useCallback } from 'react'
import { logger } from '@/shared/lib'
import { $$notifications } from '@/shared/model'

/**
 * Хук для обработки ошибок в модальном окне задач
 */
export function useTaskModalErrors() {
  const handleError = useCallback((error: unknown, operation: string) => {
    logger.error(`Error ${operation}`, error as Error, { operation })
    $$notifications.showError(
      `Ошибка ${operation}`,
      `Не удалось ${operation} задачу`,
    )
  }, [])

  const showValidationError = useCallback(() => {
    $$notifications.showError(
      'Ошибка валидации',
      'Пожалуйста, исправьте ошибки в форме',
    )
  }, [])

  const showSuccessMessage = useCallback((action: string, message: string) => {
    $$notifications.showSuccess(action, message)
  }, [])

  return {
    handleError,
    showValidationError,
    showSuccessMessage,
  }
}
