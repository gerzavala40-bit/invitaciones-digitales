"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export interface SocialData {
  hashtag?: string;
  message?: string;
  instagramUrl?: string;
}

export default function SocialSection({ data }: { data: SocialData }) {
  if (!data) return null;

  return (
    <section className="py-12 px-4 bg-transparent w-full pb-16">
      <div className="max-w-md mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="bg-slate-900/60 backdrop-blur-md p-6 rounded-[2rem] shadow-[0_4px_25px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col items-center"
        >
          <span className="text-[var(--accent)]/70 text-lg mb-2">✦</span>
          <h3 className="tracking-widest text-xs uppercase text-slate-400 mb-2">Redes</h3>
          <h4 className="text-3xl md:text-4xl font-normal mb-3 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Compartí la noche
          </h4>
          <p className="text-slate-300 font-light tracking-wide text-[15px] mb-4">
            {data.message || 'Prepará tu cmara y compartí todos los momentos de la fiesta usando mi hashtag.'}
          </p>
          
          {data.hashtag && (
            <div className="bg-blue-900/20 border border-[var(--accent)]/20 px-6 py-4 rounded-2xl w-full mb-6 shadow-inner shadow-[var(--accent)]/10">
              <p className="text-2xl font-semibold text-[var(--accent)] tracking-widest">{data.hashtag}</p>
            </div>
          )}

          {data.instagramUrl && (
            <a 
              href={data.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 rounded-full py-3 px-8 border border-white/20 bg-white/5 backdrop-blur-sm text-sm text-white hover:bg-white/10 transition-colors w-full"
            >
              <Camera className="w-5 h-5" /> Etiquetame en Stories
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
