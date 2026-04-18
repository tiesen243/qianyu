import { Elysia } from 'elysia'

import type { PostUseCases } from '@/modules/post/application/types/use-cases.type'

import { CreatePostDTO } from '@/modules/post/application/dtos/create-post.dto'
import { DeletePostDTO } from '@/modules/post/application/dtos/delete-post.dto'
import { GetPostDTO } from '@/modules/post/application/dtos/get-post.dto'
import { GetPostsDTO } from '@/modules/post/application/dtos/get-posts.dto'
import { UpdatePostDTO } from '@/modules/post/application/dtos/update-post.dto'
import { postMiddleware } from '@/modules/post/interfaces/http/post.middleware'
import config from '@/shared/config'

export const postController = (usecases: PostUseCases) =>
  new Elysia({
    name: `${config.appName}.controller.post`,
    prefix: '/api/v1/posts',
    tags: ['posts'],
  })
    .use(postMiddleware())

    .get('/', ({ query }) => usecases.getPosts.execute(query), {
      query: GetPostsDTO.input,
    })

    .get('/:id', ({ params }) => usecases.getPost.execute(params), {
      params: GetPostDTO.input,
    })

    .post('/', ({ body }) => usecases.createPost.execute(body), {
      body: CreatePostDTO.input,
    })

    .put(
      '/:id',
      ({ params, body }) => usecases.updatePost.execute({ ...params, ...body }),
      {
        params: UpdatePostDTO.input.pick({ id: true }),
        body: UpdatePostDTO.input.omit({ id: true }),
      }
    )

    .delete('/:id', ({ params }) => usecases.deletePost.execute(params), {
      params: DeletePostDTO.input,
    })
