import { useMemo } from 'react'
import { TaskStatus } from '@/shared/constants/kanban/data'
import type { Item } from '@/features/taskModal'
import type { TaskFormData } from '../lib/validation'

type FieldHandler = {
  value: any
  error: string | null
  status: 'default' | 'alert' | 'success'
  onChange: (value: any) => void
  onBlur: () => void
}

interface UseTaskModalPropsParams {
  values: TaskFormData
  isValid: boolean
  createFieldHandlers: (fieldName: keyof TaskFormData) => FieldHandler
  onUserChange: (value: Item | null | undefined) => void
  onStatusChange: (status: TaskStatus) => void
  onClose: () => void
  onRemove: () => void
  onSave: () => void
}

/**
 * Хук для создания пропсов компонентов модального окна
 */
export function useTaskModalProps({
  values,
  isValid,
  createFieldHandlers,
  onUserChange,
  onStatusChange,
  onClose,
  onRemove,
  onSave,
}: UseTaskModalPropsParams) {
  const titleHandlers = createFieldHandlers('title')
  const descriptionHandlers = createFieldHandlers('description')

  const taskFormProps = useMemo(
    () => ({
      title: titleHandlers.value,
      description: descriptionHandlers.value,
      titleError: titleHandlers.error || undefined,
      descriptionError: descriptionHandlers.error || undefined,
      titleStatus: titleHandlers.status,
      descriptionStatus: descriptionHandlers.status,
      onTitleChange: titleHandlers.onChange,
      onDescriptionChange: descriptionHandlers.onChange,
      onTitleBlur: titleHandlers.onBlur,
      onDescriptionBlur: descriptionHandlers.onBlur,
    }),
    [titleHandlers, descriptionHandlers],
  )

  const taskSettingsProps = useMemo(
    () => ({
      user: values.user,
      onUserChange,
      setStatus: onStatusChange,
      status: values.status as TaskStatus,
    }),
    [values.user, values.status, onUserChange, onStatusChange],
  )

  const modalActionsProps = useMemo(
    () => ({
      onClose,
      onRemove,
      onSave,
      disableSave: !isValid,
    }),
    [onClose, onRemove, onSave, isValid],
  )

  return {
    taskFormProps,
    taskSettingsProps,
    modalActionsProps,
  }
}
