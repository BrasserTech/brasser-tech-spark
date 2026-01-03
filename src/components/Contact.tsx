import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Linkedin, Instagram, Youtube, Video, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "", // Mantive telefone pois é útil para o WhatsApp, mas pode ser opcional
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const whatsappNumber = "5549999206844"; // Seu número configurado
      
      // Formatação da mensagem para o WhatsApp
      const text = `*Nova Mensagem via Site*\n\n*Nome:* ${formData.name}\n${formData.phone ? `*Telefone:* ${formData.phone}\n` : ""}*Mensagem:* ${formData.message}`;
      
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      
      // Pequeno delay para simular processamento e dar feedback visual
      setTimeout(() => {
        window.open(url, "_blank");
        
        toast({
          title: "Redirecionando para WhatsApp",
          description: "Sua mensagem está pronta para ser enviada.",
          className: "bg-green-600 text-white border-none"
        });

        setFormData({ name: "", phone: "", message: "" });
        setIsSending(false);
      }, 1000);

    } catch (err) {
      console.error("Erro ao abrir WhatsApp:", err);
      setIsSending(false);
    }
  };

  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/brassertech/", icon: Instagram },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/brassertech", icon: Linkedin },
    { name: "YouTube", url: "https://www.youtube.com/@brassertech", icon: Youtube },
    { name: "TikTok", url: "https://www.tiktok.com/@brassertech", icon: Video },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Background Animado (Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Coluna Esquerda: Informações e CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Disponível para novos projetos
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Vamos construir algo <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  extraordinário juntos?
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Tem uma ideia inovadora ou um desafio complexo na sua empresa? 
                Nossa equipe está pronta para desenhar a solução tecnológica perfeita para o seu negócio.
              </p>
            </div>

            {/* Cards de Contato Rápido */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4 bg-card/50 border-muted hover:border-primary/50 transition-colors flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fale agora no</p>
                  <p className="font-semibold">WhatsApp</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-card/50 border-muted hover:border-primary/50 transition-colors flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Localização</p>
                  <p className="font-semibold">Brasil - SC</p>
                </div>
              </Card>
            </div>

            {/* Redes Sociais */}
            <div>
              <p className="text-sm font-medium mb-4 text-muted-foreground">Siga nossas redes</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-muted hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-10 bg-card/80 backdrop-blur-xl border-primary/10 shadow-2xl shadow-primary/5 rounded-2xl relative overflow-hidden">
              {/* Borda gradient no topo */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Envie uma mensagem</h3>
                <p className="text-muted-foreground">
                  Preencha os dados abaixo para iniciar uma conversa direta no WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium ml-1">Nome Completo</label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Como podemos te chamar?" 
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium ml-1">Telefone / WhatsApp</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="(DD) 99999-9999" 
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium ml-1">Como podemos ajudar?</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Conte um pouco sobre o seu projeto..." 
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary min-h-[120px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-14 text-base font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/20 transition-all duration-300 group"
                  disabled={isSending}
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Abrindo WhatsApp...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Iniciar Conversa <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao clicar, você será redirecionado para o WhatsApp Web ou App.
                </p>
              </form>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;