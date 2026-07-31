"use client";

import { useState } from "react";
import { EventData } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";
import AddToCalendar from "../features/AddToCalendar";
import Guestbook from "../features/Guestbook";
import Timeline from "../features/Timeline";

export default function TemplateDespedida({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);

  const heroImage = event.photos && event.photos.length > 0 ? event.photos[0].url : "";
  const bgStyle = heroImage
    ? { backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(135deg, #FF8C42 0%, #FF6B9D 100%)" };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans overflow-x-hidden selection:bg-[#FF6B9D] selection:text-white">
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f13]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/20 to-[#FF6B9D]/20 blur-[100px] pointer-events-none"></div>
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-center z-10"
            >
              <div className="w-24 h-24 mb-8 mx-auto border border-white/20 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md">
                <span className="text-4xl">🔥</span>
              </div>
              <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-bold">LA DESPEDIDA DE</p>
              <h1 className="text-5xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FF6B9D] px-4">
                {event.title}
              </h1>
              <button
                onClick={() => setEntered(true)}
                className="px-10 py-4 border-2 border-[#FF6B9D] text-white text-sm font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#FF6B9D] hover:shadow-[0_0_30px_rgba(255,107,157,0.5)] transition-all duration-300"
              >
                Entrar a la joda
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} />}

      <div className={`transition-opacity duration-1000 ${entered ? "opacity-100" : "opacity-0"}`}>
        <main>
          {/* HERO */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-6">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[#0f0f13]/80 z-10"></div>
              <div className="absolute inset-0 z-0" style={bgStyle}></div>
            </div>
            
            <motion.div initial="hidden" animate={entered ? "visible" : "hidden"} variants={staggerContainer} className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
              <motion.div variants={fadeUp} className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF6B9D] shadow-[0_0_30px_rgba(255,107,157,0.5)] mb-8">
                {heroImage ? (
                  <img src={heroImage} alt="Homenajeado" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1a1a24] flex items-center justify-center text-4xl">🍾</div>
                )}
              </motion.div>
              <motion.p variants={fadeUp} className="text-sm font-bold tracking-[0.3em] text-[#FF8C42] uppercase mb-4">
                Despedida de Solter{event.title.toLowerCase().includes("a") ? "a" : "o"}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black text-center mb-8 leading-none">
                {event.title.toUpperCase()}
              </motion.h1>
              
              <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center">
                <span className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">Preparate para deslizar</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#FF6B9D] to-transparent animate-pulse"></div>
              </motion.div>
            </motion.div>
          </section>

          {/* QUOTE / REGLAS */}
          {event.phrase && (
            <section className="py-24 px-6 relative border-t border-white/10 bg-[#1a1a24]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
                <div className="text-5xl text-[#FF6B9D] mb-6 font-serif">"</div>
                <p className="text-xl md:text-3xl font-bold leading-relaxed text-gray-200">
                  {event.phrase}
                </p>
                <div className="text-5xl text-[#FF6B9D] mt-4 font-serif">"</div>
              </motion.div>
            </section>
          )}

          {/* FONDO COMÚN (LA VACA) */}
          {event.bankAlias && (
            <section className="py-24 px-6 relative border-t border-white/5 bg-gradient-to-br from-[#0f0f13] to-[#1a1a24]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-xl mx-auto text-center">
                <motion.h2 variants={fadeUp} className="text-4xl font-black mb-4">Fondo Común 💸</motion.h2>
                <motion.p variants={fadeUp} className="text-gray-400 mb-10">
                  Para que la noche sea épica y nadie se preocupe por sacar la billetera, armamos un fondo común. Transfiere tu parte a este Alias.
                </motion.p>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(78,205,196,0.1)]">
                  <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-2">Alias / CBU</p>
                  <p className="text-2xl font-bold text-[#4ECDC4] mb-2">{event.bankAlias}</p>
                  {event.bankHolder && <p className="text-sm text-gray-400 mb-8">{event.bankHolder}</p>}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(event.bankAlias!);
                      alert("¡Alias copiado!");
                    }}
                    className="px-8 py-3 bg-[#4ECDC4] text-[#1a1a24] font-bold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(78,205,196,0.4)]"
                  >
                    Copiar Alias
                  </button>
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* ITINERARIO */}
          {event.timeline && event.timeline.length > 0 && (
            <section className="py-24 px-6 relative border-t border-white/10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-3xl mx-auto text-center">
                <motion.h2 variants={fadeUp} className="text-4xl font-black mb-12 text-[#FF8C42]">Itinerario de la Muerte 🍻</motion.h2>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-left backdrop-blur-sm">
                  <Timeline event={event} />
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* DÓNDE / CUÁNDO (UBICACIÓN PRINCIPAL) */}
          <section className="py-24 px-6 relative border-t border-white/10 bg-[#1a1a24]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-4xl mx-auto">
              <motion.div variants={fadeUp} className="text-center mb-16">
                <h2 className="text-4xl font-black text-white">Coordenadas 📍</h2>
                <p className="text-gray-400 mt-4">Punto de encuentro principal.</p>
              </motion.div>
              
              <div className="flex flex-col items-center">
                <motion.div variants={fadeUp} className="flex flex-col items-center bg-white/5 border border-white/10 p-10 rounded-3xl w-full max-w-md">
                  <p className="text-3xl font-bold text-white mb-3">{event.eventTime} HS</p>
                  <p className="text-lg font-medium text-[#FF6B9D] mb-2">{event.venueName}</p>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs text-center leading-relaxed">{event.venueAddress}</p>
                  <div className="flex flex-col gap-4 mt-auto w-full">
                    <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 border-2 border-[#FF6B9D] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full text-center hover:bg-[#FF6B9D] hover:shadow-[0_0_20px_rgba(255,107,157,0.4)] transition-all">
                      Ver en Google Maps
                    </a>
                    <div className="flex justify-center mt-2">
                      <AddToCalendar event={event} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* DRESS CODE */}
          {event.dressCode && (
            <section className="py-24 px-6 relative border-t border-white/10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-xl mx-auto text-center">
                <motion.div variants={fadeUp} className="mb-6 text-4xl">👗👕</motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl font-black mb-6">Dress Code</motion.h2>
                <motion.div variants={fadeUp} className="inline-block px-8 py-3 bg-white/10 border border-white/20 rounded-full">
                  <p className="text-lg font-bold tracking-widest uppercase">{event.dressCode}</p>
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* GALERÍA */}
          {event.photos && event.photos.length > 1 && (
            <section className="py-24 px-6 relative border-t border-white/10 bg-[#1a1a24]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-black mb-12">Scrapbook 📸</h2>
                <div className="rounded-3xl overflow-hidden">
                  <PhotoGallery photos={event.photos} accentColor="#FF6B9D" title="" />
                </div>
              </motion.div>
            </section>
          )}

          {/* MURO DE FIRMAS */}
          {event.guestbookEnabled && (
            <section className="py-24 px-6 relative border-t border-white/10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-black mb-8">El Muro de la Vergüenza 🤐</h2>
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-12">
                  Dejá una anécdota, un consejo matrimonial o una amenaza. Lo que pasa en la despedida... queda en el muro.
                </p>
                <div className="text-left bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  <Guestbook event={event} />
                </div>
              </motion.div>
            </section>
          )}

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="py-24 px-6 relative border-t border-white/10 bg-gradient-to-br from-[#0f0f13] to-[#1a1a24]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-xl mx-auto text-center">
                <motion.h2 variants={fadeUp} className="text-4xl font-black mb-6">Confirmar Asistencia</motion.h2>
                <motion.p variants={fadeUp} className="text-gray-400 mb-10">
                  Confirmá rápido así calculamos cuánto escabio comprar.
                </motion.p>
                <motion.div variants={fadeUp} className="text-left bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  <RsvpForm 
                    eventSlug={event.slug || "demo"} 
                    isTrial={event.isTrial || false} 
                    buttonClassName="bg-gradient-to-r from-[#FF8C42] to-[#FF6B9D] text-white" 
                    inputClassName="bg-white/5 border border-white/20 text-white" 
                    labelClassName="text-gray-300" 
                  />
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* FOOTER */}
          <footer className="py-12 px-6 text-center border-t border-white/10">
            <p className="text-sm font-bold tracking-widest text-[#FF8C42] uppercase mb-2">Despedida de {event.title}</p>
            <p className="text-xs text-gray-600">Armado con 🔥 por TeInvitoApp</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
