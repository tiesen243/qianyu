import * as Effect from 'effect/Effect'

import { createElysia } from '@/lib/create-elysia'
import * as PostModel from '@/models/post.model'
import PostService from '@/services/post.service'

export const postController = createElysia({
  name: 'controller.v1.post',
  prefix: '/v1/posts',
})
  .get(
    '/',
    ({ runtime, query }) =>
      runtime(
        Effect.gen(function* all() {
          const postService = yield* PostService
          const posts = yield* postService.all(query)
          return { posts, pagination: query }
        })
      ),
    { query: PostModel.all }
  )

  .get(
    '/:id',
    ({ runtime, params }) =>
      runtime(
        Effect.gen(function* one() {
          const postService = yield* PostService
          return yield* postService.one(params)
        })
      ),
    { params: PostModel.one }
  )

  .post(
    '/',
    ({ runtime, body }) =>
      runtime(
        Effect.gen(function* create() {
          const postService = yield* PostService
          return yield* postService.create(body)
        })
      ),
    { body: PostModel.create }
  )

  .put(
    '/',
    ({ runtime, body }) =>
      runtime(
        Effect.gen(function* update() {
          const postService = yield* PostService
          return yield* postService.update(body)
        })
      ),
    { params: PostModel.one, body: PostModel.update }
  )

  .delete(
    '/',
    ({ runtime, body }) =>
      runtime(
        Effect.gen(function* update() {
          const postService = yield* PostService
          return yield* postService.delete(body)
        })
      ),
    { body: PostModel.one }
  )
