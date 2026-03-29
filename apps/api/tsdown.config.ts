import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/server.ts', 'src/models/*.model.ts'],
  deps: { neverBundle: ['cloudflare:workers'] },
  dts: true,
  minify: true,
  shims: true,
})
