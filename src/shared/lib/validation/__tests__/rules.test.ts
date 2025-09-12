import {
  required,
  minLength,
  maxLength,
  email,
  pattern,
  min,
  max,
  oneOf,
  custom,
} from '../rules'

describe('required', () => {
  it('должен проверять обязательность строки', () => {
    const rule = required('Поле обязательно')

    expect(rule.validate('test')).toBe(true)
    expect(rule.validate('')).toBe(false)
    expect(rule.validate('   ')).toBe(false)
    expect(rule.validate(null)).toBe(false)
    expect(rule.validate(undefined)).toBe(false)
  })

  it('должен проверять обязательность массива', () => {
    const rule = required('Поле обязательно')

    expect(rule.validate([1, 2, 3])).toBe(true)
    expect(rule.validate([])).toBe(false)
  })

  it('должен проверять обязательность числа', () => {
    const rule = required('Поле обязательно')

    expect(rule.validate(0)).toBe(true)
    expect(rule.validate(42)).toBe(true)
    expect(rule.validate(null)).toBe(false)
    expect(rule.validate(undefined)).toBe(false)
  })
})

describe('minLength', () => {
  it('должен проверять минимальную длину строки', () => {
    const rule = minLength(3, 'Минимум 3 символа')

    expect(rule.validate('abc')).toBe(true)
    expect(rule.validate('abcd')).toBe(true)
    expect(rule.validate('ab')).toBe(false)
    expect(rule.validate('')).toBe(true)
    expect(rule.validate('   ')).toBe(false)
  })
})

describe('maxLength', () => {
  it('должен проверять максимальную длину строки', () => {
    const rule = maxLength(5, 'Максимум 5 символов')

    expect(rule.validate('abc')).toBe(true)
    expect(rule.validate('abcde')).toBe(true)
    expect(rule.validate('abcdef')).toBe(false)
    expect(rule.validate('')).toBe(true)
  })
})

describe('email', () => {
  it('должен проверять корректность email', () => {
    const rule = email('Некорректный email')

    expect(rule.validate('test@example.com')).toBe(true)
    expect(rule.validate('user.name@domain.co.uk')).toBe(true)
    expect(rule.validate('invalid-email')).toBe(false)
    expect(rule.validate('test@')).toBe(false)
    expect(rule.validate('@example.com')).toBe(false)
    expect(rule.validate('')).toBe(true)
  })
})

describe('pattern', () => {
  it('должен проверять соответствие регулярному выражению', () => {
    const rule = pattern(/^[A-Z]+$/, 'Только заглавные буквы')

    expect(rule.validate('ABC')).toBe(true)
    expect(rule.validate('abc')).toBe(false)
    expect(rule.validate('AB1')).toBe(false)
    expect(rule.validate('')).toBe(true)
  })
})

describe('min', () => {
  it('должен проверять минимальное значение числа', () => {
    const rule = min(18, 'Минимум 18 лет')

    expect(rule.validate(18)).toBe(true)
    expect(rule.validate(25)).toBe(true)
    expect(rule.validate(17)).toBe(false)
    // @ts-expect-error: for tests
    expect(rule.validate(null)).toBe(true)
    // @ts-expect-error: for tests
    expect(rule.validate(undefined)).toBe(true)
  })
})

describe('max', () => {
  it('должен проверять максимальное значение числа', () => {
    const rule = max(100, 'Максимум 100')

    expect(rule.validate(100)).toBe(true)
    expect(rule.validate(50)).toBe(true)
    expect(rule.validate(101)).toBe(false)
    // @ts-expect-error: for tests
    expect(rule.validate(null)).toBe(true)
    // @ts-expect-error: for tests
    expect(rule.validate(undefined)).toBe(true)
  })
})

describe('oneOf', () => {
  it('должен проверять принадлежность к списку значений', () => {
    const rule = oneOf(['red', 'green', 'blue'], 'Выберите цвет')

    expect(rule.validate('red')).toBe(true)
    expect(rule.validate('green')).toBe(true)
    expect(rule.validate('blue')).toBe(true)
    expect(rule.validate('yellow')).toBe(false)
    // @ts-expect-error: for tests
    expect(rule.validate(null)).toBe(true)
    // @ts-expect-error: for tests
    expect(rule.validate(undefined)).toBe(true)
  })
})

describe('custom', () => {
  it('должен выполнять кастомную валидацию', () => {
    const rule = custom(
      (value: string) => value.includes('@'),
      'Должно содержать @',
      1,
    )

    expect(rule.validate('test@example.com')).toBe(true)
    expect(rule.validate('test')).toBe(false)
    expect(rule.validate('')).toBe(false)
  })
})
