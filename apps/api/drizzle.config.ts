import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/shared/infrastructures/drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./drizzle/dev.sqlite',
  },
})
