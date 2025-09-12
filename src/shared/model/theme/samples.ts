import { sample } from 'effector'
import { logger } from '@/shared/lib/logger'
import { availableThemes, defaultTheme } from '@/shared/constants/themes'

import { themeGate } from './gates'
import {
  themeRequested,
  modeRequested,
  autoModeRequested,
  themeConfigLoaded,
} from './events'
import { loadThemeConfigFx, saveThemeConfigFx, applyThemeFx } from './effects'
import {
  $currentTheme,
  $themeMode,
  $autoMode,
  $availableThemes,
  $isDark,
  $isLight,
  $themeConfig,
} from './stores'

// --- Samples
sample({
  clock: themeGate.open,
  target: loadThemeConfigFx,
})

sample({
  clock: loadThemeConfigFx.doneData,
  target: themeConfigLoaded,
})

sample({
  clock: themeConfigLoaded,
  fn: (config) => {
    const theme =
      availableThemes.find((t) => t.name === config.currentTheme) ||
      defaultTheme
    return theme
  },
  target: $currentTheme,
})

sample({
  clock: themeConfigLoaded,
  fn: (config) => config.mode,
  target: $themeMode,
})

sample({
  clock: themeConfigLoaded,
  fn: (config) => config.autoMode,
  target: $autoMode,
})

sample({
  clock: $currentTheme,
  target: applyThemeFx,
})

sample({
  clock: applyThemeFx.done,
  source: $themeConfig,
  target: saveThemeConfigFx,
})

sample({
  clock: themeRequested,
  source: $availableThemes,
  fn: (themes, themeName) => {
    const theme = themes.find((t) => t.name === themeName)
    if (!theme) {
      logger.warn(`Theme "${themeName}" not found`, {
        availableThemes: themes.map((t) => t.name),
      })
      return defaultTheme
    }
    return theme
  },
  target: $currentTheme,
})

sample({
  clock: modeRequested,
  target: $themeMode,
})

sample({
  clock: autoModeRequested,
  target: $autoMode,
})

sample({
  clock: [$currentTheme, $themeMode, $autoMode],
  source: {
    currentTheme: $currentTheme,
    mode: $themeMode,
    autoMode: $autoMode,
  },
  fn: ({ currentTheme, mode, autoMode }) => ({
    currentTheme: currentTheme.name,
    mode,
    autoMode,
    persist: true,
  }),
  target: $themeConfig,
})

sample({
  clock: $currentTheme,
  fn: (theme) => theme.mode === 'dark',
  target: $isDark,
})

sample({
  clock: $currentTheme,
  fn: (theme) => theme.mode === 'light',
  target: $isLight,
})
