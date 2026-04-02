import type { RouteConfig } from '@react-router/dev/routes'

import { index, route } from '@react-router/dev/routes'

export default [
  index('./routes/_index.tsx'),
  route('/posts/:id', './routes/posts/[id].tsx'),
  route('/posts/create', './routes/posts/create.tsx'),

  route('/a', './routes/a.tsx'),
] satisfies RouteConfig
