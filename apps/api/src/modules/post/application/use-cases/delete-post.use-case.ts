import type { DeletePostDTO } from '@/modules/post/application/dtos/delete-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { AbstractUseCase } from '@/shared/abstracts/use-case'
import { Resp } from '@/shared/response'

export class DeletePostUseCase extends AbstractUseCase<
  DeletePostDTO.Input,
  DeletePostDTO.Output
> {
  public constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(
    input: DeletePostDTO.Input
  ): Promise<Resp<DeletePostDTO.Output>> {
    const post = await this.postRepository.find(input)
    if (!post) return Resp.NotFound(`Post with id ${input.id} not found`)

    await this.postRepository.delete(input)
    return Resp.Ok('Post deleted successfully')
  }
}
