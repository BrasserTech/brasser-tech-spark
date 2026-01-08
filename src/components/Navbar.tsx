import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface NavbarProps {
  onNavigate?: () => void;
  onOpenPartner?: () => void;
}

const Navbar = ({ onNavigate, onOpenPartner }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#services" },
    { label: "Projetos", href: "#projects" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "Seja um Parceiro", href: "#partner", isSpecial: true },
    { label: "Contato", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | any, item: any) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (item.href === "#partner") {
      if (onOpenPartner) onOpenPartner();
    } else {
      if (onNavigate) onNavigate();
      const targetId = item.href.substring(1);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-background/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-border py-3" 
          : "bg-white dark:bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO (Sem o ícone "B") */}
        <div 
          className="text-2xl font-bold cursor-pointer flex items-center gap-1"
          onClick={(e: any) => handleScrollTo(e, { href: "#hero" })}
        >
          <span className="text-brand-900 dark:text-foreground font-extrabold tracking-tight">Brasser</span>
          <span className="text-brand-600 dark:text-primary font-semibold">Tech</span>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item)}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer ${
                item.isSpecial 
                  ? "bg-brand-600 dark:bg-primary text-white px-5 py-2.5 rounded-full hover:bg-brand-700 dark:hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
                  : "text-slate-600 dark:text-muted-foreground hover:text-brand-600 dark:hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
          
          {/* BOTÃO TOGGLE THEME */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full text-slate-600 dark:text-foreground hover:bg-slate-100 dark:hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* MENU MOBILE TOGGLE */}
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-brand-900 dark:text-white">
             {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-900 dark:text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-card border-t border-gray-100 dark:border-border overflow-hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item)}
                className="block px-6 py-4 text-sm font-medium text-slate-700 dark:text-foreground border-b border-gray-50 dark:border-border hover:bg-gray-50 dark:hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;