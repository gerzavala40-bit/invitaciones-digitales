"use client";

import React from "react";
import { EventData } from "./types";
import { motion } from "framer-motion";
import RsvpForm from "./shared/RsvpForm";
import Countdown from "./shared/Countdown";
import Image from "next/image";

export default function JuliaXV({ event }: { event: EventData }) {
  // Use event details, fallback to some defaults to keep the format if data is missing
  const title = event.title || "MIS XV JULIA";
  const ceremonyTime = event.ceremonyTime || event.eventTime || "21:00";
  const dateObj = new Date(event.eventDate);
  
  // Format date natively
  const dateStr = dateObj.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  const primaryPhoto = event.photos && event.photos.length > 0 
    ? event.photos[0].url 
    : "https://latarjetadigital.app/wp-content/uploads/2026/07/120227-JULI6.webp";
    
  const secondaryPhoto = event.photos && event.photos.length > 1 
    ? event.photos[1].url 
    : "https://latarjetadigital.app/wp-content/uploads/2026/07/120227-JULI1-767x1024.webp";

  const rsvpDeadlineStr = event.rsvpDeadline 
    ? new Date(event.rsvpDeadline).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
    : "11 DE ENERO 2027";

  const venueName = event.ceremonyName || event.venueName || "Solares del Sur";
  const venueAddress = event.ceremonyAddress || event.venueAddress || "Es 4 de Enero 899";

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }} className="min-h-screen bg-[#FDFDFD] text-[#333333] selection:bg-[#c2a990] selection:text-white pb-20">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={primaryPhoto} 
            alt="Portada"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-white text-sm md:text-base tracking-[0.4em] font-light mb-4">BIENVENIDA</h2>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-[0.1em] leading-tight mb-2 drop-shadow-md">
            {title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word} <br/>
              </React.Fragment>
            ))}
          </h1>
        </motion.div>
      </section>

      {/* COUNTDOWN SECTION */}
      <section className="py-20 px-6 text-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-sm tracking-[0.3em] font-light text-gray-500 mb-10">QUE COMIENCE LA MAGIA...</p>
          
          <div className="flex justify-center gap-4 sm:gap-8 text-center mb-10">
            <Countdown targetDate={event.eventDate} />
          </div>

          <div className="w-12 h-[1px] bg-[#c2a990] mx-auto my-12"></div>
        </motion.div>
      </section>

      {/* EVENT DETAILS */}
      <section className="py-16 px-6 bg-[#f9f8f6] text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-xl mx-auto"
        >
          <h3 className="text-2xl font-bold tracking-[0.2em] mb-4 text-[#333]">¿CUÁNDO?</h3>
          <p className="text-[15px] font-medium tracking-widest text-gray-600 mb-2">{dateStr}</p>
          <p className="text-[15px] font-medium tracking-widest text-gray-600 mb-12">| {ceremonyTime} HS |</p>

          <h3 className="text-2xl font-bold tracking-[0.2em] mb-4 text-[#333]">¿DÓNDE?</h3>
          <p className="text-base text-gray-600 mb-1">{venueName}</p>
          <p className="text-base text-gray-600 mb-8">{venueAddress}</p>
          
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress || venueName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-10 py-3 border border-[#c2a990] text-[#c2a990] font-medium tracking-[0.2em] text-xs uppercase hover:bg-[#c2a990] hover:text-white transition duration-300"
          >
            Cómo llegar
          </a>
        </motion.div>
      </section>

      {/* SECONDARY PHOTO */}
      <section className="w-full h-[60vh] relative">
        <Image 
          src={secondaryPhoto}
          alt="Foto secundaria"
          fill
          className="object-cover object-center"
        />
      </section>

      {/* PAYMENT / GIFTS SECTION */}
      <section className="py-20 px-6 text-center bg-white">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold tracking-[0.2em] mb-6 text-[#333]">VALOR TARJETA</h3>
          <p className="text-sm font-light text-gray-500 leading-relaxed tracking-wide mb-10 max-w-lg mx-auto uppercase">
            Me llenaría de felicidad poder compartir este día tan especial con ustedes. A continuación les dejo los detalles para realizar el pago de su tarjeta.
          </p>

          <details className="group border border-[#eaeaea] rounded-none bg-[#fdfdfd] cursor-pointer">
            <summary className="px-6 py-4 font-medium tracking-[0.15em] text-[#c2a990] list-none flex justify-between items-center uppercase text-sm">
              Ver valor tarjeta
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="px-6 pb-6 pt-2 text-left border-t border-[#eaeaea]">
              <div className="mb-6">
                <p className="font-bold text-sm tracking-widest text-[#333] mb-1">ADULTOS</p>
                <p className="text-lg text-gray-600">$80.000</p>
              </div>
              <div className="mb-6">
                <p className="font-bold text-sm tracking-widest text-[#333] mb-1">JÓVENES</p>
                <p className="text-lg text-gray-600">$60.000</p>
              </div>
              <div>
                <p className="font-bold text-sm tracking-widest text-[#333] mb-3">PAGO</p>
                <p className="text-xs tracking-widest text-gray-500 mb-1">ALIAS:</p>
                <p className="text-sm font-medium text-gray-700 mb-3 bg-gray-100 p-2 inline-block rounded">j.del.pino</p>
                
                <p className="text-xs tracking-widest text-gray-500 mb-1">CVU:</p>
                <p className="text-sm font-medium text-gray-700 break-all bg-gray-100 p-2 inline-block rounded">0000003100022314329967</p>
              </div>
            </div>
          </details>
        </motion.div>
      </section>

      {/* DRESS CODE & RSVP */}
      <section className="py-16 px-6 bg-[#f9f8f6] text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto space-y-16"
        >
          {/* Dress Code */}
          <div>
            <h3 className="text-2xl font-bold tracking-[0.2em] mb-4 text-[#333]">DRESS CODE</h3>
            <p className="text-base tracking-[0.2em] font-light text-gray-600">{event.dressCode?.toUpperCase() || "FORMAL"}</p>
          </div>

          <div className="w-12 h-[1px] bg-[#c2a990] mx-auto"></div>

          {/* RSVP */}
          <div id="rsvp">
            <h3 className="text-2xl font-bold tracking-[0.2em] mb-4 text-[#333]">CONFIRMÁ TU ASISTENCIA</h3>
            <p className="text-sm tracking-[0.1em] font-medium text-[#c2a990] mb-8">
              ANTES DEL {rsvpDeadlineStr}
            </p>
            <div className="text-left bg-white p-6 shadow-sm border border-[#eaeaea]">
              <RsvpForm 
                eventSlug={event.slug} 
                buttonClassName="bg-[#c2a990] text-white hover:bg-[#a98f73]"
                inputClassName="border border-[#eaeaea] bg-[#f9f8f6]"
                labelClassName="text-[#333] tracking-widest uppercase text-xs font-semibold"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="px-6"
        >
          <h2 className="text-2xl font-light tracking-[0.3em] text-[#333] mb-4">BRILLEMOS JUNTOS...</h2>
          <h2 className="text-3xl font-bold tracking-[0.2em] text-[#c2a990] mb-12">TE ESPERO!</h2>

          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 rounded-full border border-[#c2a990] flex items-center justify-center text-[#c2a990] hover:bg-[#c2a990] hover:text-white transition">
              IG
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-[#c2a990] flex items-center justify-center text-[#c2a990] hover:bg-[#c2a990] hover:text-white transition">
              WA
            </a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
