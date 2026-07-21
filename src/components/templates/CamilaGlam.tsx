"use client";

import { useEffect, useState } from "react";
import { EventData } from "./types";

export default function CamilaGlam({ event }: { event: EventData }) {
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
        .cg{--bg:#1A0A14;--bg2:#2A1220;--paper:#FFF5F8;--rose:#E85A8C;--rose2:#F5A0C0;--gold:#E8C878;--muted:rgba(255,245,248,.55);--line:rgba(255,245,248,.12);font-family:Jost,sans-serif;font-weight:300;background:var(--bg);color:var(--paper);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        .cg *{box-sizing:border-box;margin:0;padding:0;}
        .cg h1,.cg h2,.cg h3{font-family:'Cormorant Garamond',serif;font-weight:400;}
        .cg-splash{position:fixed;inset:0;z-index:100;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px;transition:opacity .7s,visibility .7s;}
        .cg-splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
        .cg-splash::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 35%,rgba(232,90,140,.2),transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(232,200,120,.08),transparent 40%);pointer-events:none;}
        .cg-splash-inner{position:relative;z-index:1;max-width:320px;}
        .cg-orn{color:var(--rose2);font-size:28px;margin-bottom:20px;}
        .cg-label{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;font-weight:500;}
        .cg-splash h1{font-size:clamp(48px,14vw,64px);line-height:1;}
        .cg-splash h1 .xv{display:block;font-size:.45em;letter-spacing:.35em;color:var(--rose2);margin-bottom:8px;font-style:normal;font-family:Jost,sans-serif;font-weight:500;}
        .cg-splash-sub{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin:24px 0 40px;}
        .cg-btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 36px;border:1px solid var(--rose);background:transparent;color:var(--paper);font-family:Jost,sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;cursor:pointer;transition:all .3s;text-decoration:none;}
        .cg-btn:hover{background:var(--rose);color:#fff;}
        .cg-btn-solid{background:var(--rose);color:#fff;border:none;box-shadow:0 8px 28px rgba(232,90,140,.3);}
        .cg-btn-full{width:100%;}
        .cg-hint{margin-top:28px;font-size:11px;color:var(--muted);}
        .cg-main{opacity:0;transition:opacity .5s .2s;}
        .cg-main.show{opacity:1;}
        .cg-panel{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 28px 80px;position:relative;}
        .cg-panel+.cg-panel{border-top:1px solid var(--line);}
        .cg-wrap{width:100%;max-width:400px;margin:0 auto;}
        .cg-eyebrow{font-size:11px;letter-spacing:.36em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:16px;}
        .cg-panel h1{font-size:clamp(48px,14vw,64px);line-height:1.05;}
        .cg-panel h2{font-size:clamp(28px,8vw,36px);margin-bottom:12px;}
        .cg-lead{font-size:15px;color:var(--muted);line-height:1.65;max-width:300px;margin:0 auto 28px;}
        .cg-hero{background:radial-gradient(ellipse at 50% 25%,rgba(232,90,140,.15),transparent 50%),var(--bg);}
        .cg-seal{width:64px;height:64px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--gold);margin:0 auto 28px;}
        .cg-date-line{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin:24px 0 32px;}
        .cg-countdown{display:flex;gap:10px;justify-content:center;margin-bottom:36px;}
        .cg-countdown>div{min-width:64px;background:var(--bg2);border:1px solid var(--line);padding:14px 8px 12px;}
        .cg-countdown .n{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--rose2);display:block;line-height:1;}
        .cg-countdown .l{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:6px;}
        .cg-info-block{background:var(--bg2);border:1px solid var(--line);padding:28px 24px;margin-bottom:14px;}
        .cg-info-block .icon{font-size:20px;margin-bottom:12px;color:var(--rose2);}
        .cg-info-block h3{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;margin-bottom:8px;color:var(--gold);}
        .cg-info-block p{font-size:14px;color:var(--muted);line-height:1.6;}
        .cg-info-block p strong{color:var(--paper);font-weight:500;}
        .cg-info-block a{display:inline-block;margin-top:14px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--rose2);text-decoration:none;border-bottom:1px solid rgba(245,160,192,.35);padding-bottom:2px;}
        .cg-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px;}
        .cg-pills span{font-size:11px;padding:7px 14px;border:1px solid var(--line);color:var(--muted);}
        .cg-valor-box{background:var(--bg2);border:1px solid var(--line);padding:28px 24px;margin-bottom:14px;}
        .cg-valor-box h3{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold);margin-bottom:16px;}
        .cg-valor-row{display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line);font-size:14px;}
        .cg-valor-row:first-of-type{border-top:none;}
        .cg-valor-row strong{color:var(--rose2);font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;}
        .cg-form-box{background:var(--bg2);border:1px solid var(--line);padding:28px 22px;text-align:left;}
        .cg-form-box label{display:block;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
        .cg-form-box input,.cg-form-box select,.cg-form-box textarea{width:100%;background:transparent;border:none;border-bottom:1px solid var(--line);color:var(--paper);font-family:Jost,sans-serif;font-size:15px;padding:10px 0 12px;margin-bottom:20px;outline:none;appearance:none;}
        .cg-form-box input:focus,.cg-form-box select:focus,.cg-form-box textarea:focus{border-bottom-color:var(--rose);}
        .cg-form-box textarea{resize:none;min-height:64px;}
        .cg-success{display:none;text-align:center;padding:40px 24px;background:var(--bg2);border:1px solid var(--line);}
        .cg-success.show{display:block;}
        .cg-success h3{font-family:'Cormorant Garamond',serif;font-size:28px;margin:12px 0 8px;}
        .cg-success p{font-size:14px;color:var(--muted);}
        .cg-alias-box{background:var(--bg2);border:1px solid var(--line);padding:28px 24px;}
        .cg-alias-box .al-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
        .cg-alias-box .al-val{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--rose2);margin-bottom:16px;}
        .cg-copy-btn{display:inline-flex;padding:12px 24px;border:1px solid var(--line);background:transparent;color:var(--paper);font-family:Jost,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;}
        .cg-copy-btn.ok{border-color:var(--rose);color:var(--rose2);}
        .cg-panel-close{background:radial-gradient(ellipse at 50% 60%,rgba(232,90,140,.15),transparent 50%),var(--bg);}
        .cg-close-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(26px,7vw,34px);line-height:1.35;max-width:300px;margin:0 auto 12px;}
        .cg-close-names{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:28px;}
        .cg-footer{text-align:center;padding:28px 20px 80px;border-top:1px solid var(--line);}
        .cg-footer .brand{font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--muted);}
        .cg-footer .brand em{font-style:italic;color:var(--rose2);}
        .cg-footer p{font-size:10px;color:rgba(255,245,248,.25);margin-top:8px;}
        .cg-scroll-cue{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);animation:cg-bob 2.2s ease-in-out infinite;}
        .cg-scroll-cue span{display:block;margin-top:6px;}
        @keyframes cg-bob{0%,100%{transform:translateX(-50%) translateY(0);opacity:.5}50%{transform:translateX(-50%) translateY(6px);opacity:1}}
      `}</style>

      <div className="cg">
        {/* SPLASH */}
        <div className={`cg-splash${entered ? " hide" : ""}`} onClick={() => setEntered(true)}>
          <div className="cg-splash-inner">
            <div className="cg-orn">✦</div>
            <p className="cg-label">Bienvenida</p>
            <h1><span className="xv">MIS XV</span>{name}</h1>
            <p className="cg-splash-sub">{dateShort}</p>
            <button type="button" className="cg-btn" onClick={(e) => { e.stopPropagation(); setEntered(true); }}>Abrir invitación</button>
            <p className="cg-hint">Tocá para entrar</p>
          </div>
        </div>

        {/* MAIN */}
        <div className={`cg-main${entered ? " show" : ""}`}>

          {/* HERO */}
          <section className="cg-panel cg-hero">
            <div className="cg-wrap">
              <div className="cg-seal">XV</div>
              <p className="cg-eyebrow">Que comience la magia</p>
              <h1>{name}</h1>
              <p className="cg-date-line">{dateLong}</p>
              <div className="cg-countdown">
                <div><span className="n">{countdown.d}</span><span className="l">Días</span></div>
                <div><span className="n">{countdown.h}</span><span className="l">Horas</span></div>
                <div><span className="n">{countdown.m}</span><span className="l">Min</span></div>
                <div><span className="n">{countdown.s}</span><span className="l">Seg</span></div>
              </div>
              <a className="cg-btn cg-btn-solid" href="#cuando">Ver detalles</a>
            </div>
            <div className="cg-scroll-cue">Deslizá<span>↓</span></div>
          </section>

          {/* CUANDO */}
          <section className="cg-panel" id="cuando">
            <div className="cg-wrap">
              <p className="cg-eyebrow">La fiesta</p>
              <h2>¿Cuándo &amp; dónde?</h2>
              {event.phrase && <p className="cg-lead">{event.phrase}</p>}
              {event.ceremonyName && (
                <div className="cg-info-block">
                  <div className="icon">✦</div>
                  <h3>¿Cuándo?</h3>
                  <p><strong>{dateLong}</strong><br />{event.ceremonyTime} hs</p>
                </div>
              )}
              <div className="cg-info-block">
                <div className="icon">✦</div>
                <h3>¿Dónde?</h3>
                <p><strong>{event.venueName}</strong><br />{event.venueAddress}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
              </div>
              {event.dressCode && (
                <div className="cg-info-block">
                  <div className="icon">✦</div>
                  <h3>Dress code</h3>
                  <p><strong>{event.dressCode}</strong></p>
                  <div className="cg-pills"><span>Rosa &amp; dorado</span><span>Brillos</span><span>Tacones</span></div>
                </div>
              )}
            </div>
          </section>

          {/* VALOR TARJETA */}
          {event.bankAlias && (
            <section className="cg-panel" id="valor">
              <div className="cg-wrap">
                <p className="cg-eyebrow">Información</p>
                <h2>Valor tarjeta</h2>
                <p className="cg-lead">A continuación los detalles para el pago de su tarjeta.</p>
                <div className="cg-alias-box">
                  <p className="al-label">Alias · Pago</p>
                  <p className="al-val">{event.bankAlias}</p>
                  {event.bankHolder && <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>{event.bankHolder}</p>}
                  <CgCopyBtn text={event.bankAlias} />
                </div>
              </div>
            </section>
          )}

          {/* RSVP */}
          {event.rsvpEnabled && (
            <section className="cg-panel" id="rsvp">
              <div className="cg-wrap">
                <p className="cg-eyebrow">Tu respuesta</p>
                <h2>Confirmá tu asistencia</h2>
                {event.rsvpDeadline && <p className="cg-lead">Antes del <strong style={{ color: "var(--paper)" }}>{new Date(event.rsvpDeadline).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</strong>.</p>}
                <CgRsvp eventSlug={event.slug} name={name} />
              </div>
            </section>
          )}

          {/* CIERRE */}
          <section className="cg-panel cg-panel-close">
            <div className="cg-wrap">
              <div style={{ color: "var(--rose2)", fontSize: "28px", marginBottom: "20px" }}>✦</div>
              <p className="cg-close-quote">&ldquo;Brillemos juntos…&rdquo;</p>
              <p className="cg-lead" style={{ marginBottom: 0 }}>Te espero para vivir esta noche mágica.</p>
              <p className="cg-close-names">{name} · Mis XV</p>
              <p style={{ marginTop: "8px", fontSize: "12px", letterSpacing: ".16em", color: "var(--muted)" }}>{dateShort}</p>
            </div>
          </section>

          <footer className="cg-footer">
            <div className="brand">Te <em>invito</em></div>
            <p>Invitaciones digitales · TeInvitoApp</p>
          </footer>
        </div>
      </div>
    </>
  );
}

function CgCopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <button className={`cg-copy-btn${ok ? " ok" : ""}`} onClick={() => { navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 2000); }); }}>{ok ? "¡Copiado!" : "Copiar alias"}</button>;
}

function CgRsvp({ eventSlug, name }: { eventSlug: string; name: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.currentTarget);
    try { await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventSlug, guestName: fd.get("nombre"), guestCount: 1, dietaryNotes: fd.get("alimentacion"), songRequest: "" }) }); setSent(true); } finally { setLoading(false); }
  }
  if (sent) return <div className="cg-success show"><div style={{ fontSize: "36px" }}>💖</div><h3>¡Gracias!</h3><p>{name} está feliz de saberlo.</p></div>;
  return (
    <form className="cg-form-box" onSubmit={handleSubmit}>
      <label>Nombre completo</label>
      <input type="text" name="nombre" required placeholder="Tu nombre y apellido" />
      <label>¿Venís?</label>
      <select name="asistencia"><option>¡Sí, ahí estaré!</option><option>No puedo</option></select>
      <label>Restricción alimentaria</label>
      <input type="text" name="alimentacion" placeholder="Vegetariano, sin TACC…" />
      <label>Mensaje</label>
      <textarea name="mensaje" placeholder={`Un deseo para ${name}…`} />
      <button type="submit" className="cg-btn cg-btn-solid cg-btn-full" disabled={loading}>{loading ? "Enviando..." : "Confirmar"}</button>
    </form>
  );
}
