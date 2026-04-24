import type {
  inferRouterInputs,
  inferRouterOutputs,
  TRPCBuiltRouter,
  TRPCDecorateCreateRouterOptions,
} from '@trpc/server'
import type { AnyRootTypes } from '@trpc/server/unstable-core-do-not-import'

import type { createApp } from '@/app'
import type { PostRouter } from '@/modules/post/interfaces/rpc/post.router'

type App = Awaited<ReturnType<typeof createApp>>

type AppRouter = TRPCBuiltRouter<
  AnyRootTypes,
  TRPCDecorateCreateRouterOptions<{
    post: PostRouter
  }>
>

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 */
type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 */
type RouterOutputs = inferRouterOutputs<AppRouter>

export type { App, AppRouter, RouterInputs, RouterOutputs }
