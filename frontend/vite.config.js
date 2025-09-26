// vite.config.js or vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "import.meta.env.VITE_API_BASE_URL",
    },
  },
  plugins: [react()],
});
