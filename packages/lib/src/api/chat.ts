import type { App } from '@qianyu/api'
import type { SendMessageDTO } from '@qianyu/api/chat'

import { treaty } from '@elysiajs/eden'
import { mutationOptions } from '@tanstack/react-query'

const keys = {
  send: () => ['chat', 'send-message'],
}

export const chat = ({ api }: ReturnType<typeof treaty<App>>) => ({
  send: {
    mutationKey: keys.send,
    mutationOptions: () =>
      mutationOptions({
        mutationKey: keys.send(),
        mutationFn: async (input: SendMessageDTO) => {
          const { data, error } = await api.v1.chat.post(input)
          if (error) throw error.value
          return data.data
        },
      }),
  },
})
