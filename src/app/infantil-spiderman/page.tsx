import React from 'react';

export default function SpidermanInvitation() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
        
        .font-comic { 
          font-family: 'Bangers', cursive; 
          letter-spacing: 2px; 
        }
        
        .text-stroke {
          -webkit-text-stroke: 1.5px #1a1a1a;
          text-shadow: 3px 3px 0px rgba(0,0,0,0.4);
        }
        
        @keyframes swing {
          0% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }
        .animate-swing {
          animation: swing 3.5s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
      `}} />

      <main className="min-h-[100dvh] relative overflow-hidden bg-[#0A1128] text-white flex flex-col items-center justify-between py-10" style={{
        backgroundImage: "url('/assets/images/infantil/spiderman_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        
        {/* Overlay para oscurecer el fondo si hace falta, aunque la textura generada ya es oscura */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        {/* Textos Principales Arriba */}
        <div className="z-10 text-center mt-4">
          <h2 className="font-comic text-2xl text-white transform -rotate-2">¡VENÍ A FESTEJAR!</h2>
          <h1 className="font-comic text-7xl text-white text-stroke leading-none mt-2">
            ALEX
          </h1>
          <div className="bg-white text-red-600 font-comic text-4xl px-6 py-1 inline-block border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transform rotate-2 -mt-2">
            5 AÑOS
          </div>
        </div>

        {/* Zona de Animación Central (Spider-Man pendulante) */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-10">
          
          {/* Hilo de la telaraña (se estira hacia arriba) */}
          <div className="w-1 h-32 bg-white/80 absolute -top-10 shadow-[0_0_5px_white]"></div>
          
          {/* Contenedor oscilante */}
          <div className="animate-swing relative mt-8 z-20">
            {/* Como no tenemos el PNG sin fondo, dibujamos una máscara o emoji gigante que represente a Spidey */}
            <div className="w-48 h-48 bg-red-600 border-[5px] border-[#1a1a1a] rounded-full overflow-hidden relative shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
               {/* Patrón de telaraña falso en CSS */}
               <div className="absolute inset-0 opacity-20" style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #1a1a1a 10px, #1a1a1a 12px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #1a1a1a 10px, #1a1a1a 12px)'
               }}></div>
               
               {/* Ojos de Spiderman (al revés porque está colgando de cabeza) */}
               {/* Ojo Izquierdo */}
               <div className="absolute bottom-8 left-4 w-16 h-12 bg-white border-[4px] border-black rounded-bl-full rounded-br-full rounded-tl-3xl transform -rotate-12 flex items-center justify-center overflow-hidden">
                 <div className="w-14 h-10 bg-white rounded-full translate-y-1"></div>
               </div>
               
               {/* Ojo Derecho */}
               <div className="absolute bottom-8 right-4 w-16 h-12 bg-white border-[4px] border-black rounded-br-full rounded-bl-full rounded-tr-3xl transform rotate-12 flex items-center justify-center overflow-hidden">
                 <div className="w-14 h-10 bg-white rounded-full translate-y-1"></div>
               </div>
            </div>
            
            {/* Pequeño detalle de las manos agarrando el hilo */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 flex gap-2">
               <div className="w-5 h-5 bg-blue-700 border-[2px] border-black rounded-full"></div>
               <div className="w-5 h-5 bg-blue-700 border-[2px] border-black rounded-full"></div>
            </div>
          </div>

          {/* Fecha y Hora (Badges) flotantes a los costados */}
          {/* Izquierda: Fecha */}
          <div className="absolute top-[10%] left-6 animate-pulse-scale">
            <div className="w-24 h-24 flex flex-col items-center justify-center text-center bg-[#0058a8] text-white rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(0,0,0,0.5)]">
               <span className="font-comic text-4xl leading-none mt-1">18</span>
               <span className="font-comic text-sm">ENERO</span>
            </div>
            {/* Detalle de red detrás */}
            <div className="absolute inset-0 border-[2px] border-white/20 rounded-full scale-110 -z-10"></div>
          </div>
          
          {/* Derecha: Hora */}
          <div className="absolute top-[30%] right-6 animate-pulse-scale" style={{ animationDelay: '1s' }}>
            <div className="w-24 h-24 flex flex-col items-center justify-center text-center bg-[#E63946] text-white rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(0,0,0,0.5)]">
               <span className="font-comic text-4xl leading-none mt-1">19</span>
               <span className="font-comic text-sm">HORAS</span>
            </div>
            <div className="absolute inset-0 border-[2px] border-white/20 rounded-full scale-110 -z-10"></div>
          </div>
        </div>

        {/* Footer Text & Botones Interactivos (La magia web) */}
        <div className="z-10 w-full px-6 flex flex-col items-center text-center gap-5">
          <p className="font-comic text-2xl text-stroke tracking-wider text-yellow-300 transform -rotate-1">
            ¡NO PODÉS FALTAR!
          </p>
          
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-4 rounded-xl border-[2px] border-[#4ECDC4] w-full max-w-sm shadow-lg text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold text-[#FFF9E0] uppercase tracking-wide text-sm">Espacio Alegria</p>
                <p className="text-xs text-gray-300 mt-1">Rua da alegria, 123, Centro</p>
              </div>
            </div>
          </div>

          {/* Botones de acción (que no existen en un video MP4) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <button className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-xl border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] active:translate-y-1 active:shadow-[1px_1px_0px_#1a1a1a] transition-all text-sm uppercase flex items-center justify-center gap-2">
              <span>💬</span> Confirmar
            </button>
            <button className="flex-1 bg-white text-[#1a1a1a] font-bold py-3 px-4 rounded-xl border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] active:translate-y-1 active:shadow-[1px_1px_0px_#1a1a1a] transition-all text-sm uppercase flex items-center justify-center gap-2">
              <span>🗺️</span> Mapa
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
