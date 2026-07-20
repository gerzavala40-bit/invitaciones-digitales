"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function FloralLight({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen text-[#3d3028]" style={{ fontFamily: "'Inter', sans-serif", background: "#FDF9F5" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#B8705A" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <p className="text-2xl text-[#B8705A]/60 mb-6">✿ ✿ ✿</p>
        <p className="text-xs uppercase tracking-[0.4em] text-[#B8705A]/70 mb-6">Nos casamos</p>

        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-4">
          <span className="text-[#B8705A]">{event.title.split("&")[0]?.trim() || event.title.split(" ")[0]}</span>
          <span className="text-[#3d3028]/30 mx-2">&</span>
          <span className="text-[#3d3028]">{event.title.split("&")[1]?.trim() || event.title.split(" ").pop()}</span>
        </h1>

        <p className="text-[#3d3028]/50 text-sm mt-4">
          {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })} — {event.venueAddress?.split(",").pop()?.trim() || ""}
        </p>

        <div className="mt-16 text-[#B8705A]/40 text-2xl">✿</div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 px-6 bg-[#F7F0EA]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-10">Cuenta regresiva</h2>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-white border border-[#B8705A]/10 rounded-xl shadow-sm"
            numberClassName="text-[#B8705A] font-serif text-3xl md:text-4xl"
            labelClassName="text-[#3d3028]/40 text-[10px] uppercase tracking-widest"
          />
        </div>
      </section>

      {/* HISTORIA */}
      {event.phrase && (
        <section className="py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-6">Nuestra historia</h2>
            <p className="text-[#3d3028]/60 text-base leading-relaxed italic font-serif">{event.phrase}</p>
          </div>
        </section>
      )}

      {/* UBICACIONES */}
      <section className="py-20 px-6 bg-[#F7F0EA]">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-3">Cuándo y dónde</h2>
          <p className="text-[#3d3028]/40 text-sm mb-10">Los esperamos</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.ceremonyName && (
              <div className="bg-white border border-[#B8705A]/10 rounded-2xl p-6 shadow-sm">
                <p className="text-xl mb-3">🕊</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8705A] mb-3">Ceremonia</p>
                <p className="text-[#3d3028]/80 font-semibold text-sm mb-1">{event.ceremonyTime} hs</p>
                <p className="text-[#3d3028]/50 text-sm">{event.ceremonyName}</p>
                <p className="text-[#3d3028]/30 text-xs mt-1">{event.ceremonyAddress}</p>
                <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" className="inline-block mt-4 text-[#B8705A] text-xs border border-[#B8705A]/30 px-4 py-2 rounded-full hover:bg-[#B8705A]/10 transition">
                  Ver en el mapa
                </a>
              </div>
            )}
            <div className="bg-white border border-[#B8705A]/10 rounded-2xl p-6 shadow-sm">
              <p className="text-xl mb-3">🎉</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8705A] mb-3">Fiesta</p>
              <p className="text-[#3d3028]/80 font-semibold text-sm mb-1">{event.eventTime} hs</p>
              <p className="text-[#3d3028]/50 text-sm">{event.venueName}</p>
              <p className="text-[#3d3028]/30 text-xs mt-1">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" className="inline-block mt-4 text-[#B8705A] text-xs border border-[#B8705A]/30 px-4 py-2 rounded-full hover:bg-[#B8705A]/10 transition">
                Ver en el mapa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      {event.dressCode && (
        <section className="py-16 px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-3">Dress code</h2>
            <p className="text-[#3d3028]/80 text-lg font-serif italic">{event.dressCode}</p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="w-6 h-6 rounded-full bg-[#E8D5C4] border border-[#B8705A]/10"></span>
              <span className="w-6 h-6 rounded-full bg-[#B8705A] border border-[#B8705A]/10"></span>
              <span className="w-6 h-6 rounded-full bg-[#7A8F6D] border border-[#B8705A]/10"></span>
              <span className="w-6 h-6 rounded-full bg-[#D4978D] border border-[#B8705A]/10"></span>
            </div>
            <p className="text-[#3d3028]/30 text-xs mt-3">Colores suaves y tonos tierra</p>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <section className="py-20 px-6 bg-[#F7F0EA]">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-3">Nosotros</h2>
            <p className="text-[#3d3028]/40 text-sm mb-10">Un poco de nuestra historia</p>
            <PhotoGallery photos={event.photos} accentColor="#B8705A" title="" />
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-3">Regalos</h2>
            <p className="text-[#3d3028]/70 text-base font-serif italic mb-2">Tu presencia es nuestro regalo</p>
            <p className="text-[#3d3028]/40 text-sm mb-8">Si además querés hacernos un regalo, esto nos ayuda a empezar esta nueva etapa.</p>
            <div className="bg-white border border-[#B8705A]/10 rounded-2xl p-6 shadow-sm">
              <p className="text-[#B8705A] font-mono text-lg mb-1">{event.bankAlias}</p>
              <p className="text-[#3d3028]/40 text-xs mb-4">Alias{event.bankHolder ? ` · ${event.bankHolder}` : ""}</p>
              <CopyButton text={event.bankAlias} className="bg-[#B8705A]/10 border border-[#B8705A]/20 text-[#B8705A] hover:bg-[#B8705A]/20" />
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-20 px-6 bg-[#F7F0EA]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#B8705A]/70 mb-3">Confirmación</h2>
            <p className="text-[#3d3028]/70 text-lg font-serif italic mb-8">¿Nos acompañás?</p>
            <div className="bg-white border border-[#B8705A]/10 rounded-2xl p-6 shadow-sm text-left">
              <RsvpForm
                eventSlug={event.slug}
                inputClassName="bg-[#FDF9F5] border border-[#B8705A]/15 text-[#3d3028] placeholder-[#3d3028]/30 rounded-lg focus:outline-none focus:border-[#B8705A]/40"
                buttonClassName="bg-[#B8705A] text-white font-medium hover:bg-[#a5624d]"
                labelClassName="text-[#3d3028]/50 text-xs uppercase tracking-wider"
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-10 text-center">
        <p className="text-[#3d3028]/30 text-xs">{event.title} · {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
        <p className="text-[#3d3028]/15 text-[10px] mt-3">Powered by TeInvitoApp</p>
      </footer>
    </div>
  );
}
