import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Importante para a navegação SPA

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Lado Esquerdo: Logo e Slogan */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-2">
              Brasser<span className="text-emerald-500">Tech</span> {/* Ajustei para emerald para combinar com a politica, ou mantenha text-brand-500 */}
            </div>
            <p className="text-sm text-slate-400">Transformando negócios através da tecnologia.</p>
          </div>
          
          {/* Lado Direito: Copyright e Links */}
          <div className="text-sm text-slate-500 text-center md:text-right">
            <p>© 2026 Brasser Tech. Todos os direitos reservados.</p>
            <div className="flex justify-center md:justify-end gap-4 mt-2">
              {/* Link para Termos (pode deixar # por enquanto se não tiver página) */}
              <a href="#" className="hover:text-white transition-colors">
                Termos
              </a>
              
              {/* Link Oficial para a Política */}
              <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
                Privacidade
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;