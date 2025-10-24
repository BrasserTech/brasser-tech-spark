// src/pages/Index.tsx - ATUALIZADO
import React from 'react';

// Importe todas as seções do seu site a partir de /components/
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const IndexPage = () => {
  return (
    <>
      <Navbar />
      
      {/* A MUDANÇA ESTÁ AQUI: 
        Adicione um 'padding-top' (ex: pt-16) no <main> 
        para "empurrar" o conteúdo para baixo do Navbar fixo.
        Ajuste 'pt-16' (16 = 4rem = 64px) se a altura do seu Navbar for diferente.
      */}
      <main className="pt-16">
        <Hero />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
};

export default IndexPage;
