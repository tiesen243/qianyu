import type { SQL, SQLWrapper } from 'drizzle-orm'
import type {
  SQLiteColumn,
  SQLiteTableWithColumns,
} from 'drizzle-orm/sqlite-core'

import {
  and,
  asc,
  desc,
  eq,
  exists,
  gt,
  gte,
  inArray,
  isNotNull,
  isNull,
  like,
  lt,
  lte,
  ne,
  notExists,
  or,
} from 'drizzle-orm'

import type { Entity } from '@/shared/abtracts/entity'
import type { Database, Tx } from '@/shared/infrastructure/drizzle/types'

import { Repository } from '@/shared/abtracts/repository'

export abstract class DrizzleRepository<
  TEntity extends Entity<unknown>,
  TTable extends SQLiteTableWithColumns<{
    name: string
    schema: undefined
    dialect: 'sqlite'
    columns: { id: SQLiteColumn }
  }>,
> extends Repository<TEntity> {
  constructor(
    protected readonly _db: Database,
    protected readonly _table: TTable
  ) {
    super()
  }

  protected abstract _mapToEntity(row: Record<string, unknown>): TEntity
  protected abstract _mapToRow(entity: TEntity): {
    [K in keyof TTable['$inferInsert']]: TTable['$inferInsert'][K]
  }

  public override async all(
    criterias: Partial<TEntity>[] = [],
    orderBy: Partial<Record<keyof TEntity, 'asc' | 'desc'>> = {},
    options: { limit?: number; offset?: number } = {},
    tx: Tx = this._db
  ): Promise<TEntity[]> {
    const whereClauses = this._buildCriteria(criterias)
    const orderByClause = this._buildOrderBy(orderBy)

    const query = tx.select().from(this._table).$dynamic()

    if (whereClauses) query.where(whereClauses)
    if (orderByClause) query.orderBy(orderByClause)
    if (options.limit) query.limit(options.limit)
    if (options.offset) query.offset(options.offset)

    const rows = await query
    return rows.map((row) => this._mapToEntity(row))
  }

  public override async find(
    criteria: Partial<TEntity>,
    tx: Tx = this._db
  ): Promise<TEntity | null> {
    const whereClause = this._buildCriteria([criteria])
    if (!whereClause) return null

    const [row] = await tx
      .select()
      .from(this._table)
      .where(whereClause)
      .limit(1)

    return row ? this._mapToEntity(row) : null
  }

  public override count(
    criteria: Partial<TEntity>,
    tx: Tx = this._db
  ): Promise<number> {
    const whereClause = this._buildCriteria([criteria])
    return tx.$count(this._table, whereClause)
  }

  public override async save(
    entity: TEntity,
    tx: Tx = this._db
  ): Promise<void> {
    const row = this._mapToRow(entity)

    await tx
      .insert(this._table)
      .values(row)
      .onConflictDoUpdate({
        target: this._table.id,
        set: row as never,
      })
  }

  public override async delete(
    criteria: Partial<TEntity>,
    tx: Tx = this._db
  ): Promise<void> {
    const whereClause = this._buildCriteria([criteria])
    if (!whereClause) return

    await tx.delete(this._table).where(whereClause)
  }

  protected _buildCriteria(criterias: Partial<TEntity>[]): SQL | undefined {
    if (criterias.length === 0) return undefined

    const expressions = criterias.map((criteria) => {
      const fields = Object.entries(criteria).map(([field, value]) =>
        this._parseCondition(field as keyof TTable, value)
      )
      return and(...fields)
    })

    return expressions.length === 1 ? expressions[0] : or(...expressions)
  }

  private _parseCondition<V>(field: keyof TTable, value: V | unknown[]): SQL {
    const column = this._table[field] as unknown as SQLWrapper

    if (typeof value !== 'string') return eq(column, value)

    if (Array.isArray(value)) return inArray(column, value)

    if (value.startsWith('!')) return ne(column, value.slice(1))

    if (value === 'not null') return isNotNull(column)
    if (value === 'null') return isNull(column)

    if (value === 'not exists') return notExists(column)
    if (value === 'exists') return exists(column)

    if (value.startsWith('>=')) return gte(column, value.slice(2))
    if (value.startsWith('>')) return gt(column, value.slice(1))
    if (value.startsWith('<=')) return lte(column, value.slice(2))
    if (value.startsWith('<')) return lt(column, value.slice(1))

    if (value.startsWith('%') || value.endsWith('%'))
      return like(column as never, value)

    return eq(this._table[field] as never, value)
  }

  protected _buildOrderBy(
    orderBy: Partial<Record<keyof TEntity, 'asc' | 'desc'>>
  ): SQL | undefined {
    if (Object.keys(orderBy).length === 0) return undefined

    const conditions = Object.entries(orderBy).map(([field, direction]) =>
      direction === 'asc'
        ? asc(this._table[field as keyof TTable] as never)
        : desc(this._table[field as keyof TTable] as never)
    )

    return conditions.length === 1 ? conditions[0] : and(...conditions)
  }
}
