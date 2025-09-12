import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'

import { router } from './app/providers/router'
import { NotificationContainer } from '@/shared/ui/NotificationContainer'
import { ThemeProvider } from '@/shared/ui/ThemeProvider'
import { MuiThemeProvider } from '@/shared/ui/MuiThemeProvider'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { PageLoader } from '@/shared/ui/PageLoader'

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <MuiThemeProvider>
          <NotificationContainer />
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </MuiThemeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
