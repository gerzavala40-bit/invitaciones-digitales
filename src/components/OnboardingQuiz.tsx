"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "EVENT" | "VIBE" | "RESULT";

export default function OnboardingQuiz({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: (styleTitle: string) => void }) {
  const [step, setStep] = useState<Step>("EVENT");
  const [event, setEvent] = useState("");
  const [vibe, setVibe] = useState("");

  if (!isOpen) return null;

  const handleEventSelect = (e: string) => {
    setEvent(e);
    setStep("VIBE");
  };

  const handleVibeSelect = (v: string) => {
    setVibe(v);
    
    // Logic to select the best style
    let recommendedStyle = "Floral Claro"; // default
    if (event === "Boda") {
      if (v === "Elegante") recommendedStyle = "Elegante Oscuro";
      if (v === "Romántico") recommendedStyle = "Floral Claro";
      if (v === "Boho") recommendedStyle = "Boda Boho / Canva";
    } else if (event === "15 Años") {
      recommendedStyle = "15 Años Glam";
    } else if (event === "Bautismo / Baby Shower") {
      recommendedStyle = v === "Tierno" ? "Bautismo Tierno" : "Baby Shower";
    } else {
      recommendedStyle = "Minimalista";
    }

    setStep("RESULT");
    
    // Auto complete after short delay to show result
    setTimeout(() => {
      onComplete(recommendedStyle);
      // Reset after closing
      setTimeout(() => setStep("EVENT"), 500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 border-b border-ink-100 flex justify-between items-center bg-ink-50">
          <span className="text-sm font-semibold tracking-widest text-ink-500 uppercase">
            {step === "EVENT" ? "Paso 1 de 2" : step === "VIBE" ? "Paso 2 de 2" : "¡Listo!"}
          </span>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-900 transition">✕</button>
        </div>

        <div className="flex-1 p-8 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {step === "EVENT" && (
              <motion.div 
                key="event"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h3 className="font-display text-3xl text-ink-900 mb-6 text-center">¿Para qué tipo de evento es?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["Boda", "15 Años", "Bautismo / Baby Shower", "Cumpleaños"].map(e => (
                    <button key={e} onClick={() => handleEventSelect(e)} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 hover:bg-terracotta-50 text-ink-800 font-semibold transition text-lg">
                      {e}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "VIBE" && (
              <motion.div 
                key="vibe"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h3 className="font-display text-3xl text-ink-900 mb-6 text-center">¿Qué estilo te gusta más?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {event === "Boda" ? (
                    <>
                      <button onClick={() => handleVibeSelect("Elegante")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg">Elegante / Noche</button>
                      <button onClick={() => handleVibeSelect("Romántico")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg">Romántico / Floral</button>
                      <button onClick={() => handleVibeSelect("Boho")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg col-span-2">Boho Chic / Tonos Crema</button>
                    </>
                  ) : event === "Bautismo / Baby Shower" ? (
                    <>
                      <button onClick={() => handleVibeSelect("Tierno")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg">Tierno (Celeste)</button>
                      <button onClick={() => handleVibeSelect("Dulce")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg">Baby Shower (Verde)</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleVibeSelect("Moderno")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg">Moderno / Minimalista</button>
                      <button onClick={() => handleVibeSelect("Glam")} className="h-16 rounded-2xl border-2 border-ink-100 bg-white hover:border-terracotta-400 text-ink-800 font-semibold transition text-lg">Glam / Brillante</button>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {step === "RESULT" && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">✨</div>
                <h3 className="font-display text-3xl text-ink-900 mb-2">¡Encontramos tu estilo ideal!</h3>
                <p className="text-ink-500 text-lg">Preparando tu diseño personalizado...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
