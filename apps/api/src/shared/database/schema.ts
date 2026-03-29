import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  title: t.text().notNull(),
  content: t.text().notNull(),
  createdAt: t
    .integer({ mode: 'timestamp' })
    .notNull()
    .$default(() => new Date()),
}))
export type Post = typeof posts.$inferSelect
