import type { Server } from '@qianyu/api'

import { treaty } from '@elysiajs/eden'

import { post } from '@/api/post'

export const createApi = (baseURL: string) => {
  const api = treaty<Server>(baseURL)

  return {
    post: post(api),
  }
}
