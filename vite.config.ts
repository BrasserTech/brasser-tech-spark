import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // CORREÇÃO 1: Base deve ser '/' para rodar no domínio principal
  base: '/', 
  
  build: {
    // CORREÇÃO 2: Voltar para 'dist' para o Docker encontrar
    outDir: 'dist',
    emptyOutDir: true,
  },

  server: {
    port: 80
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})