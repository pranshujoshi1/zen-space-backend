import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_PROXY_TARGET = process.env.VITE_AI_PROXY_TARGET ?? 'http://127.0.0.1:8000';

export default defineConfig({
  // Use relative paths in built HTML so Live Server can open dist/index.html directly
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: false
      }
    }
  }
});

