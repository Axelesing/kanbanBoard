import { useCallback } from 'react'
import { useUnit } from 'effector-react'
import { TaskStatus } from '@/shared/constants/kanban/data'
import { $$kanban } from '@/features/kanban'
import type { Task } from '@/shared/constants/kanban'
import type { TaskFormData } from '@/features/taskModal'
import { useTaskModalErrors } from './useTaskModalErrors'

interface UseTaskModalActionsProps {
  selectedTask: Task | null
  values: TaskFormData
  isValid: boolean
  setOpen: (open: boolean) => void
}

/**
 * Хук для действий с задачами в модальном окне
 */
export function useTaskModalActions({
  selectedTask,
  values,
  isValid,
  setOpen,
}: UseTaskModalActionsProps) {
  const [updateTask, removeTask] = useUnit([
    $$kanban.taskUpdate,
    $$kanban.taskRemove,
  ])

  const { handleError, showValidationError, showSuccessMessage } =
    useTaskModalErrors()

  const closeWithoutSave = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const saveAndClose = useCallback(() => {
    if (!selectedTask?.id || !isValid) {
      if (!isValid) {
        showValidationError()
      }
      setOpen(false)
      return
    }

    try {
      updateTask({
        id: selectedTask.id,
        title: values.title!.trim(),
        description: values.description?.trim(),
        user: values.user,
        status: values.status as TaskStatus,
      })
      showSuccessMessage('Задача сохранена', 'Изменения успешно применены')
      setOpen(false)
    } catch (error) {
      handleError(error, 'сохранения')
    }
  }, [
    selectedTask?.id,
    isValid,
    values,
    updateTask,
    setOpen,
    showValidationError,
    showSuccessMessage,
    handleError,
  ])

  const removeAndClose = useCallback(() => {
    if (selectedTask?.id) {
      try {
        removeTask({ id: selectedTask.id })
        showSuccessMessage('Задача удалена', 'Задача успешно удалена из доски')
        setOpen(false)
      } catch (error) {
        handleError(error, 'удаления')
      }
    } else {
      setOpen(false)
    }
  }, [selectedTask?.id, removeTask, setOpen, showSuccessMessage, handleError])

  return {
    closeWithoutSave,
    saveAndClose,
    removeAndClose,
  }
}
