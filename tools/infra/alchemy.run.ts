import alchemy from 'alchemy'
import { D1Database, ReactRouter, Worker } from 'alchemy/cloudflare'
import { GitHubComment } from 'alchemy/github'
import { CloudflareStateStore } from 'alchemy/state'
import path from 'node:path'

const startTime = performance.now()

const app = await alchemy('qianyu', {
  stateStore: (scope) => new CloudflareStateStore(scope),
})

export const db = await D1Database('db', {
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

console.log('Preview environment deployed successfully!')
console.log(`DB     -> ${db.name}`)
console.log(`API    -> ${api.url}`)
console.log(`Web    -> ${web.url}`)

if (process.env.PULL_REQUEST) {
  await GitHubComment('pr-preview-comment', {
    owner: process.env.GITHUB_REPOSITORY_OWNER || 'your-username',
    repository: process.env.GITHUB_REPOSITORY_NAME || 'my-app',
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `
## Preview Environment Deployed

Your preview environment has been successfully built and deployed!

### Service Endpoints

| Service | Endpoint / Reference |
|---------|----------------------|
| **DB**  | ${db.name} |
| **API** | ${api.url} |
| **Web** | ${web.url} |

<details>
<summary><b>Deployment Details</b></summary>

- **Branch:** \`${process.env.GITHUB_REF}\`
- **Build Commit:** \`${process.env.GITHUB_SHA}\`
- **Build Time:** \`${((performance.now() - startTime) / 1000).toFixed(2)}s\`
- **Deployed At:** ${new Date().toUTCString()}
</details>

---
<sub>🤖 *Automatically generated. This comment will be updated when you push new commits to this PR.*</sub>`,
  })
}

await app.finalize()
