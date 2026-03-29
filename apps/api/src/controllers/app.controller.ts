import packageJson from '@/../package.json' with { type: 'json' }
import { createElysia } from '@/lib/create-elysia'

export const appController = createElysia({
  name: 'controller.app',
}).get('/', () => ({
  name: packageJson.name,
  version: packageJson.version,
}))
