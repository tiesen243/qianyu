import type { Server } from '@qianyu/api'

import { treaty } from '@elysiajs/eden/treaty2'
import { PostModel } from '@qianyu/api/models/post'
import { mutationOptions, queryOptions } from '@tanstack/react-query'

const keys = {
  all: (opts: PostModel.All) => ['posts', opts],
  one: (opts: PostModel.One) => ['posts', opts],
  create: () => ['posts', 'create'],
  update: (opts: PostModel.One) => ['posts', 'update', opts.id],
  delete: (opts: PostModel.One) => ['posts', 'delete', opts.id],
}

export const post = (api: ReturnType<typeof treaty<Server>>) => ({
  all: {
    key: keys.all,
    queryOptions: (opts: PostModel.All) =>
      queryOptions({
        queryKey: keys.all(opts),
        queryFn: async () => {
          const { data, error } = await api.v1.posts.get({ query: opts })
          if (error) throw error.value
          return data
        },
      }),
  },

  one: {
    key: keys.one,
    queryOptions: (opts: PostModel.One) =>
      queryOptions({
        queryKey: keys.one(opts),
        queryFn: async () => {
          const { data, error } = await api.v1.posts({ id: opts.id }).get()
          if (error) throw error.value
          return data
        },
      }),
  },

  create: {
    key: keys.create,
    mutationFn: () =>
      mutationOptions({
        mutationKey: keys.create(),
        mutationFn: async (input: PostModel.Create) => {
          const { data, error } = await api.v1.posts.post(input)
          if (error) throw error.value
          return data
        },
      }),
  },

  update: {
    key: keys.update,
    mutationFn: (opts: PostModel.One) =>
      mutationOptions({
        mutationKey: keys.update(opts),
        mutationFn: async (input: PostModel.Update) => {
          const { data: res, error } = await api.v1
            .posts({ id: opts.id })
            .put(input)
          if (error) throw error.value
          return res
        },
      }),
  },

  delete: {
    key: keys.delete,
    mutationFn: (input: PostModel.One) =>
      mutationOptions({
        mutationKey: keys.delete(input),
        mutationFn: async () => {
          const { data, error } = await api.v1.posts(input).delete()
          if (error) throw error.value
          return data
        },
      }),
  },
})
