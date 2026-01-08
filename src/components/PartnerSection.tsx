// src/components/PartnerSection.tsx
import { ArrowLeft } from "lucide-react"; // Se der erro no ícone, remova a importação e o ícone

interface PartnerSectionProps {
  onBack: () => void;
}

const PartnerSection = ({ onBack }: PartnerSectionProps) => {
  return (
    <div className="min-h-screen bg-black text-white animate-in fade-in duration-500 pt-20">
      {/* Botão de Voltar */}
      <div className="container mx-auto px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#00C2FF] transition-colors cursor-pointer"
        >
          {/* Se não tiver lucide-react, troque <ArrowLeft /> por "<-" */}
          <span>← Voltar para o início</span>
        </button>
      </div>

      {/* Conteúdo Principal */}
      <section className="relative pb-20 px-6 overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-sm text-gray-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00C2FF]"></span>
            Programa de Parceria
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Transforme Networking em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#FF007A]">
              Lucro Real
            </span>
          </h1>
          
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Indique nossas soluções de automação e ganhe comissões recorrentes. 
            Sem burocracia, sem código.
          </p>

          {/* Grid de Passos */}
          <div className="grid md:grid-cols-3 gap-8 text-left mt-16 mb-16">
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-[#00C2FF] mb-2">1. Cadastre-se</h3>
              <p className="text-gray-400 text-sm">Preencha o formulário abaixo para entrar no time.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">2. Indique</h3>
              <p className="text-gray-400 text-sm">Conecte empresas que precisam de tecnologia.</p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-[#FF007A] mb-2">3. Lucre</h3>
              <p className="text-gray-400 text-sm">Receba sua comissão assim que o contrato fechar.</p>
            </div>
          </div>

          {/* Formulário Simples */}
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Comece Agora</h3>
            <form className="space-y-4 text-left">
              <div>
                <label className="text-sm text-gray-400 ml-1">Nome</label>
                <input type="text" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00C2FF] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-gray-400 ml-1">WhatsApp</label>
                <input type="text" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00C2FF] focus:outline-none" />
              </div>
              <button className="w-full py-4 mt-2 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-all cursor-pointer">
                Quero ser Parceiro
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerSection;