import type { StatusMap } from 'elysia'

import * as Data from 'effect/Data'

export default class HttpError extends Data.TaggedError('HttpError')<{
  status: keyof StatusMap
  message: string
}> {}
