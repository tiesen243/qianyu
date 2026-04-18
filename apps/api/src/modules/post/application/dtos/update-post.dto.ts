import * as z from 'zod'

import { post } from '@/modules/post/application/types/post.type'

export namespace UpdatePostDTO {
  export const input = post.partial().extend({
    id: post.shape.id,
  })

  export type Input = z.infer<typeof input>

  export const output = z.void()

  export type Output = z.infer<typeof output>
}
