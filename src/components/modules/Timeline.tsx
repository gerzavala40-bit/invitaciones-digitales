"use client";

import { motion } from "framer-motion";
import { GlassWater, PartyPopper, Heart, Music } from "lucide-react";

export interface TimelineItem {
  time: string;
  timeYoung?: string;
  activity: string;
  icon: string;
}

export default function Timeline({ data }: { data: TimelineItem[] }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "glass": return <GlassWater className="w-5 h-5" />;
      case "party": return <PartyPopper className="w-5 h-5" />;
      case "heart": return <Heart className="w-5 h-5" />;
      case "music": return <Music className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-6 py-12 relative border-t border-white/10">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <span className="tracking-[0.35em] text-xs uppercase text-[var(--gold)] mb-3">Programa</span>
          <h2 className="text-4xl md:text-5xl font-normal mb-2 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Itinerario
          </h2>
          <p className="text-[var(--gold)] italic text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>La magia de la noche</p>
        </motion.div>

        <div className="relative border-l border-[var(--gold)]/20 ml-4 md:ml-6 w-full text-left">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="mb-6 ml-8 relative flex flex-col"
            >
              {/* Icon Marker */}
              <div className="absolute -left-[43px] top-1/2 -translate-y-1/2 bg-[#031326] border border-[var(--gold)]/30 text-[var(--gold)] rounded-full p-2 z-10 shadow-[0_0_10px_rgba(212,201,189,0.1)]">
                {getIcon(item.icon)}
              </div>

              {/* Content Box */}
              <div className="bg-[#0A223D]/70 backdrop-blur-md shadow-md border border-white/10 rounded-2xl p-6 w-full">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[var(--gold)] font-semibold text-xl tracking-wide font-sans">
                    {item.time}
                  </span>
                  {item.timeYoung && (
                    <span className="text-[var(--text-muted)] text-xs font-medium tracking-wide">
                      (Jvenes: {item.timeYoung})
                    </span>
                  )}
                </div>
                <h3 className="text-base font-normal text-[var(--text-main)] tracking-wide font-sans mt-1">
                  {item.activity}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
