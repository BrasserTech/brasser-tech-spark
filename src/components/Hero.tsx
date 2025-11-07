// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground"
    >
      {/* Fundo com imagem + overlays sensíveis ao tema */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Brasser Tech - Tecnologia"
          className="w-full h-full object-cover opacity-40 dark:opacity-40"
        />
        {/* Gradiente que usa tokens (evita preto/branco fixos) */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        {/* Vinheta sutil: mais forte no dark, leve no light */}
        <div className="absolute inset-0 pointer-events-none 
                        [background:radial-gradient(60%_50%_at_50%_20%,transparent_0,transparent_55%,hsl(var(--background))_100%)]
                        dark:[background:radial-gradient(60%_50%_at_50%_20%,transparent_0,transparent_55%,hsl(var(--background)/.8)_100%)]" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center px-6 py-20 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          <span className="text-gradient">Automatize.</span>{" "}
          <span className="text-gradient-secondary">Inove.</span>{" "}
          <span className="text-gradient-accent">Expanda.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl"
        >
          A tecnologia que transforma o seu negócio começa aqui.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-2"
        >
          <a
            href="https://wa.me/5549999206844?text=vim%20pelo%20site"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              Falar com um Especialista
            </Button>
          </a>

          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
          >
            Fale com um Agente de IA
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 place-items-center"
        >
          {[
            // { value: "500+", label: "Projetos Entregues" },
            // { value: "98%", label: "Satisfação" },
            // { value: "24/7", label: "Suporte" },
            // { value: "15+", label: "Anos de Experiência" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
