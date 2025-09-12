import { useState, useCallback, useMemo } from 'react'
import type {
  ValidationConfig,
  FormValidation,
  ValidationResult,
  ValidationRule,
} from './types'
import { validateForm } from './validator'

export type UseFormValidationOptions<T extends Record<string, unknown>> = {
  initialValues: T
  validationConfig: ValidationConfig<T>
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

export type UseFormValidationReturn<T extends Record<string, unknown>> = {
  values: T
  validation: FormValidation<T>
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void
  setValues: (values: Partial<T>) => void
  reset: () => void
  validate: () => FormValidation<T>
  validateField: <K extends keyof T>(field: K) => ValidationResult
  isValid: boolean
  getFieldError: <K extends keyof T>(field: K) => string | undefined
  getFieldStatus: <K extends keyof T>(
    field: K,
  ) => 'default' | 'alert' | 'success'
  handleBlur: <K extends keyof T>(field: K) => void
}

/**
 * Хук для валидации форм
 */
export function useFormValidation<T extends Record<string, unknown>>({
  initialValues,
  validationConfig,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues)
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set())

  const validation = useMemo(() => {
    return validateForm(values, validationConfig)
  }, [values, validationConfig])

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValuesState((prev) => ({ ...prev, [field]: value }))

      if (validateOnChange) {
        setTouchedFields((prev) => new Set(prev).add(field))
      }
    },
    [validateOnChange],
  )

  const setValues = useCallback(
    (newValues: Partial<T>) => {
      setValuesState((prev) => ({ ...prev, ...newValues }))

      if (validateOnChange) {
        const fields = Object.keys(newValues) as (keyof T)[]
        setTouchedFields((prev) => {
          const newSet = new Set(prev)
          fields.forEach((field) => newSet.add(field))
          return newSet
        })
      }
    },
    [validateOnChange],
  )

  const reset = useCallback(() => {
    setValuesState(initialValues)
    setTouchedFields(new Set())
  }, [initialValues])

  const validate = useCallback(() => {
    return validateForm(values, validationConfig)
  }, [values, validationConfig])

  const validateField = useCallback(
    <K extends keyof T>(field: K) => {
      const fieldRules = validationConfig.rules[field]
      if (!fieldRules) {
        return { isValid: true, errors: [] }
      }

      return validateForm({ [field]: values[field] } as T, {
        rules: { [field]: fieldRules } as Partial<
          Record<keyof T, ValidationRule<T[keyof T]>[]>
        >,
      }).fields[field].validation
    },
    [values, validationConfig],
  )

  const getFieldError = useCallback(
    <K extends keyof T>(field: K) => {
      const fieldValidation = validation.fields[field]
      if (!fieldValidation || !touchedFields.has(field)) {
        return undefined
      }
      return fieldValidation.validation.firstError
    },
    [validation, touchedFields],
  )

  const getFieldStatus = useCallback(
    <K extends keyof T>(field: K) => {
      const fieldValidation = validation.fields[field]
      if (!fieldValidation || !touchedFields.has(field)) {
        return 'default'
      }

      if (fieldValidation.validation.isValid) {
        return 'success'
      }

      return 'alert'
    },
    [validation, touchedFields],
  )

  const handleBlur = useCallback(
    <K extends keyof T>(field: K) => {
      if (validateOnBlur) {
        setTouchedFields((prev) => new Set(prev).add(field))
      }
    },
    [validateOnBlur],
  )

  return {
    values,
    validation,
    setFieldValue,
    setValues,
    reset,
    validate,
    validateField,
    isValid: validation.isValid,
    getFieldError,
    getFieldStatus,
    handleBlur,
  }
}
