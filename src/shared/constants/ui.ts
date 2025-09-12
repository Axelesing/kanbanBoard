/**
 * Размеры компонентов
 */
export const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const

/**
 * Варианты кнопок
 */
export const BUTTON_VARIANTS = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
  TEXT: 'text',
} as const

/**
 * Цвета для чипов
 */
export const CHIP_COLORS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const

/**
 * Выравнивание текста
 */
export const TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const

/**
 * Направления flex
 */
export const FLEX_DIRECTION = {
  ROW: 'row',
  COLUMN: 'column',
  ROW_REVERSE: 'row-reverse',
  COLUMN_REVERSE: 'column-reverse',
} as const

/**
 * Обоснование flex
 */
export const JUSTIFY_CONTENT = {
  FLEX_START: 'flex-start',
  FLEX_END: 'flex-end',
  CENTER: 'center',
  SPACE_BETWEEN: 'space-between',
  SPACE_AROUND: 'space-around',
  SPACE_EVENLY: 'space-evenly',
} as const

/**
 * Выравнивание flex
 */
export const ALIGN_ITEMS = {
  FLEX_START: 'flex-start',
  FLEX_END: 'flex-end',
  CENTER: 'center',
  BASELINE: 'baseline',
  STRETCH: 'stretch',
} as const

/**
 * Позиционирование
 */
export const POSITION = {
  STATIC: 'static',
  RELATIVE: 'relative',
  ABSOLUTE: 'absolute',
  FIXED: 'fixed',
  STICKY: 'sticky',
} as const

/**
 * Z-index слои
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const

/**
 * Тени
 */
export const SHADOWS = {
  NONE: 'none',
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  EXTRA_LARGE: 4,
} as const

/**
 * Радиусы границ
 */
export const BORDER_RADIUS = {
  NONE: 0,
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
  ROUND: '50%',
} as const

/**
 * Отступы
 */
export const SPACING = {
  XS: 0.5,
  SM: 1,
  MD: 2,
  LG: 3,
  XL: 4,
  XXL: 6,
} as const

/**
 * Брейкпоинты для медиа-запросов
 */
export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1300,
  XL: 1536,
} as const

/**
 * Анимации
 */
export const TRANSITIONS = {
  FAST: '0.1s',
  NORMAL: '0.2s',
  SLOW: '0.3s',
  VERY_SLOW: '0.5s',
} as const

/**
 * Типы курсоров
 */
export const CURSORS = {
  DEFAULT: 'default',
  POINTER: 'pointer',
  GRAB: 'grab',
  GRABBING: 'grabbing',
  TEXT: 'text',
  NOT_ALLOWED: 'not-allowed',
  HELP: 'help',
} as const
