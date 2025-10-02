import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // <-- 1. Importe o 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configurações para o GitHub Pages
  base: '/brasser-tech-spark/', 
  build: {
    outDir: 'docs',
  },

  // Configuração da porta (opcional)
  server: {
    port: 8080
  },
  
  // 2. Adicione esta secção para resolver os atalhos
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})