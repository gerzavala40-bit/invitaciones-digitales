"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function RusticKraft({ event }: { event: EventData }) {
  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "";
  const secondName = event.title.split("&")[1]?.trim() || event.title.split(" ").pop() || "";

  return (
    <div className="min-h-screen text-[#3d2b1f]" style={{ fontFamily: "Georgia, 'Cormorant Garamond', serif", background: "#F3E7D4" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#8B4513" />}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-16 h-16 rounded-full border border-[#8B4513]/50 flex items-center justify-center italic text-xl text-[#8B4513] mb-8">
          {firstName[0]}{secondName ? `&${secondName[0]}` : ""}
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#8B4513] mb-6">Te invitamos a celebrar</p>
        <h1 className="text-5xl md:text-7xl italic leading-tight text-[#3d2b1f]">
          {firstName}{secondName && <span className="text-[#8B4513] mx-3 not-italic">&</span>}{secondName}
        </h1>
        {event.subtitle && <p className="text-lg text-[#5c4033] mt-4 italic">{event.subtitle}</p>}
        <div className="w-16 h-px bg-[#8B4513]/50 mx-auto my-7" />
        <p className="text-[#5c4033]">
          {new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
        <p className="text-[#5c4033]/70 text-sm mt-1">{event.venueAddress?.split(",").pop()?.trim() || event.venueName}</p>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 px-6 bg-[#EBDCC3]">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-8">Cuenta regresiva</p>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-[#F3E7D4] border border-[#8B4513]/20 rounded-lg"
            numberClassName="text-[#3d2b1f] italic font-normal"
            labelClassName="text-[#8B4513]/70"
          />
        </div>
      </section>

      {/* HISTORIA */}
      {event.phrase && (
        <section className="py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-6">Nuestra historia</p>
            <p className="text-[#5c4033] text-lg leading-relaxed italic">{event.phrase}</p>
          </div>
        </section>
      )}

      {/* UBICACIONES */}
      <section className="py-20 px-6 bg-[#EBDCC3]">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-2">Cuándo y dónde</p>
          <p className="text-[#5c4033]/60 text-sm mb-10">Los esperamos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {event.ceremonyName && (
              <div className="bg-[#F3E7D4] border border-[#8B4513]/20 rounded-lg p-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B4513] mb-3">Ceremonia</p>
                <p className="text-[#3d2b1f] font-semibold text-sm mb-1">{event.ceremonyTime} hs</p>
                <p className="text-[#5c4033] text-sm">{event.ceremonyName}</p>
                <p className="text-[#5c4033]/60 text-xs mt-1">{event.ceremonyAddress}</p>
                <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener"
                  className="inline-block mt-4 text-[#8B4513] text-xs border border-[#8B4513]/30 px-4 py-2 rounded-full hover:bg-[#8B4513]/10 transition">
                  Ver en el mapa
                </a>
              </div>
            )}
            <div className="bg-[#F3E7D4] border border-[#8B4513]/20 rounded-lg p-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B4513] mb-3">Fiesta</p>
              <p className="text-[#3d2b1f] font-semibold text-sm mb-1">{event.eventTime} hs</p>
              <p className="text-[#5c4033] text-sm">{event.venueName}</p>
              <p className="text-[#5c4033]/60 text-xs mt-1">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
                className="inline-block mt-4 text-[#8B4513] text-xs border border-[#8B4513]/30 px-4 py-2 rounded-full hover:bg-[#8B4513]/10 transition">
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-3">Dress code</p>
            <p className="text-[#3d2b1f] text-lg italic">{event.dressCode}</p>
            <div className="flex justify-center gap-2.5 mt-5">
              <span className="w-7 h-7 rounded-full bg-[#8B4513]"></span>
              <span className="w-7 h-7 rounded-full bg-[#D4A574]"></span>
              <span className="w-7 h-7 rounded-full bg-[#6B4226]"></span>
              <span className="w-7 h-7 rounded-full bg-[#F3E7D4] border border-[#8B4513]/30"></span>
            </div>
            <p className="text-[#5c4033]/60 text-xs mt-3">Tonos tierra y cálidos</p>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <section className="py-20 px-6 bg-[#EBDCC3]">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-2">Nosotros</p>
            <p className="text-[#5c4033]/60 text-sm mb-10">Un poco de nuestra historia</p>
            <PhotoGallery photos={event.photos} accentColor="#8B4513" title="" />
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-3">Regalos</p>
            <p className="text-[#3d2b1f] text-lg italic mb-2">Tu presencia es nuestro regalo</p>
            <p className="text-[#5c4033]/60 text-sm mb-8">Si además querés hacernos un regalo, podés transferir al siguiente alias</p>
            <div className="bg-[#F3E7D4] border border-dashed border-[#8B4513]/50 rounded-lg p-7">
              <p className="text-[#8B4513] italic text-xl mb-1">{event.bankAlias}</p>
              <p className="text-[#5c4033]/60 text-xs mb-5">Alias{event.bankHolder ? ` · ${event.bankHolder}` : ""}</p>
              <CopyButton text={event.bankAlias} className="bg-[#8B4513] text-[#F3E7D4] rounded-full px-6 py-2.5" />
              {event.bankCBU && (
                <div className="mt-5 pt-5 border-t border-[#8B4513]/15">
                  <p className="text-[#8B4513] font-mono text-sm mb-3">{event.bankCBU}</p>
                  <CopyButton text={event.bankCBU} className="bg-[#8B4513] text-[#F3E7D4] rounded-full px-6 py-2.5" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-20 px-6 bg-[#EBDCC3]">
          <div className="max-w-md mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8B4513] mb-3">Confirmación</p>
            <p className="text-[#3d2b1f] text-xl italic mb-8">¿Nos acompañás?</p>
            <div className="bg-[#F3E7D4] border border-[#8B4513]/20 rounded-lg p-7 text-left">
              <RsvpForm
                eventSlug={event.slug}
                inputClassName="bg-[#EBDCC3] border border-[#8B4513]/20 text-[#3d2b1f] placeholder-[#8B4513]/40 rounded-lg focus:outline-none focus:border-[#8B4513]"
                buttonClassName="bg-[#8B4513] text-[#F3E7D4] hover:bg-[#6d3610] rounded-full"
                labelClassName="text-[#5c4033] text-xs uppercase tracking-wider"
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-10 text-center">
        <p className="text-[#8B4513]/70 text-xs italic">Con todo nuestro amor</p>
        <p className="text-[#8B4513]/40 text-[10px] mt-3">Powered by Te invito</p>
      </footer>
    </div>
  );
}
