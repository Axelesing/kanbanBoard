import { themeRequested, modeRequested, autoModeRequested } from './core'

/**
 * Переключить тему
 */
export const setTheme = (themeName: string) => {
  themeRequested(themeName)
}

/**
 * Переключить режим темы
 */
export const setMode = (mode: 'light' | 'dark' | 'auto') => {
  modeRequested(mode)
}

/**
 * Переключить автоматический режим
 */
export const setAutoMode = (auto: boolean) => {
  autoModeRequested(auto)
}

/**
 * Переключить на светлую тему
 */
export const setLightTheme = () => {
  setTheme('light')
}

/**
 * Переключить на темную тему
 */
export const setDarkTheme = () => {
  setTheme('dark')
}

/**
 * Переключить тему (toggle)
 */
export const toggleTheme = () => {
  const currentTheme = document.body.classList.contains('theme-dark')
    ? 'light'
    : 'dark'
  setTheme(currentTheme)
}

/**
 * Переключить автоматический режим
 */
export const toggleAutoMode = () => {
  const currentAutoMode = document.body.classList.contains('theme-auto')
  setAutoMode(!currentAutoMode)
}
