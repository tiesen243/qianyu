import { createApp } from '@/app'
import { db } from '@/shared/infrastructure/drizzle/bun-sqlite'

const app = createApp(db)

export default {
  fetch: app.fetch,
}
