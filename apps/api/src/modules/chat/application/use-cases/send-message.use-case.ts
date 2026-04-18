import type { SendMessageDTO } from '@/modules/chat/application/dtos/send-message.dto'
import type { SSE } from '@/sse'

import { UseCase } from '@/shared/abtracts/use-case'
import { Response } from '@/shared/response'

export class SendMessagesUseCase extends UseCase<SendMessageDTO, void> {
  public async execute(input: SendMessageDTO): Promise<Response<void>> {
    const { env } = await import('cloudflare:workers')

    const id = env.SSE.idFromName('global-sse')
    const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)

    await stub.fetch(
      new Request(`https://dummy`, {
        method: 'POST',
        body: JSON.stringify(input),
      })
    )

    return Response.Created('Message sent successfully')
  }
}
