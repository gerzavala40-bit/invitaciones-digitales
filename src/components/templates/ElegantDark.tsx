"use client";

import { EventData } from "./types";
import Countdown from "./shared/Countdown";
import CopyButton from "./shared/CopyButton";
import RsvpForm from "./shared/RsvpForm";
import MusicPlayer from "./shared/MusicPlayer";
import PhotoGallery from "./shared/PhotoGallery";
import "./elegant-dark.css";

export default function ElegantDark({ event }: { event: EventData }) {
  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "";
  const secondName = event.title.split("&")[1]?.trim() || event.title.split(" ").pop() || "";
  const initials = `${firstName[0] || ""}${secondName[0] ? "&" + secondName[0] : ""}`;

  return (
    <div className="elegant-dark">
      {event.musicUrl && <MusicPlayer musicUrl={event.musicUrl} accentColor="#C9A84C" />}

      {/* HERO */}
      <section className="ed-hero">
        <div className="ed-monogram">
          <span>{initials}</span>
        </div>
        <p className="ed-hero-label">Nos casamos</p>
        <h1>
          <span className="name-gold">{firstName}</span>
          <span className="ampersand">&</span>
          <span>{secondName}</span>
        </h1>
        <p className="date-text">
          {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
          {event.venueAddress && ` — ${event.venueAddress.split(",").pop()?.trim()}`}
        </p>
        <div className="scroll-hint">↓ Desliza</div>
      </section>

      {/* COUNTDOWN */}
      <section className="ed-section">
        <div className="ed-section-inner">
          <p className="ed-label">Falta muy poco</p>
          <Countdown
            targetDate={event.eventDate}
            className="ed-countdown"
            boxClassName="ed-countdown-box"
            numberClassName="value"
            labelClassName="label"
          />
        </div>
      </section>

      {/* HISTORIA */}
      {event.phrase && (
        <section className="ed-section">
          <div className="ed-section-inner">
            <p className="ed-label">Nuestra historia</p>
            <p className="ed-phrase">{event.phrase}</p>
          </div>
        </section>
      )}

      {/* UBICACIONES */}
      <section className="ed-section">
        <div className="ed-section-inner">
          <p className="ed-label">Cuándo y dónde</p>
          <p className="ed-subtitle">Los esperamos</p>
          <div className="ed-locations">
            {event.ceremonyName && (
              <div className="ed-location-card">
                <p className="loc-type">Ceremonia</p>
                <p className="loc-time">{event.ceremonyTime} hs</p>
                <p className="loc-name">{event.ceremonyName}</p>
                <p className="loc-address">{event.ceremonyAddress}</p>
                <a href={event.ceremonyLatLng ? `https://maps.google.com/?q=${event.ceremonyLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noopener" className="loc-btn">
                  Ver en el mapa
                </a>
              </div>
            )}
            <div className="ed-location-card">
              <p className="loc-type">Fiesta</p>
              <p className="loc-time">{event.eventTime} hs</p>
              <p className="loc-name">{event.venueName}</p>
              <p className="loc-address">{event.venueAddress}</p>
              <a href={event.venueLatLng ? `https://maps.google.com/?q=${event.venueLatLng}` : `https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener" className="loc-btn">
                Ver en el mapa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      {event.dressCode && (
        <section className="ed-section">
          <div className="ed-section-inner">
            <p className="ed-label">Dress code</p>
            <p className="ed-dresscode-name">{event.dressCode}</p>
            <div className="ed-color-palette">
              <span style={{ background: "#1a1a2e" }}></span>
              <span style={{ background: "#2c2c3e" }}></span>
              <span style={{ background: "#C9A84C" }}></span>
              <span style={{ background: "#8B6914" }}></span>
            </div>
            <p className="ed-dresscode-note">Evitar blanco y colores muy claros</p>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      {event.photos && event.photos.length > 0 && (
        <section className="ed-section">
          <div className="ed-section-inner">
            <p className="ed-label">Nosotros</p>
            <p className="ed-subtitle">Un poco de nuestra historia</p>
            <PhotoGallery photos={event.photos} accentColor="#C9A84C" title="" />
          </div>
        </section>
      )}

      {/* REGALOS */}
      {event.bankAlias && (
        <section className="ed-section">
          <div className="ed-section-inner">
            <p className="ed-label">Regalos</p>
            <h3 className="ed-title">Tu presencia es nuestro regalo</h3>
            <p className="ed-subtitle">Si además querés hacernos un regalo, esto nos ayuda a construir nuestro hogar.</p>
            <div className="ed-gift-card">
              <p className="alias">{event.bankAlias}</p>
              <p className="alias-desc">Alias{event.bankHolder ? ` · ${event.bankHolder}` : ""}</p>
              <CopyButton text={event.bankAlias} className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.2)] rounded-full px-4 py-2 text-xs font-medium" />
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvpEnabled && (
        <section className="ed-section">
          <div className="ed-section-inner">
            <p className="ed-label">Confirmación</p>
            <h3 className="ed-title">¿Nos acompañás?</h3>
            <div className="ed-form-card">
              <RsvpForm
                eventSlug={event.slug}
                inputClassName="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.3)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgba(201,168,76,0.5)]"
                buttonClassName="w-full bg-[#C9A84C] text-[#0a0a0f] font-medium hover:bg-[#d4b85c] rounded-full py-3"
                labelClassName="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wider"
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="ed-footer">
        <p className="footer-text">
          {event.title} · {new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })}
        </p>
        <p className="footer-powered">Powered by TeInvitoApp</p>
      </footer>
    </div>
  );
}
