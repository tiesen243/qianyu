// oxlint-disable promise/prefer-await-to-callbacks

import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'
import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import HttpError from '@/lib/http-error'
import * as schema from '@/shared/database/schema'

const globalForDrizzle = globalThis as unknown as {
  drizzle: ReturnType<typeof drizzle>
}

export default class Database extends Context.Tag(`${env.APP_NAME}.database`)<
  Database,
  {
    readonly schema: Effect.Effect<typeof schema>
    readonly query: <TResult>(
      cb: (client: ReturnType<typeof drizzle>) => PromiseLike<TResult>
    ) => Effect.Effect<TResult, HttpError>
  }
>() {
  static Live = Layer.effect(
    this,
    Effect.succeed({
      schema: Effect.succeed(schema),
      query: (cb) =>
        Effect.tryPromise({
          try: () => cb((globalForDrizzle.drizzle ??= drizzle(env.DB))),
          catch: (error) =>
            new HttpError({
              status: 'Internal Server Error',
              message:
                error instanceof Error
                  ? error.message
                  : 'Database query failed',
            }),
        }),
    })
  )
}
