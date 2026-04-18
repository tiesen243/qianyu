import { Elysia } from 'elysia'

import config from '@/shared/config'
import { Response } from '@/shared/response'

export const homeController = () =>
  new Elysia({
    name: `${config.appName}.controller.home`,
  })

    .get('/', () => Response.Ok(`Welcome to ${config.appName}!`))

    .get('/health', () =>
      Response.Ok('Service is healthy', {
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
