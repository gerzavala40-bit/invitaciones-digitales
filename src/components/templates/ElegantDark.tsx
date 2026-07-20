"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function ElegantDark({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(180deg, #0a0a0f 0%, #111118 50%, #0d0d12 100%)" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#C9A84C" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative">
        {/* Monograma */}
        <div className="w-16 h-16 rounded-full border border-[#C9A84C]/40 flex items-center justify-center mb-8">
          <span className="font-serif italic text-[#C9A84C] text-lg">{event.title.split(" ")[0]?.[0]}&{event.title.split(" ").pop()?.[0]}</span>
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-[#C9A84C]/70 mb-6">Nos casamos</p>

        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-4">
          <span className="text-[#C9A84C]">{event.title.split("&")[0]?.trim() || event.title.split(" ")[0]}</span>
          <span className="text-white/40 mx-2">&</span>
          <span className="text-white">{event.title.split("&")[1]?.trim() || event.title.split(" ").pop()}</span>
        </h1>

        <p className="text-white/50 text-sm mt-4">
          {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })} — {event.venueAddress?.split(",").pop()?.trim() || ""}
        </p>

        <div className="mt-16 animate-bounce text-white/30 text-sm">↓ Desliza</div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-10">Falta muy poco</h2>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-white/[0.03] border border-white/[0.08] rounded-xl"
            numberClassName="text-[#C9A84C] font-serif text-3xl md:text-4xl"
            labelClassName="text-white/40 text-[10px] uppercase tracking-widest"
          />
        </div>
      </section>

      {/* FRASE / HISTORIA */}
      {event.phrase && (
        <section className="py-20 px-6 border-t border-white/[0.06]">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-6">Nuestra historia</h2>
            <p className="text-white/60 text-base leading-relaxed italic font-serif">{event.phrase}</p>
          </div>
        </section>
      )}

      {/* UBICACIONES */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-3">Cuándo y dónde</h2>
          <p className="text-white/40 text-sm mb-10">Los esperamos</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.ceremonyName && (
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-3">Ceremonia</p>
                <p className="text-white/80 font-semibold text-sm mb-1">{event.ceremonyTime} hs</p>
                <p className="text-white/50 text-sm">{event.ceremonyName}</p>
                <p className="text-white/30 text-xs mt-1">{event.ceremonyAddress}</p>
                <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" className="inline-block mt-4 text-[#C9A84C] text-xs border border-[#C9A84C]/30 px-4 py-2 rounded-full hover:bg-[#C9A84C]/10 transition">
                  Ver en el mapa
                </a>
              </div>
            )}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-3">Fiesta</p>
              <p className="text-white/80 font-semibold text-sm mb-1">{event.eventTime} hs</p>
              <p className="text-white/50 text-sm">{event.venueName}</p>
              <p className="text-white/30 text-xs mt-1">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" className="inline-block mt-4 text-[#C9A84C] text-xs border border-[#C9A84C]/30 px-4 py-2 rounded-full hover:bg-[#C9A84C]/10 transition">
                Ver en el mapa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      {event.dressCode && (
        <section className="py-16 px-6 border-t border-white/[0.06]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-3">Dress code</h2>
            <p className="text-white/80 text-lg font-serif italic">{event.dressCode}</p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10"></span>
              <span className="w-6 h-6 rounded-full bg-[#2c2c3e] border border-white/10"></span>
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] border border-white/10"></span>
              <span className="w-6 h-6 rounded-full bg-[#8B6914] border border-white/10"></span>
            </div>
            <p className="text-white/30 text-xs mt-3">Evitar blanco y colores muy claros</p>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <section className="py-20 px-6 border-t border-white/[0.06]">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-3">Nosotros</h2>
            <p className="text-white/40 text-sm mb-10">Un poco de nuestra historia</p>
            <PhotoGallery photos={event.photos} accentColor="#C9A84C" title="" />
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-20 px-6 border-t border-white/[0.06]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-3">Regalos</h2>
            <p className="text-white/70 text-base font-serif italic mb-2">Tu presencia es nuestro regalo</p>
            <p className="text-white/40 text-sm mb-8">Si además querés hacernos un regalo, esto nos ayuda a construir nuestro hogar.</p>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <p className="text-[#C9A84C] font-mono text-lg mb-1">{event.bankAlias}</p>
              <p className="text-white/40 text-xs mb-4">Alias{event.bankHolder ? ` · ${event.bankHolder}` : ""}</p>
              <CopyButton text={event.bankAlias} className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/20" />
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-20 px-6 border-t border-white/[0.06]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/70 mb-3">Confirmación</h2>
            <p className="text-white/70 text-lg font-serif italic mb-8">¿Nos acompañás?</p>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 text-left">
              <RsvpForm
                eventSlug={event.slug}
                inputClassName="bg-white/[0.05] border border-white/[0.1] text-white placeholder-white/30 rounded-lg focus:outline-none focus:border-[#C9A84C]/50"
                buttonClassName="bg-[#C9A84C] text-[#0a0a0f] font-medium hover:bg-[#d4b85c]"
                labelClassName="text-white/50 text-xs uppercase tracking-wider"
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-white/[0.06]">
        <p className="text-white/30 text-xs">{event.title} · {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
        <p className="text-white/15 text-[10px] mt-3">Powered by TeInvitoApp</p>
      </footer>
    </div>
  );
}
