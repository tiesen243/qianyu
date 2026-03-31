import { alchemy } from '@qianyu/infra'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [alchemy(), reactRouter(), tailwindcss()],
  resolve: { tsconfigPaths: true },
})
