/**
 * Система управления темами
 *
 * Модульная архитектура:
 * - gates.ts - Gates для управления жизненным циклом
 * - events.ts - События системы тем
 * - stores.ts - Сторы для состояния
 * - effects.ts - Эффекты для работы с localStorage и DOM
 * - samples.ts - Sample логика для связывания компонентов
 * - system-theme.ts - Логика системной темы
 * - core.ts - Главный файл с экспортами и инициализацией
 */

export * from './types'
export * from './core'
export * from './actions'
