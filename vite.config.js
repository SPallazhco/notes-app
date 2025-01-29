import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname para ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/notes-app/', // Asegúrate de que es el nombre del repositorio
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias para la carpeta src
    },
  },
  build: {
    outDir: 'dist', // Directorio de salida
  },
});