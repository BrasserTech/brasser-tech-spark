import { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Collaborator from "@/components/Collaborator";
import PartnerSection from "@/components/PartnerSection";

const Index = () => {
  const [showPartner, setShowPartner] = useState(false);

  // Ação: Ir para Parceiro
  const handleShowPartner = () => {
    window.scrollTo(0, 0);
    setShowPartner(true);
  };

  // Ação: Voltar para Home
  const handleBackToHome = () => {
    setShowPartner(false);
  };

  // Ação: Navbar pede para ir para Home (e depois faz scroll)
  const handleNavbarNavigation = () => {
    setShowPartner(false);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF007A] selection:text-white">
      
      {/* ATUALIZADO: Passamos as duas funções para o Navbar */}
      <Navbar 
        onNavigate={handleNavbarNavigation} 
        onOpenPartner={handleShowPartner} 
      />

      {showPartner ? (
        // Seção Parceiro (Tela Cheia)
        <PartnerSection onBack={handleBackToHome} />
      ) : (
        // Seção Home
        <main>
          <div id="hero">
            <Hero />
          </div>
          <div id="services">
            <Services />
          </div>
          <div id="projects">
            <Projects />
          </div>
          {/* <div id="testimonials">
            <Testimonials />
          </div> */}
          
          <Collaborator onOpenPartner={handleShowPartner} />
          
          <div id="contact">
            <Contact />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Index;