import { CreatePostUseCase } from '@/modules/post/application/use-cases/create-post.use-case'
import { DeletePostUseCase } from '@/modules/post/application/use-cases/delete-post.use-case'
import { GetPostUseCase } from '@/modules/post/application/use-cases/get-post.use-case'
import { GetPostsUseCase } from '@/modules/post/application/use-cases/get-posts.use-case'
import { UpdatePostUseCase } from '@/modules/post/application/use-cases/update-post.use-case'
import { PostRepository } from '@/modules/post/infrastructure/repositories/post.repositoy.drizzle'
import { postController } from '@/modules/post/interfaces/post.controller'
import { db } from '@/shared/infrastructure/drizzle'

export const createPostModule = async () => {
  const postRepository = new PostRepository(await db)

  const usecases = {
    getPosts: new GetPostsUseCase(postRepository),
    getPost: new GetPostUseCase(postRepository),
    createPost: new CreatePostUseCase(postRepository),
    updatePost: new UpdatePostUseCase(postRepository),
    deletePost: new DeletePostUseCase(postRepository),
  }

  return {
    controller: postController(usecases),
    usecases,
  }
}
