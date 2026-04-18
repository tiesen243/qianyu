import type { CreatePostDTO } from '@/modules/post/application/dtos/create-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { PostEntity } from '@/modules/post/domain/entities/post.entity'
import { UseCase } from '@/shared/abtracts/use-case'
import { Response } from '@/shared/response'

export class CreatePostUseCase extends UseCase<
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
