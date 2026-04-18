import type { GetPostDTO } from '@/modules/post/application/dtos/get-post.dto'
import type { Post } from '@/modules/post/domain/entities/post.entity'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { UseCase } from '@/shared/abtracts/use-case'
import { Response } from '@/shared/response'

export class GetPostUseCase extends UseCase<GetPostDTO, Post | null> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(input: GetPostDTO): Promise<Response<Post | null>> {
    const post = await this.postRepository.find(input)
    if (!post) return Response.NotFound(`Post with id ${input.id} not found`)

    return Response.Ok('Post retrieved successfully', post)
  }
}
