export type ThemeMode = 'light' | 'dark' | 'auto'

export type Theme = {
  name: string
  mode: ThemeMode
  variables: Record<string, string>
  meta: {
    description: string
    author?: string
    version?: string
  }
}

export type ThemeConfig = {
  currentTheme: string
  mode: ThemeMode
  autoMode: boolean
  persist: boolean
}

export type ThemeContext = {
  currentTheme: Theme
  mode: ThemeMode
  setTheme: (themeName: string) => void
  setMode: (mode: ThemeMode) => void
  setAutoMode: (auto: boolean) => void
  availableThemes: Theme[]
  isDark: boolean
  isLight: boolean
}
