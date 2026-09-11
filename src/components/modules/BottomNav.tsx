"use client";

import { Home, MapPin, Gift, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav after scrolling past the first 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] px-4 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <nav className="flex justify-between items-center bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <a 
          href="#inicio" 
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-[var(--accent)] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest">Inicio</span>
        </a>
        <a 
          href="#ubicacion" 
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-[var(--accent)] transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest">Lugar</span>
        </a>
        <a 
          href="#regalos" 
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-[var(--accent)] transition-colors"
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest">Regalo</span>
        </a>
        <a 
          href="#asistencia" 
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-[var(--accent)] transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest">Confirmar</span>
        </a>
      </nav>
    </div>
  );
}
