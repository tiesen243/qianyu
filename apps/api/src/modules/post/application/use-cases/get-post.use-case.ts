import type { GetPostDTO } from '@/modules/post/application/dtos/get-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { AbstractUseCase } from '@/shared/abstracts/use-case'
import { Resp } from '@/shared/response'

export class GetPostUseCase extends AbstractUseCase<
  GetPostDTO.Input,
  GetPostDTO.Output
> {
  public constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(
    input: GetPostDTO.Input
  ): Promise<Resp<GetPostDTO.Output>> {
    const post = await this.postRepository.find(input)
    if (!post) return Resp.NotFound(`Post with id ${input.id} not found`)

    return Resp.Ok('Post retrieved successfully', post)
  }
}
