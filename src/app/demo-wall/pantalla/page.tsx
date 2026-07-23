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
    <div className="min-h-screen bg-ink-950 text-white overflow-hidden flex flex-col">
      {/* Cabecera del proyector */}
      <div className="h-24 bg-ink-900/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-10 shrink-0 relative z-10 shadow-2xl">
        <div>
          <h1 className="font-display text-4xl tracking-tight text-white mb-1">
            Boda de <span className="text-terracotta-500 italic">Juan & Ana</span>
          </h1>
          <p className="text-ink-400 text-sm tracking-widest uppercase">Party Cam</p>
        </div>
        
        {/* Simulación del código QR para la demo */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-medium text-lg text-white mb-1">¡Compartí tus fotos!</p>
            <p className="text-ink-400 text-sm">Escaneá el código para subir</p>
          </div>
          <div className="w-16 h-16 bg-white rounded-xl p-1 flex items-center justify-center">
            {/* Un SVG de QR genérico para ilustrar */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
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

      {/* Grilla dinámica de fotos (Masonry simulado) */}
      <div className="flex-1 p-8 overflow-y-auto no-scrollbar relative">
        <div className="absolute inset-0 grain opacity-20 pointer-events-none"></div>
        
        {photos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-ink-500">
            <svg className="w-24 h-24 mb-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-2xl font-display">El muro está vacío</p>
            <p className="text-lg mt-2">Sé el primero en subir una foto escaneando el QR</p>
            
            <Link href="/demo-wall/upload" className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition" target="_blank">
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
                  <div className="bg-white p-3 pb-12 rounded-sm shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300">
                    <img src={photo.image} alt="Foto de invitado" className="w-full h-auto rounded-sm object-cover" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ink-900">
                      <p className="font-handwriting text-xl truncate pr-2">{photo.uploader}</p>
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
