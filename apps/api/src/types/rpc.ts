import {
  inferRouterInputs,
  inferRouterOutputs,
  TRPCBuiltRouter,
  TRPCDecorateCreateRouterOptions,
} from '@trpc/server'
import { AnyRootTypes } from '@trpc/server/unstable-core-do-not-import'

import { PostRouter } from '@/modules/post/interfaces/rpc/post.router'

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

export type { AppRouter, RouterInputs, RouterOutputs }
