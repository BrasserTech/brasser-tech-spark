import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type ProjectCategory = "all" | "agents" | "automation" | "systems";

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const projects: Project[] = [
    {
      id: 1,
      title: "Chatbot Inteligente E-commerce",
      category: "agents",
      description: "Assistente virtual com IA para atendimento 24/7",
      tags: ["IA", "ChatGPT", "Node.js"],
      image: "🤖",
    },
    {
      id: 2,
      title: "Automação de Processos Financeiros",
      category: "automation",
      description: "Sistema completo de automação contábil",
      tags: ["Python", "RPA", "API"],
      image: "⚡",
    },
    {
      id: 3,
      title: "Dashboard Analytics em Tempo Real",
      category: "systems",
      description: "Plataforma web para análise de dados",
      tags: ["React", "PostgreSQL", "WebSocket"],
      image: "📊",
    },
    {
      id: 4,
      title: "Agente de Vendas Automatizado",
      category: "agents",
      description: "Bot inteligente para prospecção e follow-up",
      tags: ["IA", "Automation", "CRM"],
      image: "🎯",
    },
    {
      id: 5,
      title: "Sistema de Gestão Empresarial",
      category: "systems",
      description: "ERP personalizado com módulos integrados",
      tags: ["React", "Node.js", "Docker"],
      image: "💼",
    },
    {
      id: 6,
      title: "Automação de Marketing Digital",
      category: "automation",
      description: "Fluxos automatizados para campanhas",
      tags: ["Python", "APIs", "Zapier"],
      image: "📱",
    },
  ];

  const filters: { label: string; value: ProjectCategory }[] = [
    { label: "Todos", value: "all" },
    { label: "Agentes", value: "agents" },
    { label: "Automações", value: "automation" },
    { label: "Sistemas", value: "systems" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-secondary">Nossos</span> Projetos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça algumas das soluções que desenvolvemos
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className={
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "hover:border-primary"
              }
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden h-full bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer">
                  <div className="p-6">
                    {/* Icon/Emoji */}
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {project.image}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/btn text-primary hover:text-primary"
                    >
                      Ver detalhes
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
