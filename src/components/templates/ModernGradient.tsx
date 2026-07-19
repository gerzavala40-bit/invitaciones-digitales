"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function ModernGradient({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#ffffff" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 animate-[fadeIn_1s_ease]">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-6">¡Estás invitado!</p>
        <h1 className="text-6xl md:text-8xl font-black leading-tight">{event.title}</h1>
        {event.subtitle && <p className="text-xl text-white/80 mt-4">{event.subtitle}</p>}
        <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
          <p className="font-medium">{new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })} · {event.eventTime} hs</p>
        </div>
        <p className="text-white/60 mt-3 text-sm">{event.venueName}</p>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-black mb-8">Cuenta regresiva</h2>
          <Countdown targetDate={event.eventDate} boxClassName="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl" numberClassName="text-white font-black" labelClassName="text-white/60" />
        </div>
      </section>

      {/* UBICACION */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Ubicación</h2>
          <p className="text-white/90 text-lg mb-1">{event.venueName}</p>
          <p className="text-white/60 text-sm mb-6">{event.venueAddress}</p>
          <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-purple-700 hover:shadow-xl hover:scale-105 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            Cómo llegar
          </a>
        </div>
      </section>

      {event.dressCode && (
        <section className="py-8 px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto">
            <p className="text-xs uppercase tracking-wider text-white/60 mb-1">Dress Code</p>
            <p className="text-xl font-bold">{event.dressCode}</p>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && <PhotoGallery photos={event.photos} accentColor="#ffffff" title="Fotos" />}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-16 px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">¿Venís?</h2>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
              <RsvpForm eventSlug={event.slug} inputClassName="bg-white/15 border border-white/25 text-white placeholder-white/40 rounded-xl focus:outline-none focus:border-white/60" buttonClassName="bg-white text-purple-700 font-bold hover:shadow-xl" labelClassName="text-white/80" />
            </div>
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-16 px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">Regalos</h2>
            <p className="text-white/60 text-sm mb-8">Si querés hacernos un regalo, podés transferir acá</p>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between bg-white/15 rounded-xl px-4 py-3">
                <div className="text-left"><p className="text-xs text-white/50 uppercase tracking-wider">Alias</p><p className="font-mono font-medium mt-0.5">{event.bankAlias}</p></div>
                <CopyButton text={event.bankAlias} className="bg-white text-purple-700 font-bold" />
              </div>
              {event.bankCBU && (
                <div className="flex items-center justify-between bg-white/15 rounded-xl px-4 py-3">
                  <div className="text-left"><p className="text-xs text-white/50 uppercase tracking-wider">CBU</p><p className="font-mono font-medium text-sm mt-0.5">{event.bankCBU}</p></div>
                  <CopyButton text={event.bankCBU} className="bg-white text-purple-700 font-bold" />
                </div>
              )}
              {event.bankHolder && <p className="text-white/40 text-xs pt-2">Titular: {event.bankHolder}</p>}
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 text-center text-white/40 text-xs">
        <p>¡Nos vemos en la fiesta!</p>
        <p className="mt-2">Powered by <span className="text-white/70">TeInvitoApp</span></p>
      </footer>
    </div>
  );
}
