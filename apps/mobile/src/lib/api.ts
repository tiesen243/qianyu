import { createApi } from '@qianyu/lib/api'

function getApiUrl() {
  if (__DEV__) return 'http://localhost:1337'
  return 'https://qianyu-api-prod.tiesen.workers.dev'
}

export const api = createApi(getApiUrl())
