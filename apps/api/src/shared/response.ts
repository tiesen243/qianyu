import { status, StatusMap } from 'elysia'

export class Response<T> {
  public readonly response: {
    status: number
    message: string
    data: T
  } = {} as never

  public constructor(
    protected statusCode: keyof StatusMap,
    public message: string,
    public data: T | null = null
  ) {
    // oxlint-disable-next-line no-constructor-return
    return status(statusCode, {
      status: StatusMap[statusCode],
      message,
      data,
    }) as unknown as Response<T>
  }

  public static Ok<T>(message: string, data?: T): Response<T> {
    return new Response('OK', message, data)
  }

  public static Created<T>(message: string, data?: T): Response<T> {
    return new Response('Created', message, data)
  }

  public static BadRequest<T>(message: string): Response<T> {
    return new Response('Bad Request', message)
  }

  public static NotFound<T>(message: string): Response<T> {
    return new Response('Not Found', message)
  }

  public static Error<T>(message: string, data?: T): Response<T> {
    return new Response('Internal Server Error', message, data)
  }
}
