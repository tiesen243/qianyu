// oxlint-disable promise/prefer-await-to-callbacks

import { env } from 'cloudflare:workers'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import { Elysia } from 'elysia'

import type HttpError from '@/lib/http-error'

import PostService from '@/services/post.service'
import Database from '@/shared/database'

const mergedLayer = Layer.mergeAll(PostService.Live).pipe(
  Layer.provide(Database.Live)
)

type Services = Layer.Layer.Success<typeof mergedLayer>

export const runtime = new Elysia({ name: `${env.APP_NAME}.runtime` })
  .decorate('runtime', <T>(effect: Effect.Effect<T, HttpError, Services>) =>
    Effect.runPromise(
      Effect.provide(effect, mergedLayer).pipe(
        Effect.catchTag('HttpError', ({ status, message }) =>
          Effect.fail({ status, message })
        )
      )
    )
  )
  .onError(({ error, status }) => {
    if (error instanceof Error && error.name.includes('FiberFailure')) {
      try {
        const failure = JSON.parse(error.message)
        return status(failure.status, failure)
      } catch {
        return status(500, {
          status: 'Internal Server Error',
          message: 'An unexpected error occurred',
          details: error.message,
        })
      }
    }
  })
  .as('global')
