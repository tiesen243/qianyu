import { treaty } from '@elysiajs/eden'

import type { App } from '@/app'

const client = treaty<App>('http://localhost:3000')

const { data, error } = await client.api.v1.posts.get({
  query: {
    page: 1,
    limit: 10,
  },
})

console.log({
  data,
  error: error?.value,
})
