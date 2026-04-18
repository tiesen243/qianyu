import type { App } from '@qianyu/api'

import { treaty } from '@elysiajs/eden'

import { chat } from '@/api/chat'
import { post } from '@/api/post'

export const createApi = (baseURL: string) => {
  const treated = treaty<App>(baseURL)

  return {
    post: post(treated),
    chat: chat(treated),
  }
}
