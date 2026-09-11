"use client";

import { motion } from "framer-motion";
import { AnimatedHangerIcon } from "@/components/ui/AnimatedIcons";

export default function DressCodeSection() {
  return (
    <section className="min-h-[70dvh] w-full flex flex-col items-center justify-center text-center px-6 py-16 relative border-t border-white/10">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center w-full"
        >
          <AnimatedHangerIcon className="w-9 h-9 text-[var(--gold)] mb-2" />
          
          <h2 className="text-4xl md:text-5xl font-normal mb-2 text-[var(--text-main)] font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dress Code
          </h2>
          
          <p className="text-[var(--gold)] italic text-lg font-serif mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Elegante / De Gala
          </p>

          <div className="bg-[#0A223D]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-sm mx-auto shadow-lg w-full">
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Te pedimos asistir con vestimenta formal. (Se reserva el color esmeralda/dorado para la quinceañera).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
