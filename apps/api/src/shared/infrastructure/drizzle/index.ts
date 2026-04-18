import type { DrizzleRepository } from '@/shared/infrastructure/drizzle/drizzle.repository'

import config from '@/shared/config'

const createDrizzleClient = async (): Promise<DrizzleRepository.Database> => {
  // if (config.env === 'development') {
  //   const { Database } = await import('bun:sqlite')
  //   const { drizzle } = await import('drizzle-orm/bun-sqlite')
  //
  //   const client = new Database('./drizzle/dev.sqlite')
  //   return drizzle(client)
  // }

  const { env } = await import('cloudflare:workers')
  const { drizzle } = await import('drizzle-orm/d1')

  return drizzle(env.DB) as unknown as DrizzleRepository.Database
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (config.env !== 'production') globalForDrizzle.db = db
