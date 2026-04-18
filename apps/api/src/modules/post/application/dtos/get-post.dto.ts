import * as z from 'zod'

export const getPostDTO = z.object({
  id: z.cuid2(),
})

export type GetPostDTO = z.infer<typeof getPostDTO>
