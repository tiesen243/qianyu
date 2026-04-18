import { createMiddleware } from '@/shared/trpc'

export const postMiddleware = () => createMiddleware(({ next }) => next({}))
