import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'
import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import type * as PostModel from '@/models/post.model'

import HttpError from '@/lib/http-error'
import Database from '@/shared/database'

export default class PostService extends Context.Tag(
  `${env.APP_NAME}.service.post`
)<
  PostService,
  {
    readonly all: (
      input: PostModel.All
    ) => Effect.Effect<PostModel.Post[], HttpError>
    readonly one: (
      input: PostModel.One
    ) => Effect.Effect<PostModel.Post, HttpError>
    readonly create: (
      input: PostModel.Create
    ) => Effect.Effect<PostModel.One, HttpError>
    readonly update: (
      input: PostModel.One & PostModel.Update
    ) => Effect.Effect<PostModel.One, HttpError>
    readonly delete: (
      input: PostModel.One
    ) => Effect.Effect<PostModel.One, HttpError>
  }
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* live() {
      const db = yield* Database
      const { posts } = yield* db.schema

      return {
        all: ({ page = 1, limit = 10 }) =>
          Effect.gen(function* all() {
            const offset = (page - 1) * limit
            return yield* db.query((client) =>
              client.select().from(posts).limit(limit).offset(offset)
            )
          }),

        one: ({ id }) =>
          Effect.gen(function* one() {
            const result = yield* db.query((client) =>
              client.select().from(posts).where(eq(posts.id, id)).limit(1)
            )
            if (!result[0])
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            return result[0]
          }),

        create: (input) =>
          Effect.gen(function* create() {
            const result = yield* db.query((client) =>
              client.insert(posts).values(input).returning({ id: posts.id })
            )
            if (!result[0])
              return yield* Effect.fail(
                new HttpError({
                  status: 'Internal Server Error',
                  message: 'Failed to create post',
                })
              )

            return { id: result[0].id }
          }),

        update: ({ id, ...data }) =>
          Effect.gen(function* update() {
            const result = yield* db.query((client) =>
              client
                .update(posts)
                .set(data)
                .where(eq(posts.id, id))
                .returning({ id: posts.id })
            )
            if (!result[0])
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            return { id: result[0].id }
          }),

        delete: ({ id }) =>
          Effect.gen(function* del() {
            const result = yield* db.query((client) =>
              client
                .delete(posts)
                .where(eq(posts.id, id))
                .returning({ id: posts.id })
            )
            if (!result[0])
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            return { id: result[0].id }
          }),
      }
    })
  )
}
