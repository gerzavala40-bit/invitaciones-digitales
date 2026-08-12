"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Photo {
  id: string;
  image: string;
  uploader: string;
  timestamp: string;
}

export default function DemoWallPantalla() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/demo-wall");
      if (res.ok) {
        const data = await res.json();
        // Solo actualizamos si hay cambios reales para no re-renderizar todas las animaciones
        setPhotos(prev => {
          if (prev.length === 0) return data.photos;
          if (data.photos.length > 0 && data.photos[0].id !== prev[0].id) {
            return data.photos;
          }
          return prev;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPhotos();
    const interval = setInterval(fetchPhotos, 3000); // Polling cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col relative">
      {/* Fondo Retro Dinámico */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{ 
          backgroundImage: "url('/bg-retro.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>

      {/* Cabecera del proyector */}
      <div className="h-24 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-10 shrink-0 relative z-10 shadow-2xl">
        <div>
          <h1 className="font-sans font-bold text-4xl tracking-tight text-white mb-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            FOTO <span className="text-[#FF6B9D] italic drop-shadow-[0_0_15px_rgba(255,107,157,0.8)]">PARTY</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">¡Tus fotos en vivo!</p>
        </div>
        
        {/* Simulación del código QR para la demo */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-medium text-lg text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">¡Compartí tus fotos!</p>
            <p className="text-gray-400 text-sm">Escaneá para subir a la pantalla</p>
          </div>
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2 flex items-center justify-center shadow-[0_0_20px_rgba(255,107,157,0.3)] hover:scale-105 transition-transform">
            {/* SVG QR decorativo */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-white opacity-90">
              <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z" fill="currentColor"/>
              <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z" fill="currentColor"/>
              <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z" fill="currentColor"/>
              <rect x="60" y="60" width="10" height="10" fill="currentColor"/>
              <rect x="75" y="70" width="15" height="15" fill="currentColor"/>
              <rect x="65" y="80" width="5" height="10" fill="currentColor"/>
              <rect x="85" y="60" width="5" height="5" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Grilla dinámica de fotos */}
      <div className="flex-1 p-8 overflow-y-auto no-scrollbar relative z-10">
        
        {photos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <div className="w-32 h-32 mb-8 animate-pulse opacity-50 bg-[#FF6B9D]/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,107,157,0.3)]">
              <svg className="w-16 h-16 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-sans font-bold tracking-widest text-white drop-shadow-md">LA PANTALLA ESTÁ VACÍA</p>
            <p className="text-lg mt-3 font-light">Sé el primero en subir una foto escaneando el QR</p>
            
            <Link href="/demo-wall/upload" className="mt-8 px-8 py-4 bg-white/10 hover:bg-[#FF6B9D]/30 border border-white/20 rounded-full transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,107,157,0.5)]" target="_blank">
              Abrir subida en otra pestaña
            </Link>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="break-inside-avoid relative group"
                >
                  <div className="bg-white p-3 pb-14 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.5)] rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300">
                    <img src={photo.image} alt="Foto de invitado" className="w-full h-auto rounded-sm object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-gray-900">
                      <p className="font-sans font-bold text-lg truncate pr-2 uppercase">{photo.uploader}</p>
                      <svg className="w-6 h-6 text-[#FF6B9D] flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
