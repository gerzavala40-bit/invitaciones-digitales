"use client";
import React, { useState, useEffect } from 'react';

export default function RecepcionEgresados() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Fecha objetivo: 15 de diciembre de 2026 a las 22:00
    const targetDate = new Date("2026-12-15T22:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        
        .gold-gradient-text {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .gold-gradient-bg {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        /* Nuevas animaciones para los botones de fecha/hora */
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
        
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(191,149,63,0.3); box-shadow: 0 0 0 rgba(191,149,63,0); }
          50% { border-color: rgba(191,149,63,0.8); box-shadow: 0 0 15px rgba(191,149,63,0.3); }
        }
        .animate-pulse-border {
          animation: pulseBorder 2.5s infinite;
        }
      `}} />

      <main className="min-h-[100dvh] bg-[#0a0a0a] text-white font-montserrat relative overflow-hidden flex flex-col items-center pb-12">
        
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70" src="/brillo.mp4"></video>
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center text-center">
          
          {/* Sello Circular de la Promo */}
          <div className="fade-in mb-8 relative mt-4 flex justify-center" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div className="w-40 h-40 rounded-full border border-[#BF953F] p-1.5 shadow-[0_0_25px_rgba(191,149,63,0.3)] relative z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
              <div className="w-full h-full rounded-full border-[1.5px] border-dashed border-[#BF953F]/70 flex flex-col items-center justify-center pt-2">
                <span className="font-montserrat text-[0.65rem] tracking-[0.3em] text-gray-300 uppercase mb-1">Promo</span>
                <span className="font-cinzel text-4xl gold-gradient-text font-bold leading-none mb-1">2026</span>
                <span className="font-cinzel text-xl gold-gradient-text font-bold tracking-widest">5°C</span>
              </div>
            </div>
            {/* Resplandor trasero */}
            <div className="absolute inset-0 bg-[#BF953F] blur-2xl opacity-20 -z-10 rounded-full scale-110"></div>
          </div>

          <div className="fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl gold-gradient-text font-bold leading-none whitespace-nowrap">
              MI RECEPCIÓN
            </h1>
          </div>

          <div className="w-16 h-[1px] gold-gradient-bg my-8 fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}></div>

          {/* Contador en Vivo */}
          <div className="fade-in w-full mb-10" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <p className="text-xs tracking-[0.2em] text-gray-400 mb-4 uppercase">Faltan</p>
            <div className="flex justify-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center justify-center bg-black/40 border border-[#BF953F]/30 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.days}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Días</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/40 border border-[#BF953F]/30 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.hours}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Hs</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/40 border border-[#BF953F]/30 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.minutes}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Min</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/40 border border-[#BF953F]/30 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.seconds}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Seg</span>
              </div>
            </div>
          </div>

          <div className="fade-in w-full" style={{ animationDelay: '0.6s', opacity: 0 }}>
            
            {/* Cajas de Información de Fecha y Hora (Nuevo Diseño en 1 línea) */}
            <div className="flex flex-col gap-4 w-full mb-8">
              
              {/* Botón de Fecha */}
              <div className="relative animate-pulse-border bg-black/40 border border-[#BF953F]/40 rounded-xl px-4 py-5 backdrop-blur-md flex items-center justify-between overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full animate-shimmer"></div>
                
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="p-2 bg-[#BF953F]/10 rounded-full border border-[#BF953F]/30 shadow-[0_0_10px_rgba(191,149,63,0.2)]">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#BF953F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-cinzel gold-gradient-text text-base sm:text-lg md:text-xl font-bold tracking-widest whitespace-nowrap">
                    15 DICIEMBRE
                  </p>
                </div>
                <div className="relative z-10 font-montserrat text-xs sm:text-sm text-gray-300 tracking-widest uppercase border-l border-[#BF953F]/30 pl-2 sm:pl-4 whitespace-nowrap">
                  Sábado
                </div>
              </div>

              {/* Botón de Hora */}
              <div className="relative animate-pulse-border bg-black/40 border border-[#BF953F]/40 rounded-xl px-4 py-5 backdrop-blur-md flex items-center justify-between overflow-hidden group" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full animate-shimmer" style={{ animationDelay: '1.5s' }}></div>
                
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="p-2 bg-[#BF953F]/10 rounded-full border border-[#BF953F]/30 shadow-[0_0_10px_rgba(191,149,63,0.2)]">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#BF953F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-cinzel gold-gradient-text text-base sm:text-lg md:text-xl font-bold tracking-widest whitespace-nowrap">
                    22:00 HS
                  </p>
                </div>
                <div className="relative z-10 font-montserrat text-xs sm:text-sm text-gray-300 tracking-widest uppercase border-l border-[#BF953F]/30 pl-2 sm:pl-4 whitespace-nowrap">
                  Noche
                </div>
              </div>

            </div>

            {/* Ubicación */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md mb-8">
              <svg className="w-8 h-8 text-[#BF953F] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-cinzel text-xl gold-gradient-text font-bold mb-1">Salón Las Palmas</h3>
              <p className="text-sm text-gray-300">Av. Costanera 1234, Ciudad</p>
            </div>

            {/* Dress Code */}
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-gray-400 mb-2 uppercase">Dress Code</p>
              <p className="font-cinzel text-xl gold-gradient-text tracking-widest">GALA / ELEGANTE</p>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-4 w-full">
              <button className="w-full gold-gradient-bg text-black font-bold tracking-widest uppercase py-4 rounded-full shadow-[0_0_20px_rgba(191,149,63,0.3)] transition-transform hover:scale-105 active:scale-95">
                Confirmar Asistencia
              </button>
              <button className="w-full bg-transparent border border-[#BF953F] gold-gradient-text font-bold tracking-widest uppercase py-4 rounded-full transition-transform hover:scale-105 active:scale-95">
                Ver Mapa
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

