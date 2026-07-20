"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function ModernGradient({ event }: { event: EventData }) {
  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "";
  const secondName = event.title.split("&")[1]?.trim() || event.title.split(" ").pop() || "";

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#ffffff" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-6">¡Estás invitado!</p>
        <h1 className="text-6xl md:text-8xl font-black leading-tight">
          {firstName}{secondName && <span className="text-white/50 mx-2">&</span>}{secondName}
        </h1>
        {event.subtitle && <p className="text-xl text-white/80 mt-4">{event.subtitle}</p>}
        <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
          <p className="font-medium">{new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })} · {event.eventTime} hs</p>
        </div>
        <p className="text-white/60 mt-3 text-sm">{event.venueName}</p>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-black mb-8">Cuenta regresiva</h2>
          <Countdown targetDate={event.eventDate} boxClassName="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl" numberClassName="text-white font-black" labelClassName="text-white/60" />
        </div>
      </section>

      {/* HISTORIA */}
      {event.phrase && (
        <section className="py-16 px-6">
          <div className="max-w-lg mx-auto text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">Nuestra historia</h2>
            <p className="text-white/85 text-lg leading-relaxed">{event.phrase}</p>
          </div>
        </section>
      )}

      {/* UBICACIONES */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-black mb-8">Ubicación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.ceremonyName && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Ceremonia</p>
                <p className="text-white/90 font-bold text-sm mb-1">{event.ceremonyTime} hs</p>
                <p className="text-white/70 text-sm">{event.ceremonyName}</p>
                <p className="text-white/40 text-xs mt-1 mb-4">{event.ceremonyAddress}</p>
                <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-purple-700 hover:shadow-xl hover:scale-105 transition-all">
                  Cómo llegar
                </a>
              </div>
            )}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Fiesta</p>
              <p className="text-white/90 font-bold text-sm mb-1">{event.eventTime} hs</p>
              <p className="text-white/70 text-sm">{event.venueName}</p>
              <p className="text-white/40 text-xs mt-1 mb-4">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-purple-700 hover:shadow-xl hover:scale-105 transition-all">
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </section>

      {event.dressCode && (
        <section className="py-8 px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto">
            <p className="text-xs uppercase tracking-wider text-white/60 mb-1">Dress Code</p>
            <p className="text-xl font-bold">{event.dressCode}</p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="w-6 h-6 rounded-full" style={{ background: "#667eea" }}></span>
              <span className="w-6 h-6 rounded-full" style={{ background: "#764ba2" }}></span>
              <span className="w-6 h-6 rounded-full" style={{ background: "#f093fb" }}></span>
              <span className="w-6 h-6 rounded-full bg-white"></span>
            </div>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && <PhotoGallery photos={event.photos} accentColor="#ffffff" title="Fotos" />}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-16 px-6">
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
        <section className="py-16 px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">Regalos</h2>
            <p className="text-white/60 text-sm mb-8">Si querés hacernos un regalo, podés transferir acá</p>
            <div className="bg-white/10 backdrop-md border border-white/20 rounded-3xl p-6 space-y-4">
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
        <p className="mt-2">Powered by <span className="text-white/70">Te invito</span></p>
      </footer>
    </div>
  );
}
