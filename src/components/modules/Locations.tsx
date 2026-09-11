"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { AnimatedLocationPinIcon, AnimatedPartyIcon, ClinkingGlassesIcon } from "@/components/ui/AnimatedIcons";

export interface LocationData {
  type: string;
  name: string;
  address: string;
  time: string;
  timeYoung?: string;
  mapsUrl?: string;
  calendarUrl?: string;
}

export default function Locations({ data }: { data: LocationData[] }) {
  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'ceremonia': return 'Ceremonia';
      case 'fiesta': return 'La Fiesta';
      case 'civil': return 'Civil';
      default: return type;
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 py-12 relative border-t border-white/10">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <AnimatedLocationPinIcon className="w-8 h-8 text-[var(--gold)] mb-2" />
          <h2 className="text-4xl md:text-5xl font-normal mb-1 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ubicación
          </h2>
          <p className="text-[var(--gold)] italic text-base md:text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Nos vemos acá
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 w-full">
          {data.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-[#0A223D]/70 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full"
            >
              {/* Animated Sparkle / Party Ornament */}
              {loc.type.toLowerCase() === 'fiesta' ? (
                <ClinkingGlassesIcon className="w-10 h-10 text-[var(--gold)] mb-2" />
              ) : (
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[var(--gold)] mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </motion.div>
              )}
              
              {/* Location Type (Eyebrow) */}
              <h3 className="tracking-[0.3em] text-[10px] font-bold uppercase text-[var(--gold)] mb-2">
                {getTypeLabel(loc.type)}
              </h3>
              
              {/* Location Name */}
              <h4 className="text-3xl font-normal mb-4 text-[var(--text-main)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {loc.name}
              </h4>

              {/* Address / Time */}
              <div className="flex flex-col items-center gap-1 mb-8 text-[var(--text-muted)] font-sans">
                <p className="text-sm font-light tracking-wide">{loc.address}</p>
                <p className="text-sm font-medium">{loc.time} hs</p>
              </div>

              {/* Elegant Pills */}
              <div className="flex flex-col w-full gap-3">
                {loc.mapsUrl && (
                  <a 
                    href={loc.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full flex items-center justify-center gap-2 rounded-full py-3 px-6 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-accent)] text-[#031326] font-semibold text-sm transition-transform active:scale-95 shadow-md"
                  >
                    <MapPin className="w-4 h-4" /> Cómo llegar
                  </a>
                )}
                
                {loc.calendarUrl && (
                  <a 
                    href={loc.calendarUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full flex items-center justify-center gap-2 rounded-full py-3 px-6 bg-transparent border border-[var(--gold)] text-[var(--gold)] font-medium text-sm hover:bg-[var(--gold)]/10 transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> Agendar
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
