import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import { name } from '@/../package.json' with { type: 'json' }
import HttpError from '@/lib/http-error'
import Database from '@/shared/database'

export interface Post {
  id: number
  title: string
  content: string
}

export default class PostService extends Context.Tag(`${name}.service.post`)<
  PostService,
  {
    readonly all: () => Effect.Effect<Post[]>
    readonly one: (id: Post['id']) => Effect.Effect<Post, HttpError>
    readonly create: (data: Omit<Post, 'id'>) => Effect.Effect<Post['id']>
    readonly update: (
      id: Post['id'],
      data: Omit<Post, 'id'>
    ) => Effect.Effect<Post['id'], HttpError>
    readonly delete: (id: Post['id']) => Effect.Effect<Post['id'], HttpError>
  }
>() {
  static posts: Post[] = [
    {
      id: 1,
      title: 'Hello World',
      content: 'This is the first post.',
    },
  ]

  static Live = Layer.effect(
    this,
    Effect.gen(function* live() {
      const db = yield* Database

      return {
        all: () =>
          Effect.gen(function* all() {
            yield* db.query(`SELECT *
              FROM posts
            `)

            return PostService.posts
          }),

        one: (id) =>
          Effect.gen(function* one() {
            yield* db.query(`SELECT *
              FROM posts
              WHERE id = ${id}
            `)

            const post = PostService.posts.find((p) => p.id === id)
            if (!post)
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            return post
          }),

        create: (data) =>
          Effect.gen(function* create() {
            yield* db.query(`INSERT INTO posts (title, content)
                VALUES ('${data.title}', '${data.content}')
              `)

            const id = Math.max(0, ...PostService.posts.map((p) => p.id)) + 1
            PostService.posts.push({ id, ...data })
            return id
          }),

        update: (id, data) =>
          Effect.gen(function* update() {
            yield* db.query(`UPDATE posts
                SET title = '${data.title}', content = '${data.content}'
                WHERE id = ${id}
              `)

            const index = PostService.posts.findIndex((p) => p.id === id)
            if (index === -1)
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            PostService.posts[index] = {
              ...(PostService.posts.at(index) ?? { id }),
              ...data,
            }
            return id
          }),

        delete: (id) =>
          Effect.gen(function* del() {
            yield* db.query(`DELETE FROM posts
                WHERE id = ${id}
              `)

            const index = PostService.posts.findIndex((p) => p.id === id)
            if (index === -1)
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            PostService.posts = PostService.posts.filter((p) => p.id !== id)
            return id
          }),
      }
    })
  )
}
