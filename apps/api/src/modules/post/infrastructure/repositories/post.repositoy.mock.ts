import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { PostEntity } from '@/modules/post/domain/entities/post.entity'
import { MockRepository } from '@/shared/infrastructure/mock/mock.repository'

export class PostRepository
  extends MockRepository<PostEntity>
  implements IPostRepository {}
