import { motion } from "framer-motion";

const Footer = () => {
  const technologies = [
    { name: "Node.js", icon: "🟢" },
    { name: "React", icon: "⚛️" },
    { name: "Python", icon: "🐍" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Docker", icon: "🐳" },
    { name: "JavaScript", icon: "🟨" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-gradient">Tecnologias</span> que utilizamos
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Utilizamos as melhores tecnologias do mercado para garantir
            performance, estabilidade e segurança para sua empresa.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {tech.icon}
                </span>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold mb-2">
                <span className="text-gradient">Brasser</span>
                <span className="text-foreground"> Tech</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Transformando negócios através da tecnologia
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-2">
                © 2025 Brasser Tech. Todos os direitos reservados.
              </p>
              <div className="flex gap-4 justify-center md:justify-end text-sm">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
