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
    stub.send(body.message)
    return { success: true }
  },
  { body: SSEModel.send }
)

sseController.get('/', ({ request }) => {
  const id = env.SSE.idFromName('global-sse')
  const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)
  return stub.listen(request)
})
