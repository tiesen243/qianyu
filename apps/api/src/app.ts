import type { ElysiaConfig } from 'elysia'

import { cors } from '@elysia/cors'
import { openapi } from '@elysia/openapi'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { Elysia } from 'elysia'
import { toJSONSchema } from 'zod'

import type { Database } from '@/shared/infrastructure/drizzle/types'

import { createChatModule } from '@/modules/chat/chat.module'
import { createHomeModule } from '@/modules/home/home.module'
import { createPostModule } from '@/modules/post/post.module'
import config from '@/shared/config'
import { errorHandlerPlugin } from '@/shared/plugins/error-handler.plugin'
import { timmingPlugin } from '@/shared/plugins/timming.plugin'
import { createRouter } from '@/shared/trpc'

export function createApp(db: Database, options?: ElysiaConfig<''>) {
  // Initialize modules
  const homeModule = createHomeModule()
  const chatModule = createChatModule()
  const postModule = createPostModule(db)

  // Initialize Elysia app
  const app = new Elysia({
    name: config.appName,
    aot: true,
    ...options,
  })
    // Register global plugins
    .use(timmingPlugin)
    .use(errorHandlerPlugin)

    // Register controllers
    .use(homeModule.controller)
    .use(chatModule.controller)
    .use(postModule.http.controller)

    // Register schedulers
    .use(postModule.scheduler)

  // Initialize tRPC routers
  app.all(
    '/trpc/*',
    ({ request }) =>
      fetchRequestHandler({
        endpoint: '/trpc',
        router: createRouter({
          post: postModule.rpc.router,
        }),
        req: request,
      }),
    { detail: { hide: true } }
  )

  // Plugins
  app
    .use(
      cors({
        origin: config.corsOrigin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    )
    .use(
      openapi({
        documentation: {
          info: { title: config.appName, version: config.appVersion },
        },
        mapJsonSchema: { zod: toJSONSchema },
      })
    )

  return app.compile()
}

export const crons = new Map<
  string,
  {
    name: string
    task: (app: ReturnType<typeof createApp>) => Promise<unknown>
  }
>([
  [
    '0 21 * * *',
    {
      name: 'Post Scheduler',
      task: (app) =>
        app.handle(
          new Request('http://cron/scheduler/post', { method: 'POST' })
        ),
    },
  ],
])
