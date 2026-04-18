import type { Response } from '@/shared/response'

export abstract class AbstractUseCase<Input, Output> {
  public abstract execute(input: Input): Promise<Response<Output>>
}
