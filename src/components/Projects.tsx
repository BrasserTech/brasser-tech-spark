import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingBag, LayoutDashboard, Trophy, Globe, Code2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Definição dos tipos
type ProjectCategory = "all" | "sistemas" | "sites" | "apps";

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  icon: React.ElementType;
  url: string;
  details: {
    problem: string;
    solution: string;
    result: string;
    technologies: string[];
  };
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dados dos projetos
  const projects: Project[] = [
    {
      id: 1,
      title: "BT Pedidos",
      category: "sistemas",
      description: "Plataforma completa de cardápio digital e gestão de pedidos para restaurantes.",
      tags: ["SaaS", "Delivery", "Gestão"],
      icon: ShoppingBag,
      url: "https://btpedidos.brassertech.com.br/#",
      details: {
        problem: "Estabelecimentos perdem tempo recebendo pedidos via WhatsApp ou telefone, gerando erros e demora no atendimento.",
        solution: "Um sistema web intuitivo onde o cliente faz o próprio pedido, integrado diretamente com a cozinha e painel administrativo.",
        result: "Agilidade no atendimento, redução de erros em pedidos e maior controle financeiro para o estabelecimento.",
        technologies: ["React", "Node.js", "PostgreSQL", "Real-time"],
      },
    },
    {
      id: 2,
      title: "Painel Brasser Tech",
      category: "sistemas",
      description: "Hub administrativo centralizado para gestão de clientes e serviços da empresa.",
      tags: ["Dashboard", "Admin", "Analytics"],
      icon: LayoutDashboard,
      url: "https://painel.brassertech.com.br",
      details: {
        problem: "Necessidade de centralizar a gestão de múltiplos serviços e clientes em uma única interface segura.",
        solution: "Dashboard administrativo robusto com controle de acessos, métricas em tempo real e gerenciamento de usuários.",
        result: "Controle total sobre as operações da empresa e facilidade na gestão de assinantes.",
        technologies: ["React", "Tailwind", "Rest API", "Auth"],
      },
    },
    {
      id: 3,
      title: "App HandLuz",
      category: "apps",
      description: "Aplicação web progressiva (PWA) para gestão e acompanhamento do time de handebol.",
      tags: ["PWA", "Esportes", "Mobile First"],
      icon: Trophy,
      url: "https://app.handluz.brassertech.com.br",
      details: {
        problem: "Dificuldade na comunicação interna do time, gestão de atletas e acompanhamento de jogos/treinos.",
        solution: "Um aplicativo focado na experiência mobile para atletas e comissão técnica, centralizando calendários e estatísticas.",
        result: "Melhoria na organização do time e engajamento dos atletas.",
        technologies: ["React", "PWA", "Firebase", "Mobile UI"],
      },
    },
    {
      id: 4,
      title: "Portal HandLuz",
      category: "sites",
      description: "Website institucional moderno para apresentar o time HandLuz ao público.",
      tags: ["Institucional", "SEO", "Design"],
      icon: Globe,
      url: "https://handluz.brassertech.com.br",
      details: {
        problem: "O time precisava de uma presença digital profissional para atrair patrocinadores e torcedores.",
        solution: "Site responsivo, rápido e visualmente impactante que conta a história e conquistas do time.",
        result: "Aumento da visibilidade da marca HandLuz e canal profissional para contato.",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
      },
    },
    {
      id: 5,
      title: "Brasser Tech Institucional",
      category: "sites",
      description: "Website principal da empresa apresentando soluções e portfólio de tecnologia.",
      tags: ["Corporativo", "Portfolio", "B2B"],
      icon: Code2,
      url: "https://brassertech.com.br",
      details: {
        problem: "Apresentar a Brasser Tech como referência em desenvolvimento de software e automação.",
        solution: "Interface moderna que demonstra autoridade técnica e facilita a conversão de leads.",
        result: "Canal central de aquisição de clientes e demonstração de portfólio.",
        technologies: ["React", "Vite", "EmailJS", "UI/UX"],
      },
    },
  ];

  const filters: { label: string; value: ProjectCategory }[] = [
    { label: "Todos", value: "all" },
    { label: "Sistemas", value: "sistemas" },
    { label: "Apps", value: "apps" },
    { label: "Sites", value: "sites" },
  ];

  // Lógica de filtragem
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -left-20 top-40 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-40 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5">
            Portfólio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Projetos <span className="text-primary">Realizados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transformamos ideias complexas em soluções digitais intuitivas. 
            Explore nossas criações recentes.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              variant={activeFilter === filter.value ? "default" : "ghost"}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeFilter === filter.value 
                  ? "shadow-lg shadow-primary/25 scale-105" 
                  : "hover:bg-primary/10"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Grid de Projetos - CORRIGIDO: Removido motion.div do container pai para evitar conflito de estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="group h-full flex flex-col justify-between bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden rounded-2xl"
                >
                  <div className="p-8">
                    {/* Header do Card */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <project.icon size={28} />
                      </div>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {project.category === 'sistemas' ? 'Sistema' : project.category === 'apps' ? 'App' : 'Web'}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-transparent group-hover:border-primary/20 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer do Card */}
                  <div className="p-6 pt-0 mt-auto flex gap-3">
                     <Button 
                      variant="outline" 
                      className="w-full group/btn hover:border-primary hover:bg-primary/5"
                      onClick={() => setSelectedProject(project)}
                    >
                      Detalhes
                    </Button>
                    <Button 
                      asChild
                      className="w-full bg-primary/90 hover:bg-primary shadow-lg shadow-primary/20"
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        Visitar <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal de Detalhes */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-primary/20 p-0 overflow-hidden rounded-2xl max-h-[90vh] flex flex-col">
          {selectedProject && (
            <>
              <div className="p-8 pb-0 shrink-0">
                <DialogHeader className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <selectedProject.icon size={32} />
                    </div>
                    <div>
                        <Badge variant="outline" className="mb-2 text-primary border-primary/30 uppercase tracking-wider text-[10px]">
                            Case de Sucesso
                        </Badge>
                        <DialogTitle className="text-3xl font-bold">
                            {selectedProject.title}
                        </DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="text-base">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>
              </div>
              
              <div className="px-8 py-6 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-5 bg-muted/30 rounded-xl border border-border/50">
                        <h4 className="font-semibold flex items-center gap-2 text-red-500/80">
                            <span className="w-2 h-2 rounded-full bg-red-500"/> Desafio
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {selectedProject.details.problem}
                        </p>
                    </div>
                    
                    <div className="space-y-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
                         <h4 className="font-semibold flex items-center gap-2 text-primary">
                            <span className="w-2 h-2 rounded-full bg-primary"/> Solução
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {selectedProject.details.solution}
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Resultado</h4>
                    <p className="text-muted-foreground border-l-2 border-green-500 pl-4 py-1">
                        {selectedProject.details.result}
                    </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.details.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-background border hover:border-primary/50 transition-colors px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/30 border-t flex justify-end gap-3 shrink-0">
                <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                    Fechar
                </Button>
                <Button asChild className="gap-2">
                     <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                        Acessar Projeto <ExternalLink size={16} />
                    </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;