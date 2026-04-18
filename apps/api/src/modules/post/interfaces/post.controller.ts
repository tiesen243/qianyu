import { Elysia } from 'elysia'

import type { CreatePostUseCase } from '@/modules/post/application/use-cases/create-post.use-case'
import type { DeletePostUseCase } from '@/modules/post/application/use-cases/delete-post.use-case'
import type { GetPostUseCase } from '@/modules/post/application/use-cases/get-post.use-case'
import type { GetPostsUseCase } from '@/modules/post/application/use-cases/get-posts.use-case'
import type { UpdatePostUseCase } from '@/modules/post/application/use-cases/update-post.use-case'

import { createPostDTO } from '@/modules/post/application/dtos/create-post.dto'
import { deletePostDTO } from '@/modules/post/application/dtos/delete-post.dto'
import { getPostDTO } from '@/modules/post/application/dtos/get-post.dto'
import { getPostsDTO } from '@/modules/post/application/dtos/get-posts.dto'
import { updatePostDTO } from '@/modules/post/application/dtos/update-post.dto'
import config from '@/shared/config'

interface PostUseCases {
  getPosts: GetPostsUseCase
  getPost: GetPostUseCase
  createPost: CreatePostUseCase
  updatePost: UpdatePostUseCase
  deletePost: DeletePostUseCase
}

export const postController = (usecases: PostUseCases) =>
  new Elysia({
    name: `${config.appName}.controller.post`,
    prefix: '/api/v1/posts',
    tags: ['posts'],
  })

    .get('/', ({ query }) => usecases.getPosts.execute(query), {
      query: getPostsDTO,
    })

    .get('/:id', ({ params }) => usecases.getPost.execute(params), {
      params: getPostDTO,
    })

    .post('/', ({ body }) => usecases.createPost.execute(body), {
      body: createPostDTO,
    })

    .put(
      '/:id',
      ({ params, body }) => usecases.updatePost.execute({ ...params, ...body }),
      {
        params: updatePostDTO.pick({ id: true }),
        body: updatePostDTO.omit({ id: true }),
      }
    )

    .delete('/:id', ({ params }) => usecases.deletePost.execute(params), {
      params: deletePostDTO,
    })
