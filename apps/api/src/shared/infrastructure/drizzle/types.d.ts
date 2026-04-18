import type { TablesRelationalConfig } from 'drizzle-orm'
import type {
  BaseSQLiteDatabase,
  SQLiteTransaction,
} from 'drizzle-orm/sqlite-core'

export type Database = BaseSQLiteDatabase<'sync' | 'async', unknown>

export type Tx =
  | Database
  | SQLiteTransaction<
      'sync' | 'async',
      unknown,
      Record<string, unknown>,
      TablesRelationalConfig
    >
