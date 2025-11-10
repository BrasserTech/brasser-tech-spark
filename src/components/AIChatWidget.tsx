// AIChatWidget.tsx
'use client';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import './AIChatWidget.css';

type Message = { sender: 'user' | 'bot'; text: string };

export function AIChatWidget() {
  const N8N_WEBHOOK_URL =
    'https://automacoes.brassertech.com.br/webhook-test/f119c6ea-c592-4dab-817f-07171f61f9c7';

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Olá! Sou o assistente da BrasserTech. Como você descreve seu negócio em poucas palavras?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sessionId = useRef<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('brasser:chat:session');
    const newSession = stored || `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('brasser:chat:session', newSession);
    sessionId.current = newSession;
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages, isOpen]);

  useEffect(() => {
    const handler = () => { setIsClosing(false); setIsOpen(true); };
    window.addEventListener('open-ai-chat', handler);
    return () => window.removeEventListener('open-ai-chat', handler);
  }, []);

  const toggleOpen = () => {
    if (!isOpen) return setIsOpen(true);
    setIsClosing(true);
    setTimeout(() => { setIsOpen(false); setIsClosing(false); }, 230);
  };

  async function sendToN8n(userText: string): Promise<string> {
    const payload = {
      message: userText,
      sessionId: sessionId.current,
      metadata: {
        source: 'website',
        path: window.location.pathname,
        title: document.title,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Erro HTTP do n8n: ${response.status}`);

    // ✅ Agora pegamos texto puro da resposta
    const replyText = (await response.text()).trim();
    return replyText || 'Certo! Recebi sua mensagem. Pode detalhar um pouco mais?';
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('chat-input') as HTMLInputElement;
    const messageText = input.value.trim();
    if (!messageText || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
    setIsLoading(true);
    input.value = '';

    try {
      const reply = await sendToN8n(messageText);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Erro ao contatar o n8n:', err);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Desculpe, tive uma instabilidade agora. Podemos tentar novamente em alguns instantes?' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const stateClass = isOpen ? (isClosing ? 'closing' : 'open') : 'hidden';

  return (
    <div className={`chat-widget-container ${stateClass}`} aria-live="polite">
      <div className="chat-header" onClick={toggleOpen} role="button">
        <span>Fale com a BrasserTech</span>
        <button className="minimize-chat-btn">{isOpen ? '–' : '+'}</button>
      </div>

      <div className="chat-body">
        <div className="chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`message ${m.sender}-message`}>
              {m.text}
            </div>
          ))}

          {isLoading && (
            <div className="typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            id="chat-input"
            name="chat-input"
            className="chat-input"
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
          />
          <button disabled={isLoading}>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export { AIChatWidget as Component };
export default AIChatWidget;
