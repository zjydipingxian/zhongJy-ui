import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/components/**/__tests__/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@jy-ui': resolve(__dirname, 'packages'),
    },
  },
})
