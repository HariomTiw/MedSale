// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/': 'https://med-sale-backend.vercel.app/',
    },
  },
  plugins: [react()],
});
