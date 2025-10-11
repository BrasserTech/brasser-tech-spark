import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser'; // 1. Importar o EmailJS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Linkedin, Instagram, Youtube, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome, email e mensagem.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast({
            title: "Email inválido",
            description: "Por favor, insira um endereço de email válido.",
            variant: "destructive",
        });
        return;
    }

    setIsSending(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    // Usando variáveis de ambiente para segurança
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

    emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then((response) => {
        console.log("EMAIL ENVIADO", response.status, response.text);
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Agradecemos o seu contato. Em breve, nossa equipe entrará em contato.",
          variant: "default",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
    })
    .catch((err) => {
        console.error("ERRO AO ENVIAR EMAIL:", err);
        toast({
            title: "Ocorreu um erro",
            description: "Não foi possível enviar a mensagem. Verifique suas credenciais e tente novamente.", // Mensagem de erro mais específica
            variant: "destructive",
        });
    })
    .finally(() => {
        setIsSending(false);
    });
  };

  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/brassertech/", icon: Instagram },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/brassertech", icon: Linkedin },
    { name: "YouTube", url: "https://www.youtube.com/@brassertech", icon: Youtube },
    { name: "TikTok", url: "https://www.tiktok.com/@brassertech", icon: Video },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Elementos de fundo abstratos para dinamismo */}
      <motion.div 
        className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        initial={{ scale: 1.2 }}
        animate={{ scale: [1.2, 0.8, 1.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <span className="text-gradient">Transforme</span> Seu Potencial
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Vamos conversar sobre como a Brasser Tech pode impulsionar o seu próximo grande projeto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Social Media & Quick Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-8 flex flex-col justify-center items-center lg:items-start"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 text-foreground text-center lg:text-left">Conecte-se Conosco</h3>
              <p className="text-muted-foreground text-lg leading-relaxed text-center lg:text-left">
                Explore nossas soluções, veja nossos projetos e fique por dentro das novidades em tecnologia.
              </p>
            </div>

            <div className="flex gap-4 md:gap-6 pt-6 justify-center lg:justify-start flex-wrap">
                {socialLinks.map((social, index) => (
                    <motion.div
                        key={social.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                        whileHover={{ scale: 1.15, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-16 h-16 md:w-20 md:h-20 border-border hover:border-primary hover:text-primary transition-colors duration-300 group shadow-md"
                            asChild 
                        >
                            <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Brasser Tech no ${social.name}`}>
                                <social.icon className="w-8 h-8 md:w-10 md:h-10" />
                            </a>
                        </Button>
                    </motion.div>
                ))}
            </div>

            <div className="pt-8 text-center lg:text-left">
                <h4 className="text-xl font-semibold mb-2 text-foreground">Dúvidas rápidas?</h4>
                <p className="text-muted-foreground mb-1">Envie um e-mail: <a href="mailto:brassertech2025@gmail.com" className="text-primary hover:underline">brassertech2025@gmail.com</a></p>
                <p className="text-muted-foreground">Ou ligue: <a href="tel:+5549999206844" className="text-primary hover:underline">+55 (49) 9 9920-6844</a></p>
            </div>

          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-10 bg-card border-border shadow-lg rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Envie Sua Mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs do formulário ... */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" className="bg-background/80 border-border focus:border-primary transition-colors duration-200" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="bg-background/80 border-border focus:border-primary transition-colors duration-200" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Telefone (opcional)
                  </label>
                  <Input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(DD) 9 XXXX-XXXX" className="bg-background/80 border-border focus:border-primary transition-colors duration-200" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Conte-nos sobre seu projeto, suas ideias ou dúvidas..." rows={6} className="bg-background/80 border-border focus:border-primary transition-colors duration-200 resize-y" />
                </div>

                {/* 5. Botão com estado de carregamento */}
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8
 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

