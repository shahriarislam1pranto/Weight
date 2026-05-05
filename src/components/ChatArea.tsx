import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Info, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';

interface ChatAreaProps {
  language: 'en' | 'bn';
}

const ChatArea: React.FC<ChatAreaProps> = ({ language }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t('welcome'), timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update welcome message if language changes and it's the only message
  useEffect(() => {
    const welcomeText = t('welcome');
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'model' && prev[0].text !== welcomeText) {
        return [{ role: 'model', text: welcomeText, timestamp: Date.now() }];
      }
      return prev;
    });
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: Date.now() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(newMessages, language);
    setMessages([...newMessages, { role: 'model', text: response, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pt-6 pb-24 space-y-8 no-scrollbar">
        {messages.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
              message.role === 'user' ? 'bg-white/10 text-white' : 'bg-emerald-accent text-dark-bg'
            }`}>
              {message.role === 'user' ? <User className="w-4 h-4" /> : <span className="text-xs font-bold font-serif">ن</span>}
            </div>
            
            <div className={`flex flex-col gap-2 max-w-[85%] ${message.role === 'user' ? 'items-end' : ''}`}>
              <div className={`p-4 rounded-2xl backdrop-blur-md border ${
                message.role === 'user' 
                ? 'bg-white/10 border-white/5 rounded-tr-none' 
                : 'bg-white/5 border-emerald-accent/20 rounded-tl-none'
              }`}>
                {message.role === 'model' && (
                  <div className="flex justify-between items-start mb-2 group">
                    <span className="text-[9px] font-bold text-emerald-accent tracking-widest uppercase">Scholar Assistant</span>
                    <div className="flex gap-2">
                       <button className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 rounded-md text-[8px] text-white/40 uppercase tracking-tighter">Cite</button>
                    </div>
                  </div>
                )}
                <div className="markdown-body prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
              
              {message.role === 'model' && i > 0 && (
                <div className="flex items-center gap-4 px-2 opacity-30 hover:opacity-100 transition-opacity">
                  <button className="text-white hover:text-emerald-accent transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button className="text-white hover:text-red-400 transition-colors">
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-accent flex items-center justify-center">
              <span className="text-xs font-bold text-dark-bg">ن</span>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-emerald-accent" />
              <span className="text-[10px] font-bold text-emerald-accent uppercase tracking-widest animate-pulse">Authenticating Sources...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="h-24 p-6 bg-white/5 backdrop-blur-xl border-t border-white/10 absolute bottom-0 inset-x-0 z-20">
        <form 
          onSubmit={handleSend}
          className="max-w-4xl mx-auto flex gap-4 h-full items-center"
        >
          <div className="flex-1 bg-black/20 rounded-2xl border border-white/10 px-4 flex items-center relative h-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('askPlaceholder')}
              className="w-full bg-transparent py-4 focus:outline-none text-white placeholder:text-white/20 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-full px-8 bg-emerald-accent text-dark-bg rounded-2xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/40 font-bold text-sm"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
