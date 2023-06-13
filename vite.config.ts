/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: { initialIsOpen: false },
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    // handlebars({
    //   partialDirectory: resolve(__dirname, 'src/partials'),
    // }) as Plugin,
  ],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts'
  }
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '/api-server/': '...',
  //     '/authorization/': '...',
  //   },
  // },
});
