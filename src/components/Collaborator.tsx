import React from "react";

// Interface para definir que este componente espera receber uma função (onOpenPartner)
interface CollaboratorProps {
  onOpenPartner: () => void;
}

const Collaborator = ({ onOpenPartner }: CollaboratorProps) => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Elementos de Fundo (Background) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Você não precisa ser dev para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#FF007A]">
              lucrar com tecnologia
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Torne-se um parceiro Brasser Tech. Indique nossas soluções de automação e software para empresas e ganhe comissões recorrentes.
          </p>
        </div>

        {/* Grid de Benefícios (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-[#00C2FF]/50 transition-all duration-300 group hover:-translate-y-2 cursor-default">
            <h3 className="text-xl font-bold text-[#00C2FF] mb-3 group-hover:scale-105 transition-transform origin-left">
              Comissões Atrativas
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Receba uma porcentagem significativa sobre cada contrato fechado através da sua indicação. Dinheiro real no seu bolso.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-[#FF007A]/50 transition-all duration-300 group hover:-translate-y-2 cursor-default">
            <h3 className="text-xl font-bold text-[#FF007A] mb-3 group-hover:scale-105 transition-transform origin-left">
              Renda Recorrente
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Construa uma carteira de clientes e garanta ganhos mensais (MRR) enquanto eles utilizarem nossos serviços.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-white/50 transition-all duration-300 group hover:-translate-y-2 cursor-default">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:scale-105 transition-transform origin-left">
              Suporte Total
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Nós cuidamos de toda a parte técnica, reuniões complexas e fechamento. Você só precisa abrir as portas.
            </p>
          </div>
        </div>

        {/* Área de Ação (CTA) */}
        <div className="flex flex-col items-center">
          <button 
            onClick={onOpenPartner}
            className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 cursor-pointer active:scale-95"
          >
            Quero ser um Colaborador ➔
          </button>
          
          <p className="mt-6 text-sm text-gray-500 max-w-lg text-center">
            Junte-se a parceiros que estão transformando networking em negócios lucrativos. 
            <span className="block mt-1 text-gray-600 text-xs">Sem necessidade de conhecimentos técnicos.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Collaborator;