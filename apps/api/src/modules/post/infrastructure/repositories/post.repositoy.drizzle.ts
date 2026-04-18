import type { IPostRepository } from '@/modules/post/domain/repositories/post.repository'

import { Post } from '@/modules/post/domain/entities/post.entity'
import { DrizzleRepository } from '@/shared/infrastructure/drizzle/drizzle.repository'
import { posts } from '@/shared/infrastructure/drizzle/schema'

export class PostRepository
  extends DrizzleRepository<Post, typeof posts>
  implements IPostRepository
{
  constructor(db: DrizzleRepository.Database) {
    super(db, posts)
  }

  protected _mapToEntity(row: Record<string, unknown>): Post {
    return new Post({
      id: String(row.id),
      title: String(row.title),
      content: String(row.content),
      createdAt: row.createdAt instanceof Date ? row.createdAt : undefined,
      updatedAt: row.updatedAt instanceof Date ? row.updatedAt : undefined,
    })
  }

  protected _mapToRow(entity: Post): typeof posts.$inferSelect {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
