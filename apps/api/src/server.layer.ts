// oxlint-disable promise/prefer-await-to-callbacks

import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import { StatusMap } from 'elysia'

import type HttpError from '@/lib/http-error'

import { createElysia } from '@/lib/create-elysia'
import PostService from '@/services/post.service'
import TodoService from '@/services/todo.service'
import Database from '@/shared/database'

const mergedLayer = Layer.mergeAll(PostService.Live, TodoService.Live).pipe(
  Layer.provide(Database.Live)
)

export const serverLayer = createElysia({ name: 'layer' })
  .onAfterHandle(({ responseValue, status }) => {
    if (Effect.isEffect(responseValue)) {
      const response = (responseValue as Effect.Effect<never, HttpError>).pipe(
        Effect.catchTag('HttpError', (error) =>
          Effect.succeed(
            status(error.status, {
              status: StatusMap[error.status],
              message: error.message,
            })
          )
        )
      )

      return Effect.runPromise(Effect.provide(response, mergedLayer)).catch(
        (error) =>
          status(500, {
            status: 500,
            message: error instanceof Error ? error.message : 'Unknown Error',
          })
      )
    }

    return responseValue
  })
  .as('global')
