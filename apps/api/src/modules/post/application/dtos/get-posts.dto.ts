import * as z from 'zod'

import { post } from '@/modules/post/application/types/post.type'

export namespace GetPostsDTO {
  export const input = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  })

  export type Input = z.infer<typeof input>

  export const output = z.array(post)

  export type Output = z.infer<typeof output>
}
