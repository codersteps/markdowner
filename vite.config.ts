import path from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import { peerDependencies } from './package.json'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@abdessamadely/markdowner',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [dts()],
})
