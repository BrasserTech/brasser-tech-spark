import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react'; 
// Se não tiver o lucide-react instalado, pode remover os ícones ou usar outra lib.

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 md:p-12">
        
        {/* Cabeçalho */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <Link to="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Política de Privacidade
          </h1>
          <p className="text-slate-400">Última atualização: Janeiro de 2026</p>
        </div>

        {/* Conteúdo */}
        <div className="space-y-8">
          
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-emerald-500 mr-3" />
              <h2 className="text-xl font-bold text-white">1. Coleta de Dados</h2>
            </div>
            <p className="leading-relaxed">
              A <strong>Brasser Tech</strong> preza pela transparência total. Coletamos apenas os dados estritamente necessários (como <strong>Nome</strong> e <strong>WhatsApp/Telefone</strong>) que são fornecidos voluntariamente por você através de nossos formulários de contato e cadastro de parceiros.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-emerald-500 mr-3" />
              <h2 className="text-xl font-bold text-white">2. Finalidade do Uso</h2>
            </div>
            <p className="leading-relaxed mb-2">Utilizamos seus dados exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>Iniciar o atendimento comercial solicitado via WhatsApp.</li>
              <li>Responder dúvidas sobre nossos serviços de desenvolvimento.</li>
              <li>Enviar informações sobre o programa de parcerias (apenas se você se cadastrou especificamente para isso).</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-emerald-500 mr-3" />
              <h2 className="text-xl font-bold text-white">3. Compartilhamento e Segurança</h2>
            </div>
            <p className="leading-relaxed">
              Seus dados são tratados como confidenciais. A Brasser Tech <strong>não vende, não aluga e não compartilha</strong> suas informações pessoais com terceiros para fins de marketing ou publicidade.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-emerald-500 mr-3" />
              <h2 className="text-xl font-bold text-white">4. Seus Direitos</h2>
            </div>
            <p className="leading-relaxed">
              Você tem total controle. Caso deseje que seus dados sejam removidos da nossa base de contatos, basta solicitar a exclusão enviando uma mensagem para nosso WhatsApp oficial ou através do e-mail de contato da empresa.
            </p>
          </section>

        </div>

        {/* Rodapé da página */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            Brasser Tech © 2026. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;