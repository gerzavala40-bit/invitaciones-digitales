"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, CheckCircle2 } from "lucide-react";

export interface GuestMessage {
  name: string;
  date: string;
  text: string;
}

export interface GuestbookData {
  title?: string;
  subtitle?: string;
  messages: GuestMessage[];
}

export default function GuestbookSection({ data }: { data: GuestbookData }) {
  const [messages, setMessages] = useState<GuestMessage[]>(data?.messages || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newEntry: GuestMessage = {
      name: newName,
      date: "Recién",
      text: newMessage,
    };

    setMessages([newEntry, ...messages]);
    setNewName("");
    setNewMessage("");
    setIsFormOpen(false);
    
    // Mostrar feedback visual
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 py-12 relative border-t border-white/10">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center relative">
        
        {/* Toast de confirmación */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[#031326] px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg z-50 whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4" /> Mensaje enviado
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-6 flex flex-col items-center"
        >
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--gold)] mb-4 flex justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          </motion.div>
          <span className="tracking-[0.35em] text-[10px] font-bold uppercase text-[var(--gold)] mb-3 block">Firmas</span>
          <h2 className="text-4xl md:text-5xl font-normal mb-2 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.title || 'Libro de Firmas'}
          </h2>
          <p className="text-[var(--gold)] italic text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.subtitle || 'Tus Deseos'}
          </p>
        </motion.div>

        {/* Messages Container (Scroll limitado) */}
        <div 
          className="w-full max-h-[320px] overflow-y-auto overscroll-contain pr-2 mb-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full text-left"
            style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
          >
            <div className="flex flex-col pb-8 pt-2">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={`${msg.name}-${idx}`}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[var(--text-main)] tracking-wide">{msg.name}</span>
                      <span className="text-xs text-[var(--text-muted)] tracking-widest uppercase">{msg.date}</span>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {msg.text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Add Message Button / Form */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isFormOpen ? (
                <motion.button
                  key="open-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFormOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-semibold text-sm transition-transform active:scale-95 shadow-md"
                >
                  <MessageSquare className="w-5 h-5" /> Dejar un mensaje a Vale
                </motion.button>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-3 overflow-hidden text-left bg-[#0A223D]/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl"
                >
                  <input 
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#031326]/50 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors placeholder:text-slate-500 shadow-inner font-sans text-sm"
                  />
                  <textarea 
                    required
                    placeholder="Escribí tus deseos..."
                    rows={3}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-[#031326]/50 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors placeholder:text-slate-500 shadow-inner font-sans text-sm resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-[var(--gold)] text-[var(--gold)] px-4 py-3 rounded-full font-medium tracking-wide text-sm transition-colors hover:bg-[var(--gold)]/10"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-[var(--gold)] text-[#031326] px-4 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-transform shadow-md active:scale-95"
                    >
                      <Send className="w-4 h-4" /> Enviar
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
      </div>
    </section>
  );
}
