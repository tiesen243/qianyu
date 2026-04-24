import { Elysia } from 'elysia'

import type { PostUseCases } from '@/modules/post/application/types/use-cases.type'

import config from '@/shared/config'

export const postScheduler = (usecases: PostUseCases) =>
  new Elysia({
    name: `${config.appName}.scheduler.post`,
    prefix: '/scheduler/post',
  }).post('/', async () => {
    const title = `Post created at ${new Date().toISOString()}`
    const content = 'This is a post created by the scheduler.'
    await usecases.createPost.execute({ title, content })
    return {
      message: `Post created successfully at ${new Date().toISOString()}`,
    }
  })
