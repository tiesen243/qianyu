import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

export const routes = createBrowserRouter([
  {
    lazy: async () => {
      const { default: Component, loader } = await import('@/routes/__root')
      return { Component, loader }
    },
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
      {
        path: '/serial-monitor',
        lazy: async () => {
          const { default: Component, loader } =
            await import('@/routes/serial-monitor')
          return { Component, loader }
        },
      },
    ],
  },
])
