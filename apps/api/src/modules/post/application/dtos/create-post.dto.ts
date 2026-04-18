import * as z from 'zod'

import { post } from '@/modules/post/application/types/post.type'

export namespace CreatePostDTO {
  export const input = post.pick({ title: true, content: true })

  export type Input = z.infer<typeof input>

  export const output = z.void()

  export type Output = z.infer<typeof output>
}
