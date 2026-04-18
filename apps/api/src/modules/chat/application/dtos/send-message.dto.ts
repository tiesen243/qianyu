import * as z from 'zod'

export namespace SendMessageDTO {
  export const input = z.object({
    message: z.string().min(1),
  })

  export type Input = z.infer<typeof input>

  export const output = z.void()

  export type Output = z.infer<typeof output>
}
