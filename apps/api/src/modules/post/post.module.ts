// Usecases
import { CreatePostUseCase } from '@/modules/post/application/use-cases/create-post.use-case'
import { DeletePostUseCase } from '@/modules/post/application/use-cases/delete-post.use-case'
import { GetPostUseCase } from '@/modules/post/application/use-cases/get-post.use-case'
import { GetPostsUseCase } from '@/modules/post/application/use-cases/get-posts.use-case'
import { UpdatePostUseCase } from '@/modules/post/application/use-cases/update-post.use-case'
// Repositories
import { PostRepository } from '@/modules/post/infrastructure/repositories/post.repositoy.drizzle'
// HTTP
import { postController } from '@/modules/post/interfaces/http/post.controller'
// RPC
import { postRouter } from '@/modules/post/interfaces/rpc/post.router'
// Scheduler
// import { postScheduler } from '@/modules/post/interfaces/schedulers/post.scheduler'
// Infrastructure
import { DrizzleRepository } from '@/shared/infrastructure/drizzle/drizzle.repository'

export const createPostModule = (db: DrizzleRepository.Database) => {
  const postRepository = new PostRepository(db)

  const usecases = {
    getPosts: new GetPostsUseCase(postRepository),
    getPost: new GetPostUseCase(postRepository),
    createPost: new CreatePostUseCase(postRepository),
    updatePost: new UpdatePostUseCase(postRepository),
    deletePost: new DeletePostUseCase(postRepository),
  }

  return {
    http: {
      controller: postController(usecases),
    },
    rpc: {
      router: postRouter(usecases),
    },
    // scheduler: postScheduler(usecases),
  }
}
