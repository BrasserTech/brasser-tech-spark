import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Para GitHub Pages em repositório de projeto:
// base deve ser "/NOME_DO_REPOSITORIO/"
// Para site de usuário (ex.: brassertech.github.io), use base: "/"
export default defineConfig(({ mode }) => ({
  base: "/brasser-tech-spark/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
