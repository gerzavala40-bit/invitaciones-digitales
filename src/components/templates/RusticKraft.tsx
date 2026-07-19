"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function RusticKraft({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen text-[#3d2b1f]" style={{ fontFamily: "'Georgia', serif", background: "linear-gradient(180deg, #f5e6d3 0%, #ede0d4 50%, #e8d5c4 100%)" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#8B4513" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 animate-[fadeIn_1s_ease]">
        <div className="border-2 border-[#8B4513]/30 rounded-lg p-12 md:p-16 max-w-md mx-auto" style={{ background: "rgba(255,255,255,0.4)" }}>
          <p className="text-xs uppercase tracking-[0.5em] text-[#8B4513] mb-6">Te invitamos a celebrar</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#3d2b1f]">{event.title}</h1>
          {event.subtitle && <p className="text-lg text-[#5c4033] mt-4 italic">{event.subtitle}</p>}
          <div className="w-16 h-px bg-[#8B4513]/50 mx-auto my-6" />
          <p className="text-[#5c4033]">{new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          <p className="text-[#5c4033] text-sm mt-1">{event.eventTime} hs · {event.venueName}</p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#8B4513]">Faltan</h2>
          <Countdown targetDate={event.eventDate} boxClassName="bg-white/60 border border-[#8B4513]/20 rounded-lg" numberClassName="text-[#3d2b1f] font-bold" labelClassName="text-[#8B4513]/70" />
        </div>
      </section>

      {/* UBICACION */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#8B4513]">Lugar</h2>
          <p className="text-[#5c4033] text-lg mb-1">{event.venueName}</p>
          <p className="text-[#5c4033]/70 text-sm mb-6">{event.venueAddress}</p>
          <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-[#8B4513] text-white hover:bg-[#6d3610] transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            Cómo llegar
          </a>
        </div>
      </section>

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && <PhotoGallery photos={event.photos} accentColor="#8B4513" />}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-16 px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#8B4513]">Confirmá tu asistencia</h2>
            <div className="bg-white/60 rounded-2xl p-6 border border-[#8B4513]/15">
              <RsvpForm eventSlug={event.slug} inputClassName="border border-[#8B4513]/20 bg-white/80 rounded-lg text-[#3d2b1f] placeholder-[#8B4513]/40 focus:outline-none focus:border-[#8B4513]" buttonClassName="bg-[#8B4513] text-white hover:bg-[#6d3610]" labelClassName="text-[#5c4033] font-medium" />
            </div>
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-16 px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#8B4513]">Regalos</h2>
            <p className="text-[#5c4033]/70 text-sm mb-8">Si querés hacernos un regalo, podés transferir al siguiente alias</p>
            <div className="bg-white/60 rounded-2xl p-6 space-y-4 border border-[#8B4513]/15">
              <div className="flex items-center justify-between bg-white/80 rounded-lg px-4 py-3 border border-[#8B4513]/10">
                <div className="text-left"><p className="text-xs text-[#8B4513]/60 uppercase tracking-wider">Alias</p><p className="font-mono font-medium mt-0.5">{event.bankAlias}</p></div>
                <CopyButton text={event.bankAlias} className="bg-[#8B4513] text-white" />
              </div>
              {event.bankCBU && (
                <div className="flex items-center justify-between bg-white/80 rounded-lg px-4 py-3 border border-[#8B4513]/10">
                  <div className="text-left"><p className="text-xs text-[#8B4513]/60 uppercase tracking-wider">CBU</p><p className="font-mono font-medium text-sm mt-0.5">{event.bankCBU}</p></div>
                  <CopyButton text={event.bankCBU} className="bg-[#8B4513] text-white" />
                </div>
              )}
              {event.bankHolder && <p className="text-[#5c4033]/60 text-xs pt-2">Titular: {event.bankHolder}</p>}
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 text-center text-[#8B4513]/50 text-xs">
        <p>Con todo nuestro amor</p>
        <p className="mt-2">Powered by <span className="text-[#8B4513]">TeInvitoApp</span></p>
      </footer>
    </div>
  );
}
