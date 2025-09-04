import { lazy } from 'react'

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AboutPage } from '@/pages/AboutPage'

import { AppLayout } from '../layout/AppLayout'

const BoardPage = lazy(() =>
  import('@/pages/BoardPage').then((mod) => ({ default: mod.BoardPage })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <BoardPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
])
