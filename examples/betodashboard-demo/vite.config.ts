import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/pages/app.html'),
        dashboard: path.resolve(__dirname, 'src/pages/dashboard.html'),
      }
    }
  },
  resolve: {
    alias: { '@core': path.resolve(__dirname, '../../packages/core/src') }
  }
});
