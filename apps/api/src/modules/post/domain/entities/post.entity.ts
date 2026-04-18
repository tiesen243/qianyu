import type { Post } from '@/modules/post/application/types/post.type'

import { Entity } from '@/shared/abtracts/entity'
import { createId } from '@/shared/utils/create-id'

export class PostEntity extends Entity<Post> {
  public id: string
  public title: string
  public content: string
  public createdAt: Date
  public updatedAt: Date

  constructor(props: Partial<Post>) {
    super()

    this.id = props.id ?? createId()
    this.title = props.title ?? 'Untitled Post'
    this.content = props.content ?? ''
    this.createdAt = props.createdAt ?? new Date()
    this.updatedAt = props.updatedAt ?? new Date()
  }
}
