import { useUnit } from 'effector-react'
import { useCallback, useEffect } from 'react'

import {
  $currentTheme,
  $themeMode,
  $autoMode,
  $availableThemes,
  $isDark,
  $isLight,
  themeGate,
  setTheme,
  setMode,
  setAutoMode,
} from '@/shared/model/theme'
import type { ThemeMode } from '@/shared/model/theme/types'

/**
 * Хук для работы с темами
 */
export function useTheme() {
  const [currentTheme, themeMode, autoMode, availableThemes, isDark, isLight] =
    useUnit([
      $currentTheme,
      $themeMode,
      $autoMode,
      $availableThemes,
      $isDark,
      $isLight,
    ])

  useEffect(() => {
    themeGate.open()

    return () => {
      themeGate.close()
    }
  }, [])

  const handleSetTheme = useCallback((themeName: string) => {
    setTheme(themeName)
  }, [])

  const handleSetMode = useCallback((mode: ThemeMode) => {
    setMode(mode)
  }, [])

  const handleSetAutoMode = useCallback((auto: boolean) => {
    setAutoMode(auto)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark'
    handleSetTheme(newTheme)
  }, [isDark, handleSetTheme])

  const toggleAutoMode = useCallback(() => {
    handleSetAutoMode(!autoMode)
  }, [autoMode, handleSetAutoMode])

  return {
    currentTheme,
    themeMode,
    autoMode,
    availableThemes,
    isDark,
    isLight,

    setTheme: handleSetTheme,
    setMode: handleSetMode,
    setAutoMode: handleSetAutoMode,
    toggleTheme,
    toggleAutoMode,
  }
}
