import { Bot, Zap, Globe, Network } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "IA no Atendimento",
      description:
        "Chatbots inteligentes e assistentes virtuais que melhoram a experiência do cliente e reduzem custos operacionais.",
      benefit: "Reduza custos e melhore a experiência do seu cliente com atendimento inteligente 24/7.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Zap,
      title: "Automação 100% Personalizada",
      description:
        "Automatize processos repetitivos e foque no que realmente importa. Soluções sob medida para o seu negócio.",
      benefit: "Otimize seu fluxo de trabalho e foque no que realmente importa com soluções feitas sob medida.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Globe, // Pense em talvez usar um ícone de engrenagem (Cog) ou raio (Zap) para automação
      title: "Sistemas que Automatizam Processos",
      description:
        "Desenvolvemos sistemas que automatizam tarefas manuais, otimizam o fluxo de trabalho e reduzem custos operacionais.",
      benefit:
        "Aumente a produtividade da sua equipe e minimize erros, permitindo que o foco permaneça no crescimento do seu negócio.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Network,
      title: "Integrações e APIs",
      description:
        "Conectamos suas plataformas de e-commerce, gateways de pagamento, ferramentas de marketing, sistemas financeiros e de logística para funcionarem em perfeita harmonia.",
      benefit:
        "Centralize suas informações, elimine a duplicidade de dados e tenha uma visão completa da sua operação em tempo real.",
      gradient: "from-primary via-secondary to-accent",
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Nossas</span> Soluções
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologias de ponta para impulsionar seu negócio ao próximo nível
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden p-6 h-full bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {service.description}
                  </p>

                  <p className="text-sm text-primary/80 leading-relaxed font-medium">
                    {service.benefit}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
