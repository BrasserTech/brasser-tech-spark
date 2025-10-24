// src/App.tsx - VERSÃO CORRIGIDA
import React from 'react';

// Importa seu provedor de tema
import { ThemeProvider } from '@/components/ThemeProvider'; 

// Importa sua página principal
import IndexPage from '@/pages/Index'; 

// Importa os widgets flutuantes
import WhatsAppButton from '@/components/WhatsAppButton';
import { AIChatWidget } from '@/components/AIChatWidget';

// Seu CSS global (se tiver, como o index.css)
// import '@/index.css'; // <-- DEIXE ESTA LINHA REMOVIDA OU COMENTADA!
                         // O seu 'main.tsx' já importa o 'index.css'.
                         // Importar duas vezes quebra o layout.

function App() {
  return (
    // 'storageKey' FOI REMOVIDO DAQUI.
    // É isso que estava causando o erro de compilação.
    <ThemeProvider defaultTheme="dark">
      
      {/* 1. O CONTEÚDO DO SEU SITE (que está na página Index) */}
      <IndexPage />

      {/* 2. OS WIDGETS FLUTUANTES (que ficam por cima) */}
      <WhatsAppButton />
      <AIChatWidget />

    </ThemeProvider>
  );
}

export default App;

