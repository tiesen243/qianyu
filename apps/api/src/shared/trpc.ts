import { initTRPC } from '@trpc/server'

const t = initTRPC.create({})

const createRouter = t.router

const createMiddleware = t.middleware

const procedure = t.procedure.use(createMiddleware(({ next }) => next({})))

export { createRouter, createMiddleware, procedure }
