
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import { TangPhase, IdentityConfig, PhaseConfig, ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface SidebarProps {
  phase: PhaseConfig;
  identity: IdentityConfig;
}

const Sidebar: React.FC<SidebarProps> = ({ phase, identity }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: identity.greeting }]);
  }, [identity, phase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getGeminiResponse(phase, identity, [...messages, userMsg], input);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div 
      className="w-full md:w-96 h-full flex flex-col border-r shadow-2xl transition-all duration-500 overflow-hidden z-20"
      style={{ 
        backgroundColor: phase.colorBg, 
        borderColor: 'rgba(139, 69, 19, 0.1)', 
        color: '#3d2b1f' 
      }}
    >
      <div className="p-8 border-b border-black/5">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl shadow-lg border-2" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: identity.accentColor }}>
            <Sparkles size={28} style={{ color: identity.accentColor }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-widest">{identity.persona}</h2>
            <p className="text-xs opacity-50 uppercase tracking-tighter">Identity: {identity.id}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-8 custom-scrollbar" ref={scrollRef}>
        <div className="flex items-center gap-2 mb-4 opacity-40 italic text-xs uppercase tracking-[0.3em]">
          <MessageCircle size={14} />
          <span>正在与 {identity.title} 同步灵识</span>
        </div>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[90%] p-6 rounded-3xl border shadow-lg break-words whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user' ? 'rounded-br-none bg-white/60 border-black/5' : 'rounded-bl-none border-current bg-white/40'
              }`}
              style={{ 
                borderColor: msg.role === 'model' ? identity.accentColor + '40' : '',
                color: '#3d2b1f'
              }}
            >
              <p className="text-lg font-medium">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="animate-pulse flex space-x-2 p-4">
              <div className="h-3 w-3 bg-current rounded-full" style={{ color: identity.accentColor }}></div>
              <div className="h-3 w-3 bg-current rounded-full" style={{ color: identity.accentColor }}></div>
              <div className="h-3 w-3 bg-current rounded-full" style={{ color: identity.accentColor }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-black/5 bg-black/5">
        <div className="flex gap-4">
          <input 
            type="text" 
            className="flex-1 bg-white/50 border-2 p-4 rounded-2xl outline-none text-lg placeholder:opacity-30 border-black/5 focus:border-current"
            style={{ borderColor: identity.accentColor + '30' }}
            placeholder="轻启朱唇，语出惊人..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="p-4 rounded-2xl transition-all disabled:opacity-20 active:scale-95 shadow-xl hover:brightness-110"
            style={{ backgroundColor: identity.accentColor, color: '#fff' }}
            disabled={loading || !input.trim()}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
