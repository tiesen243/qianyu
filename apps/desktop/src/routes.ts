import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

export const routes = createBrowserRouter([
  {
    Component: lazy(() => import('@/routes/__root')),
    children: [
      {
        index: true,
        Component: lazy(() => import('@/routes/_index')),
      },
      {
        path: '/posts/create',
        Component: lazy(() => import('@/routes/posts/create')),
      },
      {
        path: '/posts/:id',
        Component: lazy(() => import('@/routes/posts/[id]')),
      },
      {
        path: '/chat',
        Component: lazy(() => import('@/routes/chat')),
      },
    ],
  },
])
