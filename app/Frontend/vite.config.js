import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4173,
    strictPort: true,
    open: true, // Abre el navegador automáticamente
    cors: {
      origin: "*", // Permite solicitudes desde cualquier origen
    },
  },
});
