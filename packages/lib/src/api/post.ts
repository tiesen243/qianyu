import { queryOptions } from '@tanstack/react-query'

const API_URL = 'https://dummyjson.com/posts'

interface Post {
  id: number
  title: string
  body: string
  tags: string[]
}

const keys = {
  all: (opts: { limit?: number; skip?: number }) => [
    'posts',
    { limit: opts.limit ?? 1, skip: opts.skip ?? 0 },
  ],
  one: (opts: { id: number }) => ['posts', opts.id],
}

const all = {
  key: keys.all,
  queryOptions: (opts: Parameters<typeof keys.all>[0]) =>
    queryOptions({
      queryKey: keys.all(opts),
      queryFn: async () => {
        const res = await fetch(
          `${API_URL}?limit=${opts.limit ?? 1}&skip=${opts.skip ?? 0}`
        )
        const data = (await res.json()) as { posts: Post[] }
        return data.posts
      },
    }),
}

const one = {
  key: keys.one,
  queryOptions: (opts: Parameters<typeof keys.one>[0]) =>
    queryOptions({
      queryKey: keys.one(opts),
      queryFn: async () => {
        const res = await fetch(`${API_URL}/${opts.id}`)
        const data = (await res.json()) as Post
        return data
      },
    }),
}

export const post = {
  all,
  one,
}
