"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AnimatedCrownIcon } from "@/components/ui/AnimatedIcons";

export interface HeaderData {
  title: string;
  subtitle?: string;
  date: string;
  hashtag?: string;
  heroImage?: string;
  backgroundMusic?: string;
  emotionalPhrase?: string;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center gap-4 text-center mt-4">
      {Object.entries(timeLeft).map(([unit, value]) => {
        const displayValue = unit === 'days' ? value : String(value).padStart(2, '0');
        return (
          <div key={unit} className="flex flex-col items-center">
            <div className="w-14 h-14 bg-[#031326]/70 backdrop-blur-md border border-[var(--gold)]/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(212,201,189,0.15)] mb-2">
              <span className="text-xl font-bold text-[var(--gold)] font-sans">{displayValue}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]/80">
              {unit === 'days' ? 'Das' : unit === 'hours' ? 'Hs' : unit === 'minutes' ? 'Min' : 'Seg'}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function HeaderHero({ data }: { data: HeaderData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current && data.backgroundMusic) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio play blocked", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      
      {/* Audio Element */}
      {data.backgroundMusic && (
        <audio ref={audioRef} src={data.backgroundMusic} loop preload="none" />
      )}

      {/* --- SPLASH SCREEN OVERLAY --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[100] h-[100dvh] w-full flex flex-col items-center justify-center bg-[#031326] text-[var(--text-main)] overflow-hidden"
          >
            {/* Video de Fondo exclusivo del Splash */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
            >
              <source src="/assets/videos/fondo-15-anos.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-0 bg-[#031326]/40"></div>
            
            <div className="z-10 flex flex-col items-center text-center px-4 w-full max-w-sm">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                transition={{ 
                  scale: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 1.2, ease: "easeOut" },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 } 
                }}
                className="mb-4 relative flex justify-center"
              >
                <img 
                  src="/assets/images/corona.png" 
                  alt="Corona 15 años" 
                  className="w-48 h-auto object-contain drop-shadow-[0_0_25px_rgba(212,201,189,0.5)]"
                />
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl md:text-3xl font-light tracking-[0.2em] text-[var(--gold)] uppercase mb-3 font-sans"
              >
                Mis XV Años
              </motion.h2>

              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl md:text-7xl text-white mb-12 drop-shadow-lg font-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.subtitle || 'Valeria'}
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                onClick={handleOpen}
                className="relative overflow-hidden group w-full py-4 px-8 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(212,201,189,0.3)] transition-all active:scale-95"
              >
                <span className="relative z-10">Abrir Invitacin</span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- HERO CONTENT (UNDERNEATH) --- */}
      {data.heroImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${data.heroImage}')` }}
          />
          <div className="absolute inset-0 z-0 bg-black/70" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent" />
        </>
      )}

      {/* Music Toggle Button (Global Floating) */}
      {data.backgroundMusic && isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-[#031326]/80 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center shadow-lg transition-transform active:scale-95"
          aria-label="Toggle music"
        >
          {isPlaying ? (
            <div className="flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 3 20 12 6 21 6 3"/>
              </svg>
            </div>
          )}
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-[100dvh] py-6 px-4 text-center text-white">
        
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <AnimatedCrownIcon className="w-10 h-10 text-[var(--gold)]" />
            <p className="tracking-[0.35em] text-xs uppercase text-[var(--gold)] font-medium mb-1">
              MIS XV
            </p>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="text-7xl font-bold mb-3 text-white drop-shadow-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {data.subtitle}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-[#031326]/80 backdrop-blur-md border border-[var(--gold)]/30 rounded-2xl px-5 py-2 my-2 shadow-xl flex flex-col items-center"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-medium">
              {new Date(data.date).toLocaleDateString('es-AR', { weekday: 'long' })} · {new Date(data.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(' p. m.', '').replace(' a. m.', '').replace(' pm', '').replace(' am', '').trim()} hs
            </span>
            <div className="flex items-center gap-3 my-1">
              <span className="h-px w-8 bg-[var(--gold)]/40"></span>
              <span className="text-4xl md:text-5xl font-bold text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                {new Date(data.date).toLocaleDateString('es-AR', { day: 'numeric' })}
              </span>
              <span className="h-px w-8 bg-[var(--gold)]/40"></span>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-300 font-light">
              {new Date(data.date).toLocaleDateString('es-AR', { month: 'long' })} · {new Date(data.date).toLocaleDateString('es-AR', { year: 'numeric' })}
            </span>
          </motion.div>
        </div>

        {/* --- COUNTDOWN TIMER --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mb-4 w-full"
        >
          <CountdownTimer targetDate={data.date} />
        </motion.div>
        
        {/* Scroll indicator (absolute bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[var(--text-muted)] text-[10px] uppercase tracking-widest gap-1"
        >
          Deslizá
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/>
            <path d="m19 12-7 7-7-7"/>
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
