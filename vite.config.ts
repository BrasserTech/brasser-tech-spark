import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Altere "brasser-tech-spark" se o nome do repo for outro.
// Se o repositório for SEU_USUARIO.github.io, use base: "/".
export default defineConfig(({ mode }) => ({
  base: "/brasser-tech-spark/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "docs", // <- GitHub Pages servirá esta pasta
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
