import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
import { toJSONSchema } from 'zod'

import { createApp } from '@/app'
import config from '@/shared/config'

const app = await createApp()

app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(
  openapi({
    documentation: {
      info: { title: config.appName, version: config.appVersion },
    },
    mapJsonSchema: { zod: toJSONSchema },
  })
)

app.compile()

export { SSE } from '@/sse'
export default {
  fetch: app.fetch,
}
