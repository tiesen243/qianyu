import { createApp } from '@/app'

export type App = Awaited<ReturnType<typeof createApp>>
