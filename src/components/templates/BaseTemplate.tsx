"use client";

import { useEffect, useRef, useState } from "react";
import { EventData } from "./types";

import AddToCalendar from "../features/AddToCalendar";
import Guestbook from "../features/Guestbook";
import Timeline from "../features/Timeline";
import { QRCodeSVG } from "qrcode.react";

export interface TemplatePalette {
  bg: string;
  bgSoft: string;
  bgCard: string;
  text: string;
  textMuted: string;
  accent: string;
  accentDeep: string;
  gold: string;
  goldSoft: string;
  line: string;
  splashBefore: string;
  heroBg: string;
  closeBg: string;
  musicBtnBg: string;
  btnPrimaryColor: string;
  splashOrnament: string;
  splashKicker: string;
}

export interface TemplateConfig {
  palette: TemplatePalette;
  getTitle: (event: EventData) => string;
  getKicker: (event: EventData) => string;
  getInitials: (event: EventData) => string;
  getSplashTitle: (event: EventData) => React.ReactNode;
  closingQuote: (event: EventData) => string;
  scriptPhrase: (event: EventData) => string;
  dressCodeOverride?: (event: EventData) => { name: string; pills: string[] };
}

export default function BaseTemplate({ event, config }: { event: EventData; config: TemplateConfig }) {
  const { palette: p } = config;
  const [entered, setEntered] = useState(false);
  const [countdown, setCountdown] = useState({ d: "\u2014", h: "\u2014", m: "\u2014", s: "\u2014" });
  const [copyOk, setCopyOk] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpId, setRsvpId] = useState<string | null>(null);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const dateShort = new Date(event.eventDate).toLocaleDateString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }).replace(/\//g, " \u00b7 ");

  const dateLong = new Date(event.eventDate).toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  useEffect(() => {
    const target = new Date(event.eventDate).getTime();
    function tick() {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        d: String(Math.floor(diff / 86400000)),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event.eventDate]);

  useEffect(() => {
    if (!entered) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
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
    
    if (event.slug === "test-15" || event.slug === "test-elegante") {
      setTimeout(() => {
        setRsvpSent(true);
        setRsvpId("simulated-qr-code-test-12345");
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
      setRsvpSent(true);
      if (data.success && data.rsvp) {
        setRsvpId(data.rsvp.id);
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

  const title = config.getTitle(event);
  const kicker = config.getKicker(event);
  const initials = config.getInitials(event);
  const splashTitle = config.getSplashTitle(event);
  const closingQuote = config.closingQuote(event);
  const scriptPhrase = config.scriptPhrase(event);

  const dressInfo = config.dressCodeOverride
    ? config.dressCodeOverride(event)
    : { name: event.dressCode || "Elegante", pills: [] as string[] };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');
    :root {
      --bg: ${p.bg}; --bg-soft: ${p.bgSoft}; --bg-card: ${p.bgCard};
      --text: ${p.text}; --text-muted: ${p.textMuted};
      --accent: ${p.accent}; --accent-deep: ${p.accentDeep};
      --gold: ${p.gold}; --gold-soft: ${p.goldSoft}; --line: ${p.line};
      --success: #25D366;
      --font-display: "Playfair Display", Georgia, serif;
      --font-script: "Great Vibes", cursive;
      --font-body: "Montserrat", system-ui, sans-serif;
      --radius: 16px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-body); font-weight: 300; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.5; }
    body.locked { overflow: hidden; height: 100dvh; }
    img { max-width: 100%; display: block; } a { color: inherit; }
    button, input, select, textarea { font-family: inherit; }
    #splash { position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; background: var(--bg); transition: opacity 0.75s ease, visibility 0.75s ease; }
    #splash.hide { opacity: 0; visibility: hidden; pointer-events: none; }
    #splash::before { content: ""; position: absolute; inset: 0; background: ${p.splashBefore}; pointer-events: none; }
    .splash-inner { position: relative; z-index: 1; max-width: 340px; }
    .splash-ornament { font-size: 1.75rem; color: var(--gold); letter-spacing: 0.5em; margin-bottom: 1.5rem; opacity: 0.85; animation: pulse-soft 3s ease-in-out infinite; }
    .splash-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.45em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem; }
    .splash-kicker { font-size: 0.75rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--accent); font-weight: 500; margin-bottom: 0.5rem; }
    .splash-name { font-family: var(--font-display); font-size: clamp(3rem, 14vw, 4rem); font-weight: 500; line-height: 1.05; }
    .splash-date { margin-top: 1.5rem; font-size: 0.8rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--text-muted); }
    .splash-btn { margin-top: 2.5rem; display: inline-flex; align-items: center; justify-content: center; padding: 1rem 2.25rem; border: 1px solid var(--accent); background: transparent; color: var(--text); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; cursor: pointer; transition: background 0.3s, color 0.3s; }
    .splash-btn:hover { background: var(--accent); color: var(--bg); }
    .splash-hint { margin-top: 1.5rem; font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.08em; }
    @keyframes pulse-soft { 0%,100% { opacity:0.55; transform:scale(1); } 50% { opacity:1; transform:scale(1.06); } }
    #main { opacity: 0; transition: opacity 0.55s ease 0.15s; } #main.show { opacity: 1; }
    .section { min-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 4rem 1.5rem 5.5rem; position: relative; }
    .section + .section { border-top: 1px solid var(--line); }
    .wrap { width: 100%; max-width: 420px; margin: 0 auto; position: relative; z-index: 1; }
    .eyebrow { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.38em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
    h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(2.75rem,13vw,3.75rem); line-height: 1.05; }
    h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(1.75rem,7vw,2.25rem); margin-bottom: 0.75rem; }
    .lead { font-size: 0.95rem; color: var(--text-muted); line-height: 1.65; max-width: 320px; margin: 0 auto 1.75rem; }
    .script { font-family: var(--font-script); font-size: clamp(1.75rem,6vw,2.25rem); color: var(--accent); line-height: 1.3; }
    .hero { background: ${p.heroBg}; }
    .hero-photo { width:140px; height:140px; border-radius:50%; object-fit:cover; border:2px solid var(--gold); margin:0 auto 1.5rem; background:var(--bg-soft); }
    .hero-photo.placeholder { display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-style:italic; font-size:1.75rem; color:var(--gold); }
    .hero-kicker { font-size:0.72rem; letter-spacing:0.4em; text-transform:uppercase; color:var(--accent); font-weight:600; margin-bottom:0.6rem; }
    .hero-date { margin:1.25rem 0 1.75rem; font-size:0.8rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--text-muted); }
    .countdown { display:flex; gap:0.6rem; justify-content:center; margin-bottom:2rem; }
    .countdown > div { min-width:4.1rem; background:var(--bg-soft); border:1px solid var(--line); border-radius:12px; padding:0.85rem 0.4rem 0.7rem; }
    .countdown .n { font-family:var(--font-display); font-size:1.75rem; color:var(--accent); display:block; line-height:1; }
    .countdown .l { font-size:0.58rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--text-muted); margin-top:0.4rem; font-weight:500; }
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:0.5rem; padding:1rem 1.75rem; border:none; border-radius:999px; font-size:0.72rem; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; cursor:pointer; transition:transform 0.2s, box-shadow 0.2s, background 0.2s; }
    .btn:active { transform:scale(0.98); }
    .btn-primary { background:linear-gradient(135deg,var(--accent-deep),var(--accent)); color:${p.btnPrimaryColor}; box-shadow:0 10px 30px rgba(0,0,0,.2); }
    .btn-full { width:100%; }
    .btn-row { display:flex; flex-direction:column; gap:0.75rem; }
    .card { background:var(--bg-card); border:1px solid var(--line); border-radius:var(--radius); padding:1.6rem 1.35rem; margin-bottom:0.85rem; text-align:center; }
    .card .icon { font-size:1.4rem; margin-bottom:0.75rem; color:var(--accent); }
    .card h3 { font-family:var(--font-display); font-size:1.35rem; font-weight:500; color:var(--gold-soft); margin-bottom:0.5rem; }
    .card p { font-size:0.9rem; color:var(--text-muted); line-height:1.6; }
    .card p strong { color:var(--text); font-weight:500; display:block; margin-bottom:0.15rem; }
    .card a.link { display:inline-block; margin-top:1rem; font-size:0.68rem; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--accent); text-decoration:none; border-bottom:1px solid rgba(0,0,0,.15); padding-bottom:2px; }
    .pills { display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; margin-top:0.85rem; }
    .pills span { font-size:0.7rem; letter-spacing:0.06em; padding:0.45rem 0.9rem; border:1px solid var(--line); border-radius:999px; color:var(--text-muted); }
    .gallery { display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; }
    .gallery .ph { aspect-ratio:1; background:var(--bg-soft); border:1px solid var(--line); border-radius:12px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .gallery .ph.wide { grid-column:span 2; aspect-ratio:2.1/1; }
    .gallery .ph img { width:100%; height:100%; object-fit:cover; }
    .close-section { background: ${p.closeBg}; }
    .close-quote { font-family:var(--font-display); font-style:italic; font-size:clamp(1.5rem,6vw,2rem); line-height:1.35; max-width:300px; margin:0 auto 1rem; }
    .close-name { margin-top:1.75rem; font-size:0.8rem; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); }
    footer { text-align:center; padding:2rem 1.25rem 6rem; border-top:1px solid var(--line); }
    footer .brand { font-family:var(--font-display); font-size:1rem; color:var(--text-muted); }
    footer .brand em { font-style:italic; color:var(--accent); }
    footer p { font-size:0.65rem; color:var(--text-muted); margin-top:0.5rem; letter-spacing:0.06em; opacity:.5; }
    .music-btn { position:fixed; top:1rem; right:1rem; z-index:80; width:2.75rem; height:2.75rem; border-radius:50%; border:1px solid var(--line); background:${p.musicBtnBg}; backdrop-filter:blur(10px); color:var(--gold); font-size:0.95rem; display:none; align-items:center; justify-content:center; cursor:pointer; transition:all 0.25s; }
    .music-btn.visible { display:flex; }
    .music-btn.on { border-color:var(--accent); background:var(--accent); color:var(--bg); }
    .scroll-cue { position:absolute; bottom:1.5rem; left:50%; transform:translateX(-50%); font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--text-muted); animation:bob 2.2s ease-in-out infinite; }
    .scroll-cue span { display:block; margin-top:0.35rem; font-size:0.9rem; }
    @keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0);opacity:0.45;} 50%{transform:translateX(-50%) translateY(6px);opacity:1;} }
    .reveal { opacity:0; transform:translateY(18px); transition:opacity 0.7s ease, transform 0.7s ease; }
    .reveal.in { opacity:1; transform:translateY(0); }
    .rsvp-form { text-align:left; }
    .rsvp-form label { display:block; font-size:0.7rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.4rem; }
    .rsvp-form input, .rsvp-form select { width:100%; background:var(--bg-soft); border:1px solid var(--line); border-radius:8px; padding:0.85rem 1rem; color:var(--text); font-size:0.9rem; margin-bottom:1rem; outline:none; appearance:none; }
    .rsvp-form input:focus, .rsvp-form select:focus { border-color:var(--accent); }
    .alias-box { background:var(--bg-card); border:1px solid var(--line); border-radius:var(--radius); padding:1.5rem 1.25rem; }
    .alias-box .alias-label { font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.5rem; }
    .alias-box .alias-value { font-family:var(--font-display); font-size:1.4rem; color:var(--accent); word-break:break-all; margin-bottom:0.35rem; }
    .alias-box .alias-sub { font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem; }
    .copy-btn { display:inline-flex; align-items:center; justify-content:center; padding:0.75rem 1.25rem; border:1px solid var(--line); border-radius:999px; background:transparent; color:var(--text); font-size:0.68rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; transition:border-color 0.2s, color 0.2s; }
    .copy-btn.ok { border-color:var(--gold); color:var(--gold); }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {event.musicUrl && <audio ref={audioRef} src={event.musicUrl} loop preload="none" />}

      <div id="splash" className={entered ? "hide" : ""} onClick={handleEnter}>
        <div className="splash-inner">
          <div className="splash-ornament">{p.splashOrnament}</div>
          <p className="splash-label">Bienvenida</p>
          <p className="splash-kicker">{p.splashKicker}</p>
          <h1 className="splash-name">{splashTitle}</h1>
          <p className="splash-date">{dateShort}</p>
          <button type="button" className="splash-btn" onClick={(e) => { e.stopPropagation(); handleEnter(); }}>Abrir invitaci\u00f3n</button>
          <p className="splash-hint">Toc\u00e1 para entrar</p>
        </div>
      </div>

      <button type="button" className={`music-btn${entered ? " visible" : ""}`} aria-label="M\u00fasica"
        onClick={() => { if (!audioRef.current) return; if (audioRef.current.paused) audioRef.current.play().catch(() => {}); else audioRef.current.pause(); }}>\u266a</button>

      <div id="main" className={entered ? "show" : ""}>
        <section className="section hero" id="inicio">
          <div className="wrap">
            {event.photos && event.photos.length > 0
              ? <img className="hero-photo" src={event.photos[0].url} alt={title} />
              : <div className="hero-photo placeholder">{initials}</div>}
            <p className="hero-kicker">{kicker}</p>
            <h1>{title}</h1>
            <p className="hero-date">{dateLong} \u00b7 {event.eventTime} hs</p>
            <div className="countdown">
              <div><span className="n">{countdown.d}</span><span className="l">D\u00edas</span></div>
              <div><span className="n">{countdown.h}</span><span className="l">Horas</span></div>
              <div><span className="n">{countdown.m}</span><span className="l">Min</span></div>
              <div><span className="n">{countdown.s}</span><span className="l">Seg</span></div>
            </div>
            <a className="btn btn-primary" href="#cuando">Ver detalles</a>
          </div>
          <div className="scroll-cue">Desliz\u00e1<span>\u2193</span></div>
        </section>

        {event.phrase && (
          <section className="section" style={{ minHeight: "auto", paddingTop: "4rem", paddingBottom: "3rem" }}>
            <div className="wrap reveal">
              <p className="script">{scriptPhrase}</p>
              <p className="lead" style={{ marginTop: "1rem", marginBottom: 0 }}>{event.phrase}</p>
            </div>
          </section>
        )}

        <section className="section" id="cuando">
          <div className="wrap">
            <p className="eyebrow reveal">La celebración</p>
            <h2 className="reveal">¿Cuándo &amp; dónde?</h2>
            <p className="lead reveal">Todo listo para celebrar juntos.</p>
            {event.ceremonyName && (
              <div className="card reveal">
                <div className="icon">✝</div>
                <h3>Ceremonia</h3>
                <p><strong>{event.ceremonyTime} hs</strong>{event.ceremonyName}<br />{event.ceremonyAddress}</p>
                {event.ceremonyAddress && <a className="link" href={`https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress)}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>}
              </div>
            )}
            <div className="card reveal">
              <div className="icon">◈</div>
              <h3>¿Cuándo?</h3>
              <p><strong>{dateLong}</strong>{event.eventTime} hs</p>
              <div style={{ marginTop: "1rem" }}>
                <AddToCalendar event={event} />
              </div>
            </div>
            <div className="card reveal">
              <div className="icon">◎</div>
              <h3>¿Dónde?</h3>
              <p><strong>{event.venueName}</strong>{event.venueAddress}</p>
              <a className="link" href={`https://maps.google.com/?q=${encodeURIComponent(event.venueAddress || "")}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
            </div>
          </div>
        </section>

        {event.timeline && event.timeline.length > 0 && (
          <section className="section" id="itinerario" style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div className="wrap">
              <p className="eyebrow reveal">Itinerario</p>
              <h2 className="reveal">Línea de Tiempo</h2>
              {event.timeline.map((item) => (
                <div key={item.id} className="card reveal" style={{ textAlign: "left", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem", minWidth: "3.5rem", paddingTop: "0.1rem" }}>{item.time}</div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>{item.title}</h3>
                    {item.description && <p style={{ fontSize: "0.85rem", marginTop: 0 }}>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {dressInfo.name && (
          <section className="section" style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div className="wrap reveal">
              <p className="eyebrow">Código de vestimenta</p>
              <h2>Dress code</h2>
              <div className="card" style={{ marginBottom: 0 }}>
                <div className="icon">◇</div>
                <h3>{dressInfo.name}</h3>
                {dressInfo.pills.length > 0 && <div className="pills">{dressInfo.pills.map((pill) => <span key={pill}>{pill}</span>)}</div>}
              </div>
            </div>
          </section>
        )}

        {event.photos && event.photos.length > 1 && (
          <section className="section" style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div className="wrap reveal">
              <p className="eyebrow">Fotos</p>
              <h2>Nuestra historia</h2>
              <div className="gallery">
                {event.photos.slice(1).map((ph, i) => (
                  <div key={i} className={`ph${i === 0 ? " wide" : ""}`}><img src={ph.url} alt={`Foto ${i}`} /></div>
                ))}
              </div>
            </div>
          </section>
        )}

        {event.guestbookEnabled && (
          <section className="section" id="mensajes" style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div className="wrap">
              <p className="eyebrow reveal">Mensajes</p>
              <h2 className="reveal">Muro de Firmas</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {event.messages && event.messages.map((msg) => (
                  <div key={msg.id} className="card reveal" style={{ textAlign: "left" }}>
                    <p style={{ fontStyle: "italic", fontSize: "0.95rem", color: "var(--text)" }}>"{msg.message}"</p>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--gold-soft)", fontWeight: 600 }}>— {msg.guestName}</p>
                  </div>
                ))}
              </div>
              <a className="btn btn-primary reveal" href={`/${event.slug}/guestbook`} style={{ marginTop: "1.5rem" }}>Dejar un mensaje</a>
            </div>
          </section>
        )}

        {event.rsvpEnabled && (
          <section className="section" id="rsvp">
            <div className="wrap">
              <p className="eyebrow reveal">Tu respuesta</p>
              <h2 className="reveal">Confirm\u00e1 tu asistencia</h2>
              {rsvpId ? (
                <div className="card reveal" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🍾</div>
                  <h3>¡Confirmado!</h3>
                  <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                    Guardá este código QR. Lo vas a necesitar para ingresar al evento.
                  </p>
                  <div style={{ background: "white", padding: "1rem", borderRadius: "12px", display: "inline-block", margin: "0 auto 1.5rem" }}>
                    <QRCodeSVG value={rsvpId} size={160} fgColor="#000000" bgColor="#FFFFFF" />
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Hacé captura de pantalla</p>
                </div>
              ) : rsvpSent ? (
                <div className="card reveal" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🥂</div>
                  <h3>¡Gracias!</h3>
                  <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Recibimos tu confirmación.</p>
                </div>
              ) : (
                <form className="card rsvp-form reveal" onSubmit={handleRsvp}>
                  <label htmlFor="nombre">Nombre completo</label>
                  <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre y apellido" />
                  <label htmlFor="asistencia">\u00bfNos acompa\u00f1\u00e1s?</label>
                  <select id="asistencia" name="asistencia"><option value="si">\u00a1S\u00ed, all\u00ed estar\u00e9!</option><option value="no">No puedo asistir</option></select>
                  <label htmlFor="personas">Acompa\u00f1antes</label>
                  <input id="personas" name="personas" type="number" min="1" defaultValue={1} />
                  <label htmlFor="dieta">Restricci\u00f3n alimentaria</label>
                  <input id="dieta" name="dieta" type="text" placeholder="Vegetariano, sin TACC\u2026" />
                  <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: "0.5rem" }} disabled={rsvpLoading}>{rsvpLoading ? "Enviando..." : "Confirmar asistencia"}</button>
                </form>
              )}
            </div>
          </section>
        )}

        {event.bankAlias && (
          <section className="section" style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div className="wrap reveal">
              <p className="eyebrow">Con cari\u00f1o</p>
              <h2>Mesa de regalos</h2>
              <p className="lead">Tu presencia es el mejor regalo.</p>
              <div className="alias-box">
                <p className="alias-label">Alias</p>
                <p className="alias-value">{event.bankAlias}</p>
                {event.bankHolder && <p className="alias-sub">{event.bankHolder}</p>}
                <button type="button" className={`copy-btn${copyOk ? " ok" : ""}`} onClick={copyAlias}>{copyOk ? "\u00a1Copiado! \u2713" : "Copiar alias"}</button>
              </div>
            </div>
          </section>
        )}

        <section className="section close-section">
          <div className="wrap reveal">
            <p className="script" style={{ marginBottom: "1rem" }}>{closingQuote}</p>
            <p className="lead" style={{ marginBottom: 0 }}>Los esperamos para celebrar juntos.</p>
            <p className="close-name">{title}</p>
            <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", letterSpacing: "0.2em", color: "var(--text-muted)" }}>{dateShort}</p>
          </div>
        </section>

        <footer>
          <div className="brand">Te <em>invito</em></div>
          <p>Invitaciones digitales \u00b7 TeInvitoApp</p>
        </footer>
      </div>
    </>
  );
}
