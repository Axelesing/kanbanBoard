import { useEffect, useState, useCallback } from 'react'

import { useUnit } from 'effector-react'

import { TaskStatus } from '@/shared/constants/kanban/data'
import { $$kanban } from '@/features/kanban'
import type { Item } from '@/shared/ui/select/UserSelect'
import { $$notifications } from '@/shared/model'
import { $$modal } from '@/widgets/Modal'

export function useTaskModal() {
  const [isOpen, setOpen, selectedTask] = useUnit([
    $$modal.$isViewModal,
    $$modal.modalViewSet,
    $$modal.$selectedTask,
  ])

  const [updateTask, removeTask] = useUnit([
    $$kanban.taskUpdate,
    $$kanban.taskRemove,
  ])

  const [title, setTitle] = useState<string | null | undefined>(null)
  const [description, setDescription] = useState<string | null | undefined>(
    null,
  )
  const [user, setUser] = useState<Item | null | undefined>(null)
  const [status, setStatus] = useState<TaskStatus>('toDo')

  useEffect(() => {
    if (!isOpen || !selectedTask) return
    setTitle(selectedTask.title ?? null)
    setDescription(selectedTask.description ?? null)
    setUser(selectedTask.user ?? null)
    setStatus(selectedTask.status ?? 'toDo')
  }, [isOpen, selectedTask, selectedTask?.id])

  const isTitleInvalid = !title?.trim()

  const handleError = (error: unknown, operation: string) => {
    console.error(`Error ${operation}:`, error)
    $$notifications.showError(
      `Ошибка ${operation}`,
      `Не удалось ${operation} задачу`,
    )
  }

  const closeWithoutSave = () => setOpen(false)

  const saveAndClose = useCallback(() => {
    if (!selectedTask?.id || isTitleInvalid) {
      setOpen(false)
      return
    }

    try {
      updateTask({
        id: selectedTask.id,
        title: title!.trim(),
        description: description?.trim(),
        user,
        status,
      })
      $$notifications.showSuccess(
        'Задача сохранена',
        'Изменения успешно применены',
      )
      setOpen(false)
    } catch (error) {
      handleError(error, 'сохранения')
    }
  }, [
    selectedTask?.id,
    isTitleInvalid,
    title,
    description,
    user,
    status,
    updateTask,
    setOpen,
  ])

  const removeAndClose = useCallback(() => {
    if (selectedTask?.id) {
      try {
        removeTask({ id: selectedTask.id })
        $$notifications.showSuccess(
          'Задача удалена',
          'Задача успешно удалена из доски',
        )
        setOpen(false)
      } catch (error) {
        handleError(error, 'удаления')
      }
    } else {
      setOpen(false)
    }
  }, [selectedTask?.id, removeTask, setOpen])

  const taskFormProps = {
    title,
    description,
    isTitleInvalid,
    onTitleChange: setTitle,
    onDescriptionChange: setDescription,
  }

  const taskSettingsProps = {
    user,
    onUserChange: setUser,
    setStatus,
    status,
  }

  const modalActionsProps = {
    onClose: closeWithoutSave,
    onRemove: removeAndClose,
    onSave: saveAndClose,
    disableSave: isTitleInvalid,
  }

  return {
    isOpen,
    closeWithoutSave,
    taskFormProps,
    taskSettingsProps,
    modalActionsProps,
  }
}
