import React from "react";
import { Wallet, TrendingUp, Handshake, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface CollaboratorProps {
  onOpenPartner: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 20 } 
  },
};

const Collaborator = ({ onOpenPartner }: CollaboratorProps) => {
  return (
    <section 
      className="py-24 relative overflow-hidden transition-colors duration-500
                 /* MODO CLARO: Cinza muito suave (padrão corporativo) para destacar do branco */
                 bg-slate-50
                 /* MODO ESCURO: Fundo Preto Sólido */
                 dark:bg-black"
    >
      
      {/* =========================================
          BACKGROUND SECUNDÁRIO (DARK MODE PROTECTION)
         ========================================= */}
      {/* Garante que o fundo preto cubra qualquer resquício de cor clara */}
      <div className="absolute inset-0 bg-black opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* =========================================
          ELEMENTOS DECORATIVOS SUTIS
         ========================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bolhas muito sutis para dar vida */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px]
                     bg-blue-100 dark:bg-[#00C2FF]/10"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-[100px]
                     bg-slate-200 dark:bg-[#FF007A]/10"
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* CABEÇALHO */}
          <div className="flex flex-col items-center text-center mb-16">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-6 tracking-tight transition-colors duration-300
                         text-brand-900 dark:text-white"
            >
              Você não precisa ser dev para <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r 
                               /* Claro: Azul Marca */
                               from-brand-600 to-blue-500
                               /* Escuro: Neon */
                               dark:from-[#00C2FF] dark:to-[#FF007A]">
                lucrar com tecnologia
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl max-w-2xl leading-relaxed transition-colors duration-300
                         text-slate-600 dark:text-gray-400"
            >
              Torne-se um parceiro Brasser Tech. Indique nossas soluções de automação e software para empresas e ganhe comissões recorrentes.
            </motion.p>
          </div>

          {/* GRID DE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* CARD 1 */}
            <motion.div variants={itemVariants} className="group h-full">
              <div className="h-full p-8 rounded-2xl border transition-all duration-300
                              /* === MODO CLARO === */
                              /* Branco puro para destacar no fundo cinza */
                              bg-white border-slate-200 shadow-lg shadow-slate-200/50 
                              hover:shadow-xl hover:border-brand-300 hover:-translate-y-2
                              
                              /* === MODO ESCURO === */
                              dark:bg-gray-900/60 dark:backdrop-blur-sm dark:border-gray-800 
                              dark:hover:border-[#00C2FF]/50 dark:shadow-none">
                
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
                                bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white
                                dark:bg-gray-800 dark:text-[#00C2FF] dark:group-hover:text-[#00C2FF] dark:group-hover:bg-[#00C2FF]/20">
                  <Wallet className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300
                               text-brand-900 dark:text-white">
                  Comissões Atrativas
                </h3>
                
                <p className="leading-relaxed text-sm transition-colors duration-300
                              text-slate-600 dark:text-gray-400">
                  Receba uma porcentagem significativa sobre cada contrato fechado através da sua indicação. Dinheiro real no seu bolso.
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div variants={itemVariants} className="group h-full">
              <div className="h-full p-8 rounded-2xl border transition-all duration-300
                              bg-white border-slate-200 shadow-lg shadow-slate-200/50 
                              hover:shadow-xl hover:border-brand-300 hover:-translate-y-2
                              
                              dark:bg-gray-900/60 dark:backdrop-blur-sm dark:border-gray-800 
                              dark:hover:border-[#FF007A]/50 dark:shadow-none">
                
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
                                bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white
                                dark:bg-gray-800 dark:text-[#FF007A] dark:group-hover:text-[#FF007A] dark:group-hover:bg-[#FF007A]/20">
                  <TrendingUp className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300
                               text-brand-900 dark:text-white">
                  Renda Recorrente
                </h3>
                
                <p className="leading-relaxed text-sm transition-colors duration-300
                              text-slate-600 dark:text-gray-400">
                  Construa uma carteira de clientes e garanta ganhos mensais (MRR) enquanto eles utilizarem nossos serviços.
                </p>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div variants={itemVariants} className="group h-full">
              <div className="h-full p-8 rounded-2xl border transition-all duration-300
                              bg-white border-slate-200 shadow-lg shadow-slate-200/50 
                              hover:shadow-xl hover:border-brand-300 hover:-translate-y-2
                              
                              dark:bg-gray-900/60 dark:backdrop-blur-sm dark:border-gray-800 
                              dark:hover:border-white/50 dark:shadow-none">
                
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
                                bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white
                                dark:bg-gray-800 dark:text-white dark:group-hover:bg-white/20">
                  <Handshake className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300
                               text-brand-900 dark:text-white">
                  Suporte Total
                </h3>
                
                <p className="leading-relaxed text-sm transition-colors duration-300
                              text-slate-600 dark:text-gray-400">
                  Nós cuidamos de toda a parte técnica, reuniões complexas e fechamento. Você só precisa abrir as portas.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA FINAL */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <button 
              onClick={onOpenPartner}
              className="group relative px-10 py-5 font-bold text-lg rounded-full flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer
                         /* Claro: Azul Forte */
                         bg-brand-600 text-white hover:bg-brand-700 shadow-blue-200
                         /* Escuro: Branco */
                         dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:shadow-white/10"
            >
              Quero ser um Colaborador 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="mt-6 text-sm text-center transition-colors duration-300
                          text-slate-500 dark:text-gray-500">
              Junte-se a parceiros que estão transformando networking em negócios lucrativos. 
              <span className="block mt-1 text-xs opacity-70">Sem necessidade de conhecimentos técnicos.</span>
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Collaborator;