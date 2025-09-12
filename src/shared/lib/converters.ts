const REM_DEFAULT_VALUE = 16

/**
 * Конвертирует значения из px в rem
 * @param values - числа или строки с px значениями
 * @returns строка с rem значениями
 */
export const convertPxToRem = (...values: (number | string)[]) =>
  values
    .map((item) => {
      const num = typeof item === 'string' ? parseFloat(item) : item
      return num / REM_DEFAULT_VALUE
    })
    .map((item) => (item === 0 ? item : `${item.toFixed(2)}rem`))
    .join(' ')

/**
 * Конвертирует одно значение из px в rem
 * @param value - число или строка с px значением
 * @returns строка с rem значением
 */
export const pxToRem = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  const rem = num / REM_DEFAULT_VALUE
  return rem === 0 ? '0' : `${rem.toFixed(2)}rem`
}

/**
 * Предустановленные размеры в rem
 */
export const SPACING = {
  xs: pxToRem(4), // 0.25rem
  sm: pxToRem(8), // 0.5rem
  md: pxToRem(16), // 1rem
  lg: pxToRem(24), // 1.5rem
  xl: pxToRem(32), // 2rem
  xxl: pxToRem(48), // 3rem
} as const

/**
 * Предустановленные размеры границ в rem
 */
export const BORDERS = {
  none: '0',
  thin: pxToRem(1), // 0.06rem
  medium: pxToRem(2), // 0.13rem
  thick: pxToRem(4), // 0.25rem
} as const

/**
 * Предустановленные радиусы в rem
 */
export const RADIUS = {
  none: '0',
  sm: pxToRem(4), // 0.25rem
  md: pxToRem(8), // 0.5rem
  lg: pxToRem(12), // 0.75rem
  xl: pxToRem(16), // 1rem
  full: '9999px', // Для круглых элементов
} as const
