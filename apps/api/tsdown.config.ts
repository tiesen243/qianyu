import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/server.ts'],
  dts: true,
  minify: true,
  shims: true,
})
