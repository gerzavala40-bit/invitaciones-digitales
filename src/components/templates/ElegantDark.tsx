"use client";

import { useEffect, useRef, useState } from "react";
import { EventData } from "./types";

export default function ElegantDark({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);
  const [countdown, setCountdown] = useState({ d: "--", h: "--", m: "--", s: "--" });
  const audioRef = useRef<HTMLAudioElement>(null);

  const firstName = event.title.split("&")[0]?.trim() || event.title.split(" ")[0] || "";
  const secondName = event.title.split("&")[1]?.trim() || "";
  const initials = `${firstName[0] || ""}${secondName ? "&" + secondName[0] : ""}`;

  useEffect(() => {
    const target = new Date(event.eventDate).getTime();
    function tick() {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [event.eventDate]);

  const dateFormatted = new Date(event.eventDate).toLocaleDateString("es-AR", {
    day: "numeric", month: "long", year: "numeric",
  });

  const dateShort = new Date(event.eventDate).toLocaleDateString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  function handleEnter() {
    setEntered(true);
    if (event.musicUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
        :root {
          --ink: #100D0A; --ink-2: #1A1510;
          --gold: #C9A66B; --gold-soft: #8C7550;
          --cream: #EDE7DD; --muted: #8C8478;
          --line: rgba(237,231,221,0.12);
        }
        .ed body, .ed-wrap { box-sizing: border-box; }
        .ed { font-family: 'Jost', sans-serif; font-weight: 300; background: var(--ink); color: var(--cream); min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .ed h1, .ed h2, .ed h3 { font-family: 'Cormorant Garamond', serif; font-weight: 500; }
        .ed-wrap { max-width: 640px; margin: 0 auto; padding: 0 28px; }
        .ed-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; color: var(--gold); margin-bottom: 16px; }
        .ed-section { padding: 90px 0; text-align: center; }
        .ed-divider { width: 1px; height: 56px; background: linear-gradient(var(--gold), transparent); margin: 0 auto; }

        /* SPLASH */
        .ed-splash { position: fixed; inset: 0; z-index: 100; background: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 28px; transition: opacity 0.7s, visibility 0.7s; }
        .ed-splash.hide { opacity: 0; visibility: hidden; pointer-events: none; }
        .ed-splash::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 50% 15%, rgba(201,166,107,0.08), transparent 55%); pointer-events: none; }
        .ed-splash-inner { position: relative; z-index: 1; max-width: 320px; }
        .ed-splash h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(46px,11vw,84px); font-style: italic; line-height: 1.05; margin-bottom: 10px; }
        .ed-splash .amp { display: block; color: var(--gold); font-size: 0.5em; margin: 8px 0; }
        .ed-splash-date { font-size: 13px; letter-spacing: 0.15em; color: var(--muted); text-transform: uppercase; margin: 20px 0 36px; }
        .ed-splash-btn { background: transparent; border: 1px solid var(--gold); color: var(--cream); font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; padding: 16px 36px; cursor: pointer; transition: all 0.3s; }
        .ed-splash-btn:hover { background: var(--gold); color: var(--ink); }
        .ed-splash-hint { margin-top: 20px; font-size: 11px; color: var(--muted); }

        /* MAIN */
        .ed-main { opacity: 0; transition: opacity 0.5s 0.2s; }
        .ed-main.show { opacity: 1; }

        /* HERO */
        .ed-hero { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding: 40px 28px; text-align: center; }
        .ed-hero::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 50% 15%, rgba(201,166,107,0.08), transparent 55%); pointer-events: none; }
        .ed-monogram { width: 70px; height: 70px; border: 1px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 32px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 24px; color: var(--gold); }
        .ed-hero h1 { font-size: clamp(46px, 11vw, 84px); font-style: italic; line-height: 1.05; margin-bottom: 10px; }
        .ed-hero .amp { display: block; color: var(--gold); font-size: 0.5em; margin: 8px 0; }
        .ed-hero .date { font-size: 14px; letter-spacing: 0.15em; color: var(--muted); text-transform: uppercase; margin-top: 20px; }
        .ed-scroll-hint { position: absolute; bottom: 36px; font-size: 11px; letter-spacing: 0.2em; color: var(--gold-soft); text-transform: uppercase; animation: bobble 2s ease-in-out infinite; }
        @keyframes bobble { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* COUNTDOWN */
        .ed-countdown-row { display: flex; justify-content: center; gap: 20px; margin: 36px 0; flex-wrap: wrap; }
        .ed-countdown-row div { text-align: center; }
        .ed-countdown-row .n { display: block; font-family: 'Cormorant Garamond', serif; font-size: 38px; color: var(--gold); width: 64px; height: 64px; line-height: 64px; border: 1px solid var(--line); border-radius: 4px; margin-bottom: 8px; }
        .ed-countdown-row .l { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); }

        /* DETAILS */
        .ed-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); margin-top: 20px; }
        .ed-detail-card { background: var(--ink); padding: 36px 24px; }
        .ed-detail-card h3 { font-size: 22px; margin-bottom: 8px; }
        .ed-detail-card p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 18px; }
        .ed-map-link { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold-soft); padding-bottom: 3px; }

        /* DRESS CODE */
        .ed-swatches { display: flex; justify-content: center; gap: 10px; margin: 24px 0 12px; }
        .ed-swatches span { width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--line); }

        /* GALLERY */
        .ed-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 20px; }
        .ed-g-item { aspect-ratio: 3/4; background: linear-gradient(160deg, #241C15, #100D0A); border: 1px solid var(--line); overflow: hidden; }
        .ed-g-item img { width: 100%; height: 100%; object-fit: cover; }

        /* GIFTS */
        .ed-gift-box { max-width: 380px; margin: 32px auto 0; border: 1px solid var(--gold-soft); padding: 30px 26px; }
        .ed-gift-box .alias { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 22px; color: var(--gold); margin-bottom: 6px; }
        .ed-gift-box .bank { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
        .ed-copy-btn { background: var(--gold); color: var(--ink); border: none; padding: 12px 26px; font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s ease; }
        .ed-copy-btn:active { opacity: 0.7; }
        .ed-copy-msg { font-size: 11px; color: var(--gold); margin-top: 10px; height: 14px; }

        /* RSVP */
        .ed-rsvp-form { max-width: 380px; margin: 32px auto 0; text-align: left; }
        .ed-rsvp-form label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 8px; }
        .ed-rsvp-form input, .ed-rsvp-form select { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--line); color: var(--cream); font-family: 'Jost', sans-serif; font-size: 15px; padding: 10px 0; margin-bottom: 24px; outline: none; }
        .ed-rsvp-form input:focus, .ed-rsvp-form select:focus { border-color: var(--gold); }
        .ed-rsvp-submit { width: 100%; background: var(--gold); color: var(--ink); border: none; padding: 16px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; margin-top: 8px; font-family: 'Jost', sans-serif; }
        .ed-rsvp-msg { text-align: center; margin-top: 14px; font-size: 11px; color: var(--gold); }

        /* MUSIC */
        .ed-music-bar { position: fixed; bottom: 20px; right: 20px; display: flex; align-items: center; gap: 8px; background: var(--ink-2); border: 1px solid var(--line); padding: 10px 16px; border-radius: 100px; font-size: 11px; z-index: 50; color: var(--cream); }
        .ed-music-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 1.6s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        footer.ed-footer { padding: 50px 0; text-align: center; font-size: 11px; color: var(--muted); letter-spacing: 0.05em; }
      `}</style>

      <div className="ed">
        {event.musicUrl && (
          <audio ref={audioRef} src={event.musicUrl} loop preload="none" />
        )}

        {/* SPLASH */}
        <div className={`ed-splash${entered ? " hide" : ""}`} onClick={handleEnter}>
          <div className="ed-splash-inner">
            <div className="ed-monogram">{initials}</div>
            <div className="ed-eyebrow">Nos casamos</div>
            <h1>
              {firstName}
              {secondName && <span className="amp">&</span>}
              {secondName}
            </h1>
            <div className="ed-splash-date">{dateFormatted}</div>
            <button type="button" className="ed-splash-btn" onClick={(e) => { e.stopPropagation(); handleEnter(); }}>
              Abrir invitación
            </button>
            <p className="ed-splash-hint">Tocá para entrar</p>
          </div>
        </div>

        {/* MAIN */}
        <div className={`ed-main${entered ? " show" : ""}`}>

          {/* HERO */}
          <section className="ed-hero">
            <div className="ed-monogram">{initials}</div>
            <div className="ed-eyebrow">Nos casamos</div>
            <h1>
              {firstName}
              {secondName && <span className="amp">&</span>}
              {secondName}
            </h1>
            <div className="date">{dateFormatted}</div>
            <div className="ed-scroll-hint">↓ Desliza</div>
          </section>

          {/* COUNTDOWN */}
          <section className="ed-section">
            <div className="ed-wrap">
              <div className="ed-eyebrow">Falta muy poco</div>
              <div className="ed-countdown-row">
                <div><span className="n">{countdown.d}</span><span className="l">Días</span></div>
                <div><span className="n">{countdown.h}</span><span className="l">Horas</span></div>
                <div><span className="n">{countdown.m}</span><span className="l">Min</span></div>
                <div><span className="n">{countdown.s}</span><span className="l">Seg</span></div>
              </div>
            </div>
          </section>

          <div className="ed-divider" />

          {/* HISTORIA */}
          {event.phrase && (
            <section className="ed-section" style={{ textAlign: "center" }}>
              <div className="ed-wrap">
                <div className="ed-eyebrow">Nuestra historia</div>
                <p style={{ fontSize: "17px", lineHeight: 1.9, color: "#C8C0B2", maxWidth: "480px", margin: "0 auto" }}>
                  {event.phrase}
                </p>
              </div>
            </section>
          )}

          {/* DETALLES */}
          <section className="ed-section" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="ed-wrap">
              <div className="ed-eyebrow">Cuándo y dónde</div>
              <h2 style={{ fontSize: "32px", marginBottom: "8px" }}>Los esperamos</h2>
              <div className="ed-details-grid">
                {event.ceremonyName && (
                  <div className="ed-detail-card">
                    <h3>Ceremonia</h3>
                    <p>
                      {event.ceremonyTime && <>{event.ceremonyTime} hs<br /></>}
                      {event.ceremonyName}<br />
                      {event.ceremonyAddress}
                    </p>
                    <a className="ed-map-link" href={`https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || event.ceremonyName || "")}`} target="_blank" rel="noopener noreferrer">
                      Ver en el mapa
                    </a>
                  </div>
                )}
                <div className="ed-detail-card">
                  <h3>Fiesta</h3>
                  <p>
                    {event.eventTime && <>{event.eventTime} hs<br /></>}
                    {event.venueName}<br />
                    {event.venueAddress}
                  </p>
                  <a className="ed-map-link" href={`https://maps.google.com/?q=${encodeURIComponent(event.venueAddress || "")}`} target="_blank" rel="noopener noreferrer">
                    Ver en el mapa
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* DRESS CODE */}
          {event.dressCode && (
            <section className="ed-section" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="ed-wrap">
                <div className="ed-eyebrow">Dress code</div>
                <h2 style={{ fontSize: "28px" }}>{event.dressCode}</h2>
                <div className="ed-swatches">
                  <span style={{ background: "#100D0A" }} />
                  <span style={{ background: "#C9A66B" }} />
                  <span style={{ background: "#3B1F2E" }} />
                  <span style={{ background: "#EDE7DD" }} />
                </div>
                <p style={{ fontSize: "14px", color: "var(--muted)" }}>Evitar blanco y colores muy claros</p>
              </div>
            </section>
          )}

          {/* GALERÍA */}
          {event.photos && event.photos.length > 0 && (
            <section className="ed-section" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="ed-wrap">
                <div className="ed-eyebrow">Nosotros</div>
                <h2 style={{ fontSize: "28px" }}>Un poco de nuestra historia</h2>
                <div className="ed-gallery-grid">
                  {event.photos.map((p, i) => (
                    <div key={i} className="ed-g-item">
                      <img src={p.url} alt={`Foto ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* REGALOS */}
          {event.bankAlias && (
            <section className="ed-section" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="ed-wrap">
                <div className="ed-eyebrow">Regalos</div>
                <h2 style={{ fontSize: "28px" }}>Tu presencia es nuestro regalo</h2>
                <p style={{ fontSize: "14px", color: "var(--muted)", maxWidth: "400px", margin: "12px auto 0" }}>
                  Si además querés hacernos un regalo, esto nos ayuda a construir nuestro hogar.
                </p>
                <div className="ed-gift-box">
                  <div className="alias">{event.bankAlias}</div>
                  <div className="bank">
                    Alias{event.bankHolder ? ` · ${event.bankHolder}` : ""}
                    {event.bankCBU ? ` · ${event.bankCBU}` : ""}
                  </div>
                  <CopyBtnED text={event.bankAlias} />
                </div>
              </div>
            </section>
          )}

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="ed-section" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="ed-wrap">
                <div className="ed-eyebrow">Confirmación</div>
                <h2 style={{ fontSize: "28px" }}>¿Nos acompañás?</h2>
                <RsvpFormED eventSlug={event.slug} />
              </div>
            </section>
          )}

          <footer className="ed-footer">
            {event.title} · {dateShort}
            <br />
            <span style={{ fontSize: "9px", color: "rgba(237,231,221,0.2)" }}>Powered by TeInvitoApp</span>
          </footer>

          {event.musicUrl && (
            <div className="ed-music-bar">
              <span className="ed-music-dot" />
              Sonando ahora
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Inline copy button to avoid external import issues
function CopyBtnED({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button className="ed-copy-btn" onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}>
        {copied ? "Alias copiado ✓" : "Copiar alias"}
      </button>
      <div className="ed-copy-msg">{copied ? "Alias copiado ✓" : ""}</div>
    </>
  );
}

// Inline RSVP form
function RsvpFormED({ eventSlug }: { eventSlug: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug,
          guestName: fd.get("nombre"),
          guestCount: parseInt(fd.get("personas") as string) || 1,
          dietaryNotes: fd.get("alimentacion"),
          songRequest: fd.get("cancion"),
        }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return <p className="ed-rsvp-msg">¡Gracias por confirmar! Nos vemos pronto ♥</p>;
  }

  return (
    <form className="ed-rsvp-form" onSubmit={handleSubmit}>
      <label>Nombre completo</label>
      <input type="text" name="nombre" placeholder="Tu nombre" required />
      <label>¿Asistirás?</label>
      <select name="asistencia">
        <option>Sí, con muchas ganas</option>
        <option>No podré asistir</option>
      </select>
      <label>Acompañantes</label>
      <input type="number" name="personas" placeholder="0" min="0" />
      <label>Restricción alimentaria</label>
      <input type="text" name="alimentacion" placeholder="Ej: vegano, celíaco, ninguna" />
      <label>Canción infaltable</label>
      <input type="text" name="cancion" placeholder="Artista - Nombre" />
      <button className="ed-rsvp-submit" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Confirmar asistencia"}
      </button>
    </form>
  );
}
