import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "CEO, TechStart Ltda",
      initials: "CS",
      content:
        "A Brasser Tech revolucionou nossos processos. A automação desenvolvida reduziu em 70% o tempo gasto em tarefas repetitivas. Equipe extremamente profissional e entregas pontuais.",
      rating: 5,
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Diretora de TI, Comercial XYZ",
      initials: "MS",
      content:
        "O sistema web personalizado superou todas as expectativas. Interface intuitiva, performance excelente e suporte impecável. A migração dos dados antigos foi transparente.",
      rating: 5,
    },
    {
      id: 3,
      name: "João Oliveira",
      role: "Gerente de Operações, LogiPro",
      initials: "JO",
      content:
        "A integração com nosso ERP foi perfeita. Ganhamos agilidade e precisão nos dados. O Retorno sobre o Investimento (ROI) foi alcançado em menos de 6 meses de uso.",
      rating: 5,
    },
    {
      id: 4,
      name: "Ana Costa",
      role: "Coord. Marketing, Inova Digital",
      initials: "AC",
      content:
        "O chatbot com IA transformou nosso atendimento. Reduzimos tickets de suporte em 60% e aumentamos a satisfação dos clientes. A tecnologia usada é de ponta.",
      rating: 5,
    },
  ];

  // Função para ir para o próximo slide
  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Autoplay Effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      next();
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
      {/* Elementos de fundo decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que dizem <span className="text-primary">nossos clientes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de empresas que transformaram seus resultados com a tecnologia da Brasser Tech.
          </p>
        </motion.div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <Card className="bg-card/50 backdrop-blur-xl border-muted/50 p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-primary/5">
                  {/* Ícone de Citação Gigante no Fundo */}
                  <Quote className="absolute top-0 right-8 w-32 h-32 text-primary/5 -rotate-12 pointer-events-none" />

                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                    {/* Avatar / Iniciais */}
                    <div className="shrink-0">
                      <Avatar className="w-20 h-20 border-2 border-primary/20 shadow-lg">
                        <AvatarImage src={`/avatars/${currentIndex}.png`} alt={testimonials[currentIndex].name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                          {testimonials[currentIndex].initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="text-center md:text-left space-y-4 flex-1">
                      {/* Estrelas */}
                      <div className="flex justify-center md:justify-start gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>

                      {/* Texto do Depoimento */}
                      <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                        "{testimonials[currentIndex].content}"
                      </p>

                      {/* Autor */}
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-primary">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de Navegação */}
          <div className="flex justify-between items-center mt-8 px-4">
            {/* Botões manuais */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors border-primary/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors border-primary/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Indicadores de Progresso (Dots) */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group relative h-2 rounded-full transition-all duration-300 overflow-hidden bg-muted"
                  style={{ width: index === currentIndex ? "2.5rem" : "0.5rem" }}
                >
                  {index === currentIndex && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;