import type {
  ValidationRule,
  ValidationResult,
  FieldValidation,
  FormValidation,
  ValidationConfig,
} from './types'

/**
 * Валидация одного поля
 */
export function validateField<T>(
  value: T,
  rules: ValidationRule<T>[],
): ValidationResult {
  if (rules.length === 0) {
    return { isValid: true, errors: [] }
  }

  const sortedRules = [...rules].sort(
    (a, b) => (a.priority || 10) - (b.priority || 10),
  )

  const errors: string[] = []
  let firstError: string | undefined

  for (const rule of sortedRules) {
    if (!rule.validate(value)) {
      errors.push(rule.message)
      if (!firstError) {
        firstError = rule.message
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    firstError,
  }
}

/**
 * Валидация всей формы
 */
export function validateForm<T extends Record<string, unknown>>(
  values: T,
  config: ValidationConfig<T>,
): FormValidation<T> {
  const fields: Record<keyof T, FieldValidation<T[keyof T]>> = {} as Record<
    keyof T,
    FieldValidation<T[keyof T]>
  >
  let allErrors: string[] = []

  for (const [fieldName, fieldRules] of Object.entries(config.rules)) {
    const fieldValue = values[fieldName]
    const validation = validateField(fieldValue, fieldRules || [])

    fields[fieldName as keyof T] = {
      value: fieldValue as T[keyof T],
      validation,
      rules: fieldRules || [],
    }

    allErrors.push(...validation.errors)
  }

  let formValidation: ValidationResult = { isValid: true, errors: [] }
  if (config.formRules && config.formRules.length > 0) {
    formValidation = validateField(values, config.formRules)
    allErrors.push(...formValidation.errors)
  }

  return {
    fields,
    isValid: allErrors.length === 0,
    allErrors,
  }
}

/**
 * Создание валидатора для конкретной формы
 */
export function createFormValidator<T extends Record<string, unknown>>(
  config: ValidationConfig<T>,
) {
  return (values: T): FormValidation<T> => validateForm(values, config)
}

/**
 * Проверка валидности конкретного поля
 */
export function isFieldValid<T>(value: T, rules: ValidationRule<T>[]): boolean {
  return validateField(value, rules).isValid
}

/**
 * Получение первой ошибки поля
 */
export function getFieldError<T>(
  value: T,
  rules: ValidationRule<T>[],
): string | undefined {
  return validateField(value, rules).firstError
}
