import { t } from 'elysia'

import { createElysia } from '@/lib/create-elysia'

const et = new EventTarget()
const encoder = new TextEncoder()

export const sseController = createElysia({
  name: 'controller.v1.ws',
  prefix: '/api/v1/sse',
  tags: ['sse'],
})
  .get(
    '/',
    () => {
      let onMessage: (event: CustomEvent<string>) => void
      let keepAlive: ReturnType<typeof setInterval>

      const stream = new ReadableStream({
        start(controller) {
          onMessage = (event) => {
            controller.enqueue(encoder.encode(`data: ${event.detail}\n\n`))
          }

          keepAlive = setInterval(() => {
            controller.enqueue(encoder.encode('data: keep-alive\n\n'))
          }, 10_000)

          et.addEventListener('message', onMessage as never)
        },
        cancel() {
          et.removeEventListener('message', onMessage as never)
          clearInterval(keepAlive)
        },
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    },
    { response: t.Any() }
  )

  .post(
    '/',
    ({ body }) => {
      et.dispatchEvent(new CustomEvent('message', { detail: body.message }))
      return { status: 'Message sent to SSE clients' }
    },
    { body: t.Object({ message: t.String() }) }
  )
