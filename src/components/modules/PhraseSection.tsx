"use client";

import { motion } from "framer-motion";
import { AnimatedHeartBeatIcon } from "@/components/ui/AnimatedIcons";

export interface PhraseData {
  emotionalPhrase?: string;
  hashtag?: string;
}

export default function PhraseSection({ data }: { data: PhraseData }) {
  if (!data.emotionalPhrase && !data.hashtag) return null;

  return (
    <section id="itinerario" className="w-full flex flex-col items-center justify-center text-center px-6 py-16 relative border-t border-white/10 bg-[#031326]/40 backdrop-blur-sm">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        
        {/* Adorno superior */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <AnimatedHeartBeatIcon className="w-8 h-8 text-[var(--gold)]" />
        </motion.div>

        {/* Frase Emocional */}
        {data.emotionalPhrase && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl italic text-[var(--gold)] drop-shadow-sm leading-relaxed mb-10 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "{data.emotionalPhrase}"
          </motion.p>
        )}

        {/* Hashtag */}
        {data.hashtag && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="inline-block text-sm font-semibold tracking-widest bg-white/5 border border-[var(--gold)]/30 text-[var(--text-main)] px-6 py-3 rounded-full backdrop-blur-md shadow-lg">
              {data.hashtag}
            </span>
          </motion.div>
        )}

      </div>
    </section>
  );
}
