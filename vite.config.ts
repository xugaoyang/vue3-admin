import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [vue()],
})
