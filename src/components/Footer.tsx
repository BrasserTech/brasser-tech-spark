import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-2">
              Brasser<span className="text-brand-500">Tech</span>
            </div>
            <p className="text-sm text-slate-400">Transformando negócios através da tecnologia.</p>
          </div>
          
          <div className="text-sm text-slate-500 text-center md:text-right">
            <p>© 2025 Brasser Tech. Todos os direitos reservados.</p>
            <div className="flex justify-center md:justify-end gap-4 mt-2">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;