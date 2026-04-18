import * as z from 'zod'

export const createPostDTO = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

export type CreatePostDTO = z.infer<typeof createPostDTO>
