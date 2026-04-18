import { Elysia } from 'elysia'

import config from '@/shared/config'
import { Response } from '@/shared/response'

export const afterHandler = new Elysia({
  name: `${config.appName}.after-handler`,
})

  .state('startTime', performance.now())

  .onBeforeHandle(({ store }) => {
    store.startTime = performance.now()
  })

  .onAfterResponse(({ store, request, set }) => {
    const duration = performance.now() - store.startTime

    const timestamp = new Date().toISOString()
    const { method } = request
    const { pathname } = new URL(request.url)

    console.log(
      `[${timestamp}] ${method} ${pathname} - ${set.status} (${duration.toFixed(2)}ms)`
    )
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

  .as('global')
