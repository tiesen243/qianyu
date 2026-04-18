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
      default: {
        return Response.Error('Internal Server Error')
      }
    }
  })

  .as('scoped')
