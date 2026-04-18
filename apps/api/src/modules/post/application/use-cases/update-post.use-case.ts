import type { UpdatePostDTO } from '@/modules/post/application/dtos/update-post.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { UseCase } from '@/shared/abtracts/use-case'
import { Response } from '@/shared/response'

export class UpdatePostUseCase extends UseCase<
  UpdatePostDTO.Input,
  UpdatePostDTO.Output
> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute(
    input: UpdatePostDTO.Input
  ): Promise<Response<UpdatePostDTO.Output>> {
    const post = await this.postRepository.find({ id: input.id })
    if (!post) return Response.NotFound(`Post with id ${input.id} not found`)

    const updatedPost = post.clone(input)
    await this.postRepository.save(updatedPost)

    return Response.Ok('Post updated successfully')
  }
}
