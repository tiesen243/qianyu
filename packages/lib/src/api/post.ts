import type { App } from '@qianyu/api'

import { treaty } from '@elysiajs/eden'
import {
  CreatePostDTO,
  DeletePostDTO,
  GetPostDTO,
  GetPostsDTO,
  UpdatePostDTO,
} from '@qianyu/api/post'
import { mutationOptions, queryOptions } from '@tanstack/react-query'

const keys = {
  all: (opts: GetPostsDTO.Input) => ['posts', opts],
  one: (opts: GetPostDTO.Input) => ['posts', opts],
  create: () => ['posts', 'create'],
  update: () => ['posts', 'update'],
  delete: () => ['posts', 'delete'],
}

export const post = ({ api }: ReturnType<typeof treaty<App>>) => ({
  all: {
    queryKey: keys.all,
    queryOptions: (opts: GetPostsDTO.Input) =>
      queryOptions({
        queryKey: keys.all(opts),
        queryFn: async () => {
          const { data, error } = await api.v1.posts.get({ query: opts })
          if (error) throw error.value
          return data.data
        },
      }),
  },

  one: {
    queryKey: keys.one,
    queryOptions: (opts: GetPostDTO.Input) =>
      queryOptions({
        queryKey: keys.one(opts),
        queryFn: async () => {
          const { data, error } = await api.v1.posts({ id: opts.id }).get()
          if (error) throw error.value
          return data.data
        },
      }),
  },

  create: {
    mutationKey: keys.create,
    mutationOptions: () =>
      mutationOptions({
        mutationKey: keys.create(),
        mutationFn: async (input: CreatePostDTO.Input) => {
          const { data, error } = await api.v1.posts.post(input)
          if (error) throw error.value
          return data.data
        },
      }),
  },

  update: {
    mutationKey: keys.update,
    mutationOptions: () =>
      mutationOptions({
        mutationKey: keys.update(),
        mutationFn: async ({ id, ...input }: UpdatePostDTO.Input) => {
          const { data, error } = await api.v1.posts({ id }).put(input)
          if (error) throw error.value
          return data.data
        },
      }),
  },

  delete: {
    mutationKey: keys.delete,
    mutationOptions: () =>
      mutationOptions({
        mutationKey: keys.delete(),
        mutationFn: async (input: DeletePostDTO.Input) => {
          const { data, error } = await api.v1.posts(input).delete()
          if (error) throw error.value
          return data.data
        },
      }),
  },
})
