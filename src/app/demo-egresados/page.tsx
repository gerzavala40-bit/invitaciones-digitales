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

        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}} />

      <main className="min-h-[100dvh] bg-[#0a0a0a] text-white font-montserrat relative overflow-hidden flex flex-col items-center pb-12">
        
        {/* Fondo estático de brillos */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
          <img 
            src="/fondo_brillos_estatico.jpg" 
            alt="Fondo Brillos" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          {/* Overlay oscuro más fuerte para crear contraste y "cortar" el dorado */}
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Un degradado desde abajo hacia arriba en negro puro para asentar los botones */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center text-center">
          
          {/* Sello Circular de la Promo (Ahora en tonos blancos/plateados para contrastar) */}
          <div className="fade-in mb-8 relative mt-4 flex justify-center" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div className="w-40 h-40 rounded-full border border-white/30 p-1.5 shadow-[0_0_25px_rgba(255,255,255,0.1)] relative z-10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
              <div className="w-full h-full rounded-full border-[1px] border-dashed border-white/40 flex flex-col items-center justify-center pt-2">
                <span className="font-montserrat text-[0.65rem] tracking-[0.3em] text-gray-300 uppercase mb-1">Promo</span>
                <span className="font-cinzel text-4xl text-white font-bold leading-none mb-1 drop-shadow-md">2026</span>
                <span className="font-cinzel text-xl text-white font-bold tracking-widest">5°C</span>
              </div>
            </div>
          </div>

          <div className="fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-none whitespace-nowrap tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              MI RECEPCIÓN
            </h1>
          </div>

          {/* Línea divisoria */}
          <div className="w-16 h-[1px] bg-white/30 my-8 fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}></div>

          {/* Contador en Vivo (Único elemento dorado para destacarlo) */}
          <div className="fade-in w-full mb-10" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <p className="text-xs tracking-[0.2em] text-gray-400 mb-4 uppercase">Faltan</p>
            <div className="flex justify-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center justify-center bg-black/60 border border-white/10 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.days}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Días</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/60 border border-white/10 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.hours}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Hs</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/60 border border-white/10 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.minutes}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Min</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/60 border border-white/10 rounded-lg w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] backdrop-blur-md">
                <span className="font-cinzel gold-gradient-text text-2xl sm:text-3xl font-bold">{timeLeft.seconds}</span>
                <span className="text-[0.55rem] sm:text-xs text-gray-400 uppercase tracking-widest">Seg</span>
              </div>
            </div>
          </div>

          <div className="fade-in w-full" style={{ animationDelay: '0.6s', opacity: 0 }}>
            
            {/* Cajas de Información de Fecha y Hora (Blancas, Simples y Centradas) */}
            <div className="flex flex-col gap-4 w-full mb-8">
              
              {/* Botón de Fecha */}
              <div className="relative bg-black/50 border border-white/20 rounded-xl px-4 py-4 backdrop-blur-md flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-full animate-shimmer"></div>
                <div className="flex items-center gap-3 relative z-10 w-full justify-center">
                  <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-cinzel text-white text-lg md:text-xl font-bold tracking-widest whitespace-nowrap flex items-center gap-2">
                    15 DICIEMBRE <span className="text-white/40 text-sm font-montserrat">|</span> <span className="text-white/80 font-montserrat font-light text-sm">SÁBADO</span>
                  </p>
                </div>
              </div>

              {/* Botón de Hora */}
              <div className="relative bg-black/50 border border-white/20 rounded-xl px-4 py-4 backdrop-blur-md flex items-center justify-center overflow-hidden group" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-full animate-shimmer" style={{ animationDelay: '1.5s' }}></div>
                <div className="flex items-center gap-3 relative z-10 w-full justify-center">
                  <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-cinzel text-white text-lg md:text-xl font-bold tracking-widest whitespace-nowrap flex items-center gap-2">
                    22:00 HS <span className="text-white/40 text-sm font-montserrat">|</span> <span className="text-white/80 font-montserrat font-light text-sm">NOCHE</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Ubicación */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md mb-8">
              <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-cinzel text-xl text-white font-bold mb-1 tracking-wide">Salón Las Palmas</h3>
              <p className="text-sm text-gray-300">Av. Costanera 1234, Ciudad</p>
            </div>

            {/* Dress Code */}
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-gray-400 mb-2 uppercase">Dress Code</p>
              <p className="font-cinzel text-xl text-white tracking-widest">GALA / ELEGANTE</p>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-4 w-full">
              {/* Confirmar Asistencia se mantiene dorado para resaltar la acción principal */}
              <button className="w-full gold-gradient-bg text-black font-bold tracking-widest uppercase py-4 rounded-full shadow-[0_0_20px_rgba(191,149,63,0.3)] transition-transform hover:scale-105 active:scale-95">
                Confirmar Asistencia
              </button>
              {/* Botón secundario en blanco */}
              <button className="w-full bg-transparent border border-white/50 text-white font-bold tracking-widest uppercase py-4 rounded-full transition-transform hover:scale-105 active:scale-95">
                Ver Mapa
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
