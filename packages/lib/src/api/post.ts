import type { Server } from '@qianyu/api'
import type * as PostModel from '@qianyu/api/models/post'

import { treaty } from '@elysiajs/eden'
import { mutationOptions, queryOptions } from '@tanstack/react-query'

const keys = {
  all: (opts: PostModel.All) => ['posts', opts],
  one: (opts: PostModel.One) => ['posts', opts],
  create: () => ['posts', 'create'],
  update: () => ['posts', 'update'],
  delete: () => ['posts', 'delete'],
}

export const post = (api: ReturnType<typeof treaty<Server>>) => ({
  all: {
    queryKey: keys.all,
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
    queryKey: keys.one,
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
    mutationKey: keys.create,
    mutationOptions: () =>
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
    mutationKey: keys.update,
    mutationOptions: () =>
      mutationOptions({
        mutationKey: keys.update(),
        mutationFn: async (input: PostModel.Update) => {
          const { data: res, error } = await api.v1.posts.put(input)
          if (error) throw error.value
          return res
        },
      }),
  },

  delete: {
    mutationKey: keys.delete,
    mutationOptions: (input: PostModel.One) =>
      mutationOptions({
        mutationKey: keys.delete(),
        mutationFn: async () => {
          const { data, error } = await api.v1.posts.delete(input)
          if (error) throw error.value
          return data
        },
      }),
  },
})
