import type { Post } from '@/modules/post/domain/entities/post.entity'
import type { Repository } from '@/shared/abtracts/repository'

// oxlint-disable-next-line typescript/no-empty-object-type
export interface IPostRepository extends Repository<Post> {}
