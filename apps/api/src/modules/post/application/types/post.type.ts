import * as z from 'zod'

export const post = z.object({
  id: z.cuid2(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Post = z.infer<typeof post>
