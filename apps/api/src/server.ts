import { cors } from '@elysiajs/cors'
import { treaty } from '@elysiajs/eden'
import { env } from 'cloudflare:workers'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { appController } from '@/controllers/app.controller'
import { postController } from '@/controllers/v1/post.controller'
import { createElysia } from '@/lib/create-elysia'

const server = createElysia({
  name: 'server',

  adapter: CloudflareAdapter,
  aot: true,
})
  .use(
    cors({
      origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    })
  )

  .use(appController)
  .use(postController)

  .compile()

export type Server = typeof server
export default {
  fetch: server.fetch,
}

// const { data, } =await treaty<Server>('').v1.posts.get({
//   query: { page: 1, limit: 10 },
// })
