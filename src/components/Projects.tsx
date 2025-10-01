import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProjectCategory = "all" | "agents" | "automation" | "systems";

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Chatbot Inteligente E-commerce",
      category: "agents",
      description: "Assistente virtual com IA para atendimento 24/7",
      tags: ["IA", "ChatGPT", "Node.js"],
      image: "🤖",
      problem: "Uma empresa de e-commerce enfrentava alto volume de atendimentos repetitivos, gerando custos elevados e insatisfação dos clientes devido ao tempo de espera.",
      solution: "Desenvolvemos um chatbot inteligente integrado ao ChatGPT que responde automaticamente dúvidas frequentes, processa pedidos e escala para atendimento humano quando necessário.",
      result: "Redução de 70% no tempo de resposta, diminuição de 50% nos custos operacionais e aumento de 35% na satisfação do cliente.",
      technologies: ["ChatGPT API", "Node.js", "Express", "MongoDB", "WebSocket"],
    },
    {
      id: 2,
      title: "Automação de Processos Financeiros",
      category: "automation",
      description: "Sistema completo de automação contábil",
      tags: ["Python", "RPA", "API"],
      image: "⚡",
      problem: "Escritório de contabilidade gastava horas em tarefas manuais repetitivas como lançamento de notas fiscais, conciliação bancária e geração de relatórios.",
      solution: "Implementamos RPA (Robotic Process Automation) para automatizar coleta de dados, integração com sistemas bancários e geração automática de relatórios.",
      result: "Economia de 80 horas mensais em trabalho manual, redução de 95% em erros humanos e aumento de 3x na capacidade de processamento.",
      technologies: ["Python", "UiPath", "Selenium", "REST APIs", "PostgreSQL"],
    },
    {
      id: 3,
      title: "Dashboard Analytics em Tempo Real",
      category: "systems",
      description: "Plataforma web para análise de dados",
      tags: ["React", "PostgreSQL", "WebSocket"],
      image: "📊",
      problem: "Empresa de logística não tinha visibilidade em tempo real das operações, dificultando tomadas de decisão rápidas e identificação de gargalos.",
      solution: "Criamos um dashboard customizado com atualização em tempo real que consolida dados de múltiplas fontes e apresenta KPIs visuais e interativos.",
      result: "Decisões 60% mais rápidas, identificação imediata de problemas operacionais e aumento de 25% na eficiência da frota.",
      technologies: ["React", "TypeScript", "PostgreSQL", "WebSocket", "Chart.js", "Node.js"],
    },
    {
      id: 4,
      title: "Agente de Vendas Automatizado",
      category: "agents",
      description: "Bot inteligente para prospecção e follow-up",
      tags: ["IA", "Automation", "CRM"],
      image: "🎯",
      problem: "Equipe de vendas B2B não conseguia manter follow-up consistente com todos os leads, perdendo oportunidades por falta de contato no momento certo.",
      solution: "Desenvolvemos um agente de IA que qualifica leads automaticamente, envia mensagens personalizadas e agenda reuniões baseado no comportamento do prospect.",
      result: "Aumento de 120% na taxa de conversão de leads, 40% mais reuniões agendadas e redução de 60% no ciclo de vendas.",
      technologies: ["OpenAI GPT-4", "Python", "CRM API", "Zapier", "Machine Learning"],
    },
    {
      id: 5,
      title: "Sistema de Gestão Empresarial",
      category: "systems",
      description: "ERP personalizado com módulos integrados",
      tags: ["React", "Node.js", "Docker"],
      image: "💼",
      problem: "Indústria de médio porte usava sistemas desconectados para diferentes áreas (vendas, estoque, financeiro), gerando retrabalho e falta de integração.",
      solution: "Criamos um ERP modular integrado que unifica gestão de vendas, estoque, financeiro e produção em uma única plataforma acessível de qualquer lugar.",
      result: "Redução de 50% no tempo de fechamento mensal, visibilidade completa do negócio em tempo real e ROI alcançado em 8 meses.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Redis", "Microservices"],
    },
    {
      id: 6,
      title: "Automação de Marketing Digital",
      category: "automation",
      description: "Fluxos automatizados para campanhas",
      tags: ["Python", "APIs", "Zapier"],
      image: "📱",
      problem: "Agência de marketing digital gastava tempo excessivo em tarefas repetitivas como publicação em redes sociais, envio de emails e geração de relatórios para clientes.",
      solution: "Automatizamos toda a jornada de marketing: agendamento de posts, disparo de email marketing, análise de métricas e geração automática de relatórios personalizados.",
      result: "Economia de 100 horas mensais, capacidade de gerenciar 3x mais clientes com a mesma equipe e aumento de 45% na taxa de engajamento.",
      technologies: ["Python", "Zapier", "Make.com", "Meta API", "Google Analytics API", "SendGrid"],
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
                      onClick={() => setSelectedProject(project)}
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

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{selectedProject.image}</span>
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">O Problema:</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">A Solução:</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">O Resultado:</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.result}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Tecnologias Utilizadas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
