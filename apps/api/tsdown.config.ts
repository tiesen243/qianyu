import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/server.ts', './src/types/**/*.ts', '!./src/types/env.d.ts'],
  deps: { neverBundle: ['bun:sqlite', 'cloudflare:workers'] },
  dts: true,
  minify: true,
  shims: true,
})
