import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

import type { DrizzleRepository } from '@/shared/infrastructure/drizzle/drizzle.repository'

import config from '@/shared/config'

const createDrizzleClient = (): DrizzleRepository.Database => {
  const client = new Database('./drizzle/dev.sqlite')
  return drizzle(client)
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (config.env !== 'production') globalForDrizzle.db = db
