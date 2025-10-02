import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ATENÇÃO:
// Se o repositório for de projeto (ex.: brasser-tech-spark), use base: "/NOME_DO_REPOSITORIO/"
// Se for do tipo usuário/organização (ex.: brassertech.github.io), use base: "/"
export default defineConfig(({ mode }) => ({
  base: "/brasser-tech-spark/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "docs" // GitHub Pages publicará a pasta docs
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
