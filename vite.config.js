import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname para ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/notes-app/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias para la carpeta src
    },
  },
  build: {
    outDir: 'dist' // Asegúrate de que sea "dist"
  }
});