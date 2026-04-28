import { initTRPC } from '@trpc/server'

import { transformer } from '@/shared/trpc.transformer'

const t = initTRPC.create({
  transformer,
})

const createRouter = t.router

const createMiddleware = t.middleware

const procedure = t.procedure.use(createMiddleware(({ next }) => next()))

export { createRouter, createMiddleware, procedure }
