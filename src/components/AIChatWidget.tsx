// AIChatWidget.tsx
'use client';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import './AIChatWidget.css';

type BotNextAction = 'ask' | 'inform' | 'confirm' | 'handoff' | 'goodbye';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  nextAction?: BotNextAction | null;
  waLink?: string | null;
};

export function AIChatWidget() {
  const N8N_WEBHOOK_URL =
    // 'https://automacoes.brassertech.com.br/webhook-test/f119c6ea-c592-4dab-817f-07171f61f9c7'; // teste
  'https://automacoes.brassertech.com.br/webhook/f119c6ea-c592-4dab-817f-07171f61f9c7';    // produção

  // Link fixo do WhatsApp (usado como fallback quando aplicável)
  const WA_LINK =
    'https://api.whatsapp.com/send/?phone=5549999206844&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+da+Brasser+Tech.&type=phone_number&app_absent=0';

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Olá! Sou o assistente da BrasserTech. Como você descreve seu negócio em poucas palavras?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sessionId = useRef<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('brasser:chat:session');
    const newSession =
      stored || `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('brasser:chat:session', newSession);
    sessionId.current = newSession;
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages, isOpen]);

  useEffect(() => {
    const handler = () => {
      setIsClosing(false);
      setIsOpen(true);
    };
    window.addEventListener('open-ai-chat', handler);
    return () => window.removeEventListener('open-ai-chat', handler);
  }, []);

  const toggleOpen = () => {
    if (!isOpen) return setIsOpen(true);
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 230);
  };

  // Remove cercas ``` e prefixos tipo ```json
  function stripCodeFences(s: string): string {
    let out = s.trim();
    // remove ```xxx no início
    out = out.replace(/^```[a-zA-Z]*\s*/i, '');
    // remove ``` no final
    out = out.replace(/\s*```$/i, '');
    return out.trim();
  }

  // Tenta extrair um objeto JSON da string
  function tryParseJsonBlock(s: string): any | null {
    const cleaned = stripCodeFences(s);
    // tentativa direta
    if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
      try {
        return JSON.parse(cleaned);
      } catch {
        /* segue abaixo */
      }
    }
    // tenta localizar o primeiro { e o último }
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      const candidate = cleaned.slice(first, last + 1);
      try {
        return JSON.parse(candidate);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Normaliza qualquer resposta do n8n para { text, nextAction, waLink }
  function normalizeAgentReply(raw: string): { text: string; nextAction: BotNextAction | null; waLink: string | null } {
    const parsed = tryParseJsonBlock(raw);
    if (parsed && typeof parsed === 'object') {
      const text: string =
        typeof parsed.text === 'string' && parsed.text.trim()
          ? parsed.text.trim()
          : stripCodeFences(raw);

      const nextAction: BotNextAction | null =
        ['ask', 'inform', 'confirm', 'handoff', 'goodbye'].includes(parsed.next_action)
          ? parsed.next_action
          : null;

      // se o back não enviar wa_link, usar fallback; exibir só se nextAction === 'handoff'
      const waLink: string | null = typeof parsed.wa_link === 'string' && parsed.wa_link.trim()
        ? parsed.wa_link.trim()
        : WA_LINK;

      return { text, nextAction, waLink };
    }

    // fallback: texto puro
    return {
      text: stripCodeFences(raw) || 'Certo! Recebi sua mensagem. Pode detalhar um pouco mais?',
      nextAction: null,
      waLink: WA_LINK,
    };
  }

  async function sendToN8n(userText: string): Promise<string> {
    const payload = {
      message: userText,
      sessionId: sessionId.current,
      metadata: {
        source: 'website',
        path: typeof window !== 'undefined' ? window.location.pathname : '/',
        title: typeof document !== 'undefined' ? document.title : '',
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Erro HTTP do n8n: ${response.status}`);
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
      const rawReply = await sendToN8n(messageText);
      const norm = normalizeAgentReply(rawReply);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: norm.text,
          nextAction: norm.nextAction,
          waLink: norm.waLink,
        },
      ]);
    } catch (err) {
      console.error('Erro ao contatar o n8n:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text:
            'Desculpe, tive uma instabilidade agora. Podemos tentar novamente em alguns instantes?',
        },
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
              <div>{m.text}</div>

              {/* Botão de handoff para WhatsApp, apenas quando indicado */}
              {m.sender === 'bot' && m.nextAction === 'handoff' && m.waLink && (
                <div style={{ marginTop: 8 }}>
                  <a
                    href={m.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-cta"
                    style={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      border: '1px solid #25d366',
                    }}
                  >
                    Abrir WhatsApp
                  </a>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
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
