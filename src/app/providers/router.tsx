import { lazy } from 'react'

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'

const BoardPage = lazy(() =>
  import('@/pages/BoardPage').then((mod) => ({ default: mod.BoardPage })),
)

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((mod) => ({ default: mod.AboutPage })),
)

const ThemeSettingsPage = lazy(() =>
  import('@/pages/ThemeSettingsPage').then((mod) => ({
    default: mod.ThemeSettingsPage,
  })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <BoardPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'theme', element: <ThemeSettingsPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
])
