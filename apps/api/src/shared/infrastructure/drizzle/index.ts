import type { Database } from '@/shared/infrastructure/drizzle/types'

const createDrizzleClient = async (): Promise<Database> => {
  try {
    const { env } = await import('cloudflare:workers')
    const { drizzle } = await import('drizzle-orm/d1')

    return drizzle(env.DB)
  } catch {
    // Fallback for non-Cloudflare environments (e.g., local development)
  }

  try {
    const { Database } = await import('bun:sqlite')
    const { drizzle } = await import('drizzle-orm/bun-sqlite')

    const client = new Database('./drizzle/dev.sqlite')
    return drizzle(client)
  } catch {
    // Fallback for non-Bun environments (e.g., production)
  }

  throw new Error(
    'No suitable database client found for the current environment.'
  )
}

const globalForDrizzle = globalThis as unknown as {
  db: Database | undefined
}

export const db = globalForDrizzle.db ?? (await createDrizzleClient())
if (process.env.NODE_ENV !== 'production') globalForDrizzle.db = db
