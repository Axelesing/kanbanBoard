import { createStore } from 'effector'
import type { Theme, ThemeConfig, ThemeMode } from './types'
import { availableThemes, defaultTheme } from '@/shared/constants/themes'

// --- Stores
export const $currentTheme = createStore<Theme>(defaultTheme)
export const $themeMode = createStore<ThemeMode>('light')
export const $autoMode = createStore<boolean>(true)
export const $availableThemes = createStore<Theme[]>(availableThemes)
export const $isDark = createStore<boolean>(false)
export const $isLight = createStore<boolean>(true)

// --- Computed stores
export const $themeConfig = createStore<ThemeConfig>({
  currentTheme: defaultTheme.name,
  mode: 'light',
  autoMode: true,
  persist: true,
})
