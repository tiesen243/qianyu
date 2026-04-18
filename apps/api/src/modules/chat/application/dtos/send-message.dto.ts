import * as z from 'zod'

export const sendMessageDTO = z.object({
  message: z.string().min(1),
})

export type SendMessageDTO = z.infer<typeof sendMessageDTO>
