import type { PostEntity } from '@/modules/post/domain/entities/post.entity'
import type { AbstractRepository } from '@/shared/abstracts/repository'

export interface IPostRepository extends AbstractRepository<PostEntity> {}
