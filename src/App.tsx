import { RouterProvider } from 'react-router-dom'

import { router } from './app/providers/router'
import { NotificationContainer } from '@/shared/ui/NotificationContainer'
import { ThemeProvider } from '@/shared/ui/ThemeProvider'
import { MuiThemeProvider } from '@/shared/ui/MuiThemeProvider'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <MuiThemeProvider>
          <NotificationContainer />
          <RouterProvider router={router} />
        </MuiThemeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
