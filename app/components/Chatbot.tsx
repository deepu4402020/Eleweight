'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Sparkles, Minus } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to Eleweight Intelligence. How can I assist your training today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: "I've logged your query. Our training algorithms suggest focusing on high-intensity compound movements for optimal growth. Would you like to view our current push-day protocols?",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl z-50 border border-white/10 hover:scale-105 active:scale-95 transition-all"
        id="chatbot-trigger"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-[380px] h-[550px] bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] flex flex-col z-50 border border-[var(--border)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold tracking-tight">Eleweight Bot</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">System Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAFAFA]" style={{ scrollbarWidth: 'none' }}>
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-tr-none'
                      : 'bg-white border border-[var(--border)] text-black rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[var(--border)] p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
                    <div className="w-1 h-1 bg-black/20 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-black/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-black/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-[var(--border)]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask intelligence..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-[#F4F4F4] border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-1 focus:ring-black/10 outline-none"
                />
                <User className="absolute left-4 w-4 h-4 text-black/20" />
                <button
                  onClick={handleSend}
                  className="absolute right-2 w-8 h-8 bg-black text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-center text-[9px] text-black/20 uppercase font-bold tracking-widest mt-4">
                Powered by Eleweight Archives
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
