import { Elysia } from 'elysia'

import config from '@/shared/config'

export const timmingPlugin = new Elysia({
  name: `${config.appName}.plugin.timming`,
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

  .as('scoped')
