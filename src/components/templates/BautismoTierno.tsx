"use client";

import { useEffect, useState } from "react";
import { EventData } from "./types";

export default function BautismoTierno({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);
  const [countdown, setCountdown] = useState({ d: "—", h: "—", m: "—", s: "—" });

  const name = event.title;
  const dateShort = new Date(event.eventDate).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "·");
  const dateLong = new Date(event.eventDate).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  useEffect(() => {
    const target = new Date(event.eventDate).getTime();
    function tick() {
      const d = Math.max(0, target - Date.now());
      setCountdown({ d: String(Math.floor(d / 86400000)), h: String(Math.floor((d % 86400000) / 3600000)).padStart(2, "0"), m: String(Math.floor((d % 3600000) / 60000)).padStart(2, "0"), s: String(Math.floor((d % 60000) / 1000)).padStart(2, "0") });
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [event.eventDate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
        .bt{--bg:#F4F7FA;--bg2:#E8EEF4;--ink:#1E2A38;--sky:#5B8FA8;--sky2:#7AACC4;--soft:#A8C5D4;--gold:#B8A078;--muted:rgba(30,42,56,.5);--line:rgba(30,42,56,.1);font-family:Jost,sans-serif;font-weight:300;background:var(--bg);color:var(--ink);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        .bt *{box-sizing:border-box;margin:0;padding:0;}
        .bt h1,.bt h2,.bt h3{font-family:'Cormorant Garamond',serif;font-weight:400;}
        .bt-splash{position:fixed;inset:0;z-index:100;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px;transition:opacity .7s,visibility .7s;}
        .bt-splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
        .bt-splash::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(91,143,168,.12),transparent 55%);pointer-events:none;}
        .bt-splash-inner{position:relative;z-index:1;max-width:320px;}
        .bt-orn{color:var(--sky);font-size:32px;margin-bottom:20px;opacity:.7;}
        .bt-label{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--sky);margin-bottom:16px;font-weight:500;}
        .bt-splash h1{font-size:clamp(40px,12vw,52px);line-height:1.08;}
        .bt-splash h1 small{display:block;font-size:.42em;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;font-family:Jost,sans-serif;font-weight:500;}
        .bt-splash-sub{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin:24px 0 40px;}
        .bt-btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 36px;border:1px solid var(--sky);background:transparent;color:var(--ink);font-family:Jost,sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;cursor:pointer;transition:all .3s;text-decoration:none;border-radius:2px;}
        .bt-btn:hover{background:var(--sky);color:#fff;}
        .bt-btn-solid{background:var(--sky);color:#fff;border:none;box-shadow:0 8px 28px rgba(91,143,168,.28);}
        .bt-btn-full{width:100%;}
        .bt-hint{margin-top:28px;font-size:11px;color:var(--muted);}
        .bt-main{opacity:0;transition:opacity .5s .2s;}
        .bt-main.show{opacity:1;}
        .bt-panel{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 28px 80px;position:relative;}
        .bt-panel+.bt-panel{border-top:1px solid var(--line);}
        .bt-wrap{width:100%;max-width:400px;margin:0 auto;}
        .bt-eyebrow{font-size:11px;letter-spacing:.36em;text-transform:uppercase;color:var(--sky);font-weight:500;margin-bottom:16px;}
        .bt-panel h1{font-size:clamp(42px,12vw,56px);line-height:1.05;}
        .bt-panel h2{font-size:clamp(28px,8vw,36px);margin-bottom:12px;}
        .bt-lead{font-size:15px;color:var(--muted);line-height:1.65;max-width:300px;margin:0 auto 28px;}
        .bt-hero{background:radial-gradient(ellipse at 50% 20%,rgba(91,143,168,.1),transparent 50%),var(--bg);}
        .bt-seal{width:64px;height:64px;border:1px solid var(--soft);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 28px;color:var(--sky);}
        .bt-date-line{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin:24px 0 32px;}
        .bt-countdown{display:flex;gap:10px;justify-content:center;margin-bottom:36px;}
        .bt-countdown>div{min-width:64px;background:var(--bg2);border:1px solid var(--line);padding:14px 8px 12px;border-radius:8px;}
        .bt-countdown .n{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--sky);display:block;line-height:1;}
        .bt-countdown .l{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:6px;}
        .bt-info-block{background:#fff;border:1px solid var(--line);padding:28px 24px;margin-bottom:14px;border-radius:4px;box-shadow:0 4px 20px rgba(30,42,56,.04);}
        .bt-info-block .icon{font-size:22px;margin-bottom:12px;}
        .bt-info-block h3{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;margin-bottom:8px;color:var(--sky);}
        .bt-info-block p{font-size:14px;color:var(--muted);line-height:1.6;}
        .bt-info-block p strong{color:var(--ink);font-weight:500;}
        .bt-info-block a{display:inline-block;margin-top:14px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--sky);text-decoration:none;border-bottom:1px solid rgba(91,143,168,.35);padding-bottom:2px;}
        .bt-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px;}
        .bt-pills span{font-size:11px;padding:7px 14px;border:1px solid var(--line);color:var(--muted);border-radius:20px;background:#fff;}
        .bt-form-box{background:#fff;border:1px solid var(--line);padding:28px 22px;text-align:left;border-radius:4px;}
        .bt-form-box label{display:block;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
        .bt-form-box input,.bt-form-box select,.bt-form-box textarea{width:100%;background:transparent;border:none;border-bottom:1px solid var(--line);color:var(--ink);font-family:Jost,sans-serif;font-size:15px;padding:10px 0 12px;margin-bottom:20px;outline:none;appearance:none;}
        .bt-form-box input:focus,.bt-form-box select:focus,.bt-form-box textarea:focus{border-bottom-color:var(--sky);}
        .bt-form-box textarea{resize:none;min-height:64px;}
        .bt-success{display:none;text-align:center;padding:40px 24px;background:#fff;border:1px solid var(--line);border-radius:4px;}
        .bt-success.show{display:block;}
        .bt-success h3{font-family:'Cormorant Garamond',serif;font-size:28px;margin:12px 0 8px;}
        .bt-success p{font-size:14px;color:var(--muted);}
        .bt-alias-box{background:#fff;border:1px solid var(--line);padding:28px 24px;border-radius:4px;}
        .bt-alias-box .al-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
        .bt-alias-box .al-val{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--sky);margin-bottom:16px;}
        .bt-copy-btn{display:inline-flex;padding:12px 24px;border:1px solid var(--line);background:transparent;color:var(--ink);font-family:Jost,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;border-radius:2px;}
        .bt-copy-btn.ok{border-color:var(--sky);color:var(--sky);}
        .bt-panel-close{background:radial-gradient(ellipse at 50% 60%,rgba(91,143,168,.1),transparent 50%),var(--bg);}
        .bt-close-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(26px,7vw,34px);line-height:1.35;max-width:300px;margin:0 auto 12px;}
        .bt-close-names{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--sky);margin-top:28px;}
        .bt-footer{text-align:center;padding:28px 20px 80px;border-top:1px solid var(--line);}
        .bt-footer .brand{font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--muted);}
        .bt-footer .brand em{font-style:italic;color:var(--sky);}
        .bt-footer p{font-size:10px;color:rgba(30,42,56,.3);margin-top:8px;}
        .bt-scroll-cue{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);animation:bt-bob 2.2s ease-in-out infinite;}
        .bt-scroll-cue span{display:block;margin-top:6px;}
        @keyframes bt-bob{0%,100%{transform:translateX(-50%) translateY(0);opacity:.5}50%{transform:translateX(-50%) translateY(6px);opacity:1}}
      `}</style>

      <div className="bt">
        {/* SPLASH */}
        <div className={`bt-splash${entered ? " hide" : ""}`} onClick={() => setEntered(true)}>
          <div className="bt-splash-inner">
            <div className="bt-orn">☁️</div>
            <p className="bt-label">Bienvenida</p>
            <h1><small>Bautismo de</small>{name}</h1>
            <p className="bt-splash-sub">{dateShort}</p>
            <button type="button" className="bt-btn" onClick={(e) => { e.stopPropagation(); setEntered(true); }}>Abrir invitación</button>
            <p className="bt-hint">Tocá para entrar</p>
          </div>
        </div>

        {/* MAIN */}
        <div className={`bt-main${entered ? " show" : ""}`}>

          {/* HERO */}
          <section className="bt-panel bt-hero">
            <div className="bt-wrap">
              <div className="bt-seal">☁️</div>
              <p className="bt-eyebrow">Con mucho amor</p>
              <h1>{name}</h1>
              <p className="bt-date-line">{dateLong}</p>
              <div className="bt-countdown">
                <div><span className="n">{countdown.d}</span><span className="l">Días</span></div>
                <div><span className="n">{countdown.h}</span><span className="l">Horas</span></div>
                <div><span className="n">{countdown.m}</span><span className="l">Min</span></div>
                <div><span className="n">{countdown.s}</span><span className="l">Seg</span></div>
              </div>
              <a className="bt-btn bt-btn-solid" href="#cuando">Ver detalles</a>
            </div>
            <div className="bt-scroll-cue">Deslizá<span>↓</span></div>
          </section>

          {/* CUANDO */}
          <section className="bt-panel" id="cuando">
            <div className="bt-wrap">
              <p className="bt-eyebrow">La celebración</p>
              <h2>¿Cuándo &amp; dónde?</h2>
              {event.phrase && <p className="bt-lead">{event.phrase}</p>}
              {event.ceremonyName && (
                <div className="bt-info-block">
                  <div className="icon">⛪</div>
                  <h3>Ceremonia</h3>
                  <p><strong>{dateLong}</strong><br />{event.ceremonyTime} hs<br />{event.ceremonyName}</p>
                  {event.ceremonyAddress && <a href={`https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress)}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>}
                </div>
              )}
              <div className="bt-info-block">
                <div className="icon">🏠</div>
                <h3>Festejo</h3>
                <p><strong>{event.eventTime} hs</strong><br />{event.venueName}<br />{event.venueAddress}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
              </div>
              {event.dressCode && (
                <div className="bt-info-block">
                  <div className="icon">👔</div>
                  <h3>Dress code</h3>
                  <p><strong>{event.dressCode}</strong></p>
                  <div className="bt-pills"><span>Tonos pastel</span><span>Celeste</span><span>Cómodo</span></div>
                </div>
              )}
            </div>
          </section>

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="bt-panel" id="rsvp">
              <div className="bt-wrap">
                <p className="bt-eyebrow">Tu respuesta</p>
                <h2>Confirmá tu asistencia</h2>
                {event.rsvpDeadline && <p className="bt-lead">Antes del <strong style={{ color: "var(--ink)" }}>{new Date(event.rsvpDeadline).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</strong>.</p>}
                <BtRsvp eventSlug={event.slug} name={name} />
              </div>
            </section>
          )}

          {/* REGALOS */}
          {event.bankAlias && (
            <section className="bt-panel" id="regalos">
              <div className="bt-wrap">
                <p className="bt-eyebrow">Con cariño</p>
                <h2>Regalos</h2>
                <p className="bt-lead">Tu presencia es lo más importante. Si querés dejar un detalle:</p>
                <div className="bt-alias-box">
                  <p className="al-label">Alias</p>
                  <p className="al-val">{event.bankAlias}</p>
                  {event.bankHolder && <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>{event.bankHolder}</p>}
                  <BtCopyBtn text={event.bankAlias} />
                </div>
              </div>
            </section>
          )}

          {/* CIERRE */}
          <section className="bt-panel bt-panel-close">
            <div className="bt-wrap">
              <div style={{ fontSize: "28px", marginBottom: "20px" }}>☁️</div>
              <p className="bt-close-quote">&ldquo;Un pequeño ángel para celebrar…&rdquo;</p>
              <p className="bt-lead" style={{ marginBottom: 0 }}>Los esperamos con el corazón abierto.</p>
              <p className="bt-close-names">Familia de {name}</p>
              <p style={{ marginTop: "8px", fontSize: "12px", letterSpacing: ".16em", color: "var(--muted)" }}>{dateShort}</p>
            </div>
          </section>

          <footer className="bt-footer">
            <div className="brand">Te <em>invito</em></div>
            <p>Invitaciones digitales · TeInvitoApp</p>
          </footer>
        </div>
      </div>
    </>
  );
}

function BtCopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <button className={`bt-copy-btn${ok ? " ok" : ""}`} onClick={() => { navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 2000); }); }}>{ok ? "¡Copiado!" : "Copiar alias"}</button>;
}

function BtRsvp({ eventSlug, name }: { eventSlug: string; name: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.currentTarget);
    try { await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventSlug, guestName: fd.get("nombre"), guestCount: parseInt(fd.get("acomp") as string) || 1, dietaryNotes: "", songRequest: "" }) }); setSent(true); } finally { setLoading(false); }
  }
  if (sent) return <div className="bt-success show"><div style={{ fontSize: "36px" }}>🕊️</div><h3>¡Gracias!</h3><p>La familia de {name} está feliz.</p></div>;
  return (
    <form className="bt-form-box" onSubmit={handleSubmit}>
      <label>Nombre completo</label>
      <input type="text" name="nombre" required placeholder="Tu nombre y apellido" />
      <label>¿Nos acompañás?</label>
      <select name="asistencia"><option>¡Sí!</option><option>No puedo</option></select>
      <label>Acompañantes / niños</label>
      <select name="acomp"><option value="1">Solo yo</option><option value="2">+1</option><option value="3">+2</option><option value="4">+3</option></select>
      <label>Mensaje (opcional)</label>
      <textarea name="mensaje" placeholder={`Un deseo para ${name}…`} />
      <button type="submit" className="bt-btn bt-btn-solid bt-btn-full" disabled={loading}>{loading ? "Enviando..." : "Confirmar"}</button>
    </form>
  );
}
