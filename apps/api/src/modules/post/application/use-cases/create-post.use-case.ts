import type { CreatePostDTO } from '@/modules/post/application/dtos/create-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { PostEntity } from '@/modules/post/domain/entities/post.entity'
import { AbstractUseCase } from '@/shared/abstracts/use-case'
import { Response } from '@/shared/response'

export class CreatePostUseCase extends AbstractUseCase<
  CreatePostDTO.Input,
  CreatePostDTO.Output
> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(
    input: CreatePostDTO.Input
  ): Promise<Response<CreatePostDTO.Output>> {
    const post = new PostEntity(input)
    await this.postRepository.save(post)

    return Response.Created('Post created successfully')
  }
}
