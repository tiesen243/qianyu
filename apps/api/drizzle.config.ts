import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/shared/database/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:../../.alchemy/miniflare/v3/d1/miniflare-D1DatabaseObject/30d4f4c0f26e73bcbc0929c7c7d62212c6623f3692f75e265fae2417bd412c0d.sqlite',
  },
})
