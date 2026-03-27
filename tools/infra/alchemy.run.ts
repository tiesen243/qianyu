import alchemy from 'alchemy'
import { ReactRouter } from 'alchemy/cloudflare'
import { GitHubComment } from 'alchemy/github'
import { CloudflareStateStore } from 'alchemy/state'
import path from 'node:path'

const app = await alchemy('qianyu', {
  stateStore: (scope) => new CloudflareStateStore(scope),
})

export const web = await ReactRouter('web', {
  cwd: path.resolve(__dirname, '../../apps/web'),
})

console.log(`Web    -> ${web.url}`)

if (process.env.PULL_REQUEST) {
  const previewUrl = web.url

  await GitHubComment('pr-preview-comment', {
    owner: process.env.GITHUB_REPOSITORY_OWNER || 'your-username',
    repository: process.env.GITHUB_REPOSITORY_NAME || 'my-app',
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `
## 🚀 Preview Deployed

Your preview is ready!

**Preview URL:** ${previewUrl}

This preview was built from commit ${process.env.GITHUB_SHA}

---
<sub>🤖 This comment will be updated automatically when you push new commits to this PR.</sub>`,
  })
}

await app.finalize()
