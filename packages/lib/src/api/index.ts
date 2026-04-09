import type { Server } from '@qianyu/api'

import { treaty } from '@elysiajs/eden'

import { post } from '@/api/post'
import { sse } from '@/api/sse'

export const createApi = (baseURL: string) => {
  const treated = treaty<Server>(baseURL)

  return {
    post: post(treated),
    sse: sse(treated),
  }
}
