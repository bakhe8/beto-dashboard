import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  build: { outDir: '../dist', emptyOutDir: true },
  resolve: {
    alias: { '@core': path.resolve(__dirname, '../../packages/core/src') }
  }
});

