import { createRequestHandler } from 'react-router'

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env
      ctx: ExecutionContext
    }
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
)

export default {
  // oxlint-disable-next-line require-await
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
    })
  },
}
