"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function MinimalWhite({ event }: { event: EventData }) {
  return (
    <div className="min-h-screen text-[#111] bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#111" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-8">{event.eventType === "cumpleanos" ? "Cumpleaños" : "Invitación"}</p>
        <h1 className="text-6xl md:text-8xl font-black leading-none mb-2">{event.title.split("&")[0]?.trim() || event.title}</h1>
        {event.subtitle && <p className="text-xl text-[#666] mt-4">{event.subtitle}</p>}
        {!event.subtitle && event.eventType === "cumpleanos" && <p className="text-xl text-[#666] mt-2">Y quiere festejarlo con vos</p>}
        <p className="text-sm text-[#999] mt-6">
          📅 {new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}, {event.eventTime}hs
        </p>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#999] mb-10">Faltan</h2>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-white border border-[#eee] rounded-xl shadow-sm"
            numberClassName="text-[#111] font-black text-3xl md:text-4xl"
            labelClassName="text-[#999] text-[10px] uppercase tracking-widest"
          />
        </div>
      </section>

      {/* FRASE */}
      {event.phrase && (
        <section className="py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#999] mb-6">La previa</h2>
            <p className="text-[#444] text-base leading-relaxed">{event.phrase}</p>
          </div>
        </section>
      )}

      {/* INFO DEL EVENTO */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Info del evento</h2>
          <p className="text-[#666] text-sm mb-10">Todo lo que necesitás saber</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#eee] rounded-2xl p-6 text-left">
              <p className="text-xs uppercase tracking-wider text-[#999] mb-2">Lugar</p>
              <p className="font-semibold text-sm">{event.venueName}</p>
              <p className="text-[#666] text-xs mt-1">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" className="inline-block mt-3 text-[#111] text-xs font-medium hover:underline">
                Ver en el mapa →
              </a>
            </div>
            {event.dressCode && (
              <div className="bg-white border border-[#eee] rounded-2xl p-6 text-left">
                <p className="text-xs uppercase tracking-wider text-[#999] mb-2">Dress code</p>
                <p className="font-semibold text-sm">{event.dressCode}</p>
                <p className="text-[#666] text-xs mt-1">Nada de formal, pero tampoco ojotas 😄</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Fotos</h2>
            <p className="text-[#666] text-sm mb-10">Un poco de mí</p>
            <PhotoGallery photos={event.photos} accentColor="#111" title="" />
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-20 px-6 bg-[#FAFAFA]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Regalos</h2>
            <p className="text-[#111] font-semibold mb-2">¿Querés hacerme un regalo?</p>
            <p className="text-[#666] text-sm mb-8">Con tu presencia alcanza y sobra, pero si querés sumar algo, este es mi alias.</p>
            <div className="bg-white border border-[#eee] rounded-2xl p-6">
              <p className="text-[#111] font-mono text-lg font-bold mb-1">{event.bankAlias}</p>
              <p className="text-[#999] text-xs mb-4">Alias{event.bankHolder ? ` · ${event.bankHolder}` : ""}</p>
              <CopyButton text={event.bankAlias} className="bg-[#111] text-white hover:bg-[#333]" />
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Confirmación</h2>
            <p className="text-[#111] font-semibold text-lg mb-8">¿Venís?</p>
            <div className="bg-[#FAFAFA] border border-[#eee] rounded-2xl p-6 text-left">
              <RsvpForm
                eventSlug={event.slug}
                inputClassName="bg-white border border-[#ddd] text-[#111] placeholder-[#bbb] rounded-lg focus:outline-none focus:border-[#111]"
                buttonClassName="bg-[#111] text-white font-medium hover:bg-[#333]"
                labelClassName="text-[#999] text-xs uppercase tracking-wider"
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-[#eee]">
        <p className="text-[#ccc] text-xs">{event.title} · {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })}</p>
        <p className="text-[#ddd] text-[10px] mt-3">Powered by TeInvitoApp</p>
      </footer>
    </div>
  );
}
