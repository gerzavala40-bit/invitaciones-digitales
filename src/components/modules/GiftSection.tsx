"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2, CreditCard, X } from "lucide-react";
import { AnimatedGiftIcon } from "@/components/ui/AnimatedIcons";

export interface BankDetails {
  bankName: string;
  accountHolder: string;
  cbu: string;
  alias: string;
}

export interface GiftData {
  message?: string;
  bankDetails?: BankDetails;
}

export default function GiftSection({ data }: { data: GiftData }) {
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(`¡${type} copiado!`);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <section id="regalos" className="w-full flex flex-col items-center justify-center text-center px-6 py-20 relative border-t border-white/10 min-h-[100dvh]">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 flex flex-col items-center"
        >
          <AnimatedGiftIcon className="w-9 h-9 text-[var(--gold)] mb-2" />
          <span className="tracking-[0.35em] text-xs uppercase text-[var(--gold)] mb-3">Presentes</span>
          <h2 className="text-4xl md:text-5xl font-normal mb-4 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Regalos
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base text-[var(--text-muted)] mb-10 leading-relaxed max-w-[85%] mx-auto"
        >
          {data.message || "Mi mayor regalo es que compartas esta noche conmigo. Pero si querés hacerme un presente, podés hacerlo por transferencia."}
        </motion.p>

        {data.bankDetails && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => setIsModalOpen(true)}
            className="rounded-full py-3.5 px-8 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Ver datos bancarios / Alias
          </motion.button>
        )}

      </div>

      {/* --- MODAL EMERGENTE --- */}
      <AnimatePresence>
        {isModalOpen && data.bankDetails && (
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

              <div className="mb-6 mt-2">
                <h3 className="text-2xl text-[var(--gold)] font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Datos para regalo
                </h3>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Transferencia bancaria / Mercado Pago
                </p>
              </div>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex flex-col">
                  <span className="text-[var(--text-muted)] text-xs mb-1">Entidad Bancaria</span>
                  <span className="text-white font-medium">{data.bankDetails.bankName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[var(--text-muted)] text-xs mb-1">Titular de la cuenta</span>
                  <span className="text-white font-medium">{data.bankDetails.accountHolder}</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Bloque Alias */}
                <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] mb-1">Alias</span>
                    <span className="font-mono text-sm text-white tracking-wide">{data.bankDetails.alias}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(data.bankDetails!.alias, 'Alias')}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[var(--gold)]/20 text-[var(--gold)] transition-colors active:scale-90 flex-shrink-0"
                    title="Copiar Alias"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Bloque CBU */}
                <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] mb-1">CBU / CVU</span>
                    <span className="font-mono text-sm text-white tracking-wide">{data.bankDetails.cbu}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(data.bankDetails!.cbu, 'CBU')}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[var(--gold)]/20 text-[var(--gold)] transition-colors active:scale-90 flex-shrink-0"
                    title="Copiar CBU"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-[var(--gold)] text-[#031326] px-6 py-3 rounded-full font-medium text-sm shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
