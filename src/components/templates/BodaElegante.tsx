"use client";

import { useEffect, useRef, useState } from "react";
import { EventData } from "./types";
import AddToCalendar from "../features/AddToCalendar";
import Guestbook from "../features/Guestbook";
import Timeline from "../features/Timeline";
import { QRCodeSVG } from "qrcode.react";

export default function BodaElegante({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);
  const [countdown, setCountdown] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [rsvpData, setRsvpData] = useState<{ sent: boolean; id?: string }>({ sent: false });
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [copyOk, setCopyOk] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fecha corta para el alias y otros
  const dateShort = new Date(event.eventDate).toLocaleDateString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }).replace(/\//g, " \u00b7 ");

  // Countdown logic
  useEffect(() => {
    const target = new Date(event.eventDate).getTime();
    function tick() {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event.eventDate]);

  // Scroll animations
  useEffect(() => {
    if (!entered) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [entered]);

  function handleEnter() {
    setEntered(true);
    document.body.classList.remove("locked");
    if (event.musicUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }

  async function handleRsvp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRsvpLoading(true);
    
    // Si estamos en la página de prueba, simulamos el código QR para que se pueda testear visualmente
    if (event.slug === "test-elegante") {
      setTimeout(() => {
        setRsvpData({ sent: true, id: "simulated-qr-code-test-12345" });
        setRsvpLoading(false);
      }, 1000);
      return;
    }

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: event.slug,
          guestName: fd.get("nombre"),
          guestCount: parseInt(fd.get("personas") as string) || 1,
          dietaryNotes: fd.get("dieta") || "",
          songRequest: fd.get("cancion") || "",
        }),
      });
      const data = await res.json();
      if (data.success && data.rsvp) {
        setRsvpData({ sent: true, id: data.rsvp.id });
      } else {
        setRsvpData({ sent: true }); // Fallback if no ID is returned
      }
    } finally {
      setRsvpLoading(false);
    }
  }

  function copyAlias() {
    if (!event.bankAlias) return;
    navigator.clipboard.writeText(event.bankAlias).then(() => {
      setCopyOk(true);
      setTimeout(() => setCopyOk(false), 2000);
    });
  }

  // Nombres y fecha formados
  const [name1, name2] = (event.title || "").split("&").map(s => s.trim());
  const dateLong = new Date(event.eventDate).toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).toUpperCase();

  const dressPills = event.dressCode ? [event.dressCode] : ["Elegante", "Formal"];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&display=swap');
    
    .boda-elegante {
      --gold: #d4af37;
      --gold-light: #f3e5ab;
      --gold-dark: #aa8623;
      font-family: 'Cormorant Garamond', serif;
      background-color: #0a0a0a;
      color: #fdfbf7;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    
    .boda-elegante.locked { overflow: hidden; height: 100dvh; }
    
    .be-splash { position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; background: #0a0a0a; transition: opacity 0.75s ease, visibility 0.75s ease; }
    .be-splash.hide { opacity: 0; visibility: hidden; pointer-events: none; }
    
    .be-split-bg {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 45%, #fdfbf7 55%, #f4f0e6 100%);
      z-index: 0;
      pointer-events: none;
    }
    
    .be-split-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.05"/></svg>');
      pointer-events: none;
      z-index: 1;
    }

    .be-gold-border {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 48%, var(--gold) 49.5%, var(--gold-light) 50%, var(--gold-dark) 50.5%, transparent 52%);
      opacity: 0.8;
      pointer-events: none;
      z-index: 2;
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.8"/></svg>');
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.8"/></svg>');
    }

    .be-content {
      position: relative;
      z-index: 10;
      max-width: 600px;
      margin: 4rem auto;
      background: rgba(10, 10, 10, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 20px;
      padding: 4rem 2rem;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      opacity: 0; transition: opacity 0.5s ease 0.2s;
    }
    .be-content.show { opacity: 1; }

    .be-title-script {
      font-family: 'Great Vibes', cursive;
      color: var(--gold);
      font-size: clamp(3.5rem, 10vw, 5rem);
      line-height: 1.1;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }
    
    .be-serif {
      font-family: 'Cormorant Garamond', serif;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    .be-btn {
      background: transparent;
      color: var(--gold);
      border: 1px solid var(--gold);
      padding: 1rem 2.5rem;
      font-family: 'Cormorant Garamond', serif;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-decoration: none;
      width: 100%;
      margin-top: 1rem;
    }
    .be-btn::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
      transition: left 0.5s ease;
    }
    .be-btn:hover { background: var(--gold); color: #0a0a0a; box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
    .be-btn:hover::before { left: 100%; }

    .be-cd { display: flex; justify-content: center; gap: 1.5rem; margin: 3rem 0; border-top: 1px solid rgba(212, 175, 55, 0.3); border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding: 1.5rem 0; }
    .be-cd div { display: flex; flex-direction: column; align-items: center; }
    .be-cd .n { font-size: 2.5rem; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 0.25rem; }
    .be-cd .l { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #a0a0a0; }

    .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 1s ease-out, transform 1s ease-out; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    
    .be-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 4px; padding: 1rem; color: #fff; margin-bottom: 1rem; font-family: 'Cormorant Garamond', serif; font-size: 1rem; outline: none; }
    .be-input:focus { border-color: var(--gold); }
    .be-label { display: block; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: #a0a0a0; margin-bottom: 0.5rem; text-align: left; }
    
    .be-music { position: fixed; top: 1rem; right: 1rem; z-index: 100; width: 44px; height: 44px; border-radius: 50%; background: rgba(10,10,10,0.8); border: 1px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
    .be-music:hover { background: var(--gold); color: #0a0a0a; }
    
    .be-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 2rem; }
    .be-gallery img { width: 100%; height: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 4px; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {event.musicUrl && <audio ref={audioRef} src={event.musicUrl} loop preload="none" />}

      <div className={`boda-elegante ${!entered ? "locked" : ""}`}>
        
        {/* Splash Screen */}
        <div className={`be-splash ${entered ? "hide" : ""}`} onClick={handleEnter}>
          <p className="be-serif text-gold text-xs tracking-[0.2em] mb-4" style={{ color: "var(--gold)" }}>NOS CASAMOS</p>
          <h1 className="be-title-script" style={{ fontSize: "4rem" }}>{name1} <br/>&amp;<br/> {name2}</h1>
          <p className="be-serif text-gray-400 mt-6 mb-8 text-sm">{dateShort}</p>
          <button type="button" className="be-btn" style={{ width: "auto" }} onClick={(e) => { e.stopPropagation(); handleEnter(); }}>
            Abrir invitaci\u00f3n
          </button>
        </div>

        {entered && (
          <button className="be-music" onClick={() => { if(audioRef.current) { audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause() } }}>
            \u266a
          </button>
        )}

        {/* Fondo Global */}
        <div className="be-split-bg">
          <div className="be-gold-border"></div>
        </div>

        {/* Contenedor Principal (Tarjeta que scrollea) */}
        <div className={`be-content ${entered ? "show" : ""}`}>
          
          <p className="be-serif text-xs text-gray-400 mb-4 fade-in">Nuestra Boda</p>
          
          <h1 className="be-title-script fade-in" style={{ transitionDelay: "0.2s" }}>{name1} & {name2}</h1>
          
          <p className="be-serif text-sm text-gray-300 mt-8 mb-2 fade-in" style={{ transitionDelay: "0.4s" }}>
            TENEMOS EL HONOR DE INVITARLOS A CELEBRAR<br/>ESTE DÍA TAN ESPECIAL
          </p>

          <div className="my-10 fade-in" style={{ transitionDelay: "0.6s" }}>
            <p className="be-serif text-xl" style={{ color: "var(--gold)" }}>{dateLong}</p>
            <p className="be-serif text-sm text-gray-400 mt-2 mb-6">A LAS {event.eventTime} HORAS</p>
            
            {/* FEATURE: Agregar a Calendario */}
            <AddToCalendar event={event} className="max-w-xs mx-auto text-[var(--gold)]" />
          </div>

          <div className="be-cd fade-in" style={{ transitionDelay: "0.8s" }}>
            <div><span className="n">{countdown.d}</span><span className="l">Días</span></div>
            <div><span className="n">{countdown.h}</span><span className="l">Hrs</span></div>
            <div><span className="n">{countdown.m}</span><span className="l">Min</span></div>
            <div><span className="n">{countdown.s}</span><span className="l">Seg</span></div>
          </div>

          {/* FEATURE: Timeline */}
          {event.timeline && event.timeline.length > 0 && (
            <div className="mb-14 fade-in">
              <Timeline event={event} />
            </div>
          )}

          {/* Dónde */}
          <div className="mb-14 fade-in">
            <h2 className="be-serif text-2xl text-gold mb-6" style={{ color: "var(--gold)" }}>Ubicación</h2>
            
            {event.ceremonyName && (
              <div className="mb-8">
                <p className="be-serif text-xs text-gray-400 mb-2">CEREMONIA - {event.ceremonyTime} HS</p>
                <p className="be-serif text-md text-white mb-1">{event.ceremonyName}</p>
                <p className="be-serif text-sm text-gray-400 mb-4">{event.ceremonyAddress}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress || "")}`} target="_blank" rel="noreferrer" className="be-btn">
                  Ver Ceremonia
                </a>
              </div>
            )}
            
            <div>
              <p className="be-serif text-xs text-gray-400 mb-2">FIESTA - {event.eventTime} HS</p>
              <p className="be-serif text-md text-white mb-1">{event.venueName}</p>
              <p className="be-serif text-sm text-gray-400 mb-4">{event.venueAddress}</p>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(event.venueAddress || "")}`} target="_blank" rel="noreferrer" className="be-btn">
                Ver Fiesta
              </a>
            </div>
          </div>

          {/* Dress Code */}
          <div className="mb-14 fade-in">
            <h2 className="be-serif text-2xl mb-4" style={{ color: "var(--gold)" }}>Dress Code</h2>
            <p className="be-serif text-md text-white mb-4 uppercase">{event.dressCode || "Elegante"}</p>
            <div className="flex gap-2 justify-center" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {dressPills.map(p => (
                <span key={p} className="be-serif text-xs border border-gray-600 rounded px-3 py-1 text-gray-300" style={{ border: '1px solid #4b5563', borderRadius: '4px', padding: '0.25rem 0.75rem', color: '#d1d5db' }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Fotos */}
          {event.photos && event.photos.length > 1 && (
            <div className="mb-14 fade-in">
              <h2 className="be-serif text-2xl mb-6" style={{ color: "var(--gold)" }}>Nuestra Historia</h2>
              <div className="be-gallery">
                {event.photos.slice(1).map((ph, i) => (
                  <img key={i} src={ph.url} alt="Galeria" />
                ))}
              </div>
            </div>
          )}

          {/* Mesa de Regalos */}
          {event.bankAlias && (
            <div className="mb-14 fade-in">
              <h2 className="be-serif text-2xl mb-4" style={{ color: "var(--gold)" }}>Regalos</h2>
              <p className="be-serif text-sm text-gray-300 mb-6">Tu presencia es nuestro mejor regalo. Si deseas hacernos un obsequio:</p>
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(212,175,55,0.3)" }}>
                <p className="be-serif text-xs text-gray-400 mb-2">ALIAS</p>
                <p className="be-serif text-xl text-white mb-2" style={{ color: "var(--gold)", letterSpacing: "0.1em" }}>{event.bankAlias}</p>
                {event.bankHolder && <p className="be-serif text-xs text-gray-400 mb-6">{event.bankHolder}</p>}
                <button onClick={copyAlias} className="be-btn">
                  {copyOk ? "\u00a1COPIADO!" : "COPIAR ALIAS"}
                </button>
              </div>
            </div>
          )}

          {/* RSVP con FEATURE DJ Song Request y FEATURE QR Ticket */}
          {event.rsvpEnabled && (
            <div className="mb-14 fade-in">
              <h2 className="be-serif text-2xl mb-6" style={{ color: "var(--gold)" }}>Confirmar Asistencia</h2>
              
              {rsvpData.sent ? (
                <div style={{ padding: "2rem 0" }}>
                  <p className="be-serif text-xl mb-2" style={{ color: "var(--gold)" }}>¡Gracias por confirmar!</p>
                  
                  {rsvpData.id && (
                    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg inline-block">
                      <p className="text-black text-xs font-bold mb-4">TU PASE DE INGRESO</p>
                      <QRCodeSVG value={rsvpData.id} size={200} level="H" includeMargin={true} />
                      <p className="text-gray-500 text-xs mt-4">Mostrá este código en puerta</p>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleRsvp} style={{ textAlign: "left" }}>
                  <label className="be-label">Nombre y Apellido</label>
                  <input name="nombre" className="be-input" required />
                  
                  <label className="be-label">\u00bfAsistir\u00e1s?</label>
                  <select name="asistencia" className="be-input">
                    <option value="si">S\u00ed, confirmo asistencia</option>
                    <option value="no">No podr\u00e9 asistir</option>
                  </select>
                  
                  <label className="be-label">Acompa\u00f1antes (incluyéndote)</label>
                  <input name="personas" type="number" min="1" defaultValue="1" className="be-input" />
                  
                  <label className="be-label">Men\u00fa Especial / Notas</label>
                  <input name="dieta" className="be-input" placeholder="Opcional..." />
                  
                  <label className="be-label">¿Qué canción no puede faltar?</label>
                  <input name="cancion" className="be-input" placeholder="Nombre o link (opcional)..." />

                  <button type="submit" disabled={rsvpLoading} className="be-btn" style={{ marginTop: "1rem" }}>
                    {rsvpLoading ? "ENVIANDO..." : "ENVIAR CONFIRMACI\u00d3N"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* FEATURE: Libro de Firmas */}
          {event.guestbookEnabled && (
            <div className="mb-14 fade-in">
              <Guestbook event={event} className="text-[var(--gold)]" />
            </div>
          )}
          
          <p className="be-title-script mt-20" style={{ fontSize: "3rem" }}>\u00a1Los esperamos!</p>
        </div>
      </div>
    </>
  );
}
