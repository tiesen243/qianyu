import type { DeletePostDTO } from '@/modules/post/application/dtos/delete-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { AbstractUseCase } from '@/shared/abstracts/use-case'
import { Response } from '@/shared/response'

export class DeletePostUseCase extends AbstractUseCase<
  DeletePostDTO.Input,
  DeletePostDTO.Output
> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(
    input: DeletePostDTO.Input
  ): Promise<Response<DeletePostDTO.Output>> {
    const post = await this.postRepository.find(input)
    if (!post) return Response.NotFound(`Post with id ${input.id} not found`)

    await this.postRepository.delete(input)
    return Response.Ok('Post deleted successfully')
  }
}
