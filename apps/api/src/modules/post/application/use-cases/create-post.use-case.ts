import type { CreatePostDTO } from '@/modules/post/application/dtos/create-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { Post } from '@/modules/post/domain/entities/post.entity'
import { UseCase } from '@/shared/abtracts/use-case'
import { Response } from '@/shared/response'

export class CreatePostUseCase extends UseCase<CreatePostDTO, Post> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(input: CreatePostDTO): Promise<Response<Post>> {
    const post = new Post(input)
    await this.postRepository.save(post)

    return Response.Created('Post created successfully', post)
  }
}
