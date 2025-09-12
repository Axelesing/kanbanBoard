import { createEffect } from 'effector'
import type { Theme, ThemeConfig } from './types'
import { logger } from '@/shared/lib/logger'
import { defaultTheme, THEME_STORAGE_KEY } from '@/shared/constants/themes'

// --- Effects
export const loadThemeConfigFx = createEffect<void, ThemeConfig>(
  'loadThemeConfigFx',
)
export const saveThemeConfigFx = createEffect<ThemeConfig, void>(
  'saveThemeConfigFx',
)
export const applyThemeFx = createEffect<Theme, void>('applyThemeFx')

// --- Effects implementation
loadThemeConfigFx.use(() => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored) {
      const config = JSON.parse(stored) as ThemeConfig
      return config
    }
  } catch (error) {
    logger.error('Failed to load theme config', error as Error)
  }

  return {
    currentTheme: defaultTheme.name,
    mode: 'light',
    autoMode: true,
    persist: true,
  }
})

saveThemeConfigFx.use((config: ThemeConfig) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    logger.error('Failed to save theme config', error as Error)
  }
})

applyThemeFx.use((theme: Theme) => {
  const root = document.documentElement

  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  document.body.className = document.body.className
    .replace(/theme-\w+/g, '')
    .trim()
  document.body.classList.add(`theme-${theme.name}`)

  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme.variables['--color-bg-primary'],
    )
  }
})
