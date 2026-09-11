"use client";

import { motion } from "framer-motion";
import { Headphones, Music } from "lucide-react";
import { AnimatedMusicIcon } from "@/components/ui/AnimatedIcons";

export interface MusicData {
  title?: string;
  subtitle?: string;
  playlistUrl?: string;
  message?: string;
}

export default function MusicSection({ data }: { data: MusicData }) {
  if (!data) return null;

  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 py-12 relative border-t border-white/10">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-8 flex flex-col items-center"
        >
          <AnimatedMusicIcon className="w-9 h-9 text-[var(--gold)] mb-2" />
          <span className="tracking-[0.35em] text-[10px] font-bold uppercase text-[var(--gold)] mb-3 block">El Ritmo</span>
          <h2 className="text-4xl md:text-5xl font-normal mb-2 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.subtitle || 'La Fiesta'}
          </h2>
          <p className="text-[var(--gold)] italic text-lg mb-6 leading-relaxed px-2 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.message || '¿Qué cancin no puede faltar en la pista? Sumá tu tema o escuchá la playlist oficial.'}
          </p>
          
          <div className="flex flex-col gap-4 w-full px-6">
            {data.playlistUrl && (
              <a 
                href={data.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-semibold text-sm transition-transform active:scale-95 shadow-md"
              >
                <Headphones className="w-5 h-5" /> Escuchar Playlist
              </a>
            )}
            
            <a 
              href="#asistencia"
              className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 bg-transparent border border-[var(--gold)] text-[var(--gold)] font-medium text-sm hover:bg-[var(--gold)]/10 transition-colors"
            >
              <Music className="w-5 h-5" /> Sugerir un Tema
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
