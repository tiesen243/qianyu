import type { Repository } from '@/shared/abtracts/repository'

import type { PostEntity } from '@/modules/post/domain/entities/post.entity'

// oxlint-disable-next-line typescript/no-empty-object-type
export interface IPostRepository extends Repository<PostEntity> {}
