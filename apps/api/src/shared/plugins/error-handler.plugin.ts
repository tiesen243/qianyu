import { Elysia } from 'elysia'

import config from '@/shared/config'
import { Response } from '@/shared/response'

export const errorHandlerPlugin = new Elysia({
  name: `${config.appName}.plugin.error-handler`,
})

  .onError(({ error, code }) => {
    switch (code) {
      case 'VALIDATION': {
        return new Response('Bad Request', 'Validation Error', error.valueError)
      }
      case 'NOT_FOUND': {
        return Response.NotFound('The requested resource was not found')
      }
      case 'INTERNAL_SERVER_ERROR': {
        return Response.Error(error.message)
      }
      default: {
        console.log('Unhandled error:', error)
        return Response.Error('An unexpected error occurred')
      }
    }
  })

  .as('scoped')
