import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Use relative base so assets resolve correctly under GitHub Pages subpath
  base: './',
  root: __dirname,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/pages/app.html'),
        dashboard: path.resolve(__dirname, 'src/pages/dashboard.html'),
        'demo-dashboard': path.resolve(__dirname, 'src/pages/demo-dashboard.html'),
      }
    }
  },
  resolve: {
    alias: { '@core': path.resolve(__dirname, '../../packages/core/src') }
  }
});
