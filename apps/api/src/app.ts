import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { Elysia } from 'elysia'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { createChatModule } from '@/modules/chat/chat.module'
import { createHomeModule } from '@/modules/home/home.module'
import { createPostModule } from '@/modules/post/post.module'
import config from '@/shared/config'
import { DrizzleRepository } from '@/shared/infrastructure/drizzle/drizzle.repository'
import { errorHandlerPlugin } from '@/shared/plugins/error-handler.plugin'
import { timmingPlugin } from '@/shared/plugins/timming.plugin'
import { createRouter } from '@/shared/trpc'

export function createApp(db: DrizzleRepository.Database) {
  // Initialize modules
  const homeModule = createHomeModule()
  const chatModule = createChatModule()
  const postModule = createPostModule(db)

  // Initialize Elysia app
  const app = new Elysia({
    name: config.appName,
    adapter: CloudflareAdapter,
    aot: true,
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

  return app
}
