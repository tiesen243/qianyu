import { BunAdapter } from 'elysia/adapter/bun'

import { createApp, createCrons } from '@/app'
import { db } from '@/shared/infrastructure/drizzle/bun-sqlite'

const app = createApp(db, {
  aot: true,
  adapter: BunAdapter,
})

const crons = createCrons()

const server = Bun.serve({
  fetch: app.fetch,
  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

for (const [schedule, cron] of crons)
  Bun.cron(schedule, async () => {
    try {
      await cron.task(app)
      console.log(
        `[CRON] '${cron.name}' executed at ${new Date().toISOString()}`
      )
    } catch (error) {
      console.error(
        `[CRON] Error executing '${cron.name}' at ${new Date().toISOString()}:`,
        error
      )
    }
  })

console.log(`Server running at ${server.url}`)
