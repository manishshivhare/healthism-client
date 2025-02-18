import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ju4m76xqr1.execute-api.eu-north-1.amazonaws.com",
        changeOrigin: true,
        secure: true,  // Change to true since AWS endpoints use HTTPS
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, "/v1");
          console.log(`Rewriting path: ${path} -> ${newPath}`);
          return newPath;
        },
      },
    },
  },
});
