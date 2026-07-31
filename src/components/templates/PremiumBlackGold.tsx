"use client";

import React, { useState } from "react";
import { EventData } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function PremiumBlackGold({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);

  // Fallback para nombres
  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "";
  const secondName = event.title.split("&")[1]?.trim() || event.title.split(" ").pop() || "";

  const coverPhoto = event.photos && event.photos.length > 0
    ? event.photos[0].url
    : "https://latarjetadigital.app/wp-content/uploads/2026/07/hero_bg_exact.jpg"; // fallback elegante

  const dateObj = new Date(event.eventDate);
  const dateShort = dateObj.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " . ");
  const dateLong = dateObj.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
    
    .pbg-serif { font-family: 'Playfair Display', serif; }
    .pbg-sans { font-family: 'Inter', sans-serif; }
    
    .pbg-gold-text {
      background: linear-gradient(to right, #C59B27, #F3E5AB, #C59B27);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .pbg-gold-border {
      border-color: #D4AF37;
    }
    
    .pbg-gold-bg {
      background: linear-gradient(135deg, #C59B27, #E8D5A3, #C59B27);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      
      <div className="bg-black text-[#FDFBF7] pbg-sans min-h-screen selection:bg-[#D4AF37] selection:text-black">
        {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#D4AF37" />}

        {/* SPLASH SCREEN */}
        <AnimatePresence>
          {!entered && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-6 cursor-pointer"
              onClick={() => setEntered(true)}
            >
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-[#D4AF37] tracking-[0.4em] text-xs font-semibold mb-8 uppercase"
              >
                NOS CASAMOS
              </motion.p>
              
              <h1 className="pbg-serif text-5xl md:text-6xl text-center leading-tight pbg-gold-text">
                {firstName} <br/><span className="text-3xl italic font-light">&</span><br/> {secondName}
              </h1>
              
              <p className="mt-8 text-gray-400 tracking-[0.2em] text-sm">{dateShort}</p>
              
              <div className="mt-12 w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"></div>
              
              <p className="mt-8 text-gray-500 tracking-[0.1em] text-xs uppercase animate-pulse">
                Tocar para entrar
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENIDO PRINCIPAL */}
        <div className={!entered ? "hidden" : "block"}>
          
          {/* HERO A PANTALLA COMPLETA */}
          <section className="relative w-full h-[100dvh] flex flex-col justify-end pb-24 items-center">
            <div className="absolute inset-0 z-0">
              <img src={coverPhoto} alt="Portada" className="w-full h-full object-cover object-center opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="relative z-10 text-center px-6 w-full max-w-3xl mx-auto"
            >
              <motion.p variants={fadeUp} className="text-[#D4AF37] tracking-[0.4em] text-xs uppercase mb-4 font-medium">
                ¡Estás invitado!
              </motion.p>
              
              <motion.h1 variants={fadeUp} className="pbg-serif text-5xl md:text-7xl pbg-gold-text mb-4 leading-none">
                {firstName} <span className="italic font-light text-white text-4xl">&</span> {secondName}
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-gray-300 tracking-[0.2em] text-sm uppercase mb-8">
                {dateLong} | {event.eventTime} HS
              </motion.p>
            </motion.div>
          </section>

          {/* CUENTA REGRESIVA */}
          <section className="py-16 px-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-xl mx-auto text-center mt-12">
              <h2 className="pbg-serif text-3xl md:text-4xl italic text-[#D4AF37] mb-10">Falta muy poco</h2>
              <Countdown targetDate={event.eventDate} boxClassName="bg-white/5 border border-[#D4AF37]/30 backdrop-blur-sm rounded-none" numberClassName="pbg-serif text-white font-light text-3xl" labelClassName="text-gray-400 text-xs tracking-[0.2em] uppercase mt-2" />
            </motion.div>
          </section>

          {/* HISTORIA / FRASE */}
          {event.phrase && (
            <section className="py-24 px-6 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-2xl mx-auto text-center mt-8">
                <p className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase mb-8">Nuestra Historia</p>
                <h3 className="pbg-serif text-2xl md:text-4xl text-gray-200 leading-relaxed italic">
                  "{event.phrase}"
                </h3>
              </motion.div>
            </section>
          )}

          {/* UBICACIONES */}
          <section className="py-24 px-6 relative bg-white/5 border-y border-white/10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-5xl mx-auto text-center">
              <motion.h2 variants={fadeUp} className="pbg-serif text-4xl text-[#D4AF37] mb-16 italic">Ceremonia & Fiesta</motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                {event.ceremonyName && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center mb-6 text-[#D4AF37]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M8 6h8"/></svg>
                    </div>
                    <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">Ceremonia</p>
                    <p className="text-2xl pbg-serif text-white mb-2">{event.ceremonyTime} HS</p>
                    <p className="text-lg font-medium text-[#D4AF37] mb-1">{event.ceremonyName}</p>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs">{event.ceremonyAddress}</p>
                    <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener" className="mt-auto border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors px-8 py-3 text-xs tracking-[0.2em] uppercase">
                      Ver Mapa
                    </a>
                  </motion.div>
                )}
                
                <motion.div variants={fadeUp} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center mb-6 text-[#D4AF37]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                  <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">Fiesta</p>
                  <p className="text-2xl pbg-serif text-white mb-2">{event.eventTime} HS</p>
                  <p className="text-lg font-medium text-[#D4AF37] mb-1">{event.venueName}</p>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs">{event.venueAddress}</p>
                  <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener" className="mt-auto border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors px-8 py-3 text-xs tracking-[0.2em] uppercase">
                    Ver Mapa
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* DRESS CODE */}
          {event.dressCode && (
            <section className="py-24 px-6 relative text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-lg mx-auto mt-8">
                <h2 className="pbg-serif text-3xl md:text-4xl text-[#D4AF37] mb-6 italic">Dress Code</h2>
                <p className="text-xl tracking-widest uppercase text-white font-light">{event.dressCode}</p>
                <div className="flex justify-center gap-3 mt-8">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-black"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-gray-600 bg-gray-800"></div>
                </div>
              </motion.div>
            </section>
          )}

          {/* GALERÍA */}
          {event.photos && event.photos.length > 0 && (
            <section className="py-24 px-6 relative bg-white/5 border-y border-white/10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto text-center">
                <h2 className="pbg-serif text-4xl text-[#D4AF37] mb-12 italic">Nosotros</h2>
                <div className="border border-[#D4AF37]/30 p-2 bg-black/50">
                  <PhotoGallery photos={event.photos} accentColor="#D4AF37" title="" />
                </div>
              </motion.div>
            </section>
          )}

          {/* REGALOS */}
          {event.bankAlias && (
            <section className="py-24 px-6 relative">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-xl mx-auto text-center">
                <h2 className="pbg-serif text-4xl text-[#D4AF37] mb-6 italic">Mesa de Regalos</h2>
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-12">
                  Nuestro mayor regalo es que nos acompañen. Si desean hacernos un presente adicional, pueden utilizar los siguientes datos.
                </p>
                
                <div className="border border-[#D4AF37]/30 bg-white/5 p-8 md:p-12">
                  <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">Alias</p>
                  <p className="text-2xl pbg-serif text-white mb-6">{event.bankAlias}</p>
                  <CopyButton text={event.bankAlias} className="w-full bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-colors py-4 text-xs font-bold tracking-[0.2em] uppercase" />
                  
                  {event.bankCBU && (
                    <>
                      <div className="w-full h-px bg-white/10 my-8"></div>
                      <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">CBU / CVU</p>
                      <p className="text-lg pbg-sans font-light text-white mb-6 break-all">{event.bankCBU}</p>
                      <CopyButton text={event.bankCBU} className="w-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors py-4 text-xs font-bold tracking-[0.2em] uppercase" />
                    </>
                  )}
                  {event.bankHolder && <p className="text-gray-500 text-xs mt-6 tracking-[0.1em] uppercase">Titular: {event.bankHolder}</p>}
                </div>
              </motion.div>
            </section>
          )}

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="py-24 px-6 relative bg-white/5 border-t border-white/10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-xl mx-auto text-center">
                <h2 className="pbg-serif text-4xl text-[#D4AF37] mb-4 italic">Asistencia</h2>
                <p className="text-gray-400 tracking-[0.2em] text-xs uppercase mb-12">Esperamos contar con ustedes</p>
                
                <div className="bg-black border border-[#D4AF37]/30 p-8 md:p-12 text-left">
                  <RsvpForm 
                    eventSlug={event.slug} 
                    isTrial={event.isTrial}
                    inputClassName="bg-white/5 border border-white/20 focus:border-[#D4AF37] text-white rounded-none placeholder-gray-500 py-3"
                    buttonClassName="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] rounded-none py-4 text-xs tracking-[0.2em] font-bold uppercase mt-4 transition-colors"
                    labelClassName="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2"
                  />
                </div>
              </motion.div>
            </section>
          )}

          {/* FOOTER */}
          <footer className="py-16 text-center border-t border-white/10">
            <p className="pbg-serif text-3xl italic text-[#D4AF37]">Gracias</p>
            <p className="text-gray-600 text-[10px] tracking-[0.3em] uppercase mt-6">Powered by Te invito</p>
          </footer>
        </div>
      </div>
    </>
  );
}
