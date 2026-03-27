import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/*.ts', 'src/api/*.ts'],
  dts: true,
  shims: true,
  minify: true,
})
