"use client";

import { useEffect, useState } from "react";
import { EventData } from "./types";

export default function NocheDorada({ event }: { event: EventData }) {
  const [entered, setEntered] = useState(false);
  const [countdown, setCountdown] = useState({ d: "—", h: "—", m: "—", s: "—" });

  const firstName = event.title.split("&")[0]?.trim() || event.title;
  const secondName = event.title.split("&")[1]?.trim() || "";
  const initials = `${firstName[0] || ""}${secondName ? "&" + secondName[0] : ""}`;

  const dateShort = new Date(event.eventDate).toLocaleDateString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }).replace(/\//g, "·");

  const dateLong = new Date(event.eventDate).toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  useEffect(() => {
    const target = new Date(event.eventDate).getTime();
    function tick() {
      const d = Math.max(0, target - Date.now());
      setCountdown({
        d: String(Math.floor(d / 86400000)),
        h: String(Math.floor((d % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((d % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((d % 60000) / 1000)).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event.eventDate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
        .nd{--bg:#0C0A09;--bg2:#161210;--paper:#F5EFE4;--gold:#C9A84C;--gold2:#E8D5A3;--muted:rgba(245,239,228,.5);--line:rgba(245,239,228,.12);font-family:Jost,sans-serif;font-weight:300;background:var(--bg);color:var(--paper);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        .nd *{box-sizing:border-box;margin:0;padding:0;}
        .nd h1,.nd h2,.nd h3{font-family:'Cormorant Garamond',serif;font-weight:400;}
        .nd-splash{position:fixed;inset:0;z-index:100;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px;transition:opacity .7s,visibility .7s;}
        .nd-splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
        .nd-splash::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(201,168,76,.14),transparent 55%);pointer-events:none;}
        .nd-splash-inner{position:relative;z-index:1;max-width:320px;}
        .nd-orn{color:var(--gold);font-size:22px;letter-spacing:.4em;margin-bottom:28px;opacity:.8;}
        .nd-label{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--gold);margin-bottom:20px;font-weight:500;}
        .nd-splash h1{font-size:clamp(42px,12vw,56px);line-height:1.05;}
        .nd-splash h1 em{font-style:italic;color:var(--gold);display:block;font-size:.55em;margin:6px 0;}
        .nd-splash-sub{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin:24px 0 40px;}
        .nd-btn{display:inline-flex;padding:16px 36px;border:1px solid var(--gold);background:transparent;color:var(--paper);font-family:Jost,sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;cursor:pointer;transition:all .3s;}
        .nd-btn:hover{background:var(--gold);color:var(--bg);}
        .nd-btn-full{width:100%;}
        .nd-btn-solid{background:var(--gold);color:var(--bg);border:none;box-shadow:0 8px 28px rgba(201,168,76,.25);}
        .nd-hint{margin-top:28px;font-size:11px;color:var(--muted);}
        .nd-main{opacity:0;transition:opacity .5s .2s;}
        .nd-main.show{opacity:1;}
        .nd-panel{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 28px 80px;position:relative;}
        .nd-panel+.nd-panel{border-top:1px solid var(--line);}
        .nd-wrap{width:100%;max-width:400px;margin:0 auto;position:relative;z-index:1;}
        .nd-eyebrow{font-size:11px;letter-spacing:.36em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:16px;}
        .nd-panel h1{font-size:clamp(44px,13vw,60px);line-height:1.05;}
        .nd-panel h1 .amp{display:block;font-style:italic;font-size:.5em;color:var(--gold);margin:4px 0;}
        .nd-panel h2{font-size:clamp(28px,8vw,36px);margin-bottom:12px;}
        .nd-lead{font-size:15px;color:var(--muted);line-height:1.65;max-width:300px;margin:0 auto 28px;}
        .nd-panel-hero{background:radial-gradient(ellipse at 50% 20%,rgba(201,168,76,.1),transparent 50%),var(--bg);}
        .nd-seal{width:64px;height:64px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--gold);margin:0 auto 28px;}
        .nd-date-line{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin:24px 0 32px;}
        .nd-countdown{display:flex;gap:10px;justify-content:center;margin-bottom:36px;}
        .nd-countdown>div{min-width:64px;background:var(--bg2);border:1px solid var(--line);padding:14px 8px 12px;}
        .nd-countdown .n{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--gold);display:block;line-height:1;}
        .nd-countdown .l{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:6px;}
        .nd-info-block{background:var(--bg2);border:1px solid var(--line);padding:28px 24px;margin-bottom:14px;text-align:center;}
        .nd-info-block .icon{font-size:20px;margin-bottom:12px;opacity:.8;color:var(--gold);}
        .nd-info-block h3{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;margin-bottom:8px;color:var(--gold2);}
        .nd-info-block p{font-size:14px;color:var(--muted);line-height:1.6;}
        .nd-info-block p strong{color:var(--paper);font-weight:500;}
        .nd-info-block a{display:inline-block;margin-top:14px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);text-decoration:none;border-bottom:1px solid rgba(201,168,76,.35);padding-bottom:2px;}
        .nd-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px;}
        .nd-pills span{font-size:11px;letter-spacing:.06em;padding:7px 14px;border:1px solid var(--line);color:var(--muted);}
        .nd-form-box{background:var(--bg2);border:1px solid var(--line);padding:28px 22px;text-align:left;}
        .nd-form-box label{display:block;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
        .nd-form-box input,.nd-form-box select,.nd-form-box textarea{width:100%;background:transparent;border:none;border-bottom:1px solid var(--line);color:var(--paper);font-family:Jost,sans-serif;font-size:15px;padding:10px 0 12px;margin-bottom:20px;outline:none;appearance:none;}
        .nd-form-box input:focus,.nd-form-box select:focus,.nd-form-box textarea:focus{border-bottom-color:var(--gold);}
        .nd-form-box textarea{resize:none;min-height:64px;}
        .nd-success{display:none;text-align:center;padding:40px 24px;background:var(--bg2);border:1px solid var(--line);}
        .nd-success.show{display:block;}
        .nd-success h3{font-family:'Cormorant Garamond',serif;font-size:28px;margin:12px 0 8px;}
        .nd-success p{font-size:14px;color:var(--muted);}
        .nd-alias-box{background:var(--bg2);border:1px solid var(--line);padding:28px 24px;}
        .nd-alias-box .al-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
        .nd-alias-box .al-val{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--gold);margin-bottom:16px;word-break:break-all;}
        .nd-copy-btn{display:inline-flex;padding:12px 24px;border:1px solid var(--line);background:transparent;color:var(--paper);font-family:Jost,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;}
        .nd-copy-btn.ok{border-color:var(--gold);color:var(--gold);}
        .nd-panel-close{background:radial-gradient(ellipse at 50% 60%,rgba(201,168,76,.1),transparent 50%),var(--bg);}
        .nd-close-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(26px,7vw,34px);line-height:1.35;max-width:300px;margin:0 auto 12px;}
        .nd-close-names{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:28px;}
        .nd-footer{text-align:center;padding:28px 20px 80px;border-top:1px solid var(--line);}
        .nd-footer .brand{font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--muted);}
        .nd-footer .brand em{font-style:italic;color:var(--gold);}
        .nd-footer p{font-size:10px;color:rgba(245,239,228,.25);margin-top:8px;}
        .nd-scroll-cue{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);animation:nd-bob 2.2s ease-in-out infinite;}
        .nd-scroll-cue span{display:block;margin-top:6px;font-size:14px;}
        @keyframes nd-bob{0%,100%{transform:translateX(-50%) translateY(0);opacity:.5}50%{transform:translateX(-50%) translateY(6px);opacity:1}}
      `}</style>

      <div className="nd">
        {/* SPLASH */}
        <div className={`nd-splash${entered ? " hide" : ""}`} onClick={() => setEntered(true)}>
          <div className="nd-splash-inner">
            <div className="nd-orn">◆</div>
            <p className="nd-label">Bienvenida</p>
            <h1>{firstName}<em>&</em>{secondName}</h1>
            <p className="nd-splash-sub">{dateShort}</p>
            <button type="button" className="nd-btn" onClick={(e) => { e.stopPropagation(); setEntered(true); }}>
              Abrir invitación
            </button>
            <p className="nd-hint">Tocá para entrar</p>
          </div>
        </div>

        {/* MAIN */}
        <div className={`nd-main${entered ? " show" : ""}`}>

          {/* HERO */}
          <section className="nd-panel nd-panel-hero">
            <div className="nd-wrap">
              <div className="nd-seal">{initials}</div>
              <p className="nd-eyebrow">Con alegría</p>
              <h1>{firstName}<span className="amp">&</span>{secondName}</h1>
              <p className="nd-date-line">{dateLong}</p>
              <div className="nd-countdown">
                <div><span className="n">{countdown.d}</span><span className="l">Días</span></div>
                <div><span className="n">{countdown.h}</span><span className="l">Horas</span></div>
                <div><span className="n">{countdown.m}</span><span className="l">Min</span></div>
                <div><span className="n">{countdown.s}</span><span className="l">Seg</span></div>
              </div>
              <a className="nd-btn nd-btn-solid" href="#cuando">Ver detalles</a>
            </div>
            <div className="nd-scroll-cue">Deslizá<span>↓</span></div>
          </section>

          {/* CUANDO */}
          <section className="nd-panel" id="cuando">
            <div className="nd-wrap">
              <p className="nd-eyebrow">El gran día</p>
              <h2>¿Cuándo &amp; dónde?</h2>
              {event.phrase && <p className="nd-lead">{event.phrase}</p>}
              {event.ceremonyName && (
                <div className="nd-info-block">
                  <div className="icon">◆</div>
                  <h3>Ceremonia</h3>
                  <p><strong>{dateLong}</strong><br />{event.ceremonyTime} hs<br />{event.ceremonyName}<br />{event.ceremonyAddress}</p>
                  {event.ceremonyAddress && <a href={`https://maps.google.com/?q=${encodeURIComponent(event.ceremonyAddress)}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>}
                </div>
              )}
              <div className="nd-info-block">
                <div className="icon">◆</div>
                <h3>Fiesta</h3>
                <p><strong>{event.eventTime} hs</strong><br />{event.venueName}<br />{event.venueAddress}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
              </div>
              {event.dressCode && (
                <div className="nd-info-block">
                  <div className="icon">◆</div>
                  <h3>Dress code</h3>
                  <p><strong>{event.dressCode}</strong></p>
                  <div className="nd-pills"><span>Negro &amp; dorado</span><span>Elegante</span></div>
                </div>
              )}
            </div>
          </section>

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="nd-panel" id="rsvp">
              <div className="nd-wrap">
                <p className="nd-eyebrow">Tu respuesta</p>
                <h2>Confirmá tu asistencia</h2>
                {event.rsvpDeadline && <p className="nd-lead">Antes del <strong style={{ color: "var(--paper)" }}>{new Date(event.rsvpDeadline).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</strong>.</p>}
                <NocheDoradaRsvp eventSlug={event.slug} />
              </div>
            </section>
          )}

          {/* REGALOS */}
          {event.bankAlias && (
            <section className="nd-panel" id="regalos">
              <div className="nd-wrap">
                <p className="nd-eyebrow">Con cariño</p>
                <h2>Mesa de regalos</h2>
                <p className="nd-lead">Tu presencia es el mejor regalo. Si deseás sumar un detalle:</p>
                <div className="nd-alias-box">
                  <p className="al-label">Alias</p>
                  <p className="al-val">{event.bankAlias}</p>
                  {event.bankHolder && <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>{event.bankHolder}</p>}
                  <NocheCopyBtn text={event.bankAlias} />
                </div>
              </div>
            </section>
          )}

          {/* CIERRE */}
          {event.phrase && (
            <section className="nd-panel nd-panel-close">
              <div className="nd-wrap">
                <div style={{ color: "var(--gold)", fontSize: "22px", marginBottom: "20px" }}>◆</div>
                <p className="nd-close-quote">&ldquo;{event.phrase}&rdquo;</p>
                <p className="nd-lead" style={{ marginBottom: 0 }}>Los esperamos para brindar juntos.</p>
                <p className="nd-close-names">{event.title}</p>
                <p style={{ marginTop: "8px", fontSize: "12px", letterSpacing: ".16em", color: "var(--muted)" }}>{dateShort}</p>
              </div>
            </section>
          )}

          <footer className="nd-footer">
            <div className="brand">Te <em>invito</em></div>
            <p>Invitaciones digitales · TeInvitoApp</p>
          </footer>
        </div>
      </div>
    </>
  );
}

