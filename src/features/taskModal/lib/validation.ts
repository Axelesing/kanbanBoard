import {
  required,
  minLengthNullable,
  maxLengthNullable,
} from '@/shared/lib/validation'
import type { ValidationConfig } from '@/shared/lib/validation'
import type { Item } from '@/shared/ui/select/UserSelect'

export type TaskFormData = {
  title: string | null
  description: string | null
  user: Item | null
  status: string
}

/**
 * Конфигурация валидации формы задачи
 */
export const taskFormValidationConfig: ValidationConfig<TaskFormData> = {
  rules: {
    title: [
      required('Название задачи обязательно'),
      minLengthNullable(1, 'Название не может быть пустым'),
      maxLengthNullable(100, 'Название не должно превышать 100 символов'),
    ],
    description: [
      maxLengthNullable(1000, 'Описание не должно превышать 1000 символов'),
    ],
    user: [],
    status: [required('Статус задачи обязателен')],
  },
}

/**
 * Валидация для создания новой задачи
 */
export const createTaskValidationConfig: ValidationConfig<TaskFormData> = {
  rules: {
    ...taskFormValidationConfig.rules,
    title: [
      required('Название новой задачи обязательно'),
      minLengthNullable(1, 'Название не может быть пустым'),
      maxLengthNullable(100, 'Название не должно превышать 100 символов'),
    ],
  },
}

/**
 * Валидация для редактирования существующей задачи
 */
export const editTaskValidationConfig: ValidationConfig<TaskFormData> = {
  rules: {
    ...taskFormValidationConfig.rules,
    title: [
      required('Название задачи обязательно'),
      minLengthNullable(1, 'Название не может быть пустым'),
      maxLengthNullable(100, 'Название не должно превышать 100 символов'),
    ],
  },
}
