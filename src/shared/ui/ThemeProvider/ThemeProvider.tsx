import { memo, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

import { useTheme } from '@/shared/lib/theme/useTheme'

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * Глобальные стили для тем
 */
const GlobalStyles = createGlobalStyle<{ isDark: boolean }>`
  :root {
    --transition-theme: all 0.3s ease;
  }

  * {
    transition: var(--transition-theme);
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
  }

  body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .theme-light {
    --theme-bg: var(--color-bg-primary);
    --theme-text: var(--color-text-primary);
    --theme-border: var(--color-border-primary);
  }

  .theme-dark {
    --theme-bg: var(--color-bg-primary);
    --theme-text: var(--color-text-primary);
    --theme-border: var(--color-border-primary);
  }

  .theme-auto {
    @media (prefers-color-scheme: dark) {
      --theme-bg: var(--color-bg-primary);
      --theme-text: var(--color-text-primary);
      --theme-border: var(--color-border-primary);
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border-primary);
    border-radius: var(--radius-sm);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-tertiary);
  }


  ::selection {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  :focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-primary-hover);
    text-decoration: underline;
  }

  button {
    transition: var(--transition-theme);
  }

  * {
    color: var(--color-text-primary);
  }

  nav a,
  nav a:visited,
  nav a:link {
    color: var(--color-text-primary) !important;
  }

  nav a:hover {
    color: var(--color-primary) !important;
  }

  input:not(.MuiInputBase-input):not(.MuiOutlinedInput-input):not(.MuiFilledInput-input):not(.MuiInputBase-inputMultiline), 
  textarea:not(.MuiInputBase-input):not(.MuiOutlinedInput-input):not(.MuiFilledInput-input):not(.MuiInputBase-inputMultiline), 
  select:not(.MuiSelect-select) {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    border-color: var(--color-border-primary);
  }

  input:not(.MuiInputBase-input):not(.MuiOutlinedInput-input):not(.MuiFilledInput-input):not(.MuiInputBase-inputMultiline):focus, 
  textarea:not(.MuiInputBase-input):not(.MuiOutlinedInput-input):not(.MuiFilledInput-input):not(.MuiInputBase-inputMultiline):focus, 
  select:not(.MuiSelect-select):focus {
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 2px var(--color-border-focus);
  }

  .card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-border-focus);
    transform: translateY(-1px);
  }

  .modal-overlay {
    background-color: var(--color-bg-overlay);
  }

  .modal-content {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  .notification {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }

  .notification.success {
    border-left: 4px solid var(--color-success);
  }

  .notification.warning {
    border-left: 4px solid var(--color-warning);
  }

  .notification.error {
    border-left: 4px solid var(--color-error);
  }

  .notification.info {
    border-left: 4px solid var(--color-info);
  }

  .kanban-board {
    background-color: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
  }

  .kanban-column {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .kanban-column:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-border-focus);
  }

  .kanban-card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .kanban-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .kanban-card:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  .task-status-todo {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
  }

  .task-status-in-progress {
    background-color: var(--color-info);
    color: var(--color-text-inverse);
  }

  .task-status-done {
    background-color: var(--color-success);
    color: var(--color-text-inverse);
  }

  .btn-primary {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    transition: all 0.2s ease;
  }

  .btn-secondary:hover {
    background-color: var(--color-bg-secondary);
    border-color: var(--color-border-focus);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
`

/**
 * Провайдер темы
 */
export const ThemeProvider = memo<ThemeProviderProps>(({ children }) => {
  const { isDark } = useTheme()

  useEffect(() => {
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim()

    if (isDark) {
      document.body.classList.add('theme-dark')
    } else {
      document.body.classList.add('theme-light')
    }
  }, [isDark])

  return (
    <>
      <GlobalStyles isDark={isDark} />
      {children}
    </>
  )
})

ThemeProvider.displayName = 'ThemeProvider'
