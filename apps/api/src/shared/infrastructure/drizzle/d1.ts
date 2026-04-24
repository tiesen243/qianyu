import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'

const createDrizzleClient = () => drizzle(env.DB)

const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}

export const db = globalForDrizzle.db ?? createDrizzleClient()
if (process.env.NODE_ENV !== 'production') globalForDrizzle.db = db
