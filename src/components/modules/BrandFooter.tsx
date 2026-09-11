"use client";

import { motion } from "framer-motion";
import { MessageCircle, Globe } from "lucide-react";

export interface BrandFooterData {
  enabled: boolean;
  whatsapp?: string;
  websiteUrl?: string;
  message?: string;
}

export default function BrandFooter({ data }: { data: BrandFooterData }) {
  if (!data || !data.enabled) return null;

  const whatsappUrl = data.whatsapp 
    ? `https://wa.me/${data.whatsapp}?text=${encodeURIComponent(data.message || '¡Hola! Quiero consultar por una invitacin web.')}`
    : '#';

  return (
    <section className="px-4 pb-32 pt-10 w-full flex justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-md text-center text-xs text-slate-500 py-8"
      >
        <p className="mb-1 font-light tracking-wide text-slate-400">¿Te gustó esta tarjeta web?</p>
        <p className="mb-4 font-light tracking-wide text-slate-400">Creamos invitaciones personalizadas.</p>

        <div className="flex flex-row items-center justify-center gap-3 text-slate-400">
          {data.websiteUrl && (
            <a 
              href={data.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Globe className="w-3.5 h-3.5" /> Te Invito
            </a>
          )}
          
          {(data.websiteUrl && data.whatsapp) && (
            <span className="opacity-50">·</span>
          )}

          {data.whatsapp && (
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Consultar
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
