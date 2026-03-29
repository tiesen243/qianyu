// oxlint-disable require-yield

import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import { name } from '@/../package.json' with { type: 'json' }
import HttpError from '@/lib/http-error'

export interface Todo {
  id: number
  title: string
  isComplete: boolean
}

export default class TodoService extends Context.Tag(`${name}.service.todo`)<
  TodoService,
  {
    readonly all: () => Effect.Effect<Todo[]>
    readonly one: (id: Todo['id']) => Effect.Effect<Todo, HttpError>
    readonly create: (data: Omit<Todo, 'id'>) => Effect.Effect<Todo['id']>
    readonly update: (
      id: Todo['id'],
      data: Omit<Todo, 'id'>
    ) => Effect.Effect<Todo['id'], HttpError>
    readonly delete: (id: Todo['id']) => Effect.Effect<Todo['id'], HttpError>
  }
>() {
  static posts: Todo[] = []

  static Live = Layer.effect(
    this,
    Effect.gen(function* live() {
      return {
        all: () =>
          Effect.gen(function* all() {
            return TodoService.posts
          }),

        one: (id) =>
          Effect.gen(function* one() {
            const post = TodoService.posts.find((p) => p.id === id)
            if (!post)
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Todo not found',
                })
              )

            return post
          }),

        create: (data) =>
          Effect.gen(function* create() {
            const id = Math.max(0, ...TodoService.posts.map((p) => p.id)) + 1
            TodoService.posts.push({ id, ...data })
            return id
          }),

        update: (id, data) =>
          Effect.gen(function* update() {
            const index = TodoService.posts.findIndex((p) => p.id === id)
            if (index === -1)
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            TodoService.posts[index] = {
              ...(TodoService.posts.at(index) ?? { id }),
              ...data,
            }
            return id
          }),

        delete: (id) =>
          Effect.gen(function* del() {
            const index = TodoService.posts.findIndex((p) => p.id === id)
            if (index === -1)
              return yield* Effect.fail(
                new HttpError({
                  status: 'Not Found',
                  message: 'Post not found',
                })
              )

            TodoService.posts = TodoService.posts.filter((p) => p.id !== id)
            return id
          }),
      }
    })
  )
}
