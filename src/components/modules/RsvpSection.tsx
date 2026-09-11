"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface RsvpData {
  phone?: string;
  deadline?: string;
  message?: string;
}

export default function RsvpSection({ data }: { data: RsvpData }) {
  const [attendance, setAttendance] = useState<'yes' | 'no' | null>(null);
  const [adultsCount, setAdultsCount] = useState("1");
  const [kidsCount, setKidsCount] = useState("0");
  const [guestNames, setGuestNames] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attendance === null) return;

    let whatsappMessage = "";
    if (attendance === 'yes') {
      whatsappMessage = `Hola! Confirmo asistencia para: ${guestNames} - ${adultsCount} Adultos y ${kidsCount} Niños.`;
      if (dietaryRestrictions.trim()) {
        whatsappMessage += ` Menú: ${dietaryRestrictions}`;
      }
    } else {
      whatsappMessage = `Hola! Lamentablemente no podremos asistir. ¡Que tengas una noche hermosa!`;
    }

    const whatsappUrl = `https://wa.me/${data.phone || '5493425299942'}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 py-12 relative border-t border-white/10">
      
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[#031326] px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg z-[150] whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4" /> Redirigiendo a WhatsApp...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--gold)] mb-4 flex justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><polyline points="15,9 18,9 22,15"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3h-11A2.5 2.5 0 0 0 4 5.5v4"/></svg>
          </motion.div>
          <span className="tracking-[0.35em] text-[10px] font-bold uppercase text-[var(--gold)] mb-3 block">RSVP</span>
          <h2 className="text-4xl md:text-5xl font-normal mb-2 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Confirmar
          </h2>
          {data.deadline && (
             <p className="text-[var(--gold)] italic text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
               Antes del {new Date(data.deadline).toLocaleDateString('es-AR')}
             </p>
          )}
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-[#0A223D]/70 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-white/10 w-full text-left"
        >
          
          <div className="flex flex-col gap-3">
            <label className="block text-xs uppercase tracking-widest text-[var(--text-main)] text-center mb-1">¿Confirmás tu presencia?</label>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setAttendance('yes')}
                className={`w-full py-3.5 px-4 rounded-full font-medium text-sm transition-all border ${attendance === 'yes' ? 'bg-[var(--gold)] text-[#031326] border-[var(--gold)] shadow-md' : 'bg-transparent text-[var(--text-main)] border-white/20 hover:border-[var(--gold)]/50'}`}
              >
                ¡Sí, confirmo!
              </button>
              <button
                type="button"
                onClick={() => setAttendance('no')}
                className={`w-full py-3.5 px-4 rounded-full font-medium text-sm transition-all border ${attendance === 'no' ? 'bg-[var(--text-muted)] text-[#031326] border-[var(--text-muted)] shadow-md' : 'bg-transparent text-[var(--text-main)] border-white/20 hover:border-white/50'}`}
              >
                No podré asistir
              </button>
            </div>
          </div>

          <AnimatePresence>
            {attendance !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden flex flex-col gap-5 pt-2"
              >
                {attendance === 'yes' && (
                  <>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Adultos</label>
                        <select 
                          value={adultsCount}
                          onChange={(e) => setAdultsCount(e.target.value)}
                          className="w-full bg-[#031326] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors shadow-inner font-sans text-sm appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Niños</label>
                        <select 
                          value={kidsCount}
                          onChange={(e) => setKidsCount(e.target.value)}
                          className="w-full bg-[#031326] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors shadow-inner font-sans text-sm appearance-none"
                        >
                          {[0, 1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Grupo Familiar / Acompañantes</label>
                      <input 
                        type="text" 
                        required
                        value={guestNames}
                        onChange={(e) => setGuestNames(e.target.value)}
                        className="w-full bg-[#031326] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors placeholder:text-slate-500 shadow-inner font-sans text-sm"
                        placeholder="Ej: Juan, Laura y Mateo"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Menú Especial</label>
                      <input 
                        type="text" 
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                        className="w-full bg-[#031326] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors placeholder:text-slate-500 shadow-inner font-sans text-sm"
                        placeholder="¿Alguna restricción alimentaria? (Opcional)"
                      />
                    </div>
                  </>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-semibold py-4 px-6 rounded-full uppercase tracking-widest text-xs transition-transform shadow-md active:scale-95 mt-2"
                >
                  Enviar Confirmación
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.form>
      </div>
    </section>
  );
}
