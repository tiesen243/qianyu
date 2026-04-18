import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

import config from '@/shared/config'

const createDrizzleClient = () => {
  const client = new Database('./drizzle/dev.sqlite')
  return drizzle(client)
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (config.env !== 'production') globalForDrizzle.db = db
