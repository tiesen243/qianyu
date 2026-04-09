import { DurableObject } from 'cloudflare:workers'

export class SSE extends DurableObject {
  private sessions = new Set<ReadableStreamDefaultController>()
  private encoder = new TextEncoder()
  private keepAlive: ReturnType<typeof setInterval>

  constructor(state: DurableObjectState, env: Env) {
    super(state, env)
    this.keepAlive = setInterval(() => {
      this.broadcast('keep-alive')
    }, 30_000)
  }

  public send(message: string) {
    this.broadcast(message)
  }

  public listen(_request: Request) {
    let sessionController: ReadableStreamDefaultController

    const stream = new ReadableStream({
      start: (controller) => {
        sessionController = controller
        this.sessions.add(controller)
      },
      cancel: () => {
        this.sessions.delete(sessionController)
        clearInterval(this.keepAlive)
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  }

  private broadcast(message: string) {
    const encoded = this.encoder.encode(`data: ${message}\n\n`)
    for (const session of this.sessions) {
      try {
        session.enqueue(encoded)
      } catch {
        this.sessions.delete(session)
      }
    }
  }
}
