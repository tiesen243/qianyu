import { cors } from '@elysiajs/cors'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { appController } from '@/controllers/app.controller'
import { postController } from '@/controllers/v1/post.controller'
import { createElysia } from '@/lib/create-elysia'
import { serverLayer } from '@/server.layer'

const server = createElysia({
  name: 'server',

  adapter: CloudflareAdapter,
  aot: true,
})
  .use(cors())
  .use(serverLayer)

  .use(appController)
  .use(postController)

  .compile()

export type Server = typeof server
export default {
  fetch: server.fetch,
}
