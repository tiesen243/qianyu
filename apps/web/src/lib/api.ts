import type { Server } from '@qianyu/api'

import { treaty } from '@elysiajs/eden'

export const api = treaty<Server>(getApiUrl()) as ReturnType<
  typeof treaty<Server>
>

function getApiUrl(): string {
  if (import.meta.env.API_URL) return `${import.meta.env.API_URL}`
  return `http://localhost:3000`
}
