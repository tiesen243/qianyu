import type { GetPostsDTO } from '@/modules/post/application/dtos/get-posts.dto'
import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { AbstractUseCase } from '@/shared/abstracts/use-case'
import { Response } from '@/shared/response'

export class GetPostsUseCase extends AbstractUseCase<
  GetPostsDTO.Input,
  GetPostsDTO.Output
> {
  constructor(private readonly postRepository: IPostRepository) {
    super()
  }

  public async execute({
    query = '',
    page,
    limit,
  }: GetPostsDTO.Input): Promise<Response<GetPostsDTO.Output>> {
    const offset = (page - 1) * limit

    const posts = await this.postRepository.all(
      query ? [{ title: `%${query}%` }] : [],
      { createdAt: 'desc' },
      { limit, offset }
    )

    return Response.Ok('Posts retrieved successfully', posts)
  }
}
