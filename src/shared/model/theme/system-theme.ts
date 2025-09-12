import { availableThemes, defaultTheme } from '@/shared/constants/themes'
import { $autoMode } from './stores'
import { themeRequested } from './events'

/**
 * Инициализация системной темы
 * Отслеживает изменения системных настроек темы
 */
export function initializeSystemTheme() {
  if (typeof window === 'undefined') {
    return
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    const autoMode = $autoMode.getState()
    if (autoMode) {
      const mode = e.matches ? 'dark' : 'light'
      const theme = availableThemes.find((t) => t.mode === mode) || defaultTheme
      themeRequested(theme.name)
    }
  }

  mediaQuery.addEventListener('change', handleSystemThemeChange)

  const autoMode = $autoMode.getState()
  if (autoMode) {
    const mode = mediaQuery.matches ? 'dark' : 'light'
    const theme = availableThemes.find((t) => t.mode === mode) || defaultTheme
    themeRequested(theme.name)
  }
}
