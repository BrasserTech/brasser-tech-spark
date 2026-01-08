import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Users, Briefcase, Megaphone, Laptop, Calculator, DollarSign, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PartnerSectionProps {
  onBack: () => void;
}

const PartnerSection = ({ onBack }: PartnerSectionProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Estados do Formulário de Contato (REMOVIDO partnerPhone)
  const [partnerName, setPartnerName] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Estados da Calculadora
  const [ticketImplantacao, setTicketImplantacao] = useState(3000); 
  const [ticketMensal, setTicketMensal] = useState(500); 
  const [vendasMes, setVendasMes] = useState(2); 

  // LÓGICA DE COMISSÃO (40% / 30%)
  const comissaoImplantacao = ticketImplantacao * 0.40; 
  const comissaoRecorrente = ticketMensal * 0.30; 
  
  const ganhoImediato = comissaoImplantacao * vendasMes;
  const rendaMensalAcumulada = comissaoRecorrente * vendasMes;
  const rendaAnualAcumulada = rendaMensalAcumulada * 12;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (setter: (val: number) => void, value: string) => {
    const numValue = Number(value);
    if (numValue >= 0) setter(numValue);
  };

  // Função para Enviar WhatsApp (ATUALIZADA)
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName) return; // Apenas valida o nome agora

    setIsRedirecting(true);
    
    const whatsappNumber = "5549999206844"; // Seu número
    // Mensagem simplificada sem o telefone no corpo do texto
    const message = `Olá! Me chamo *${partnerName}* e tenho interesse no programa de *Parceria Brasser Tech*. Gostaria de receber os materiais.`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
        window.open(url, "_blank");
        setIsRedirecting(false);
        setPartnerName("");
    }, 800);
  };

  const faqs = [
    {
      question: "Quais são as porcentagens de comissão?",
      answer: "Você recebe 40% do valor da Implantação (pago na cabeça) e 30% de comissão recorrente sobre as mensalidades enquanto o cliente estiver com a licença ativa.",
    },
    {
      question: "Preciso corrigir bugs ou programar?",
      answer: "Não! Responsabilidades técnicas como bugs, servidores e desenvolvimento são 100% da Brasser Tech. Você foca no relacionamento e suporte de primeiro nível.",
    },
    {
      question: "A comissão recorrente é vitalícia?",
      answer: "Sim, a comissão de 30% é mantida enquanto o contrato do cliente estiver ativo e você mantiver o acompanhamento dele (retenção).",
    },
    {
      question: "O que configura 'Suporte de Primeiro Nível'?",
      answer: "É o atendimento inicial: dúvidas de uso, onboarding e treinamento básico. Problemas técnicos complexos você escala para nossa equipe.",
    },
  ];

  const personas = [
    {
      icon: Briefcase,
      title: "Consultores",
      desc: "Ofereça automação para resolver dores operacionais e ganhe 40% sobre a implantação.",
    },
    {
      icon: Megaphone,
      title: "Agências",
      desc: "Monetize demandas de software e apps que sua agência não atende internamente.",
    },
    {
      icon: Users,
      title: "Networking",
      desc: "Transforme sua influência em Renda Passiva (30% de recorrência) indicando conexões.",
    },
    {
      icon: Laptop,
      title: "Devs Freelancers",
      desc: "Pegou um projeto full-stack grande demais? Passe para a Brasser e garanta sua fatia.",
    },
  ];

  return (
    <div 
      className="min-h-screen pt-20 animate-in fade-in duration-500 transition-colors
                 bg-slate-50 text-slate-900
                 dark:bg-black dark:text-white"
    >
      
      {/* Botão de Voltar */}
      <div className="container mx-auto px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 transition-colors cursor-pointer font-medium hover:underline
                     text-slate-600 hover:text-brand-600
                     dark:text-gray-400 dark:hover:text-[#00C2FF]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para o início</span>
        </button>
      </div>

      <section className="relative pb-20 px-6 overflow-hidden">
        <div className="container mx-auto text-center max-w-6xl pt-10">
          
          {/* HEADER */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 border transition-colors
                          bg-white border-brand-100 text-brand-700 shadow-sm
                          dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse"></span>
            Comissão: 40% Implantação + 30% Recorrente
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight transition-colors
                         text-brand-900 dark:text-white">
            Simule seus ganhos como <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r 
                             from-brand-600 to-blue-400
                             dark:from-[#00C2FF] dark:to-[#FF007A]">
              Parceiro Brasser
            </span>
          </h1>
          
          <p className="text-xl mb-16 max-w-2xl mx-auto transition-colors
                        text-slate-600 dark:text-gray-400">
            Focamos na retenção: ganhe uma alta porcentagem mensal enquanto mantiver seu cliente ativo.
          </p>

          {/* === CALCULADORA DE GANHOS === */}
          <div className="grid lg:grid-cols-12 gap-8 mb-24 text-left">
            <div className="lg:col-span-7 p-8 rounded-3xl border shadow-xl transition-all
                            bg-white border-slate-200
                            dark:bg-gray-900/50 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-brand-100 text-brand-600 dark:bg-gray-800 dark:text-[#00C2FF]">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 dark:text-white">Configure o cenário</h3>
              </div>

              <div className="space-y-8">
                {/* Control 1: Implantação */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-slate-700 dark:text-gray-300">Valor da Implantação</label>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/40 rounded-lg px-3 py-1 border border-transparent focus-within:border-brand-500 transition-all">
                        <span className="text-slate-500 dark:text-gray-400 font-medium">R$</span>
                        <input type="number" value={ticketImplantacao} onChange={(e) => handleInputChange(setTicketImplantacao, e.target.value)} className="w-24 bg-transparent font-bold text-right outline-none text-brand-600 dark:text-[#00C2FF]" />
                    </div>
                  </div>
                  <input type="range" min="0" max="50000" step="100" value={ticketImplantacao} onChange={(e) => setTicketImplantacao(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-brand-600 dark:accent-[#00C2FF]" />
                  <p className="text-xs text-slate-500 mt-2">Você ganha <span className="font-bold">40%</span> deste valor.</p>
                </div>

                {/* Control 2: Mensalidade */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-slate-700 dark:text-gray-300">Valor da Mensalidade</label>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/40 rounded-lg px-3 py-1 border border-transparent focus-within:border-brand-500 transition-all">
                        <span className="text-slate-500 dark:text-gray-400 font-medium">R$</span>
                        <input type="number" value={ticketMensal} onChange={(e) => handleInputChange(setTicketMensal, e.target.value)} className="w-24 bg-transparent font-bold text-right outline-none text-brand-600 dark:text-[#00C2FF]" />
                    </div>
                  </div>
                  <input type="range" min="0" max="10000" step="50" value={ticketMensal} onChange={(e) => setTicketMensal(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-brand-600 dark:accent-[#00C2FF]" />
                  <p className="text-xs text-slate-500 mt-2">Você ganha <span className="font-bold">30%</span> deste valor todo mês.</p>
                </div>

                {/* Control 3: Vendas */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-medium text-slate-700 dark:text-gray-300">Vendas por Mês</label>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/40 rounded-lg px-3 py-1 border border-transparent focus-within:border-brand-500 transition-all">
                        <input type="number" value={vendasMes} onChange={(e) => handleInputChange(setVendasMes, e.target.value)} className="w-16 bg-transparent font-bold text-right outline-none text-brand-600 dark:text-[#00C2FF]" />
                        <span className="text-slate-500 dark:text-gray-400 font-medium text-sm">contratos</span>
                    </div>
                  </div>
                  <input type="range" min="1" max="50" step="1" value={vendasMes} onChange={(e) => setVendasMes(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-brand-600 dark:accent-[#00C2FF]" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex-1 p-8 rounded-3xl border flex flex-col justify-center transition-all bg-brand-600 text-white shadow-lg shadow-brand-200 dark:bg-[#00C2FF] dark:text-black dark:border-none dark:shadow-[#00C2FF]/20">
                <div className="flex items-center gap-2 mb-2 opacity-90"><DollarSign className="w-5 h-5" /><span className="font-medium">Comissão Imediata (Mensal)</span></div>
                <div className="text-5xl font-extrabold mb-2 break-words">R$ {ganhoImediato.toLocaleString()}</div>
                <p className="text-sm opacity-80">Referente a 40% de {vendasMes} implantações de R$ {ticketImplantacao.toLocaleString()}</p>
              </div>
              <div className="flex-1 p-8 rounded-3xl border flex flex-col justify-center transition-all bg-white border-slate-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2 text-brand-600 dark:text-[#FF007A]"><TrendingUpIcon className="w-5 h-5" /><span className="font-medium">Nova Renda Recorrente</span></div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">+ R$ {rendaMensalAcumulada.toLocaleString()}<span className="text-lg text-slate-500 font-normal">/mês</span></div>
                <p className="text-sm text-slate-500 dark:text-gray-400">Acumula! Em 1 ano: <span className="font-bold text-slate-900 dark:text-white">R$ {rendaAnualAcumulada.toLocaleString()}</span>.</p>
              </div>
            </div>
          </div>

          <div className="mb-12 text-left">
            <h3 className="text-2xl font-bold mb-8 text-brand-900 dark:text-white">Para quem é este programa?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personas.map((persona, index) => (
                <div key={index} className="p-6 rounded-2xl border text-left transition-all hover:-translate-y-1 bg-white border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-gray-900/40 dark:border-gray-800 dark:shadow-none dark:hover:border-[#00C2FF]/30">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-brand-50 text-brand-600 dark:bg-gray-800 dark:text-[#00C2FF]"><persona.icon className="w-6 h-6" /></div>
                  <h3 className="text-lg font-bold mb-2 text-brand-900 dark:text-white">{persona.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">{persona.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start text-left">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-brand-900 dark:text-white">Dúvidas Frequentes</h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border overflow-hidden transition-colors bg-white border-slate-200 dark:bg-gray-900/30 dark:border-gray-800">
                    <button onClick={() => toggleFaq(idx)} className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-800 dark:text-gray-200">
                      {faq.question}
                      {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-4 pt-0 text-sm text-slate-600 dark:text-gray-400 leading-relaxed border-t border-dashed border-slate-100 dark:border-gray-800 mt-2">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* FORMULÁRIO DE WHATSAPP (SIMPLIFICADO - APENAS NOME) */}
            <div className="lg:sticky lg:top-24">
              <div className="p-8 rounded-3xl border backdrop-blur-xl shadow-2xl transition-all
                              bg-white border-slate-200 shadow-slate-200/50
                              dark:bg-gray-900/60 dark:border-white/10 dark:shadow-black/50">
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-brand-900 dark:text-white">Cadastre-se como Parceiro</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Receba nosso modelo de contrato e materiais via WhatsApp.</p>
                </div>
                
                <form onSubmit={handlePartnerSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider ml-1 mb-1 block text-slate-500 dark:text-gray-500">Nome</label>
                    <input 
                        type="text" 
                        required
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full rounded-lg px-4 py-3 border transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C2FF] bg-slate-50 border-slate-200 text-slate-900 dark:bg-black/50 dark:border-gray-700 dark:text-white" 
                    />
                  </div>
                  {/* Campo de Telefone REMOVIDO conforme solicitado */}
                  
                  <button 
                    disabled={isRedirecting}
                    className="w-full py-4 mt-4 font-bold text-lg rounded-lg transition-all cursor-pointer shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2
                               bg-brand-600 hover:bg-brand-700 text-white
                               dark:bg-white dark:hover:bg-gray-200 dark:text-black"
                  >
                    {isRedirecting ? "Abrindo WhatsApp..." : <>Solicitar Acesso <Send size={18} /></>}
                  </button>
                  
                  <p className="text-xs text-center text-slate-400 dark:text-gray-600 mt-4">
                    Ao clicar, você iniciará uma conversa direta com Paulo da Brasser Tech.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

// Ícone auxiliar
function TrendingUpIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
  );
}

export default PartnerSection;