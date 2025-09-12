import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useTheme as useOurTheme } from '@/shared/lib/theme/useTheme'
import { RADIUS, BORDERS } from '@/shared/lib/converters'

interface MuiThemeProviderProps {
  children: React.ReactNode
}

/**
 * MUI Theme Provider с интеграцией нашей системы тем
 */
export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  const { currentTheme, isDark } = useOurTheme()

  const muiTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: currentTheme.variables['--color-primary'],
        dark: currentTheme.variables['--color-primary-active'],
        light: currentTheme.variables['--color-primary-hover'],
      },
      secondary: {
        main: currentTheme.variables['--color-secondary'],
        dark: currentTheme.variables['--color-secondary-active'],
        light: currentTheme.variables['--color-secondary-hover'],
      },
      background: {
        default: currentTheme.variables['--color-bg-primary'],
        paper: currentTheme.variables['--color-bg-secondary'],
      },
      text: {
        primary: currentTheme.variables['--color-text-primary'],
        secondary: currentTheme.variables['--color-text-secondary'],
      },
      error: {
        main: currentTheme.variables['--color-error'],
      },
      warning: {
        main: currentTheme.variables['--color-warning'],
      },
      info: {
        main: currentTheme.variables['--color-info'],
      },
      success: {
        main: currentTheme.variables['--color-success'],
      },
    },
    shape: {
      borderRadius: parseFloat(RADIUS.md),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: RADIUS.md,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: RADIUS.md,
            boxShadow:
              '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              'borderRadius': RADIUS.md,
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: currentTheme.variables['--color-border-focus'],
                  borderWidth: BORDERS.medium,
                },
              },
              '&:hover:not(.Mui-focused)': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: currentTheme.variables['--color-border-primary'],
                },
              },
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 1200px)': {
              maxWidth: '1400px',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
