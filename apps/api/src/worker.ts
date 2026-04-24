import { DurableObject } from 'cloudflare:workers'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { createApp, crons } from '@/app'
import { db } from '@/shared/infrastructure/drizzle/d1'

const app = createApp(db, {
  adapter: CloudflareAdapter,
})

export default {
  fetch: app.fetch,
  scheduled: async (event) => {
    const cron = crons.get(event.cron)
    if (!cron) return console.warn(`No cron found for schedule: ${event.cron}`)

    await cron.task(app)
    console.log(`[CRON] '${cron.name}' executed at ${new Date().toISOString()}`)
  },
} satisfies ExportedHandler<Env, unknown, unknown>

export class SSE extends DurableObject {
  private sessions = new Set<ReadableStreamDefaultController>()
  private encoder = new TextEncoder()
  private keepAlive: ReturnType<typeof setInterval>

  public constructor(state: DurableObjectState, env: Env) {
    super(state, env)
    this.keepAlive = setInterval(() => {
      this.broadcast('keep-alive')
    }, 30_000)
  }

  public async fetch(request: Request): Promise<Response> {
    if (request.method === 'POST') {
      const { message } = (await request.json()) as { message: string }
      this.broadcast(message)

      return new Response(null, { status: 204 })
    }

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
