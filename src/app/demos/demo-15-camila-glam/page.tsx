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
            if (musicBtn) if (musicBtn) musicBtn.classList.add('visible');
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
                if (musicBtn) musicBtn.innerHTML = '❚❚';
            } else {
                audio.pause();
                musicBtn?.classList.remove('on');
                if (musicBtn) musicBtn.innerHTML = '♪';
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

        return () => {
            if (enterBtn) enterBtn.removeEventListener('click', handleEnter);
            if (musicBtn) musicBtn.removeEventListener('click', handleMusic);
        };
    }, []);

    return (
        <div className="demo-wrapper">
            
  <audio id="bgAudio" loop preload="auto"><source src="/bad-bunny.mp3" type="audio/mpeg" /></audio>

  {/*  SPLASH  */}
  <div className="splash" id="splash">
    {/*  Disco balls in corners  */}
    <svg className="splash-deco-tl" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="35" fill="url(#disco1)"/>
      <line x1="20" y1="20" x2="60" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <line x1="40" y1="5" x2="40" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <line x1="5" y1="40" x2="75" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <line x1="60" y1="20" x2="20" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <defs><radialGradient id="disco1"><stop offset="0%" stopColor="#fff"/><stop offset="50%" stopColor="#C0C0C0"/><stop offset="100%" stopColor="#888"/></radialGradient></defs>
    </svg>
    <svg className="splash-deco-tr" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="35" fill="url(#disco2)"/>
      <line x1="20" y1="20" x2="60" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <line x1="40" y1="5" x2="40" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <line x1="5" y1="40" x2="75" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <defs><radialGradient id="disco2"><stop offset="0%" stopColor="#fff"/><stop offset="50%" stopColor="#C0C0C0"/><stop offset="100%" stopColor="#888"/></radialGradient></defs>
    </svg>
    {/*  Stars  */}
    <svg className="splash-deco-bl" viewBox="0 0 80 80" fill="none">
      <polygon points="40,5 45,30 70,30 50,45 55,70 40,55 25,70 30,45 10,30 35,30" fill="var(--pink)" opacity="0.6"/>
      <polygon points="15,10 17,18 25,18 19,23 21,31 15,26 9,31 11,23 5,18 13,18" fill="var(--silver)" opacity="0.8"/>
    </svg>
    <svg className="splash-deco-br" viewBox="0 0 80 80" fill="none">
      <polygon points="40,10 44,28 62,28 48,40 52,58 40,48 28,58 32,40 18,28 36,28" fill="none" stroke="var(--black)" strokeWidth="1.5"/>
      <polygon points="65,5 67,12 74,12 69,16 70,23 65,19 60,23 61,16 56,12 63,12" fill="var(--pink-light)" opacity="0.9"/>
    </svg>

    <div className="splash-content">
      <p className="splash-subtitle">Te invito a mi cumple</p>

      {/*  Photo  */}
      <div className="splash-photo">
        <img src="/foto-15-camila.jpg" alt="Camila"  />
      </div>

      {/*  15 big number  */}
      <div className="splash-fifteen">15</div>

      {/*  Name  */}
      <h1 className="splash-name">Camila</h1>

      {/*  Date editorial  */}
      <p className="splash-date">SAB.<span>|</span>27 SEP<span>|</span>08PM</p>

      {/*  Ribbon/bow SVG  */}
      <svg width="60" height="30" viewBox="0 0 60 30" >
        <path d="M30 15 C20 5, 5 5, 5 15 C5 25, 20 25, 30 15" fill="var(--pink-light)"/>
        <path d="M30 15 C40 5, 55 5, 55 15 C55 25, 40 25, 30 15" fill="var(--pink-light)"/>
        <circle cx="30" cy="15" r="3" fill="var(--pink)"/>
      </svg>

      <button className="btn-enter" id="enterBtn" onClick={() => {}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Abrir invitacion
      </button>
    </div>
  </div>

  {/*  Music Button  */}
  <button className="music-btn" id="musicBtn" onClick={() => {}} aria-label="Musica">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  </button>

  {/*  MAIN CONTENT  */}
  <div className="main-content" id="mainContent">

    {/*  HERO  */}
    <section className="hero reveal">
      <svg width="40" height="40" viewBox="0 0 40 40" >
        <polygon points="20,2 23,15 37,15 26,22 29,35 20,27 11,35 14,22 3,15 17,15" fill="none" stroke="var(--silver)" strokeWidth="1"/>
      </svg>
      <h1>Camila</h1>
      <p className="hero-date">MIS 15 ANOS</p>
      <div className="countdown">
        <div className="cd-item"><span className="num" id="cd-days">--</span><span className="label">Dias</span></div>
        <div className="cd-item"><span className="num" id="cd-hours">--</span><span className="label">Horas</span></div>
        <div className="cd-item"><span className="num" id="cd-mins">--</span><span className="label">Min</span></div>
        <div className="cd-item"><span className="num" id="cd-secs">--</span><span className="label">Seg</span></div>
      </div>
    </section>

    {/*  FRASE  */}
    <section className="reveal">
      <p className="frase">Hoy empieza un nuevo capitulo en mi vida y quiero compartirlo con las personas que mas quiero.</p>
    </section>

    {/*  CUANDO / DONDE  */}
    <section className="reveal">
      <h2 className="section-title">Cuando y Donde</h2>
      <div className="card">
        <div className="card-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <h3>Fecha</h3>
        <p>Sabado 27 de Septiembre de 2027</p>
        <p >20:00 hs</p>
      </div>
      <div className="card">
        <div className="card-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <h3>Lugar</h3>
        <p >Salon Royal, Rosario</p>
        <p >Av. Belgrano 1234</p>
      </div>
    </section>

    {/*  DRESS CODE  */}
    <section className="reveal">
      <h2 className="section-title">Dress Code</h2>
      <div className="card">
        <div className="card-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
        </div>
        <h3>Codigo de Vestimenta</h3>
        <p>Veni con tu mejor outfit para una noche inolvidable</p>
        <div className="dresscode-badge">Glam / Elegante</div>
      </div>
    </section>

    {/*  MESA DE REGALOS  */}
    <section className="reveal">
      <h2 className="section-title">Mesa de Regalos</h2>
      <div className="card">
        <div className="card-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
        </div>
        <h3>Tu regalo es tu presencia</h3>
        <p >Pero si queres hacerme un regalo podes transferir a:</p>
        <div className="copy-row">
          <span id="aliasText">quince.camila.2027</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
        <div className="copy-row">
          <span id="cbuText">0000003100066666666666</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
      </div>
    </section>

    {/*  RSVP  */}
    <section className="reveal">
      <h2 className="section-title">Confirma tu Asistencia</h2>
      <p >Confirmame por WhatsApp asi te espero!</p>
                  {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-15-camila-glam") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-15-camila-glam",
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

              <button type="submit" id="btnSubmitRsvp-demo-15-camila-glam" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
      <br/>
      <button className="btn-secondary" onClick={() => {}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        Ver datos de pago
      </button>
    </section>

    {/*  GALERIA  */}
    <section className="reveal">
      <h2 className="section-title">Galeria</h2>
      <p >#Los15DeCamila</p>
      <div className="gallery-grid">
        <div className="gallery-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <div className="gallery-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <div className="gallery-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <div className="gallery-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
      </div>
    </section>

    {/*  CIERRE  */}
    <section className="reveal">
      <svg width="50" height="50" viewBox="0 0 50 50" >
        <polygon points="25,3 29,19 46,19 32,28 36,44 25,35 14,44 18,28 4,19 21,19" fill="var(--pink-light)" stroke="var(--pink)" strokeWidth="1"/>
      </svg>
      <p >Te espero para celebrar juntas esta noche magica!</p>
      <svg width="30" height="30" viewBox="0 0 30 30" >
        <polygon points="15,2 17,11 26,11 19,16 21,25 15,20 9,25 11,16 4,11 13,11" fill="none" stroke="var(--silver)" strokeWidth="1"/>
      </svg>
    </section>

    {/*  CONTACTO  */}
    <div className="contacto">
      <p >Invitacion creada por</p>
      <p >
        <a href="https://wa.me/5493425299942" target="_blank">WhatsApp: +54 9 342 529 9942</a>
      </p>
      <p>
        <a href="https://instagram.com/teinvitoapp" target="_blank" >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          @teinvitoapp
        </a>
      </p>
    </div>

    {/*  FOOTER  */}
    <div className="footer">
      <p>Hecho con amor por <a href="https://teinvitoapp.com.ar" target="_blank">Te Invito</a></p>
    </div>

  </div>{/*  /main  */}

  {/*  Party Cam Button  */}
  <a className="party-cam" id="partyCam" href="#" aria-label="Party Cam">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
  </a>

  {/*  Toast  */}
  <div className="toast" id="toast"></div>

  {/*  Modal de pago  */}
  <div className="modal-overlay" id="modalOverlay" onClick={() => {}}>
    <div className="modal">
      <button className="modal-close" onClick={() => {}}>&times;</button>
      <h3 >Datos de Pago</h3>
      <p >Podes transferir al siguiente alias o CBU:</p>
      <div className="copy-row">
        <span>quince.camila.2027</span>
        <button className="copy-btn" onClick={() => {}}>Copiar</button>
      </div>
      <div className="copy-row">
        <span>0000003100066666666666</span>
        <button className="copy-btn" onClick={() => {}}>Copiar</button>
      </div>
    </div>
  </div>

  
        </div>
    );
}
