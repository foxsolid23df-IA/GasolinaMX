import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configuración base para GitHub Pages (nombre del repositorio)
  base: '/GasolinaMX/',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy para la API de la CRE de México
      '/api/cre': {
        target: 'https://publicacionexterna.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cre/, '/publicaciones'),
        secure: false,
      }
    }
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    strictPort: true,
    allowedHosts: [
      "gasolinamx-production.up.railway.app",
      ".railway.app",
    ],
  },
  plugins: [
    react()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
}));
