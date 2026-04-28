import type { SendMessageDTO } from '@/modules/chat/application/dtos/send-message.dto'
import type { SSE } from '@/worker'

import { AbstractUseCase } from '@/shared/abstracts/use-case'
import { Resp } from '@/shared/response'

export class SendMessagesUseCase extends AbstractUseCase<
  SendMessageDTO.Input,
  SendMessageDTO.Output
> {
  public async execute(
    input: SendMessageDTO.Input
  ): Promise<Resp<SendMessageDTO.Output>> {
    const { env } = await import('cloudflare:workers')

    const id = env.SSE.idFromName('global-sse')
    const stub = (env.SSE as DurableObjectNamespace<SSE>).get(id)

    await stub.fetch(
      new Request('http://durable-object', {
        method: 'POST',
        body: JSON.stringify(input),
      })
    )

    return Resp.Created('Message sent successfully')
  }
}
