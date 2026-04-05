import { env } from 'cloudflare:workers'

import type { SSE } from '@/sse'

import { createElysia } from '@/lib/create-elysia'

export const sseController = createElysia({
  name: 'controller.v1.ws',
  prefix: '/api/v1/sse',
  tags: ['sse'],
}).all('/', ({ request }) => {
  const id = env.SSE.idFromName('global-sse')
  const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)
  return stub.fetch(request)
})
