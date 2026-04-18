import type { DeletePostDTO } from '@/modules/post/application/dtos/delete-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { UseCase } from '@/shared/abtracts/use-case'
import { Response } from '@/shared/response'

export class DeletePostUseCase extends UseCase<DeletePostDTO, void> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(input: DeletePostDTO): Promise<Response<void>> {
    const post = await this.postRepository.find(input)
    if (!post) return Response.NotFound(`Post with id ${input.id} not found`)

    await this.postRepository.delete(input)
    return Response.Ok('Post deleted successfully')
  }
}
