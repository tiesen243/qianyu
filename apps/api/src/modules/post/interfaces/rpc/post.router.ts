import type { PostUseCases } from '@/modules/post/application/types/use-cases.type'

import { CreatePostDTO } from '@/modules/post/application/dtos/create-post.dto'
import { DeletePostDTO } from '@/modules/post/application/dtos/delete-post.dto'
import { GetPostDTO } from '@/modules/post/application/dtos/get-post.dto'
import { GetPostsDTO } from '@/modules/post/application/dtos/get-posts.dto'
import { UpdatePostDTO } from '@/modules/post/application/dtos/update-post.dto'
import { postMiddleware } from '@/modules/post/interfaces/rpc/post.middleware'
import { createRouter, procedure } from '@/shared/trpc'

export const postRouter = (usecases: PostUseCases) =>
  createRouter({
    all: procedure
      .use(postMiddleware())
      .input(GetPostsDTO.input)
      .output(GetPostsDTO.output)
      .query(({ input }) =>
        usecases.getPosts.execute(input).then((r) => r.toTRPC())
      ),

    one: procedure
      .use(postMiddleware())
      .input(GetPostDTO.input)
      .output(GetPostDTO.output)
      .query(({ input }) =>
        usecases.getPost.execute(input).then((r) => r.toTRPC())
      ),

    create: procedure
      .use(postMiddleware())
      .input(CreatePostDTO.input)
      .output(CreatePostDTO.output)
      .mutation(({ input }) =>
        usecases.createPost.execute(input).then((r) => r.toTRPC())
      ),

    update: procedure
      .use(postMiddleware())
      .input(UpdatePostDTO.input)
      .output(UpdatePostDTO.output)
      .mutation(({ input }) =>
        usecases.updatePost.execute(input).then((r) => r.toTRPC())
      ),

    delete: procedure
      .use(postMiddleware())
      .input(DeletePostDTO.input)
      .output(DeletePostDTO.output)
      .mutation(({ input }) =>
        usecases.deletePost.execute(input).then((r) => r.toTRPC())
      ),
  })

export type PostRouter = ReturnType<typeof postRouter>
