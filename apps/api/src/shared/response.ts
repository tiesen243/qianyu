import { TRPCError } from '@trpc/server'

const StatusMap = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const

export class Resp<T> extends Response {
  public readonly status: number

  public constructor(
    private statusCode: keyof typeof StatusMap,
    public message: string,
    public data: T | null = null
  ) {
    super(JSON.stringify({ status: StatusMap[statusCode], message, data }), {
      status: StatusMap[statusCode],
      headers: { 'Content-Type': 'application/json' },
    })

    this.status = StatusMap[statusCode]
  }

  public static Ok<T>(message: string, data?: T): Resp<T> {
    return new Resp('OK', message, data)
  }

  public static Created<T>(message: string, data?: T): Resp<T> {
    return new Resp('CREATED', message, data)
  }

  public static BadRequest<T>(message: string): Resp<T> {
    return new Resp('BAD_REQUEST', message)
  }

  public static NotFound<T>(message: string): Resp<T> {
    return new Resp('NOT_FOUND', message)
  }

  public static Error<T>(message: string): Resp<T> {
    return new Resp('INTERNAL_SERVER_ERROR', message)
  }

  public toTRPC(): T {
    if (this.statusCode !== 'OK' && this.statusCode !== 'CREATED')
      throw new TRPCError({
        code: this.statusCode,
        message: this.message,
      })

    return this.data as T
  }
}
