import { Elysia } from 'elysia'

import type { PostUseCases } from '@/modules/post/application/types/use-cases.type'

import config from '@/shared/config'

export const postScheduler = (usecases: PostUseCases) =>
  new Elysia({
    name: `${config.appName}.scheduler.post`,
    prefix: '/scheduler/post',
    detail: { hide: true },
  }).post('/', async () => {
    const title = `Post created at ${new Date().toISOString()}`
    const content = 'This is a post created by the scheduler.'
    await usecases.createPost.execute({ title, content })
    return {
      message: `Post created successfully at ${new Date().toISOString()}`,
    }
  })

// .use(
//   cron({
//     name: NAME,
//     pattern: Patterns.EVERY_MINUTE,
//     run: async () => {
//       try {
//         const title = `Post created at ${new Date().toISOString()}`
//         const content = 'This is a post created by the scheduler.'
//         await usecases.createPost.execute({ title, content })
//         console.log(
//           `[${new Date().toISOString()}] CRON '${NAME}' executed successfully.`
//         )
//       } catch (error) {
//         console.error(
//           `[${new Date().toISOString()}] CRON '${NAME}' failed with error:`,
//           error
//         )
//       }
//     },
//   })
// ) as unknown as Elysia
