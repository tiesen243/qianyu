// oxlint-disable promise/prefer-await-to-callbacks

import { env } from 'cloudflare:workers'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import { Elysia, status } from 'elysia'

import type HttpError from '@/lib/http-error'

import PostService from '@/services/post.service'
import Database from '@/shared/database'

const mergedLayer = Layer.mergeAll(PostService.Live).pipe(
  Layer.provide(Database.Live)
)

export const runtime = new Elysia({ name: `${env.APP_NAME}.runtime` })
  .decorate(
    'runtime',
    <TResult>(effect: Effect.Effect<TResult, HttpError, PostService>) =>
      Effect.runPromise(
        Effect.provide(effect, mergedLayer).pipe(
          Effect.catchTag('HttpError', (error) =>
            Effect.fail(status(error.status, error.message))
          )
        )
      )
  )
  .as('global')
