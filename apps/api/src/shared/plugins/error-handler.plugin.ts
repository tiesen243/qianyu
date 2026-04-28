import { Elysia } from 'elysia'

import config from '@/shared/config'
import { Resp } from '@/shared/response'

export const errorHandlerPlugin = new Elysia({
  name: `${config.appName}.plugin.error-handler`,
})

  .onError(({ error, code }) => {
    switch (code) {
      case 'VALIDATION': {
        return new Resp('BAD_REQUEST', 'Validation Error', error.valueError)
      }
      case 'NOT_FOUND': {
        return Resp.NotFound('The requested resource was not found')
      }
      case 'INTERNAL_SERVER_ERROR': {
        return Resp.Error(error.message)
      }
      default: {
        console.log('Unhandled error:', error)
        return Resp.Error('An unexpected error occurred')
      }
    }
  })

  .as('scoped')