function NocheDoradaRsvp({ eventSlug }: { eventSlug: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventSlug, guestName: fd.get("nombre"), guestCount: parseInt(fd.get("personas") as string) || 1, dietaryNotes: fd.get("alimentacion"), songRequest: "" }) });
      setSent(true);
    } finally { setLoading(false); }
  }
  if (sent) return <div className="nd-success show"><div style={{ fontSize: "36px" }}>🥂</div><h3>¡Gracias!</h3><p>Recibimos tu confirmación.</p></div>;
  return (
    <form className="nd-form-box" onSubmit={handleSubmit}>
      <label>Nombre completo</label>
      <input type="text" name="nombre" required placeholder="Tu nombre y apellido" />
      <label>¿Nos acompañás?</label>
      <select name="asistencia"><option>¡Sí, allí estaré!</option><option>No puedo asistir</option></select>
      <label>Acompañantes</label>
      <input type="number" name="personas" min="1" defaultValue={1} />
      <label>Restricción alimentaria</label>
      <input type="text" name="alimentacion" placeholder="Ej: vegetariano, sin TACC" />
      <button type="submit" className="nd-btn nd-btn-solid nd-btn-full" disabled={loading}>{loading ? "Enviando..." : "Enviar confirmación"}</button>
    </form>
  );
}

function NocheCopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <button className={`nd-copy-btn${ok ? " ok" : ""}`} onClick={() => { navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 2000); }); }}>{ok ? "¡Copiado!" : "Copiar alias"}</button>;
}
