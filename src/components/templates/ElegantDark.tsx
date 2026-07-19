"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";

export default function ElegantDark({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 animate-[fadeIn_1s_ease]">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">Estamos felices de invitarte</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-2 leading-tight">
          <span className="block">{event.title}</span>
        </h1>
        {event.subtitle && <p className="text-lg text-gray-300 mt-4">{event.subtitle}</p>}
        <p className="text-xl font-medium text-white mt-4">{new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        <p className="text-gray-400 mt-1">{event.eventTime} hs - {event.venueName}</p>
        <div className="mt-12 animate-bounce">
          <svg className="w-6 h-6 text-[#d4af37] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-3xl mb-8 text-[#d4af37]">Faltan</h2>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] rounded-xl"
            numberClassName="text-white"
            labelClassName="text-gray-400"
          />
        </div>
      </section>

      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

      {/* UBICACION */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-3xl mb-4 text-[#d4af37]">Ubicación</h2>
          <p className="text-gray-300 mb-2">{event.venueName}</p>
          <p className="text-gray-400 text-sm mb-6">{event.venueAddress}</p>
          <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Cómo llegar
          </a>
        </div>
      </section>

      {event.dressCode && (
        <>
          <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <section className="py-12 px-4 text-center">
            <h2 className="font-serif text-2xl mb-2 text-[#d4af37]">Dress Code</h2>
            <p className="text-gray-300 text-lg">{event.dressCode}</p>
          </section>
        </>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <>
          <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <section className="py-16 px-4">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="font-serif text-3xl mb-4 text-[#d4af37]">Confirmá tu asistencia</h2>
              {event.rsvpDeadline && <p className="text-gray-400 text-sm mb-8">Confirmá antes del {event.rsvpDeadline}</p>}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <RsvpForm
                  eventSlug={event.slug}
                  inputClassName="bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  buttonClassName="bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] font-bold"
                  labelClassName="text-gray-300"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <>
          <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <section className="py-16 px-4">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="font-serif text-3xl mb-4 text-[#d4af37]">Regalos</h2>
              <p className="text-gray-400 text-sm mb-8">Si querés hacernos un regalo, podés transferir al siguiente alias</p>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
                  <div className="text-left">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Alias</p>
                    <p className="text-white font-mono font-medium">{event.bankAlias}</p>
                  </div>
                  <CopyButton text={event.bankAlias} className="bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e]" />
                </div>
                {event.bankCBU && (
                  <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
                    <div className="text-left">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">CBU</p>
                      <p className="text-white font-mono font-medium text-sm">{event.bankCBU}</p>
                    </div>
                    <CopyButton text={event.bankCBU} className="bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e]" />
                  </div>
                )}
                {event.bankHolder && <p className="text-gray-400 text-xs pt-2">Titular: {event.bankHolder}</p>}
              </div>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500 text-xs">
        <p>Hecho con amor para nuestro evento especial</p>
        <p className="mt-1">Powered by <span className="text-[#d4af37]">MiPlataforma.com</span></p>
      </footer>
    </div>
  );
}
