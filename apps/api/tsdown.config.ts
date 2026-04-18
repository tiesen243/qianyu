import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/types/*.ts'],
  deps: { neverBundle: ['bun:sqlite', 'cloudflare:workers'] },
  dts: true,
  minify: true,
  shims: true,
})
