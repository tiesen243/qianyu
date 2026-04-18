import { Elysia } from 'elysia'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { createChatModule } from '@/modules/chat/chat.module'
import { createHomeModule } from '@/modules/home/home.module'
import { createPostModule } from '@/modules/post/post.module'
import { afterHandler } from '@/shared/after-handler'
import config from '@/shared/config'

export async function createApp() {
  // Initialize modules
  const homeModule = createHomeModule()
  const chatModule = createChatModule()
  const postModule = await createPostModule()

  return (
    new Elysia({
      name: config.appName,
      adapter: CloudflareAdapter,
      aot: true,
    })
      .use(afterHandler)

      // Register controllers
      .use(homeModule.controller)
      .use(chatModule.controller)
      .use(postModule.controller)
  )
}

export type App = Awaited<ReturnType<typeof createApp>>
