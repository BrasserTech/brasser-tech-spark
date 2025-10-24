// src/components/AIChatWidget.tsx
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import './AIChatWidget.css'; // Importa nosso CSS

// Tipo para as mensagens
type Message = {
    sender: 'user' | 'bot';
    text: string;
};

export function AIChatWidget() {
    // --- ESTADO DO COMPONENTE ---
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'bot',
            text: 'Olá! 👋 Sou o assistente virtual da Brasser Tech. Em que posso ajudar?',
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    // --- CONFIGURAÇÃO ---
    // IMPORTANTE: Cole aqui a URL de PRODUÇÃO do seu Webhook do n8n
    const N8N_WEBHOOK_URL = 'URL_DO_SEU_WEBHOOK_AQUI';

    // Guarda o ID da sessão para esta visita
    const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
    // Referência para o final da lista de mensagens (para rolar)
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- FUNÇÕES ---

    // Rola para a última mensagem
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Atualiza a rolagem sempre que uma nova mensagem é adicionada
    useEffect(scrollToBottom, [messages]);

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem('chat-input') as HTMLInputElement;
        const messageText = input.value.trim();

        if (messageText === '') return;

        // 1. Adiciona a mensagem do usuário
        setMessages((prev) => [...prev, { sender: 'user', text: messageText }]);
        setIsLoading(true);
        input.value = '';

        // 2. Envia para o n8n
        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    sessionId: sessionId.current,
                }),
            });

            if (!response.ok) throw new Error('Erro na resposta do n8n');

            const data = await response.json();
            
            // 3. Adiciona a resposta do bot
            if (data.reply) {
                setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
            } else {
                throw new Error('Resposta do bot mal formatada');
            }

        } catch (error) {
            console.error('Erro ao falar com o n8n:', error);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Desculpe, estou com problemas técnicos.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- EFEITO PARA OUVIR O EVENTO ---
    // Isto ouve um "aviso" de qualquer lugar do site para abrir o chat
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        
        window.addEventListener('open-ai-chat', handleOpenChat);
        
        // Limpa o listener quando o componente for desmontado
        return () => window.removeEventListener('open-ai-chat', handleOpenChat);
    }, []); // Roda apenas uma vez

    return (
        <div className={`chat-widget-container ${!isOpen ? 'hidden' : ''}`}>
            {/* Cabeçalho */}
            <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
                <span>Fale com nosso Agente de IA</span>
                <button className="minimize-chat-btn">{isOpen ? '_' : '+'}</button>
            </div>

            {/* Corpo (Mensagens) */}
            <div id="chat-body" className="chat-body">
                <div id="chat-messages" className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}-message`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message bot-message">
                            Digitando...
                        </div>
                    )}
                    {/* Elemento invisível para rolar até ele */}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input do Usuário */}
                <form id="chat-form" className="chat-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="chat-input"
                        name="chat-input" // Adicionado para o handleSubmit
                        className="chat-input"
                        placeholder="Digite sua mensagem..."
                        autoComplete="off"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}