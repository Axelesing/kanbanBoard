export type ValidationRule<T = unknown> = {
  validate: (value: T) => boolean
  message: string
  priority?: number
}

export type ValidationResult = {
  isValid: boolean
  errors: string[]
  firstError?: string
}

export type FieldValidation<T = unknown> = {
  value: T
  validation: ValidationResult
  rules: ValidationRule<T>[]
}

export type FormValidation<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  fields: Record<keyof T, FieldValidation<T[keyof T]>>
  isValid: boolean
  allErrors: string[]
}

export type ValidationConfig<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  rules: {
    [K in keyof T]?: ValidationRule<T[K]>[]
  }
  formRules?: ValidationRule<T>[]
}
