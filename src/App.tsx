import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'

import { router } from './app/providers/router'
import {
  NotificationContainer,
  ThemeProvider,
  MuiThemeProvider,
  ErrorBoundary,
  PageLoader,
} from '@/shared/ui'

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
