"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, X } from "lucide-react";

export interface TicketData {
  adultPrice: string;
  kidPrice: string;
  message?: string;
}

export default function TicketSection({ data }: { data: TicketData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  // Function to ensure price has a single '$' symbol
  const formatPrice = (price: string) => {
    if (!price) return "";
    return price.replace(/^\$+/, '$');
  };

  return (
    <section id="ticket" className="w-full flex flex-col items-center justify-center text-center px-6 py-20 relative border-t border-white/10 min-h-[100dvh]">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 flex flex-col items-center"
        >
          {/* Nuevo ícono de tarjeta/ticket de gala */}
          <div className="relative inline-flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-[var(--gold)]">
              <rect width="20" height="14" x="2" y="5" rx="3" />
              <line x1="2" x2="22" y1="10" y2="10" />
              <circle cx="7" cy="15" r="1.5" fill="currentColor" />
            </svg>
          </div>
          
          <span className="tracking-[0.35em] text-[10px] font-bold uppercase text-[var(--gold)] mb-3 block">
            TARJETA
          </span>
          <h2 className="text-4xl md:text-5xl font-normal mb-4 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Valor de Tarjeta
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base text-[var(--text-muted)] mb-10 leading-relaxed max-w-[85%] mx-auto"
        >
          Para confirmar tu lugar, podés abonar tu tarjeta por transferencia o en efectivo.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => setIsModalOpen(true)}
          className="rounded-full py-3.5 px-8 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          <Ticket className="w-4 h-4" />
          Ver valor de tarjeta y formas de pago
        </motion.button>

      </div>

      {/* --- MODAL EMERGENTE --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#081B33] border border-white/15 rounded-3xl p-6 w-full max-w-sm relative text-left shadow-2xl"
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 mt-2 text-center">
                <h3 className="text-3xl text-[var(--gold)] font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Valor de Tarjeta
                </h3>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Precios por persona
                </p>
              </div>

              {/* Precios (Adultos / Menores) */}
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="flex flex-col p-5 rounded-2xl bg-black/30 border border-white/10 items-center justify-center text-center shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-2">Adultos</span>
                  <span className="text-2xl md:text-3xl text-white font-medium tracking-wide">{formatPrice(data.adultPrice)}</span>
                </div>
                {data.kidPrice && (
                  <div className="flex flex-col p-5 rounded-2xl bg-black/30 border border-white/10 items-center justify-center text-center shadow-inner">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] mb-2">Menores</span>
                    <span className="text-2xl md:text-3xl text-white font-medium tracking-wide">{formatPrice(data.kidPrice)}</span>
                  </div>
                )}
              </div>
              
              {/* Enlace a Datos Bancarios */}
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                  Pods transferir tu pago usando los datos bancarios en la sección de regalos.
                </p>
                <a 
                  href="#regalos"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full block text-center rounded-full py-3.5 px-6 bg-white/5 border border-[var(--gold)]/30 hover:bg-white/10 text-[var(--gold)] font-medium text-sm transition-colors active:scale-95"
                >
                  Ir a datos bancarios
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
