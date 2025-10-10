import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* O componente Hero já tem o id="hero" internamente, por isso não precisa de <section> aqui */}
        <Hero />

        {/* Alterado para corresponder aos hrefs do Navbar */}
        <section id="services">
          <Services />
        </section>
        <section id="projects">
          <Projects />
        </section>
        {/* <section id="testimonials">
          <Testimonials />
        </section> */}
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;