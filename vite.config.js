import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'


const fromRoot = (path) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));
const root = fromRoot('');

export default defineConfig({
  root,
  base: '/',

  resolve: {
    alias: {
      '@': root,
    },
  },

  server: {
    port: 3000,
  },

  build: {
    assetsInlineLimit: 0,
    outDir: fileURLToPath(new URL('./public', import.meta.url)),
  },

  rollupOptions: {
    input: {
      main: fromRoot('index.html'),
    },
  }
})
