import type { CreatePostUseCase } from '@/modules/post/application/use-cases/create-post.use-case'
import type { DeletePostUseCase } from '@/modules/post/application/use-cases/delete-post.use-case'
import type { GetPostUseCase } from '@/modules/post/application/use-cases/get-post.use-case'
import type { GetPostsUseCase } from '@/modules/post/application/use-cases/get-posts.use-case'
import type { UpdatePostUseCase } from '@/modules/post/application/use-cases/update-post.use-case'

export interface PostUseCases {
  getPosts: GetPostsUseCase
  getPost: GetPostUseCase
  createPost: CreatePostUseCase
  updatePost: UpdatePostUseCase
  deletePost: DeletePostUseCase
}
