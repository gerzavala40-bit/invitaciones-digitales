"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";

export default function ModernBlackAndWhite({ event }: { event: EventData }) {
  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "";
  const secondName = event.title.split("&")[1]?.trim() || event.title.split(" ").pop() || "";

  return (
    <div className="min-h-screen text-black bg-white selection:bg-black selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#000000" />}

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        {/* Background Graphic from the provided SVG */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <img src="/templates/modern-bw/bg.svg" alt="" className="w-[120%] h-auto max-w-none mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-sm p-12 border border-black/10">
          <p className="text-xs font-bold uppercase tracking-[0.4em] mb-8 text-black">Nos casamos</p>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            <span className="block">{firstName}</span>
            <span className="block text-4xl md:text-6xl font-light my-2 italic">&</span>
            <span className="block">{secondName}</span>
          </h1>
          
          {event.subtitle && <p className="text-lg md:text-xl font-light mt-4 tracking-wider uppercase">{event.subtitle}</p>}
          
          <div className="w-24 h-[2px] bg-black mx-auto my-10" />
          
          <p className="font-bold text-xl uppercase tracking-widest">
            {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, '.')}
          </p>
          <p className="text-gray-500 text-sm mt-3 tracking-widest uppercase">{event.venueAddress?.split(",").pop()?.trim() || event.venueName}</p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-12">Falta muy poco</p>
          <Countdown
            targetDate={event.eventDate}
            boxClassName="bg-transparent border border-white/20"
            numberClassName="text-white font-black text-4xl"
            labelClassName="text-gray-400 text-xs font-bold uppercase tracking-widest"
          />
        </div>
      </section>

      {/* HISTORIA */}
      {event.phrase && (
        <section className="py-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-8">Nuestra frase</p>
            <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-black">"{event.phrase}"</p>
          </div>
        </section>
      )}

      {/* UBICACIONES */}
      <section className="py-24 px-6 bg-gray-50 border-y border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] mb-12">Cuándo y dónde</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {event.ceremonyName && (
              <div className="bg-white border border-black p-10 flex flex-col items-center">
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-6">Ceremonia</p>
                <p className="text-4xl font-black mb-4">{event.ceremonyTime} hs</p>
                <p className="text-lg font-medium mb-2">{event.ceremonyName}</p>
                <p className="text-gray-500 text-sm mb-8">{event.ceremonyAddress}</p>
                <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener"
                  className="mt-auto w-full text-center bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-4 hover:bg-gray-800 transition">
                  Ver ubicación
                </a>
              </div>
            )}
            <div className="bg-white border border-black p-10 flex flex-col items-center">
              <p className="text-xs uppercase tracking-[0.3em] font-bold mb-6">Fiesta</p>
              <p className="text-4xl font-black mb-4">{event.eventTime} hs</p>
              <p className="text-lg font-medium mb-2">{event.venueName}</p>
              <p className="text-gray-500 text-sm mb-8">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener"
                className="mt-auto w-full text-center bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-4 hover:bg-gray-800 transition">
                Ver ubicación
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      {event.dressCode && (
        <section className="py-24 px-6 bg-black text-white">
          <div className="max-w-xl mx-auto text-center border border-white/20 p-12">
            <p className="text-xs font-bold uppercase tracking-[0.4em] mb-6 text-gray-400">Dress code</p>
            <p className="text-2xl font-light uppercase tracking-widest">{event.dressCode}</p>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.4em] mb-12">Nosotros</p>
            <div className="border-[4px] border-black p-2">
              <PhotoGallery photos={event.photos} accentColor="#000000" title="" />
            </div>
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="py-24 px-6 bg-gray-50 border-t border-black/5">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.4em] mb-8">Mesa de Regalos</p>
            <p className="text-lg font-light mb-12 text-gray-600">Lo más importante es compartir con ustedes. Si desean hacernos un presente, pueden utilizar los siguientes datos.</p>
            
            <div className="bg-white border border-black p-10">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Alias</p>
              <p className="text-2xl font-black mb-6">{event.bankAlias}</p>
              <CopyButton text={event.bankAlias} className="w-full bg-black text-white font-bold text-xs uppercase tracking-widest py-4 hover:bg-gray-800" />
              
              {event.bankCBU && (
                <>
                  <div className="w-full h-px bg-black/10 my-8" />
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">CBU / CVU</p>
                  <p className="text-lg font-mono mb-6">{event.bankCBU}</p>
                  <CopyButton text={event.bankCBU} className="w-full bg-transparent border border-black text-black font-bold text-xs uppercase tracking-widest py-4 hover:bg-gray-100" />
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="py-24 px-6 bg-black text-white">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4 text-gray-400">Confirmación</p>
            <p className="text-3xl font-light mb-12">Esperamos contar<br/>con tu presencia</p>
            
            <div className="bg-white text-black p-8 md:p-12 text-left">
              <RsvpForm
                eventSlug={event.slug}
                isTrial={event.isTrial}
                inputClassName="bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 rounded-none text-black font-medium py-4"
                buttonClassName="bg-black text-white hover:bg-gray-800 rounded-none uppercase tracking-widest font-bold py-4 mt-6"
                labelClassName="text-gray-500 text-xs uppercase tracking-widest font-bold"
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-black/10">
        <p className="text-black font-black uppercase tracking-[0.5em] text-sm">Gracias</p>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-6">Powered by Te invito</p>
      </footer>
    </div>
  );
}
