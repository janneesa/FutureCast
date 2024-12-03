import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    proxy: {
      // Proxy requests to your backend
      "/api": {
        target: "http://localhost:4000", // Your backend server
        changeOrigin: true, // Avoid CORS issues
      },
    },
  },
});
