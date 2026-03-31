import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
import { env } from 'cloudflare:workers'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import packageJson from '@/../package.json'
import { postController } from '@/controllers/v1/post.controller'
import { createElysia } from '@/lib/create-elysia'

const server = createElysia({
  name: 'server',

  adapter: CloudflareAdapter,
  aot: true,
})
  .use(
    cors({
      origin: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
      credentials: true,
    })
  )

  .use(
    openapi({
      path: '/docs',
      documentation: {
        info: {
          title: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
        },
      },
    })
  )

  .get('/', () => ({
    message: 'Welcome to the API',
    docs: '/docs',
  }))

  .use(postController)

  .compile()

export type Server = typeof server
export default server
