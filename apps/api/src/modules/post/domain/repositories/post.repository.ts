import type { PostEntity } from '@/modules/post/domain/entities/post.entity'
import type { Repository } from '@/shared/abtracts/repository'

export interface IPostRepository extends Repository<PostEntity> {}
