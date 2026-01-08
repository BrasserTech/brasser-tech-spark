import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
// Certifique-se que a imagem ainda está nesta pasta
import heroImage from "@/assets/hero-bg.jpg"; 

const Hero = () => {
  
  // Função para rolar suavemente até a seção de projetos
  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      
      {/* =========================================
          BACKGROUNDS (Camadas controladas por CSS)
         ========================================= */}

      {/* 1. MODO CLARO: Gradiente Suave Branco/Azul */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white dark:opacity-0 transition-opacity duration-500 z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/30 rounded-bl-[150px] blur-3xl opacity-50 dark:opacity-0 transition-opacity duration-500 z-0" />

      {/* 2. MODO ESCURO: Imagem Tech + Overlay + Vinheta (Original) */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500 z-0 pointer-events-none">
        {/* A imagem de fundo */}
        <img 
          src={heroImage} 
          alt="Brasser Tech Background" 
          className="w-full h-full object-cover opacity-40" 
        />
        {/* Gradiente Preto para facilitar leitura */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        {/* Vinheta radial para focar no centro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)]" />
      </div>

      {/* =========================================
          CONTEÚDO
         ========================================= */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center pt-20">
        
        {/* BADGE / TAG SUPERIOR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium shadow-sm transition-colors duration-300
                     bg-white border border-blue-100 text-brand-700
                     dark:bg-white/5 dark:border-white/10 dark:text-cyan-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400 dark:bg-cyan-400"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-cyan-500"></span>
          </span>
          Tecnologia para negócios que crescem
        </motion.div>

        {/* TÍTULO PRINCIPAL */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] transition-colors duration-300
                     text-brand-900 dark:text-white"
        >
          Automatize. Inove. <br />
          
          {/* GRADIENTE DO TEXTO:
              Claro: Azul -> Azul Claro
              Escuro: Ciano -> Rosa (Original Brasser) 
          */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r 
                           from-brand-600 to-blue-400
                           dark:from-[#00C2FF] dark:to-[#FF007A]">
            Expanda seu Negócio.
          </span>
        </motion.h1>

        {/* SUBTÍTULO */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300
                     text-slate-600 dark:text-gray-400"
        >
          Desenvolvemos software sob medida, aplicativos e automações que eliminam processos manuais e aumentam sua lucratividade.
        </motion.p>

        {/* BOTÕES DE AÇÃO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {/* Botão Principal: WhatsApp */}
          <a href="https://wa.me/5549999206844" target="_blank" className="w-full sm:w-auto">
            <Button className="w-full h-14 px-8 text-lg rounded-full shadow-lg transition-all hover:-translate-y-1
                               bg-brand-600 hover:bg-brand-700 text-white shadow-blue-200
                               dark:bg-[#00C2FF] dark:hover:bg-[#009bc9] dark:text-black dark:shadow-cyan-500/20 dark:font-bold">
              Falar com Especialista <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>

          {/* Botão Secundário: Scroll para Projetos */}
          <Button 
            variant="outline" 
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-2 bg-transparent transition-all
                       border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 hover:bg-white
                       dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:border-white"
          >
            Ver Portfólio
          </Button>
        </motion.div>

        {/* BADGES / ÍCONES ABAIXO */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium transition-colors duration-300
                     text-slate-500 dark:text-gray-500"
        >
          {["Suporte Ágil", "Tecnologia de Ponta", "Foco em Resultados"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-[#00C2FF]" /> {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;