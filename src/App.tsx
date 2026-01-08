import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider'; 
import IndexPage from '@/pages/Index'; 
import WhatsAppButton from '@/components/WhatsAppButton';
import { AIChatWidget } from '@/components/AIChatWidget';

function App() {
  return (
    // Define o padrão como CLARO, mas habilita a troca
    <ThemeProvider defaultTheme="light">
      <IndexPage />
      <WhatsAppButton />
      <AIChatWidget />
    </ThemeProvider>
  );
}

export default App;