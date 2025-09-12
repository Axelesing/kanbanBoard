import { useEffect, useCallback } from 'react'

import { useUnit } from 'effector-react'

import { TaskStatus } from '@/shared/constants/kanban/data'
import { $$kanban } from '@/features/kanban'
import type { Item } from '@/features/taskModal'
import { $$notifications } from '@/shared/model'
import { $$modal } from '@/widgets/Modal'
import { useFormValidation, logger } from '@/shared/lib'
import { editTaskValidationConfig } from '../lib/validation'
import type { TaskFormData } from '../lib/validation'

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

  const formValidation = useFormValidation<TaskFormData>({
    initialValues: {
      title: null,
      description: null,
      user: null,
      status: 'toDo',
    },
    validationConfig: editTaskValidationConfig,
    validateOnChange: true,
    validateOnBlur: true,
  })

  const {
    values,
    setFieldValue,
    setValues,
    isValid,
    getFieldError,
    getFieldStatus,
  } = formValidation

  useEffect(() => {
    if (!isOpen || !selectedTask) return

    setValues({
      title: selectedTask.title ?? null,
      description: selectedTask.description ?? null,
      user: selectedTask.user ?? null,
      status: selectedTask.status ?? 'toDo',
    })
  }, [isOpen, selectedTask, selectedTask?.id, setValues])

  const handleError = (error: unknown, operation: string) => {
    logger.error(`Error ${operation}`, error as Error, { operation })
    $$notifications.showError(
      `Ошибка ${operation}`,
      `Не удалось ${operation} задачу`,
    )
  }

  const closeWithoutSave = () => setOpen(false)

  const saveAndClose = useCallback(() => {
    if (!selectedTask?.id || !isValid) {
      if (!isValid) {
        $$notifications.showError(
          'Ошибка валидации',
          'Пожалуйста, исправьте ошибки в форме',
        )
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
      $$notifications.showSuccess(
        'Задача сохранена',
        'Изменения успешно применены',
      )
      setOpen(false)
    } catch (error) {
      handleError(error, 'сохранения')
    }
  }, [selectedTask?.id, isValid, values, updateTask, setOpen])

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
    title: values.title,
    description: values.description,
    titleError: getFieldError('title'),
    descriptionError: getFieldError('description'),
    titleStatus: getFieldStatus('title'),
    descriptionStatus: getFieldStatus('description'),
    onTitleChange: (value: string | null | undefined) =>
      setFieldValue('title', value ?? null),
    onDescriptionChange: (value: string | null | undefined) =>
      setFieldValue('description', value ?? null),
    onTitleBlur: () => formValidation.handleBlur('title'),
    onDescriptionBlur: () => formValidation.handleBlur('description'),
  }

  const taskSettingsProps = {
    user: values.user,
    onUserChange: (value: Item | null | undefined) =>
      setFieldValue('user', value ?? null),
    setStatus: (status: TaskStatus) => setFieldValue('status', status),
    status: values.status as TaskStatus,
  }

  const modalActionsProps = {
    onClose: closeWithoutSave,
    onRemove: removeAndClose,
    onSave: saveAndClose,
    disableSave: !isValid,
  }

  return {
    isOpen,
    closeWithoutSave,
    taskFormProps,
    taskSettingsProps,
    modalActionsProps,
  }
}
