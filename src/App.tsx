import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importação obrigatória para funcionar
import { ThemeProvider } from '@/components/ThemeProvider'; 
import IndexPage from '@/pages/Index'; 
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'; // Importando a página nova
import WhatsAppButton from '@/components/WhatsAppButton';
import { AIChatWidget } from '@/components/AIChatWidget';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* O BrowserRouter é o "pai" que permite a navegação funcionar */}
      <BrowserRouter>
        <Routes>
          
          {/* Rota 1: Página Inicial (Sua Landing Page + Widgets) */}
          <Route path="/" element={
            <>
              <IndexPage />
              <WhatsAppButton />
              <AIChatWidget />
            </>
          } />

          {/* Rota 2: Página de Política de Privacidade */}
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;