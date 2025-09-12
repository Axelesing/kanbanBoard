import { createEvent } from 'effector'
import type { ThemeMode, ThemeConfig } from './types'

// --- Events
export const themeRequested = createEvent<string>('themeRequested')
export const modeRequested = createEvent<ThemeMode>('modeRequested')
export const autoModeRequested = createEvent<boolean>('autoModeRequested')
export const themeConfigLoaded = createEvent<ThemeConfig>('themeConfigLoaded')
