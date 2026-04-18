import { cron } from '@elysiajs/cron'
import { Elysia } from 'elysia'

import { PostUseCases } from '@/modules/post/application/types/use-cases.type'
import config from '@/shared/config'

export const postScheduler = (usecases: PostUseCases) =>
  new Elysia({
    name: `${config.appName}.scheduler.post`,
  }).use(
    cron({
      name: 'create-post-every-10-minute',
      pattern: '*/10 * * * *',
      run: async ({ name }) => {
        try {
          const title = `Post created at ${new Date().toISOString()}`
          const content = 'This is a post created by the scheduler.'
          await usecases.createPost.execute({ title, content })
          console.log(
            `[${new Date().toISOString()}] CRON ${name} executed successfully`
          )
        } catch (error) {
          console.error(
            `[${new Date().toISOString()}] CRON ${name} failed to execute:`,
            error
          )
        }
      },
    })
  ) as unknown as Elysia
