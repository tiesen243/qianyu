import { env } from 'cloudflare:workers'

import type { SSE } from '@/sse'

import { createElysia } from '@/lib/create-elysia'
import * as SSEModel from '@/models/sse.model'

export const sseController = createElysia({
  name: 'controller.v1.ws',
  prefix: '/api/v1/sse',
  tags: ['sse'],
}).post(
  '/',
  ({ body }) => {
    const id = env.SSE.idFromName('global-sse')
    const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)
    return stub.fetch(
      new Request('https://qianyu', {
        method: 'POST',
        body: JSON.stringify(body),
      })
    )
  },
  { body: SSEModel.send }
)

sseController.get('/', ({ request }) => {
  const id = env.SSE.idFromName('global-sse')
  const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)
  return stub.fetch(request)
})
