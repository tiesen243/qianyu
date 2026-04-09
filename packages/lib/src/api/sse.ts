import type { Server } from '@qianyu/api'
import type * as SSEModel from '@qianyu/api/models/sse'

import { treaty } from '@elysiajs/eden'
import { mutationOptions } from '@tanstack/react-query'

const keys = {
  send: () => ['sse', 'send'],
}

export const sse = ({ api }: ReturnType<typeof treaty<Server>>) => ({
  send: {
    mutationKey: keys.send,
    mutationOptions: () =>
      mutationOptions({
        mutationKey: keys.send(),
        mutationFn: async (input: SSEModel.Send) => {
          const { data, error } = await api.v1.sse.post(input)
          if (error) throw error.value
          return data
        },
      }),
  },
})
