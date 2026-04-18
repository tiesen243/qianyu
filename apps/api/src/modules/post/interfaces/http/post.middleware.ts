import { Elysia } from 'elysia'

import config from '@/shared/config'

export const postMiddleware = () =>
  new Elysia({
    name: `${config.appName}.middleware.post`,
  })
