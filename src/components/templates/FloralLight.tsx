"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function FloralLight({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#4a3728]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* MUSIC PLAYER */}
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#c27a6e" />}
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 relative animate-[fadeIn_1.2s_ease]">
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-[#c27a6e] opacity-30 rounded-tl-3xl" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-[#c27a6e] opacity-30 rounded-tr-3xl" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-[#c27a6e] opacity-30 rounded-bl-3xl" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-[#c27a6e] opacity-30 rounded-br-3xl" />
        <p className="text-sm uppercase tracking-[0.4em] text-[#7a8f6d] mb-6">Nos casamos</p>
        <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight">{event.title}</h1>
        <div className="mt-8">
          <p className="text-lg text-[#6b5344]">{new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          <p className="text-sm text-[#8b7565]">{event.eventTime} hs | {event.venueName}</p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-4 bg-[#fef1ee]">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-4xl mb-8 text-[#c27a6e]">Faltan</h2>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-white border border-[#c27a6e]/20 shadow-sm rounded-2xl"
            numberClassName="font-serif font-bold text-[#4a3728]"
            labelClassName="text-[#8b7565]"
            finishedText="¡El gran día ha llegado!"
          />
        </div>
      </section>

      {/* UBICACION */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto space-y-6">
          <h2 className="font-serif text-4xl text-center mb-8 text-[#c27a6e]">Ceremonia & Fiesta</h2>
          {event.ceremonyName && (
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#7a8f6d] mb-2">Ceremonia</p>
              <h3 className="font-serif text-2xl mb-1">{event.ceremonyName}</h3>
              <p className="text-sm text-[#8b7565] mb-4">{event.ceremonyAddress} {event.ceremonyTime && `| ${event.ceremonyTime} hs`}</p>
              <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-gradient-to-r from-[#c27a6e] to-[#d4978d] hover:shadow-lg transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                Cómo llegar
              </a>
            </div>
          )}
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <p className="text-xs uppercase tracking-wider text-[#7a8f6d] mb-2">Fiesta</p>
            <h3 className="font-serif text-2xl mb-1">{event.venueName}</h3>
            <p className="text-sm text-[#8b7565] mb-4">{event.venueAddress} | {event.eventTime} hs</p>
            <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-gradient-to-r from-[#c27a6e] to-[#d4978d] hover:shadow-lg transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              Cómo llegar
            </a>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <PhotoGallery photos={event.photos} accentColor="#c27a6e" title="Nuestra historia" />
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-16 px-4 bg-[#fef1ee]">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-serif text-4xl mb-4 text-[#c27a6e]">Confirmá tu asistencia</h2>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <RsvpForm
                eventSlug={event.slug}
                inputClassName="border border-[#e8d5cf] bg-[#fdf8f4] focus:outline-none focus:border-[#c27a6e] text-[#4a3728] placeholder-[#b09a8f]"
                buttonClassName="bg-gradient-to-r from-[#c27a6e] to-[#d4978d] text-white"
                labelClassName="text-[#6b5344] font-medium"
              />
            </div>
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-16 px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-serif text-4xl mb-4 text-[#c27a6e]">Regalos</h2>
            <p className="text-[#8b7565] text-sm mb-8">Si querés hacernos un regalo, podés transferir al siguiente alias</p>
            <div className="bg-white rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border border-[#e8d5cf] rounded-xl px-4 py-3">
                <div className="text-left"><p className="text-xs text-[#8b7565] uppercase tracking-wider">Alias</p><p className="font-mono font-medium mt-0.5">{event.bankAlias}</p></div>
                <CopyButton text={event.bankAlias} className="bg-gradient-to-r from-[#c27a6e] to-[#d4978d] text-white" />
              </div>
              {event.bankCBU && (
                <div className="flex items-center justify-between border border-[#e8d5cf] rounded-xl px-4 py-3">
                  <div className="text-left"><p className="text-xs text-[#8b7565] uppercase tracking-wider">CBU</p><p className="font-mono font-medium text-sm mt-0.5">{event.bankCBU}</p></div>
                  <CopyButton text={event.bankCBU} className="bg-gradient-to-r from-[#c27a6e] to-[#d4978d] text-white" />
                </div>
              )}
              {event.bankHolder && <p className="text-[#8b7565] text-xs pt-2">Titular: {event.bankHolder}</p>}
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 text-center text-[#b09a8f] text-xs bg-[#fef1ee]">
        <p>Con todo nuestro amor</p>
        <p className="mt-2">Powered by <span className="text-[#c27a6e]">MiPlataforma.com</span></p>
      </footer>
    </div>
  );
}
