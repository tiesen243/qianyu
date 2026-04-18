import * as z from 'zod'

export const getPostsDTO = z.object({
  query: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export type GetPostsDTO = z.infer<typeof getPostsDTO>
