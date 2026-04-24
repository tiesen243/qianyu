import { BunAdapter } from 'elysia/adapter/bun'

import { createApp, crons } from '@/app'
import { db } from '@/shared/infrastructure/drizzle/bun-sqlite'

const app = createApp(db, {
  adapter: BunAdapter,
})

for (const [schedule, cron] of crons)
  Bun.cron(schedule, async () => {
    await cron.task(app)
    console.log(`[CRON] '${cron.name}' executed at ${new Date().toISOString()}`)
  })

const server = Bun.serve({
  fetch: app.fetch,
  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`Server running at ${server.url}`)
