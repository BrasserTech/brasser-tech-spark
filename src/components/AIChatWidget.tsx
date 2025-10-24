import React, { useState, useEffect, useRef, FormEvent } from 'react';
import './AIChatWidget.css';

type Message = { sender: 'user' | 'bot'; text: string; };

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Olá! 👋 Sou o assistente virtual da Brasser Tech. Em que posso ajudar?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const N8N_WEBHOOK_URL = 'URL_DO_SEU_WEBHOOK_AQUI';

  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages, isOpen]);

  // Abertura por evento global
  useEffect(() => {
    const handleOpenChat = () => {
      setIsClosing(false);
      setIsOpen(true);
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  // Alterna com animação de saída
  const toggleOpen = () => {
    if (isOpen) {
      setIsClosing(true);
      // aguarda encerrar animação e então oculta
      setTimeout(() => { setIsOpen(false); setIsClosing(false); }, 230);
    } else {
      setIsOpen(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('chat-input') as HTMLInputElement;
    const messageText = input.value.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
    setIsLoading(true);
    input.value = '';

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, sessionId: sessionId.current }),
      });

      if (!response.ok) throw new Error('Erro na resposta do n8n');
      const data = await response.json();

      const reply = typeof data?.reply === 'string' && data.reply.length > 0
        ? data.reply
        : 'Certo! Recebi sua mensagem. Poderia detalhar um pouco mais?';

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Erro ao falar com o n8n:', err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Desculpe, estou com problemas técnicos.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const stateClass = isOpen ? (isClosing ? 'closing' : 'open') : 'hidden';

  return (
    <div className={`chat-widget-container ${stateClass}`} aria-live="polite">
      {/* Cabeçalho */}
      <div className="chat-header" onClick={toggleOpen} role="button" aria-expanded={isOpen}>
        <span>Fale com nosso Agente de IA</span>
        <button className="minimize-chat-btn" aria-label={isOpen ? 'Minimizar' : 'Expandir'}>
          {isOpen ? '–' : '+'}
        </button>
      </div>

      {/* Corpo */}
      <div id="chat-body" className="chat-body">
        <div id="chat-messages" className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}-message`}>
              {msg.text}
            </div>
          ))}

          {isLoading && (
            <div className="typing" aria-label="Digitando">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form id="chat-form" className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="chat-input"
            name="chat-input"
            className="chat-input"
            placeholder="Digite sua mensagem..."
            autoComplete="off"
            disabled={isLoading}
            aria-label="Campo de mensagem"
          />
          <button type="submit" disabled={isLoading}>Enviar</button>
        </form>
      </div>
    </div>
  );
}
