import React from 'react';

// 1. ÍCONO DE FIESTA / BRINDIS (Copas que chocan con tintineo y destello)
export const AnimatedPartyIcon = ({ className = "w-10 h-10 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1 mb-1">
    <style>{`
      @keyframes glass-tilt-l {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(12deg) translateY(-2px); }
      }
      @keyframes glass-tilt-r {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-12deg) translateY(-2px); }
      }
      @keyframes sparkle-burst {
        0%, 100% { opacity: 0; transform: scale(0.4); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      .anim-toast-l { animation: glass-tilt-l 2.4s ease-in-out infinite; transform-origin: bottom center; }
      .anim-toast-r { animation: glass-tilt-r 2.4s ease-in-out infinite; transform-origin: bottom center; }
      .anim-spark { animation: sparkle-burst 2.4s ease-in-out infinite; transform-origin: center; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Destello de choque */}
      <path d="M24 7v5M21.5 9.5h5" className="anim-spark stroke-[#E0CFA1]" strokeWidth="2" />
      {/* Copa Izquierda */}
      <g className="anim-toast-l">
        <path d="M15 15l4 7a4 4 0 004 2h0a4 4 0 004-2l1-1.5" />
        <path d="M19 24v10M15 34h8" />
      </g>
      {/* Copa Derecha */}
      <g className="anim-toast-r">
        <path d="M33 15l-4 7a4 4 0 01-4 2h0a4 4 0 01-4-2l-1-1.5" />
        <path d="M29 24v10M25 34h8" />
      </g>
    </svg>
  </div>
);

// 2. ÍCONO DE MOMENTOS / FOTOS (Cámara con destello de flash intermitente)
export const AnimatedCameraIcon = ({ className = "w-10 h-10 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1 mb-2">
    <style>{`
      @keyframes camera-shutter-snap {
        0%, 80%, 100% { transform: scale(1) translateY(0); }
        86% { transform: scale(0.93) translateY(2px); }
        90% { transform: scale(1.08) translateY(-3px); }
        94% { transform: scale(1) translateY(0); }
      }
      @keyframes flash-burst {
        0%, 85%, 100% { opacity: 0; transform: scale(0.3); }
        88% { opacity: 1; transform: scale(1.4); }
        92% { opacity: 0.8; transform: scale(1.1); }
        96% { opacity: 0; transform: scale(0.4); }
      }
      @keyframes lens-ring-pulse {
        0%, 80%, 100% { stroke-opacity: 0.4; }
        88% { stroke-opacity: 1; stroke-width: 2.2; }
      }
      .anim-camera-body { animation: camera-shutter-snap 3.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; transform-origin: bottom center; }
      .anim-camera-flash { animation: flash-burst 3.2s ease-out infinite; transform-origin: 34px 13px; }
      .anim-camera-lens { animation: lens-ring-pulse 3.2s ease-in-out infinite; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Ráfaga de destellos del Flash */}
      <g className="anim-camera-flash stroke-[#FFF2D1]" strokeWidth="2">
        <circle cx="34" cy="13" r="5" className="fill-[#FFF7DC]" />
        <line x1="34" y1="5" x2="34" y2="2" />
        <line x1="40" y1="9" x2="43" y2="7" />
        <line x1="42" y1="14" x2="45" y2="15" />
        <line x1="28" y1="9" x2="25" y2="7" />
      </g>

      {/* Cuerpo de la cámara con salto/clic */}
      <g className="anim-camera-body">
        {/* Silueta principal */}
        <path d="M9 16a3 3 0 013-3h3.2a3 3 0 002.4-1.2l1.6-2.4a3 3 0 012.4-1.2h4.8a3 3 0 012.4 1.2l1.6 2.4a3 3 0 002.4 1.2H36a3 3 0 013 3v20a3 3 0 01-3 3H12a3 3 0 01-3-3V16z" fill="currentColor" fillOpacity="0.12" />
        {/* Lente central y sensor */}
        <circle cx="24" cy="27" r="7.5" className="anim-camera-lens stroke-[var(--gold)]" />
        <circle cx="24" cy="27" r="3.5" className="fill-[#E0CFA1]" stroke="none" />
        {/* Visor pequeño */}
        <rect x="14" y="17" width="4" height="3" rx="1" className="fill-current opacity-40" stroke="none" />
      </g>
    </svg>
  </div>
);

// 3. ÍCONO DE MÚSICA / PLAYLIST (Notas que flotan hacia arriba)
export const AnimatedMusicIcon = ({ className = "w-8 h-8 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-2">
    <style>{`
      @keyframes float-note-1 {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
        50% { transform: translateY(-4px) rotate(6deg); opacity: 1; }
      }
      @keyframes float-note-2 {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
        50% { transform: translateY(-6px) rotate(-8deg); opacity: 0.9; }
      }
      .anim-note-main { animation: float-note-1 2.2s ease-in-out infinite; }
      .anim-note-second { animation: float-note-2 2.8s ease-in-out infinite; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <g className="anim-note-main">
        <path d="M18 34a4 4 0 11-8 0 4 4 0 018 0z" fill="currentColor" fillOpacity="0.2" />
        <path d="M18 34V12l16-4v20" />
        <path d="M34 28a4 4 0 11-8 0 4 4 0 018 0z" fill="currentColor" fillOpacity="0.2" />
        <path d="M18 17l16-4" />
      </g>
      <path d="M37 10l5-2v8a2.5 2.5 0 11-3-2.4V10" className="anim-note-second stroke-[#E0CFA1]" strokeWidth="1.5" />
    </svg>
  </div>
);

// 4. ÍCONO DE REGALOS / CBU (Tapa con suave rebote y destello)
export const AnimatedGiftIcon = ({ className = "w-8 h-8 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-2">
    <style>{`
      @keyframes gift-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .anim-gift-top { animation: gift-bounce 2.5s ease-in-out infinite; transform-origin: center; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Tapa y Moño */}
      <g className="anim-gift-top">
        <path d="M10 17h28v6H10z" fill="currentColor" fillOpacity="0.15" />
        <path d="M24 17v-4a3 3 0 00-3-3c-2 0-3.5 1.5-3.5 3.5 0 3 6.5 3.5 6.5 3.5s6.5-.5 6.5-3.5c0-2-1.5-3.5-3.5-3.5a3 3 0 00-3 3" />
      </g>
      {/* Base de la Caja */}
      <path d="M13 23v15a2 2 0 002 2h18a2 2 0 002-2V23" />
      <path d="M24 23v17" strokeDasharray="2 2" />
    </svg>
  </div>
);

// 5. Ícono de Ubicación / Salón estilizado (Pin luminoso)
export const AnimatedLocationPinIcon = ({ className = "w-9 h-9 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1">
    <style>{`
      @keyframes pin-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes radar-pulse {
        0% { transform: scale(0.6); opacity: 0.8; }
        100% { transform: scale(1.4); opacity: 0; }
      }
      .anim-pin { animation: pin-bounce 2.6s ease-in-out infinite; }
      .anim-radar { animation: radar-pulse 2.6s ease-out infinite; transform-origin: 24px 38px; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Onda de suelo */}
      <ellipse cx="24" cy="38" rx="8" ry="3" className="anim-radar stroke-[#E0CFA1]" strokeWidth="1.5" />
      {/* Pin con destello central */}
      <g className="anim-pin">
        <path d="M24 6C16.8 6 11 11.8 11 19c0 9.5 13 21 13 21s13-11.5 13-21c0-7.2-5.8-13-13-13z" fill="currentColor" fillOpacity="0.12" />
        <circle cx="24" cy="19" r="4" className="fill-[#E0CFA1] stroke-[#E0CFA1]" />
      </g>
    </svg>
  </div>
);

// 6. Ícono de Corazón con latido suave para la frase
export const AnimatedHeartBeatIcon = ({ className = "w-8 h-8 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1">
    <style>{`
      @keyframes heart-soft-beat {
        0%, 100% { transform: scale(1); }
        15% { transform: scale(1.18); }
        30% { transform: scale(1); }
        45% { transform: scale(1.12); }
      }
      .anim-heart { animation: heart-soft-beat 2.4s ease-in-out infinite; transform-origin: center; }
    `}</style>
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`${className} anim-heart`}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  </div>
);

// 7. Ícono de Corona para el Hero
export const AnimatedCrownIcon = ({ className = "w-9 h-9 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1 mb-1">
    <style>{`
      @keyframes crown-glow {
        0%, 100% { filter: drop-shadow(0 0 2px rgba(194,168,120,0.3)); transform: scale(1); }
        50% { filter: drop-shadow(0 0 8px rgba(224,207,161,0.8)); transform: scale(1.05); }
      }
      @keyframes jewel-twinkle {
        0%, 100% { opacity: 0.4; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      .anim-crown { animation: crown-glow 3s ease-in-out infinite; }
      .anim-jewel-left { animation: jewel-twinkle 2.2s ease-in-out infinite; transform-origin: 10px 18px; }
      .anim-jewel-mid { animation: jewel-twinkle 2.2s ease-in-out 0.4s infinite; transform-origin: 24px 12px; }
      .anim-jewel-right { animation: jewel-twinkle 2.2s ease-in-out 0.8s infinite; transform-origin: 38px 18px; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`${className} anim-crown`}>
      <path d="M8 32l3-14 8 8 5-14 5 14 8-8 3 14H8z" fill="currentColor" fillOpacity="0.1" />
      <path d="M10 37h28M12 41h24" strokeWidth="2" opacity="0.6"/>
      <circle cx="11" cy="18" r="2" className="anim-jewel-left fill-[#E0CFA1]" stroke="none" />
      <circle cx="24" cy="12" r="2" className="anim-jewel-mid fill-[#E0CFA1]" stroke="none" />
      <circle cx="37" cy="18" r="2" className="anim-jewel-right fill-[#E0CFA1]" stroke="none" />
    </svg>
  </div>
);

// 8. Ícono Clásico de Copas Brindando (Flautas)
export const ClinkingGlassesIcon = ({ className = "w-10 h-10 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1 mb-1">
    <style>{`
      @keyframes glass-clink-left {
        0%, 100% { transform: rotate(0deg); }
        45% { transform: rotate(15deg) translateY(-2px); }
        55% { transform: rotate(15deg) translateY(-2px); }
      }
      @keyframes glass-clink-right {
        0%, 100% { transform: rotate(0deg); }
        45% { transform: rotate(-15deg) translateY(-2px); }
        55% { transform: rotate(-15deg) translateY(-2px); }
      }
      @keyframes clink-sparkle {
        0%, 35%, 100% { opacity: 0; transform: scale(0.4); }
        48% { opacity: 1; transform: scale(1.3); }
        60% { opacity: 0; transform: scale(0.4); }
      }
      .clink-l { animation: glass-clink-left 2.5s ease-in-out infinite; transform-origin: 12px 38px; }
      .clink-r { animation: glass-clink-right 2.5s ease-in-out infinite; transform-origin: 36px 38px; }
      .clink-spark { animation: clink-sparkle 2.5s ease-in-out infinite; transform-origin: 24px 12px; }
    `}</style>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Destello del brindis */}
      <path d="M24 6v4M21 9h6M22 7l4 4M26 7l-4 4" className="clink-spark stroke-[#E0CFA1]" strokeWidth="1.5" />
      
      {/* Copa Izquierda (Flauta clásica) */}
      <g className="clink-l">
        <path d="M13 10h6v12a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V10z" fill="currentColor" fillOpacity="0.15" />
        <path d="M16 25v13M11 38h10" />
        <path d="M14 15h4" strokeDasharray="1 2" opacity="0.6" />
      </g>

      {/* Copa Derecha (Flauta clásica) */}
      <g className="clink-r">
        <path d="M29 10h6v12a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V10z" fill="currentColor" fillOpacity="0.15" />
        <path d="M32 25v13M27 38h10" />
        <path d="M30 15h4" strokeDasharray="1 2" opacity="0.6" />
      </g>
    </svg>
  </div>
);

// 9. Ícono de Percha/Dress Code
export const AnimatedHangerIcon = ({ className = "w-9 h-9 text-[#C2A878]" }: { className?: string }) => (
  <div className="relative inline-flex items-center justify-center p-1 mb-2">
    <style>{`
      @keyframes hanger-swing {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(6deg); }
      }
      .anim-hanger { animation: hanger-swing 3s ease-in-out infinite; transform-origin: top center; }
    `}</style>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} anim-hanger`}>
      <path d="M12 2a3 3 0 0 0-3 3c0 .8.4 1.5 1 2L2 14.5A1.5 1.5 0 0 0 3.5 16h17a1.5 1.5 0 0 0 1.5-1.5L14 7c.6-.5 1-1.2 1-2a3 3 0 0 0-3-3z" />
    </svg>
  </div>
);
