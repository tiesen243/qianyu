// oxlint-disable node/no-process-env

import alchemy from 'alchemy'
import { ReactRouter } from 'alchemy/cloudflare'
import { GitHubComment } from 'alchemy/github'
import { CloudflareStateStore } from 'alchemy/state'

const app = await alchemy('qianyu', {
  stateStore: (scope) => new CloudflareStateStore(scope),
})

export const worker = await ReactRouter('web')

console.log(`Worker deployed at: ${worker.url}`)

if (process.env.PULL_REQUEST) {
  const previewUrl = worker.url

  await GitHubComment('pr-preview-comment', {
    owner: process.env.GITHUB_REPOSITORY_OWNER || 'your-username',
    repository: process.env.GITHUB_REPOSITORY_NAME || 'my-react-router-app',
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
