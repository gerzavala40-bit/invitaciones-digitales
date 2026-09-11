"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedCameraIcon } from "@/components/ui/AnimatedIcons";

export default function Gallery({ data }: { data: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || data.length === 0) return null;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    // Each item width + gap of 16px (gap-4)
    const childWidth = (container.firstChild as HTMLElement)?.offsetWidth || 0;
    const gap = 16; 
    
    // We add half the childWidth to smoothly trigger index change when we pass the half point
    const index = Math.round(scrollPosition / (childWidth + gap));
    setActiveIndex(Math.min(data.length - 1, Math.max(0, index)));
  };

  return (
    <section id="galeria" className="min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-0 py-12 relative border-t border-white/10">
      <div className="w-full max-w-[500px] mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center px-6"
        >
          <AnimatedCameraIcon className="w-9 h-9 text-[var(--gold)] mb-2" />
          <span className="tracking-[0.35em] text-xs uppercase text-[var(--gold)] mb-3">Galería</span>
          <h2 className="text-4xl md:text-5xl font-normal mb-2 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Momentos
          </h2>
          <p className="text-[var(--gold)] text-lg italic" style={{ fontFamily: "'Playfair Display', serif" }}>Un repaso por mi historia</p>
        </motion.div>

        {/* Carrusel Horizontal Full-Width */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 w-full pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {data.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative shrink-0 w-[88vw] max-w-[380px] aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0A223D]/50 snap-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>

        {/* Indicadores de Fotos */}
        <div className="flex flex-col items-center mt-6">
          <div className="flex items-center gap-2 mb-2">
            {data.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-[var(--gold)]/30"
                }`}
              />
            ))}
          </div>
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-mono opacity-80">
            {activeIndex + 1} / {data.length}
          </p>
        </div>

      </div>
    </section>
  );
}
