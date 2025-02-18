import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ju4m76xqr1.execute-api.eu-north-1.amazonaws.com/v1", // Replace with your backend URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Allow self-signed certificates if needed
        rewrite: (path) => {
          console.log("Rewriting:", path); // Debugging
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
