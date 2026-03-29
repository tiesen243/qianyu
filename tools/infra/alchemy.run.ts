import alchemy from 'alchemy'
import { D1Database, ReactRouter, Worker } from 'alchemy/cloudflare'
import { GitHubComment } from 'alchemy/github'
import { CloudflareStateStore } from 'alchemy/state'
import path from 'node:path'

const app = await alchemy('qianyu', {
  stateStore: (scope) => new CloudflareStateStore(scope),
})

export const db = await D1Database('db', {
  name: 'qianyu-db',
  migrationsDir: path.resolve(__dirname, '../../apps/api/migrations'),
})

export const api = await Worker('api', {
  cwd: path.resolve(__dirname, '../../apps/api'),
  entrypoint: 'src/server.ts',
  compatibilityFlags: ['nodejs_compat'],
  bindings: {
    APP_NAME: 'qianyu',
    CORS_ORIGIN: '*',
    DB: db,
  },
})

export const web = await ReactRouter('web', {
  cwd: path.resolve(__dirname, '../../apps/web'),
  bindings: {
    VITE_APP_NAME: 'qianyu',
    VITE_API_URL: api.url ?? 'http://localhost:3000',
  },
})

console.log(`DB     -> D1 Database "${db.name}"`)
console.log(`API    -> ${api.url}`)
console.log(`Web    -> ${web.url}`)

if (process.env.PULL_REQUEST) {
  await GitHubComment('pr-preview-comment', {
    owner: process.env.GITHUB_REPOSITORY_OWNER || 'your-username',
    repository: process.env.GITHUB_REPOSITORY_NAME || 'my-app',
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `
## 🚀 Preview Deployed

Your preview is ready!

**Preview URL:** 
  - API: ${api.url}
  - Web: ${web.url}

This preview was built from commit ${process.env.GITHUB_SHA}

---
<sub>🤖 This comment will be updated automatically when you push new commits to this PR.</sub>`,
  })
}

await app.finalize()
