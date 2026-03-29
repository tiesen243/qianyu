import * as z from 'zod'

export const post = z.object({
  id: z.coerce.number(),
  title: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.date(),
})
export type Post = z.infer<typeof post>

export const all = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})
export type All = z.infer<typeof all>

export const one = post.pick({ id: true })
export type One = z.infer<typeof one>

export const create = post.omit({ id: true, createdAt: true })
export type Create = z.infer<typeof create>

export const update = create.partial().extend({ id: one.shape.id })
export type Update = z.infer<typeof update>
