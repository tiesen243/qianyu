import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import { name } from '@/../package.json' with { type: 'json' }

export default class Database extends Context.Tag(`${name}.database`)<
  Database,
  { readonly query: (sql: string) => Effect.Effect<void> }
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* live() {
      return {
        query: (sql) =>
          Effect.gen(function* query() {
            return `Result for "${sql.replaceAll(/\s+/g, ' ').trim()}"`
          }),
      }
    })
  )
}
