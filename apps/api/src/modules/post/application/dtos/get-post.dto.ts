import type * as z from 'zod'

import { post } from '@/modules/post/application/types/post.type'

export namespace GetPostDTO {
  export const input = post.pick({ id: true })

  export type Input = z.infer<typeof input>

  export const output = post.nullable()

  export type Output = z.infer<typeof output>
}
