import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', (t) => ({
  id: t.text({ length: 24 }).primaryKey(),
  title: t.text({ length: 255 }).notNull(),
  content: t.text().notNull(),
  createdAt: t
    .integer({ mode: 'timestamp' })
    .$default(() => new Date())
    .notNull(),
  updatedAt: t
    .integer({ mode: 'timestamp' })
    .$default(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
}))
