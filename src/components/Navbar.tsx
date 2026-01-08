import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Removido Sun e Moon
import { Button } from "@/components/ui/button";
// import { useTheme } from "@/components/ThemeProvider"; // Não precisamos mais disso aqui
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onNavigate: () => void;
  onOpenPartner: () => void;
}

const Navbar = ({ onNavigate, onOpenPartner }: NavbarProps) => {
  // const { theme, toggleTheme } = useTheme(); // Removido o hook de tema
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#services" },
    { label: "Projetos", href: "#projects" },
    // { label: "Depoimentos", href: "#testimonials" },
    { label: "Seja um Parceiro", href: "#partner", isSpecial: true },
    { label: "Contato", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: any) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.href === "#partner") {
      onOpenPartner();
    } else {
      if (onNavigate) onNavigate();

      const targetId = item.href.substring(1);
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold cursor-pointer"
            onClick={(e: any) => handleScrollTo(e, { href: "#hero" })} 
          >
            <span className="text-gradient">Brasser</span>
            <span className="text-foreground"> Tech</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`transition-colors duration-300 font-medium cursor-pointer ${
                  item.isSpecial 
                    ? "text-[#00C2FF] font-bold hover:text-[#FF007A]" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* REMOVIDO: Botão de Alternar Tema (Sun/Moon)
               O site ficará fixo no tema definido no App.tsx (dark)
            */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 bg-background/95 backdrop-blur-md rounded-lg p-4 border border-border"
            >
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item)}
                  className={`block py-3 transition-colors cursor-pointer border-b border-border/50 last:border-0 ${
                    item.isSpecial 
                      ? "text-[#00C2FF] font-bold" 
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;