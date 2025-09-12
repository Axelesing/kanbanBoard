import type { ValidationRule } from './types'

/**
 * Проверка на обязательность поля
 */
export const required = <T>(
  message = 'Обязательное поле',
): ValidationRule<T> => ({
  validate: (value: T) => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  },
  message,
  priority: 1,
})

/**
 * Проверка минимальной длины строки
 */
export const minLength = (
  min: number,
  message?: string,
): ValidationRule<string> => ({
  validate: (value: string) => {
    if (!value) return true
    return value.trim().length >= min
  },
  message: message || `Минимальная длина: ${min} символов`,
  priority: 2,
})

/**
 * Проверка минимальной длины строки (с поддержкой null)
 */
export const minLengthNullable = (
  min: number,
  message?: string,
): ValidationRule<string | null> => ({
  validate: (value: string | null) => {
    if (!value) return true
    return value.trim().length >= min
  },
  message: message || `Минимальная длина: ${min} символов`,
  priority: 2,
})

/**
 * Проверка максимальной длины строки
 */
export const maxLength = (
  max: number,
  message?: string,
): ValidationRule<string> => ({
  validate: (value: string) => {
    if (!value) return true
    return value.trim().length <= max
  },
  message: message || `Максимальная длина: ${max} символов`,
  priority: 2,
})

/**
 * Проверка максимальной длины строки (с поддержкой null)
 */
export const maxLengthNullable = (
  max: number,
  message?: string,
): ValidationRule<string | null> => ({
  validate: (value: string | null) => {
    if (!value) return true
    return value.trim().length <= max
  },
  message: message || `Максимальная длина: ${max} символов`,
  priority: 2,
})

/**
 * Проверка email
 */
export const email = (
  message = 'Некорректный email',
): ValidationRule<string> => ({
  validate: (value: string) => {
    if (!value) return true
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.trim())
  },
  message,
  priority: 2,
})

/**
 * Проверка на соответствие регулярному выражению
 */
export const pattern = (
  regex: RegExp,
  message: string,
): ValidationRule<string> => ({
  validate: (value: string) => {
    if (!value) return true
    return regex.test(value.trim())
  },
  message,
  priority: 2,
})

/**
 * Проверка минимального числа
 */
export const min = (
  minValue: number,
  message?: string,
): ValidationRule<number> => ({
  validate: (value: number) => {
    if (value === null || value === undefined) return true
    return value >= minValue
  },
  message: message || `Минимальное значение: ${minValue}`,
  priority: 2,
})

/**
 * Проверка максимального числа
 */
export const max = (
  maxValue: number,
  message?: string,
): ValidationRule<number> => ({
  validate: (value: number) => {
    if (value === null || value === undefined) return true
    return value <= maxValue
  },
  message: message || `Максимальное значение: ${maxValue}`,
  priority: 2,
})

/**
 * Проверка на одно из допустимых значений
 */
export const oneOf = <T>(values: T[], message?: string): ValidationRule<T> => ({
  validate: (value: T) => {
    if (value === null || value === undefined) return true
    return values.includes(value)
  },
  message: message || `Допустимые значения: ${values.join(', ')}`,
  priority: 2,
})

/**
 * Кастомная валидация
 */
export const custom = <T>(
  validator: (value: T) => boolean,
  message: string,
  priority = 2,
): ValidationRule<T> => ({
  validate: validator,
  message,
  priority,
})
