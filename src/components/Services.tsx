import { Bot, Zap, Globe, Network } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "IA no Atendimento",
      description: "Chatbots inteligentes e assistentes virtuais que melhoram a experiência do cliente e reduzem custos operacionais.",
      benefit: "Atendimento 24/7 sem filas.",
      gradient: "from-primary to-purple-500", // Gradiente original para o dark mode
    },
    {
      icon: Zap,
      title: "Automação Personalizada",
      description: "Automatize processos repetitivos e foque no que realmente importa. Soluções sob medida para o seu negócio.",
      benefit: "Mais produtividade, menos erro humano.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: Globe,
      title: "Sistemas Web",
      description: "Plataformas de gestão e dashboards exclusivos para controlar sua operação de qualquer lugar.",
      benefit: "Controle total da sua operação.",
      gradient: "from-emerald-400 to-blue-500",
    },
    {
      icon: Network,
      title: "Integrações e APIs",
      description: "Conecte seu financeiro, marketing e logística em um único ecossistema funcional.",
      benefit: "Todos seus dados em um só lugar.",
      gradient: "from-orange-400 to-pink-500",
    },
  ];

  return (
    <section 
      id="services" 
      className="py-24 relative overflow-hidden transition-colors duration-500
                 /* MODO CLARO: Fundo cinza suave sólido (sem gradiente que manche o dark) */
                 bg-slate-50
                 /* MODO ESCURO: Fundo preto absoluto (restaura o original) */
                 dark:bg-background"
    >
      <div className="container mx-auto px-4">
        
        {/* CABEÇALHO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 transition-colors text-brand-900 dark:text-white">
            <span className="dark:text-gradient">Nossas</span> Soluções
          </h2>
          <p className="text-xl max-w-2xl mx-auto transition-colors text-slate-600 dark:text-muted-foreground">
            Tecnologias de ponta para impulsionar seu negócio ao próximo nível
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="
                group relative overflow-hidden p-6 h-full transition-all duration-300 cursor-pointer
                
                /* === ESTILO CLARO (Corporate Clean) === */
                bg-white border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-brand-300
                
                /* === ESTILO ESCURO (Original Tech/Neon) === */
                /* Restaura o fundo escuro do card e a borda sutil */
                dark:bg-card dark:border-border dark:shadow-none
                dark:hover:border-primary
              ">
                
                {/* 1. EFEITO DE GRADIENTE NO HOVER (APENAS DARK MODE) */}
                {/* Isso restaura aquele brilho colorido no fundo do card quando passa o mouse no modo escuro */}
                <div
                  className={`hidden dark:block absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* 2. CONTEÚDO DO CARD */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Ícone */}
                  <div className="mb-4 inline-flex p-3 rounded-lg transition-colors
                                  /* Claro: Fundo azul claro */
                                  bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white
                                  /* Escuro: Fundo translúcido */
                                  dark:bg-primary/10 dark:text-primary dark:group-hover:bg-primary/20">
                    <service.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 transition-colors
                                 text-brand-900 dark:text-foreground dark:group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="leading-relaxed mb-4 flex-grow text-sm
                                text-slate-600 dark:text-muted-foreground">
                    {service.description}
                  </p>

                  <p className="text-sm font-medium pt-4 border-t transition-colors
                                border-slate-100 text-brand-700
                                dark:border-border/50 dark:text-primary/80">
                    {service.benefit}
                  </p>
                </div>

                {/* 3. DETALHE DE CANTO (APENAS DARK MODE) */}
                {/* Aquele detalhe triangular no canto superior direito */}
                <div className="hidden dark:block absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;