import type { Theme } from '@/shared/model'

/**
 * Светлая тема
 */
export const lightTheme: Theme = {
  name: 'light',
  mode: 'light',
  variables: {
    // Основные цвета
    '--color-primary': '#6366f1',
    '--color-primary-hover': '#4f46e5',
    '--color-primary-active': '#4338ca',
    '--color-secondary': '#64748b',
    '--color-secondary-hover': '#475569',
    '--color-secondary-active': '#334155',

    // Фоновые цвета
    '--color-bg-primary': '#ffffff',
    '--color-bg-secondary': '#f8fafc',
    '--color-bg-tertiary': '#f1f5f9',
    '--color-bg-overlay': 'rgba(0, 0, 0, 0.5)',

    // Текстовые цвета
    '--color-text-primary': '#0f172a',
    '--color-text-secondary': '#475569',
    '--color-text-tertiary': '#94a3b8',
    '--color-text-inverse': '#ffffff',

    // Границы
    '--color-border-primary': '#e2e8f0',
    '--color-border-secondary': '#f1f5f9',
    '--color-border-focus': '#6366f1',

    // Статусы
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-error': '#ef4444',
    '--color-info': '#06b6d4',

    // Тени
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--shadow-md':
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '--shadow-lg':
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

    // Радиусы
    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.5rem',

    // Отступы
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '3rem',
  },
  meta: {
    description: 'Современная светлая тема с мягкими цветами',
    author: 'Kanban App',
    version: '2.0.0',
  },
}

/**
 * Темная тема
 */
export const darkTheme: Theme = {
  name: 'dark',
  mode: 'dark',
  variables: {
    // Основные цвета
    '--color-primary': '#6366f1',
    '--color-primary-hover': '#4f46e5',
    '--color-primary-active': '#4338ca',
    '--color-secondary': '#64748b',
    '--color-secondary-hover': '#475569',
    '--color-secondary-active': '#334155',

    // Фоновые цвета
    '--color-bg-primary': '#0f172a',
    '--color-bg-secondary': '#1e293b',
    '--color-bg-tertiary': '#334155',
    '--color-bg-overlay': 'rgba(15, 23, 42, 0.8)',

    // Текстовые цвета
    '--color-text-primary': '#ffffff',
    '--color-text-secondary': '#e2e8f0',
    '--color-text-tertiary': '#cbd5e1',
    '--color-text-inverse': '#0f172a',

    // Границы
    '--color-border-primary': '#334155',
    '--color-border-secondary': '#1e293b',
    '--color-border-focus': '#6366f1',

    // Статусы
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-error': '#ef4444',
    '--color-info': '#06b6d4',

    // Тени
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    '--shadow-md':
      '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    '--shadow-lg':
      '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',

    // Радиусы
    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.5rem',

    // Отступы
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '3rem',
  },
  meta: {
    description:
      'Современная темная тема с мягкими цветами для комфортной работы',
    author: 'Kanban App',
    version: '2.0.0',
  },
}

/**
 * Синяя тема
 */
export const blueTheme: Theme = {
  name: 'blue',
  mode: 'dark',
  variables: {
    // Основные цвета
    '--color-primary': '#3b82f6',
    '--color-primary-hover': '#2563eb',
    '--color-primary-active': '#1d4ed8',
    '--color-secondary': '#64748b',
    '--color-secondary-hover': '#475569',
    '--color-secondary-active': '#334155',

    // Фоновые цвета
    '--color-bg-primary': '#1e3a8a',
    '--color-bg-secondary': '#1e40af',
    '--color-bg-tertiary': '#2563eb',
    '--color-bg-overlay': 'rgba(30, 58, 138, 0.8)',

    // Текстовые цвета
    '--color-text-primary': '#ffffff',
    '--color-text-secondary': '#e2e8f0',
    '--color-text-tertiary': '#cbd5e1',
    '--color-text-inverse': '#1e3a8a',

    // Границы
    '--color-border-primary': '#2563eb',
    '--color-border-secondary': '#1e40af',
    '--color-border-focus': '#3b82f6',

    // Статусы
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-error': '#ef4444',
    '--color-info': '#06b6d4',

    // Тени
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    '--shadow-md':
      '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    '--shadow-lg':
      '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',

    // Радиусы
    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.5rem',

    // Отступы
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '3rem',
  },
  meta: {
    description: 'Синяя тема для любителей синих оттенков',
    author: 'Kanban App',
    version: '1.0.0',
  },
}

/**
 * Доступные темы
 */
export const availableThemes: Theme[] = [lightTheme, darkTheme, blueTheme]

/**
 * Тема по умолчанию
 */
export const defaultTheme = lightTheme

/**
 * Ключ для localStorage
 */
export const THEME_STORAGE_KEY = 'kanban-theme-config'
