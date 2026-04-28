import { Elysia } from 'elysia'

import config from '@/shared/config'
import { Resp } from '@/shared/response'

export const homeController = () =>
  new Elysia({
    name: `${config.appName}.controller.home`,
  })

    .get('/', () => Resp.Ok(`Welcome to ${config.appName}!`))

    .get('/health', () =>
      Resp.Ok('Service is healthy', {
        timestamp: new Date().toISOString(),
        name: config.appName,
        version: config.appVersion,
        uptime: +process.uptime().toFixed(2),
        environment: config.env,
        memory: {
          used: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
          total: (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2),
          unit: 'MB',
        },
      })
    )
