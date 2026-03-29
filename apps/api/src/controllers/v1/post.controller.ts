import * as Effect from 'effect/Effect'

import { createElysia } from '@/lib/create-elysia'
import PostService from '@/services/post.service'

export const postController = createElysia({
  name: 'controller.v1.post',
  prefix: '/v1/posts',
})
  .get('/', () =>
    Effect.gen(function* all() {
      const postService = yield* PostService
      const posts = yield* postService.all()
      return { posts }
    })
  )

  .get('/:id', ({ params }) =>
    Effect.gen(function* one() {
      const postService = yield* PostService
      const post = yield* postService.one(Number.parseInt(params.id, 10))

      return { post }
    })
  )

  .post('/', ({ body }) =>
    Effect.gen(function* create() {
      const postService = yield* PostService
      return yield* postService.create(body as never)
    })
  )

  .put('/:id', ({ params, body }) =>
    Effect.gen(function* update() {
      const postService = yield* PostService
      yield* postService.one(Number.parseInt(params.id, 10))
      return yield* postService.update(
        Number.parseInt(params.id, 10),
        body as never
      )
    })
  )

  .delete('/:id', ({ params }) =>
    Effect.gen(function* update() {
      const postService = yield* PostService
      yield* postService.one(Number.parseInt(params.id, 10))
      return yield* postService.delete(Number.parseInt(params.id, 10))
    })
  )
