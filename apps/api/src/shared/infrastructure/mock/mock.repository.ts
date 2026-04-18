import type { AbstractEntity } from '@/shared/abstracts/entity'
import { AbstractRepository } from '@/shared/abstracts/repository'

export abstract class MockRepository<
  TEntity extends AbstractEntity<{ id: unknown }>,
> extends AbstractRepository<TEntity> {
  protected _entities: TEntity[] = []

  public override all(
    criterias: Partial<TEntity>[] = [],
    _orderBy: Partial<Record<keyof TEntity, 'asc' | 'desc'>> = {},
    _options: { limit?: number; offset?: number } = {}
  ): Promise<TEntity[]> {
    if (criterias.length === 0) return Promise.resolve(this._entities)

    return Promise.all(
      this._entities.filter((entity) =>
        criterias.every((criteria) =>
          Object.entries(criteria).every(
            ([key, value]) => entity[key as keyof TEntity] === value
          )
        )
      )
    )
  }

  public override find(criteria: Partial<TEntity>): Promise<TEntity | null> {
    const entity = this._entities.find((_entity) =>
      Object.entries(criteria).every(
        ([key, value]) => _entity[key as keyof TEntity] === value
      )
    )

    return Promise.resolve(entity ?? null)
  }

  public override count(criteria: Partial<TEntity>): Promise<number> {
    const count = this._entities.filter((entity) =>
      Object.entries(criteria).every(
        ([key, value]) => entity[key as keyof TEntity] === value
      )
    ).length

    return Promise.resolve(count)
  }

  public override save(entity: TEntity): Promise<void> {
    const index = this._entities.findIndex((e) => e.id === entity.id)

    if (index === -1) this._entities.push(entity)
    else this._entities[index] = entity

    return Promise.resolve()
  }

  public override delete(criteria: Partial<TEntity>): Promise<void> {
    this._entities = this._entities.filter(
      (entity) =>
        !Object.entries(criteria).every(
          ([key, value]) => entity[key as keyof TEntity] === value
        )
    )

    return Promise.resolve()
  }
}
