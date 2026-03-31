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
      origin: env.CORS_ORIGINS.split(',').map((o) => o.trim()),
      credentials: true,
    })
  )

  .use(
    openapi({
      path: '/docs',
      documentation: {
        info: { title: packageJson.name, version: packageJson.version },
      },
    })
  )

  .get('/', () => ({
    message: `Welcome to ${packageJson.name}! Visit /docs for API documentation.`,
  }))

  .use(postController)

  .compile()

export type Server = typeof server
export default server
