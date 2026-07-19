"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";

export default function MinimalWhite({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen bg-white text-[#111]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 animate-[fadeIn_1s_ease]">
        <p className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-10">Invitación</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">{event.title}</h1>
        <div className="w-10 h-0.5 bg-black mx-auto mb-8" />
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " . ")}
        </p>
        <p className="text-sm text-gray-400 mt-2">{event.eventTime} hs</p>
      </section>

      <div className="w-px h-16 bg-gray-200 mx-auto" />

      {/* COUNTDOWN */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-8">Cuenta regresiva</p>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="border border-gray-200 rounded-lg"
            numberClassName="text-3xl md:text-4xl font-bold text-black"
            labelClassName="text-[10px] uppercase tracking-widest text-gray-400"
          />
        </div>
      </section>

      <div className="w-px h-16 bg-gray-200 mx-auto" />

      {/* UBICACION */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-6">Ubicación</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-2">{event.venueName}</h2>
          <p className="text-gray-500 text-sm mb-8">{event.venueAddress}</p>
          <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm bg-black text-white hover:bg-gray-800 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            Ver en Google Maps
          </a>
        </div>
      </section>

      <div className="w-px h-16 bg-gray-200 mx-auto" />

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-6 text-center">Confirmación</p>
            <RsvpForm
              eventSlug={event.slug}
              inputClassName="border-b border-gray-300 bg-transparent py-3 text-lg focus:outline-none focus:border-black text-black placeholder-gray-300"
              buttonClassName="bg-black text-white uppercase tracking-wider"
              labelClassName="text-xs uppercase tracking-wider text-gray-500"
            />
          </div>
        </section>
      )}

      <div className="w-px h-16 bg-gray-200 mx-auto" />

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-8">Regalos</p>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="text-left"><p className="text-[10px] uppercase tracking-widest text-gray-400">Alias</p><p className="font-mono text-base font-medium mt-1">{event.bankAlias}</p></div>
                <CopyButton text={event.bankAlias} className="border border-black text-black hover:bg-black hover:text-white" />
              </div>
              {event.bankCBU && (
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="text-left"><p className="text-[10px] uppercase tracking-widest text-gray-400">CBU</p><p className="font-mono text-sm font-medium mt-1">{event.bankCBU}</p></div>
                  <CopyButton text={event.bankCBU} className="border border-black text-black hover:bg-black hover:text-white" />
                </div>
              )}
              {event.bankHolder && <p className="text-gray-400 text-xs mt-4">Titular: {event.bankHolder}</p>}
            </div>
          </div>
        </section>
      )}

      <footer className="py-12 text-center border-t border-gray-100">
        <p className="text-gray-300 text-xs uppercase tracking-widest">{event.title}</p>
        <p className="text-gray-300 text-[10px] mt-3">Powered by MiPlataforma.com</p>
      </footer>
    </div>
  );
}
