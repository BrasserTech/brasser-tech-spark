// src/App.tsx
import React from 'react';

// Importa seu provedor de tema
import { ThemeProvider } from '@/components/ThemeProvider'; 

// Importa APENAS a página Index (ela agora gerencia se mostra Home ou Parceiro)
import IndexPage from '@/pages/Index'; 

// Importa os widgets flutuantes
import WhatsAppButton from '@/components/WhatsAppButton';
import { AIChatWidget } from '@/components/AIChatWidget';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      
      {/* MUDANÇA CRUCIAL:
         Removemos o <BrowserRouter> e <Routes>.
         Agora carregamos direto a IndexPage.
         Ela que decide se mostra o site normal ou a seção de parceiro.
      */}
      
      <IndexPage />

      {/* Widgets flutuantes continuam aqui para aparecerem sempre */}
      <WhatsAppButton />
      <AIChatWidget />

    </ThemeProvider>
  );
}

export default App;