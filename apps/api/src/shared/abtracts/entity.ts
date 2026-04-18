export abstract class Entity<T> {
  public abstract id: string

  public clone(overrides: Partial<T> = {}): this {
    return new (this.constructor as new (props: T) => this)({
      ...this,
      ...overrides,
    } as T)
  }
}
