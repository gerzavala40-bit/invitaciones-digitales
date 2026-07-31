"use client";

import React, { useState } from "react";
import { EventData } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";
import AddToCalendar from "../features/AddToCalendar";
import Guestbook from "../features/Guestbook";
import Timeline from "../features/Timeline";

export default function NeonBlueViolet({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);

  // Fallback para nombres
  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "Nombre";
  const secondName = event.title.split("&")[1]?.trim() || event.title.split(" ").pop() || "Nombre";

  // Use event photos or generic placeholders
  const coverPhoto = event.photos && event.photos.length > 0
    ? event.photos[0].url
    : "https://latarjetadigital.app/wp-content/uploads/2026/07/hero_bg_exact.jpg"; // Cambiar por un placeholder oscuro si se desea

  const dateObj = new Date(event.eventDate);
  const dateShort = dateObj.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " . ");
  const dateLong = dateObj.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');
    
    .nbv-serif { font-family: 'Playfair Display', serif; }
    .nbv-sans { font-family: 'Montserrat', sans-serif; }
    
    /* Efecto Neón Textos */
    .nbv-neon-text {
      background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #8a2be2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .nbv-neon-glow {
      text-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
    }
    
    /* Botones Neón */
    .nbv-btn {
      background: transparent;
      border: 1px solid rgba(138, 43, 226, 0.5);
      color: #fff;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .nbv-btn:hover {
      background: rgba(138, 43, 226, 0.1);
      border-color: rgba(0, 210, 255, 0.8);
      box-shadow: 0 0 15px rgba(0, 210, 255, 0.4), inset 0 0 10px rgba(138, 43, 226, 0.3);
      text-shadow: 0 0 8px rgba(255,255,255,0.8);
    }
    
    /* Ambient Glow Background */
    .nbv-ambient {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.15;
      z-index: 0;
      pointer-events: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      
      <div className="bg-[#050505] text-[#FDFBF7] nbv-sans min-h-screen selection:bg-[#8a2be2] selection:text-white overflow-hidden relative">
        {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#00d2ff" />}

        {/* Ambient Lights */}
        <div className="nbv-ambient bg-blue-600 w-[500px] h-[500px] top-[-100px] left-[-200px]"></div>
        <div className="nbv-ambient bg-purple-600 w-[600px] h-[600px] bottom-[20%] right-[-200px]"></div>

        {/* SPLASH SCREEN */}
        <AnimatePresence>
          {!entered && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] p-6 cursor-pointer"
              onClick={() => setEntered(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.p 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-blue-400 tracking-[0.4em] text-[10px] font-semibold mb-8 uppercase"
                >
                  NOS CASAMOS
                </motion.p>
                
                <h1 className="nbv-serif text-5xl md:text-7xl leading-tight nbv-neon-text nbv-neon-glow pb-2">
                  {firstName} <br/><span className="text-3xl md:text-5xl italic font-light text-white/50">&</span><br/> {secondName}
                </h1>
                
                <p className="mt-8 text-gray-500 tracking-[0.2em] text-xs">{dateShort}</p>
                
                <div className="mt-16 w-px h-20 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
                
                <p className="mt-8 text-white/40 tracking-[0.1em] text-xs uppercase animate-pulse">
                  Tocar para entrar
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENIDO PRINCIPAL */}
        <div className={!entered ? "hidden" : "block relative z-10"}>
          
          {/* HERO */}
          <section className="relative w-full min-h-[90dvh] flex flex-col justify-center items-center py-20 px-6">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img src={coverPhoto} alt="Portada" className="w-full h-full object-cover object-center opacity-30 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 mix-blend-overlay"></div>
            </div>

            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center mt-20"
            >
              <motion.div variants={fadeUp} className="w-px h-16 bg-gradient-to-b from-transparent to-blue-500/50 mb-8"></motion.div>
              
              <motion.p variants={fadeUp} className="text-blue-300 tracking-[0.4em] text-xs uppercase mb-6 font-medium">
                ¡Estás invitado!
              </motion.p>
              
              <motion.h1 variants={fadeUp} className="nbv-serif text-6xl md:text-8xl nbv-neon-text nbv-neon-glow mb-6 leading-[1.1] pb-2">
                {firstName} <br className="md:hidden"/>
                <span className="italic font-light text-white/40 text-4xl mx-4">&</span> 
                <br className="md:hidden"/>{secondName}
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-gray-400 tracking-[0.2em] text-sm uppercase mt-4">
                {dateLong} <span className="mx-2 text-blue-500/50">|</span> {event.eventTime} HS
              </motion.p>
            </motion.div>
          </section>

          {/* CUENTA REGRESIVA */}
          <section className="py-24 px-6 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-2xl mx-auto text-center">
              <h2 className="nbv-serif text-3xl md:text-4xl italic text-white/90 mb-12">Falta muy poco</h2>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Countdown targetDate={event.eventDate} boxClassName="bg-transparent border-none" numberClassName="nbv-serif nbv-neon-text text-4xl md:text-5xl font-light" labelClassName="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-4" />
              </div>
            </motion.div>
          </section>

          {/* HISTORIA / FRASE */}
          {event.phrase && (
            <section className="py-32 px-6 relative text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto">
                <svg className="w-8 h-8 mx-auto text-purple-500/40 mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <h3 className="nbv-serif text-2xl md:text-4xl text-gray-300 leading-[1.6] italic font-light">
                  "{event.phrase}"
                </h3>
              </motion.div>
            </section>
          )}

          {/* UBICACIONES */}
          <section className="py-24 px-6 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-5xl mx-auto text-center">
              <motion.h2 variants={fadeUp} className="nbv-serif text-4xl text-white mb-16 italic">Dónde & Cuándo</motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
                {event.ceremonyName && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center">
                    <div className="text-blue-400 mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase mb-3">Ceremonia</p>
                    <p className="text-3xl nbv-serif text-white mb-3">{event.ceremonyTime} HS</p>
                    <p className="text-lg font-medium text-blue-200 mb-2">{event.ceremonyName}</p>
                    <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">{event.ceremonyAddress}</p>
                    <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener" className="nbv-btn mt-auto px-8 py-3 text-xs tracking-[0.2em] uppercase rounded-full">
                      Ver Mapa
                    </a>
                  </motion.div>
                )}
                
                <motion.div variants={fadeUp} className="flex flex-col items-center">
                  <div className="text-purple-400 mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase mb-3">Fiesta</p>
                  <p className="text-3xl nbv-serif text-white mb-3">{event.eventTime} HS</p>
                  <p className="text-lg font-medium text-purple-200 mb-2">{event.venueName}</p>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">{event.venueAddress}</p>
                  <div className="flex flex-col gap-4 mt-auto">
                    <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener" className="nbv-btn px-8 py-3 text-xs tracking-[0.2em] uppercase rounded-full text-center">
                      Ver Mapa
                    </a>
                    <div className="flex justify-center mt-2">
                      <AddToCalendar event={event} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ITINERARIO */}
          {event.timeline && event.timeline.length > 0 && (
            <section className="py-24 px-6 relative">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-3xl mx-auto text-center">
                <motion.h2 variants={fadeUp} className="nbv-serif text-4xl text-white mb-16 italic">Itinerario</motion.h2>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-left backdrop-blur-sm">
                  <Timeline event={event} />
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* DRESS CODE */}
          {event.dressCode && (
            <section className="py-24 px-6 relative text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-xl mx-auto bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-3xl p-12">
                <h2 className="nbv-serif text-3xl md:text-4xl text-white mb-6 italic">Dress Code</h2>
                <p className="text-xl tracking-[0.2em] uppercase nbv-neon-text font-medium">{event.dressCode}</p>
              </motion.div>
            </section>
          )}

          {/* GALERÍA */}
          {event.photos && event.photos.length > 0 && (
            <section className="py-32 px-6 relative">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-6xl mx-auto text-center">
                <h2 className="nbv-serif text-4xl text-white mb-16 italic">Nosotros</h2>
                <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,210,255,0.1)]">
                  <PhotoGallery photos={event.photos} accentColor="#00d2ff" title="" />
                </div>
              </motion.div>
            </section>
          )}

          {/* MURO DE FIRMAS */}
          {event.guestbookEnabled && (
            <section className="py-24 px-6 relative border-t border-white/5">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
                <h2 className="nbv-serif text-4xl text-white mb-8 italic">Mensajes</h2>
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-12 font-light">
                  Déjanos tus buenos deseos en nuestro muro de firmas.
                </p>
                <div className="text-left bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  <Guestbook 
                    eventSlug={event.slug} 
                    messages={event.messages || []} 
                    isTrial={event.isTrial}
                  />
                </div>
              </motion.div>
            </section>
          )}

          {/* REGALOS */}
          {event.bankAlias && (
            <section className="py-32 px-6 relative">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-2xl mx-auto text-center">
                <h2 className="nbv-serif text-4xl text-white mb-8 italic">Regalos</h2>
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-12 font-light">
                  Tu presencia es nuestro mayor regalo. Si de todas formas deseas hacernos un presente, puedes usar estos datos.
                </p>
                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl"></div>
                  
                  <p className="text-blue-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">Alias</p>
                  <p className="text-2xl nbv-serif text-white mb-8">{event.bankAlias}</p>
                  <CopyButton text={event.bankAlias} className="w-full nbv-btn py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-xl" />
                  
                  {event.bankCBU && (
                    <>
                      <div className="w-full h-px bg-white/5 my-10"></div>
                      <p className="text-purple-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">CBU / CVU</p>
                      <p className="text-xl font-light text-white mb-8 break-all">{event.bankCBU}</p>
                      <CopyButton text={event.bankCBU} className="w-full nbv-btn py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-xl" />
                    </>
                  )}
                  {event.bankHolder && <p className="text-gray-500 text-[10px] mt-8 tracking-[0.2em] uppercase">Titular: {event.bankHolder}</p>}
                </div>
              </motion.div>
            </section>
          )}

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="py-32 px-6 relative border-t border-white/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-xl mx-auto text-center">
                <h2 className="nbv-serif text-4xl text-white mb-4 italic">Confirmar Asistencia</h2>
                <p className="text-gray-500 tracking-[0.2em] text-xs uppercase mb-12">Por favor confirmanos antes de la fecha</p>
                
                <div className="text-left">
                  <RsvpForm 
                    eventSlug={event.slug} 
                    isTrial={event.isTrial}
                    inputClassName="bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl placeholder-gray-600 py-4 px-5 transition-colors"
                    buttonClassName="w-full bg-white text-black hover:bg-gray-200 rounded-xl py-4 text-xs tracking-[0.2em] font-bold uppercase mt-6 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    labelClassName="text-gray-400 text-[10px] tracking-[0.2em] uppercase mb-2 ml-1"
                  />
                </div>
              </motion.div>
            </section>
          )}

          {/* FOOTER */}
          <footer className="py-20 text-center border-t border-white/5 bg-black/50">
            <p className="nbv-serif text-4xl italic text-white/50 mb-2">Gracias</p>
            <p className="text-gray-600 text-[9px] tracking-[0.4em] uppercase mt-8">Powered by Te invito</p>
          </footer>
        </div>
      </div>
    </>
  );
}
