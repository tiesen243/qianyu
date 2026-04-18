import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'

import config from '@/shared/config'

const createDrizzleClient = () => drizzle(env.DB)
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (config.env !== 'production') globalForDrizzle.db = db
