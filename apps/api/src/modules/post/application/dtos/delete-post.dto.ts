import * as z from 'zod'

import { post } from '@/modules/post/application/types/post.type'

export namespace DeletePostDTO {
  export const input = post.pick({ id: true })

  export type Input = z.infer<typeof input>

  export const output = z.void()

  export type Output = z.infer<typeof output>
}
