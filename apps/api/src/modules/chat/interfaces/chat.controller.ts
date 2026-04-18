import { Elysia } from 'elysia'

import type { SendMessagesUseCase } from '@/modules/chat/application/use-cases/send-message.use-case'
import type { SSE } from '@/sse'

import { sendMessageDTO } from '@/modules/chat/application/dtos/send-message.dto'
import config from '@/shared/config'

interface ChatUsecases {
  sendMessage: SendMessagesUseCase
}

export const chatController = (usecases: ChatUsecases) =>
  new Elysia({
    name: `${config.appName}.controller.chat`,
    prefix: '/api/v1/chat',
    tags: ['chat'],
  })

    .get('/', async ({ request }) => {
      const { env } = await import('cloudflare:workers')

      const id = env.SSE.idFromName('global-sse')
      const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)

      return stub.fetch(request)
    })

    .post('/', ({ body }) => usecases.sendMessage.execute(body), {
      body: sendMessageDTO,
    })
