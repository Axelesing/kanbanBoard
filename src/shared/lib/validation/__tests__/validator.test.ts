import { validateField, validateForm, createFormValidator } from '../validator'
import { required, minLength, maxLength, email } from '../rules'
import type { ValidationConfig } from '../types'

describe('validateField', () => {
  it('должен возвращать валидный результат для пустых правил', () => {
    const result = validateField('test', [])

    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.firstError).toBeUndefined()
  })

  it('должен валидировать поле с одним правилом', () => {
    const result = validateField('', [required('Поле обязательно')])

    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['Поле обязательно'])
    expect(result.firstError).toBe('Поле обязательно')
  })

  it('должен валидировать поле с несколькими правилами', () => {
    const result = validateField('ab', [
      required('Поле обязательно'),
      minLength(3, 'Минимум 3 символа'),
      maxLength(5, 'Максимум 5 символов'),
    ])

    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['Минимум 3 символа'])
    expect(result.firstError).toBe('Минимум 3 символа')
  })

  it('должен сортировать правила по приоритету', () => {
    const result = validateField('', [
      minLength(3, 'Минимум 3 символа'),
      required('Поле обязательно'),
      maxLength(5, 'Максимум 5 символов'),
    ])

    expect(result.isValid).toBe(false)
    expect(result.firstError).toBe('Поле обязательно')
  })
})

describe('validateForm', () => {
  type TestForm = {
    name: string
    email: string
    age: number
  }

  const config: ValidationConfig<TestForm> = {
    rules: {
      name: [required('Имя обязательно'), minLength(2, 'Минимум 2 символа')],
      email: [required('Email обязателен'), email('Некорректный email')],
      age: [required('Возраст обязателен')],
    },
  }

  it('должен валидировать всю форму', () => {
    const values = {
      name: 'John',
      email: 'john@example.com',
      age: 25,
    }

    const result = validateForm(values, config)

    expect(result.isValid).toBe(true)
    expect(result.allErrors).toEqual([])
    expect(result.fields.name.validation.isValid).toBe(true)
    expect(result.fields.email.validation.isValid).toBe(true)
    expect(result.fields.age.validation.isValid).toBe(true)
  })

  it('должен находить ошибки в форме', () => {
    const values = {
      name: '',
      email: 'invalid-email',
      age: 0,
    }

    const result = validateForm(values, config)

    expect(result.isValid).toBe(false)
    expect(result.allErrors.length).toBeGreaterThan(0)
    expect(result.fields.name.validation.isValid).toBe(false)
    expect(result.fields.email.validation.isValid).toBe(false)
  })
})

describe('createFormValidator', () => {
  type LoginForm = {
    username: string
    password: string
  }

  const config: ValidationConfig<LoginForm> = {
    rules: {
      username: [required('Имя пользователя обязательно')],
      password: [
        required('Пароль обязателен'),
        minLength(6, 'Минимум 6 символов'),
      ],
    },
  }

  it('должен создавать валидатор формы', () => {
    const validator = createFormValidator(config)

    const validValues = {
      username: 'john',
      password: 'password123',
    }

    const invalidValues = {
      username: '',
      password: '123',
    }

    const validResult = validator(validValues)
    const invalidResult = validator(invalidValues)

    expect(validResult.isValid).toBe(true)
    expect(invalidResult.isValid).toBe(false)
  })
})
