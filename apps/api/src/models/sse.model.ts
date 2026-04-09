import * as z from 'zod'

export const send = z.object({
  message: z.string().min(1),
})
export type Send = z.infer<typeof send>
