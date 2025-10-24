import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  // Função para abrir o link do WhatsApp
  const handleClick = () => {
    const phone = "5549999206844";
    const message = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre os serviços da Brasser Tech."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            // Animação de entrada
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
            
            // Animação contínua de flutuação (após a entrada)
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            
            /* ===== MUDANÇA AQUI ===== */
            className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-colors duration-300 group"
            
            aria-label="Converse conosco no WhatsApp"
          >
            {/* O ícone e a animação de flutuação interna */}
            <motion.div
              animate={{ translateY: ["0%", "-10%", "0%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2, // Começa a flutuar após a entrada
              }}
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </motion.div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-popover text-popover-foreground">
          <p>Podemos ajudar?</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;