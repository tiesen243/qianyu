import type { Static } from 'elysia'

import { t } from 'elysia'

// oxlint-disable-next-line typescript/no-namespace
export namespace PostModel {
  export const post = t.Object({
    id: t.Number(),
    title: t.String(),
    content: t.String(),
    createdAt: t.Date(),
  })
  export type Post = Static<typeof post>

  export const all = t.Object({
    page: t.Number({ default: 1 }),
    limit: t.Number({ default: 10 }),
  })
  export type All = Static<typeof all>

  export const one = t.Pick(post, ['id'])
  export type One = Static<typeof one>

  export const create = t.Omit(post, ['id', 'createdAt'])
  export type Create = Static<typeof create>

  export const update = t.Partial(create)
  export type Update = Static<typeof update>
}
