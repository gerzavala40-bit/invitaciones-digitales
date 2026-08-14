'use client';
import './style.css';
import { useEffect } from 'react';

export default function DemoDespedidaNeon() {
    useEffect(() => {
        const enterBtn = document.getElementById('enterBtn');
        const splash = document.getElementById('splash');
        const main = document.getElementById('mainContent') || document.getElementById('main');
        const musicBtn = document.getElementById('musicBtn');
        const audio = (document.getElementById('bgAudio') || document.getElementById('bgMusic')) as HTMLAudioElement | null;

        const handleEnter = () => {
            if (splash) { splash.classList.add('hide'); splash.classList.add('hidden'); splash.style.opacity = '0'; splash.style.visibility = 'hidden'; splash.style.pointerEvents = 'none'; }
            if (main) { main.classList.add('show'); main.classList.add('visible'); main.style.opacity = '1'; main.style.visibility = 'visible'; }
            if (musicBtn) musicBtn.classList.add('visible');
            document.body.classList.remove('locked');
            if (audio) {
                audio.volume = 0.8;
                audio.play().catch(e => console.log('Audio autoplay prevented'));
            }
        };

        if (enterBtn) {
            enterBtn.addEventListener('click', handleEnter);
        }

        // Music toggle
        const handleMusic = () => {
            if (!audio) return;
            if (audio.paused) {
                audio.play();
                musicBtn?.classList.add('on');
                musicBtn.innerHTML = '❚❚';
            } else {
                audio.pause();
                musicBtn?.classList.remove('on');
                musicBtn.innerHTML = '♪';
            }
        };

        if (musicBtn) {
            musicBtn.addEventListener('click', handleMusic);
        }

        
        // Reveal elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('show');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.05 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        // Canvas Particles
        const canvas = document.getElementById('particles-bg') as HTMLCanvasElement;
        let animationFrameId: number;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const particles: any[] = [];
                for(let i=0; i<50; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 2 + 1,
                        speedX: Math.random() * 0.5 - 0.25,
                        speedY: Math.random() * 0.5 - 1,
                        opacity: Math.random()
                    });
                }
                const draw = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
                        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
                        ctx.fill();
                        p.x += p.speedX;
                        p.y += p.speedY;
                        if(p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
                    });
                    animationFrameId = requestAnimationFrame(draw);
                };
                draw();
            }
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (enterBtn) enterBtn.removeEventListener('click', handleEnter);
            if (musicBtn) musicBtn.removeEventListener('click', handleMusic);
        };
    }, []);

    return (
        <div className="demo-wrapper">
            <canvas id="particles-bg" style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none"}}></canvas>

  {/*  ============================================================
       CONFIGURACIÓN RÁPIDA (también buscá [PLACEHOLDERS] en el HTML)
       ============================================================
       NOMBRE        → Julia
       FECHA         → 2027-02-12T21:00:00-03:00  (ISO para countdown)
       FECHA_LARGA   → Viernes 12 de febrero de 2027
       HORA_FIESTA   → 21:00
       LUGAR_FIESTA  → Solares del Sur
       DIRECCION     → Es 4 de Enero 899
       URL_MAPS      → link de Google Maps
       DRESS_CODE    → Formal
       ALIAS / CBU   → datos de pago
       WA_NUMBER     → 54911XXXXXXXX (código país + número)
       MUSICA        → musica.mp3 en la misma carpeta
       ============================================================  */}

  {/*  Audio de fondo: poné tu archivo como musica.mp3 al lado de este HTML  */}
  <audio id="bgMusic" loop preload="auto" playsInline webkit-playsInline>
    <source src="/bon-jovi.mp3" type="audio/mpeg" />
  </audio>

  {/*  ========== BIENVENIDA ==========  */}
  <div id="splash" role="dialog" aria-label="Bienvenida">
    {/*  Illustration: Rings (top-right)  */}
    <div className="splash-illu splash-illu-tr">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="50" rx="25" ry="28" stroke="#222" strokeWidth="1.8" fill="none"/>
        <ellipse cx="60" cy="50" rx="25" ry="28" stroke="#222" strokeWidth="1.8" fill="none"/>
        <circle cx="40" cy="30" r="5" stroke="#222" strokeWidth="1.2" fill="none"/>
        <path d="M37 25 L40 20 L43 25" stroke="#222" strokeWidth="1" fill="none"/>
        <circle cx="75" cy="25" r="2" fill="#222" opacity="0.5"/>
        <circle cx="82" cy="32" r="1.5" fill="#222" opacity="0.4"/>
        <path d="M78 20 L80 17 M82 22 L84 19" stroke="#222" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    </div>
    {/*  Illustration: Disco ball (top-left area shifted right)  */}
    <div className="splash-illu splash-illu-tl" >
      <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="0" x2="40" y2="20" stroke="#222" strokeWidth="1"/>
        <circle cx="40" cy="50" r="28" stroke="#222" strokeWidth="1.5" fill="none"/>
        <ellipse cx="40" cy="50" rx="28" ry="10" stroke="#222" strokeWidth="0.8" fill="none"/>
        <ellipse cx="40" cy="50" rx="20" ry="28" stroke="#222" strokeWidth="0.8" fill="none"/>
        <line x1="40" y1="22" x2="40" y2="78" stroke="#222" strokeWidth="0.6"/>
        <line x1="12" y1="50" x2="68" y2="50" stroke="#222" strokeWidth="0.6"/>
        <circle cx="65" cy="25" r="1.5" fill="#222" opacity="0.5"/>
        <circle cx="70" cy="30" r="1" fill="#222" opacity="0.4"/>
        <path d="M67 22 L69 19" stroke="#222" strokeWidth="0.7" opacity="0.5"/>
      </svg>
    </div>
    {/*  Illustration: Champagne glasses (left side)  */}
    <div className="splash-illu splash-illu-tl" >
      <svg viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 80 L25 50 C25 40 15 30 15 15 L15 5 L35 5 L35 15 C35 30 25 40 25 50" stroke="#222" strokeWidth="1.5" fill="none"/>
        <path d="M55 70 L55 45 C55 35 45 28 45 15 L45 5 L65 5 L65 15 C65 28 55 35 55 45" stroke="#222" strokeWidth="1.5" fill="none" transform="rotate(15 55 40)"/>
        <line x1="18" y1="80" x2="32" y2="80" stroke="#222" strokeWidth="1.5"/>
        <path d="M60 75 L48 82" stroke="#222" strokeWidth="1.5"/>
        {/*  sparkles  */}
        <circle cx="42" cy="20" r="1.5" fill="#222" opacity="0.5"/>
        <path d="M38 15 L40 12 M42 16 L44 13" stroke="#222" strokeWidth="0.7" opacity="0.5"/>
        <path d="M60 25 C62 22 65 24" stroke="#222" strokeWidth="0.8" fill="none" opacity="0.4"/>
        {/*  ribbon  */}
        <path d="M20 60 C15 55 10 58 8 55 M20 60 C15 65 10 62 8 65" stroke="#222" strokeWidth="1" fill="none"/>
      </svg>
    </div>
    {/*  Illustration: Bouquet (bottom-left)  */}
    <div className="splash-illu splash-illu-bl">
      <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 110 L45 70 M50 110 L55 70" stroke="#222" strokeWidth="1.5"/>
        <path d="M42 75 C35 80 38 85 42 82" stroke="#222" strokeWidth="1" fill="none"/>
        <circle cx="40" cy="55" r="10" stroke="#222" strokeWidth="1.3" fill="none"/>
        <circle cx="55" cy="50" r="9" stroke="#222" strokeWidth="1.3" fill="none"/>
        <circle cx="47" cy="42" r="8" stroke="#222" strokeWidth="1.3" fill="none"/>
        <circle cx="60" cy="60" r="8" stroke="#222" strokeWidth="1.3" fill="none"/>
        <circle cx="35" cy="45" r="7" stroke="#222" strokeWidth="1.3" fill="none"/>
        <circle cx="50" cy="35" r="6" stroke="#222" strokeWidth="1" fill="none"/>
        <path d="M30 65 C25 60 28 55 32 58" stroke="#222" strokeWidth="0.8" fill="none"/>
        <path d="M65 55 C70 50 68 45 64 48" stroke="#222" strokeWidth="0.8" fill="none"/>
      </svg>
    </div>
    {/*  Illustration: Cake (bottom-right)  */}
    <div className="splash-illu splash-illu-br">
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="85" width="50" height="25" rx="3" stroke="#222" strokeWidth="1.5" fill="none"/>
        <rect x="30" y="62" width="40" height="23" rx="3" stroke="#222" strokeWidth="1.5" fill="none"/>
        <rect x="35" y="42" width="30" height="20" rx="3" stroke="#222" strokeWidth="1.5" fill="none"/>
        {/*  decorations  */}
        <path d="M28 95 C32 92 36 95 40 92 C44 89 48 92 52 89 C56 86 60 89 64 86 C68 83 72 86 72 86" stroke="#222" strokeWidth="0.8" fill="none"/>
        <path d="M33 72 C36 70 39 72 42 70 C45 68 48 70 51 68 C54 66 57 68 60 66 C63 64 66 66 67 66" stroke="#222" strokeWidth="0.8" fill="none"/>
        {/*  hearts  */}
        <path d="M38 50 C38 48 40 47 41 48 C42 47 44 48 44 50 C44 52 41 54 41 54 C41 54 38 52 38 50" stroke="#222" strokeWidth="0.8" fill="none"/>
        <path d="M52 50 C52 48 54 47 55 48 C56 47 58 48 58 50 C58 52 55 54 55 54 C55 54 52 52 52 50" stroke="#222" strokeWidth="0.8" fill="none"/>
        {/*  candle  */}
        <line x1="50" y1="42" x2="50" y2="32" stroke="#222" strokeWidth="1.5"/>
        <path d="M48 32 C48 28 50 26 50 26 C50 26 52 28 52 32" stroke="#222" strokeWidth="1" fill="#222" opacity="0.3"/>
        {/*  cork popping effect  */}
        <path d="M55 30 L58 26 M52 28 L50 24" stroke="#222" strokeWidth="0.7" opacity="0.4"/>
      </svg>
    </div>
    {/*  Illustration: Champagne bottle (right side)  */}
    <div className="splash-illu" >
      <svg viewBox="0 0 70 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 130 L35 60 C35 50 40 45 40 35 L40 15 C40 10 30 10 30 15 L30 35 C30 45 35 50 35 60" stroke="#222" strokeWidth="1.5" fill="none"/>
        <rect x="30" y="5" width="10" height="10" rx="2" stroke="#222" strokeWidth="1.2" fill="none"/>
        <path d="M30 5 L28 0 M40 5 L42 0" stroke="#222" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="35" cy="90" rx="12" ry="3" stroke="#222" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M27 70 L43 70 M27 110 L43 110" stroke="#222" strokeWidth="0.6" opacity="0.3"/>
      </svg>
    </div>

    <div className="splash-inner">
      <p className="splash-kicker">&iexcl;Nos casamos!</p>
      <h1 className="splash-name"><span className="name-script">Sof&iacute;a</span><span className="name-and">y</span>FELIPE</h1>
      <div className="splash-divider">
        <div className="line"></div>
        <span className="ornament">&diams;</span>
        <div className="line"></div>
      </div>
      <button type="button" className="splash-btn" id="enterBtn">
        Abrir invitaci&oacute;n
      </button>
    </div>
  </div>

  {/*  Botón música (aparece al entrar)  */}
  <button type="button" className="music-btn" id="musicBtn" aria-label="Música de fondo" title="Música">♪</button>
  <div id="toast" role="status"></div>

  {/*  ========== CONTENIDO ==========  */}
  <div id="main">

    {/*  HERO + COUNTDOWN  */}
    <section className="section hero" id="inicio">
      <div className="wrap">
        {/*  Foto circular: reemplazá src o dejá el placeholder  */}
        {/*  <img className="hero-photo" src="/assets-demos/[URL_FOTO_PRINCIPAL]" alt="Sofía & Felipe" />  */}
        <div className="hero-photo placeholder" aria-hidden="true">S&F</div>

        <p className="hero-kicker">Nos casamos</p>
        <h1>Sofía & Felipe</h1>
        <p className="hero-date">Sábado 14 de noviembre de 2026 · 20:00 hs</p>

        <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap", zIndex: 10, position: "relative"}}>
           <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Sofia+y+Felipe&dates=20261114T230000Z/20261115T090000Z&details=Celebremos+el+amor!&location=Salon+Dorado,+Palermo" target="_blank" rel="noopener noreferrer" style={{background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)", padding: "0.6rem 1.2rem", borderRadius: "50px", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", textDecoration: "none", fontWeight: "bold"}}>
              📅 Agregar a Google
           </a>
           <a href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:https://teinvitoapp.com.ar%0ADTSTART:20261114T230000Z%0ADTEND:20261115T090000Z%0ASUMMARY:Boda%20de%20Sofia%20y%20Felipe%0ADESCRIPTION:Celebremos%20el%20amor!%0ALOCATION:Salon%20Dorado%2C%20Palermo%0AEND:VEVENT%0AEND:VCALENDAR" download="boda_sofia_felipe.ics" style={{background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)", padding: "0.6rem 1.2rem", borderRadius: "50px", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", textDecoration: "none", fontWeight: "bold"}}>
              🍎 Apple / Outlook
           </a>
        </div>

        <div className="countdown" id="countdown" aria-live="polite">
          <div><span className="n" id="cd-d">—</span><span className="l">Días</span></div>
          <div><span className="n" id="cd-h">—</span><span className="l">Horas</span></div>
          <div><span className="n" id="cd-m">—</span><span className="l">Min</span></div>
          <div><span className="n" id="cd-s">—</span><span className="l">Seg</span></div>
        </div>

        <a className="btn btn-primary" href="#cuando">Ver detalles</a>
      </div>
      <div className="scroll-cue">Deslizá<span>↓</span></div>
    </section>

    {/*  FRASE  */}
    <section className="section" >
      <div className="wrap reveal">
        <p className="script">Que brille el amor esta noche…</p>
        <p className="lead" >
          Los esperamos para brindar juntos.
        </p>
      </div>
    </section>

    {/*  CUÁNDO / DÓNDE  */}
    <section className="section" id="cuando">
      <div className="wrap">
        <p className="eyebrow reveal">La celebración</p>
        <h2 className="reveal">¿Cuándo & dónde?</h2>
        <p className="lead reveal">Todo listo para una noche inolvidable.</p>

        <div className="card reveal">
          <div className="icon">◈</div>
          <h3>¿Cuándo?</h3>
          <p>
            <strong>Sábado 14 de noviembre de 2026</strong>
            20:00 hs
          </p>
        </div>

        <div className="card reveal">
          <div className="icon">◎</div>
          <h3>¿Dónde?</h3>
          <p>
            <strong>Salón Dorado</strong>
            Palermo, Buenos Aires
          </p>
          {/*  EDITAR URL_MAPS  */}
          <a className="link" href="https://www.google.com/maps/search/?api=1&query=Palermo+Buenos+Aires" target="_blank" rel="noopener">
            Cómo llegar →
          </a>
        </div>
      </div>
    </section>

    {/* ITINERARIO (TIMELINE) */}
    <section className="section" id="itinerario">
      <div className="wrap reveal">
        <p className="eyebrow">Organización</p>
        <h2>Itinerario</h2>
        
        <div style={{position: "relative", padding: "2rem 0", maxWidth: "400px", margin: "0 auto", textAlign: "left"}}>
           <div style={{position: "absolute", left: "20px", top: 0, bottom: 0, width: "2px", background: "rgba(255,215,0,0.3)"}}></div>
           
           <div style={{position: "relative", paddingLeft: "50px", marginBottom: "2rem"}}>
             <div style={{position: "absolute", left: "9px", top: "0", background: "#111", border: "2px solid #FFD700", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px"}}>💍</div>
             <p style={{color: "#FFD700", fontWeight: "bold", margin: 0}}>20:30 hs</p>
             <h3 style={{margin: "0 0 5px 0", fontSize: "1.1rem"}}>Ceremonia</h3>
             <p style={{opacity: 0.7, margin: 0, fontSize: "0.9rem"}}>El sí frente a nuestras familias.</p>
           </div>
           
           <div style={{position: "relative", paddingLeft: "50px", marginBottom: "2rem"}}>
             <div style={{position: "absolute", left: "9px", top: "0", background: "#111", border: "2px solid #FFD700", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px"}}>🥂</div>
             <p style={{color: "#FFD700", fontWeight: "bold", margin: 0}}>21:30 hs</p>
             <h3 style={{margin: "0 0 5px 0", fontSize: "1.1rem"}}>Recepción</h3>
             <p style={{opacity: 0.7, margin: 0, fontSize: "0.9rem"}}>Tragos, música y charla.</p>
           </div>
           
           <div style={{position: "relative", paddingLeft: "50px", marginBottom: "2rem"}}>
             <div style={{position: "absolute", left: "9px", top: "0", background: "#111", border: "2px solid #FFD700", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px"}}>🍽️</div>
             <p style={{color: "#FFD700", fontWeight: "bold", margin: 0}}>22:30 hs</p>
             <h3 style={{margin: "0 0 5px 0", fontSize: "1.1rem"}}>Cena</h3>
             <p style={{opacity: 0.7, margin: 0, fontSize: "0.9rem"}}>A disfrutar del menú.</p>
           </div>
           
           <div style={{position: "relative", paddingLeft: "50px"}}>
             <div style={{position: "absolute", left: "9px", top: "0", background: "#111", border: "2px solid #FFD700", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px"}}>💃</div>
             <p style={{color: "#FFD700", fontWeight: "bold", margin: 0}}>01:00 hs</p>
             <h3 style={{margin: "0 0 5px 0", fontSize: "1.1rem"}}>¡Fiesta!</h3>
             <p style={{opacity: 0.7, margin: 0, fontSize: "0.9rem"}}>Barra libre y cotillón.</p>
           </div>
        </div>

        {/*  Si hay ceremonia separada, descomentá:
        <div className="card reveal">
          <div className="icon">✝</div>
          <h3>Ceremonia</h3>
          <p>
            <strong>[HORA_CEREMONIA] hs</strong>
            [LUGAR_CEREMONIA]<br />
            [DIRECCION_CEREMONIA]
          </p>
          <a className="link" href="[URL_MAPS_CEREMONIA]" target="_blank" rel="noopener">Cómo llegar →</a>
        </div>
         */}
      </div>
    </section>

    {/*  DRESS CODE  */}
    <section className="section" id="dress" >
      <div className="wrap reveal">
        <p className="eyebrow">Código de vestimenta</p>
        <h2>Dress code</h2>
        <div className="card" >
          <div className="icon">◇</div>
          <h3>Formal black tie</h3>
          <p>Noche elegante</p>
          <div className="pills">
            <span>Negro</span>
            <span>Dorado</span>
            <span>Elegante</span>
          </div>
        </div>
      </div>
    </section>

    {/*  VALOR TARJETA (típico XV Argentina)  */}
    <section className="section" id="valor">
      <div className="wrap">
        <p className="eyebrow reveal">Información</p>
        <h2 className="reveal">Mesa de regalos</h2>
        <p className="lead reveal">
          Tu presencia es el mejor regalo. Si deseás sumar un detalle:
        </p>

        <div className="alias-box reveal">
          <p className="label">Alias</p>
          <p className="value" id="aliasValue">sofia.tomas.2026</p>
          <p className="sub">CVU / CBU: 0000003100011111111111</p>
          <p className="sub" >Titular: Sofía Martínez</p>
          <button type="button" className="copy-btn" id="copyAliasBtn" data-copy="sofia.tomas.2026">
            Copiar alias
          </button>
        </div>
      </div>
    </section>

    
    {/*  GALERIA INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "2rem"}}>Galería</h2>
      <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", maxWidth: "500px", margin: "0 auto"}}>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
      </div>
    </section>

    {/*  RSVP  */}
    <section className="section" id="rsvp">
      <div className="wrap">
        <p className="eyebrow reveal">Tu respuesta</p>
        <h2 className="reveal">Confirmá tu asistencia</h2>
        <p className="lead reveal">
          Por favor respondé antes del <strong >1 de noviembre de 2026</strong>.
        </p>

        <div className="btn-row reveal">
          {/* 
            LINK_WHATSAPP: wa.me/549XXXXXXXXX?text=...
            El mensaje se arma abajo en CONFIG JS también.
           */}
                      {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-boda-noche-dorada") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-boda-noche-dorada",
                    guestName: formData.get("name"),
                    guestCount: formData.get("count"),
                    dietaryNotes: formData.get("diet"),
                    confirmed: true,
                  })
                });
                if (res.ok) {
                  btn.innerHTML = "¡Confirmado!";
                  btn.style.background = "#25D366";
                  btn.style.color = "#fff";
                } else {
                  btn.innerHTML = "Error al guardar";
                }
              } catch (err) {
                btn.innerHTML = "Error de conexión";
              }
            }} style={{marginTop: "2rem", textAlign: "left", width: "100%", maxWidth: "400px", margin: "2rem auto"}}>
              
              <div style={{marginBottom: "1rem"}}>
                <label style={{display: "block", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem"}}>Nombre y Apellido</label>
                <input type="text" name="name" placeholder="Ej: Familia Pérez" required style={{background: "rgba(128,128,128,0.1)", color: "inherit", border: "1px solid rgba(128,128,128,0.3)", padding: "1rem", borderRadius: "8px", width: "100%", fontSize: "0.9rem", outline: "none"}} />
              </div>

              <div style={{marginBottom: "1rem"}}>
                <label style={{display: "block", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem"}}>Cantidad de Asistentes</label>
                <select name="count" required style={{background: "rgba(128,128,128,0.1)", color: "inherit", border: "1px solid rgba(128,128,128,0.3)", padding: "1rem", borderRadius: "8px", width: "100%", fontSize: "0.9rem", outline: "none", appearance: "none"}}>
                  <option value="1" style={{color:"black"}}>1 Persona</option>
                  <option value="2" style={{color:"black"}}>2 Personas</option>
                  <option value="3" style={{color:"black"}}>3 Personas</option>
                  <option value="4" style={{color:"black"}}>4 Personas</option>
                  <option value="5" style={{color:"black"}}>5 Personas</option>
                </select>
              </div>

              <div style={{marginBottom: "2rem"}}>
                <label style={{display: "block", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem"}}>Menú Especial</label>
                <input type="text" name="diet" placeholder="Vegetariano, Celíaco, etc (Opcional)" style={{background: "rgba(128,128,128,0.1)", color: "inherit", border: "1px solid rgba(128,128,128,0.3)", padding: "1rem", borderRadius: "8px", width: "100%", fontSize: "0.9rem", outline: "none"}} />
              </div>

              <button type="submit" id="btnSubmitRsvp-demo-boda-noche-dorada" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
          <button type="button" className="btn btn-outline btn-full" id="openGiftsBtn">
            Ver datos de pago / regalos
          </button>
        </div>
      </div>
    </section>

    {/*  GALERÍA  */}
    <section className="section" id="fotos">
      <div className="wrap">
        <p className="eyebrow reveal">Momentos</p>
        <h2 className="reveal">Galería</h2>
        <p className="lead reveal">Algunos instantes de esta historia.</p>

        <div className="gallery reveal">
          {/*  Reemplazá los .ph por <div className="ph"><img src="/assets-demos/foto1.jpg" alt="" /></div>  */}
          <div className="ph">Foto 1</div>
          <div className="ph">Foto 2</div>
          <div className="ph wide">Foto portada</div>
          <div className="ph">Foto 3</div>
          <div className="ph">Foto 4</div>
        </div>

        <p className="hashtag reveal">#SofiaYTomas2026</p>
        <p className="lead reveal" >
          Usá el hashtag en tus stories y publicaciones.
        </p>
      </div>
    </section>

    {/* PARTY CAM CTA */}
    <section className="section" style={{background: "linear-gradient(45deg, #FF6B9D, #FF8C42)", color: "#FFF9E0", padding: "4rem 2rem", margin: "2rem 0", borderRadius: "24px"}}>
      <div className="wrap reveal" style={{textAlign: "center"}}>
        <p className="eyebrow" style={{color: "rgba(255,255,255,0.9)", margin: "0 0 10px 0"}}>Compartí tus fotos</p>
        <h2 style={{color: "white", margin: "0 0 20px 0"}}>Party Cam 📸</h2>
        <p className="lead" style={{color: "rgba(255,255,255,0.9)", margin: "0 auto 30px auto", maxWidth: "400px"}}>
          Las fotos que saques van directo a la pantalla gigante del salón.
        </p>
        <a href="/demo-wall/upload" target="_blank" style={{display: "inline-block", background: "#1a1a1a", color: "#FFD700", padding: "1rem 2rem", borderRadius: "50px", textDecoration: "none", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0px rgba(0,0,0,0.5)"}}>
          Subir mis fotos
        </a>
      </div>
    </section>

    {/*  CIERRE  */}
    <section className="section close-section" id="cierre">
      <div className="wrap reveal">
        <div  aria-hidden="true">◆</div>
        <p className="close-quote">“Que brille el amor…”</p>
        <p className="lead" >Los esperamos con el corazón abierto.</p>
        <p className="close-name">Sofía & Felipe</p>
        <p >
          14 · 11 · 2026
        </p>
      </div>
    </section>

    
  
  
  

  
  {/*  Contacto / Demo Info (Injected)  */}
  <style>{`
    .contacto-footer-wrap {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .contacto-col { flex: 1; }
    @media (min-width: 768px) {
      .contacto-footer-wrap {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .contacto-footer h5 {
      font-family: inherit;
      font-size: 1.1rem;
      font-weight: 400;
      letter-spacing: 2px;
      margin-bottom: 20px;
      color: #222;
      text-transform: uppercase;
    }
    .contacto-footer p {
      font-size: 0.95rem;
      font-weight: 300;
      color: #666;
      margin-bottom: 25px;
      line-height: 1.8;
    }
    .contacto-footer ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 0.95rem;
      font-weight: 300;
      color: #555;
      line-height: 2.2;
    }
    .contacto-footer a { color: #61ce70; text-decoration: none; font-weight: 400; }
  `}</style>
  <section className="contacto-footer" >
    <div className="contacto-footer-wrap">
      <div className="contacto-col">
        <h5>¿Te gustó la invitación?</h5>
        <p>¡Contactate y pedí la tuya!</p>
        <ul>
          <li><i className="fab fa-whatsapp" ></i> <a href="https://wa.me/5493425299942">¡Envianos un Whatsapp!</a></li>
          <li><i className="fas fa-phone-alt" ></i> +549 342 5299942</li>
          <li><i className="fas fa-envelope" ></i> teinvitoapp@gmail.com</li>
        </ul>
      </div>
      <div className="contacto-col">
        <h5>Seguinos en Instagram</h5>
        
        <ul>
          <li><i className="fab fa-instagram" ></i> <a href="https://instagram.com/teinvitoapp">@teinvitoapp</a></li>
        </ul>
      </div>
    </div>
  </section>

  <footer>
      <div className="brand">Te <em>invito</em></div>
      <p>Demo · Boda Noche Dorada</p>
    </footer>
  </div>

  {/*  MODAL REGALOS / PAGO  */}
  <div className="modal-backdrop" id="giftsModal" role="dialog" aria-modal="true" aria-labelledby="giftsTitle">
    <div className="modal">
      <div className="modal-inner">
        <button type="button" className="close-x" id="closeGifts" aria-label="Cerrar">&times;</button>
        <h3 id="giftsTitle">Datos de pago</h3>
        <p className="lead" >Transferencia · Mercado Pago</p>

        <div className="alias-box" >
          <p className="label">Alias</p>
          <p className="value">sofia.tomas.2026</p>
          <button type="button" className="copy-btn" data-copy="sofia.tomas.2026">Copiar alias</button>
        </div>
        <div className="alias-box">
          <p className="label">CBU / CVU</p>
          <p className="value" >0000003100011111111111</p>
          <p className="sub">Titular: Sofía Martínez</p>
          <button type="button" className="copy-btn" data-copy="0000003100011111111111">Copiar CBU</button>
        </div>
      </div>
    </div>
  </div>

  
        </div>
    );
}
