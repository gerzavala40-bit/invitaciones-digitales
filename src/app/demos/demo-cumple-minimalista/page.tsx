'use client';
import './style.css';
import { useEffect } from 'react';

export default function DemoDespedidaNeon() {
    useEffect(() => {
        const enterBtn = document.getElementById('enterBtn');
        const splash = document.getElementById('splash');
        const main = document.getElementById('mainContent') || document.getElementById('main');
        const musicBtn = document.getElementById('musicBtn');
        const audio = document.getElementById('bgAudio') || document.getElementById('bgMusic') as HTMLAudioElement;

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

        return () => {
            if (enterBtn) enterBtn.removeEventListener('click', handleEnter);
            if (musicBtn) musicBtn.removeEventListener('click', handleMusic);
        };
    }, []);

    return (
        <div className="demo-wrapper">
            
  <audio id="bgAudio" loop preload="auto"><source src="/se-menea.mp3" type="audio/mpeg" /></audio>

  {/*  ===== SPLASH =====  */}
  <div className="splash" id="splash">
    {/*  Disco Ball top-left  */}
    <svg className="splash-deco-tl" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="0" x2="60" y2="20" stroke="#888" strokeWidth="2"/>
      <circle cx="60" cy="70" r="48" fill="url(#discoGrad)"/>
      <g opacity="0.5">
        <line x1="20" y1="40" x2="100" y2="40" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="16" y1="55" x2="104" y2="55" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="14" y1="70" x2="106" y2="70" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="16" y1="85" x2="104" y2="85" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="20" y1="100" x2="100" y2="100" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="35" y1="24" x2="35" y2="116" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="48" y1="23" x2="48" y2="117" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="60" y1="22" x2="60" y2="118" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="72" y1="23" x2="72" y2="117" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="85" y1="24" x2="85" y2="116" stroke="#ccc" strokeWidth="0.5"/>
      </g>
      <circle cx="45" cy="55" r="3" fill="#fff" opacity="0.8"/>
      <circle cx="70" cy="65" r="2" fill="#fff" opacity="0.6"/>
      <circle cx="55" cy="80" r="2.5" fill="#fff" opacity="0.7"/>
      <circle cx="75" cy="50" r="2" fill="#fff" opacity="0.5"/>
      <defs>
        <radialGradient id="discoGrad" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#E8E8E8"/>
          <stop offset="60%" stopColor="#B0B0B0"/>
          <stop offset="100%" stopColor="#808080"/>
        </radialGradient>
      </defs>
    </svg>

    {/*  Megaphone top-right  */}
    <svg className="splash-deco-tr" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 55 L35 45 L65 25 L70 20 L72 22 L68 28 L40 50 L20 58 Z" fill="#D94F5C" opacity="0.9"/>
      <path d="M65 25 L75 15 L78 18 L70 26 Z" fill="#D4AF37"/>
      <ellipse cx="18" cy="56" rx="5" ry="3" fill="#D94F5C" opacity="0.7"/>
      <line x1="70" y1="18" x2="74" y2="10" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="76" y1="16" x2="80" y2="12" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="74" y1="24" x2="80" y2="22" stroke="#D4AF37" strokeWidth="1.5"/>
    </svg>

    {/*  Party hat bottom-left  */}
    <svg className="splash-deco-bl" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="35,5 55,80 15,80" fill="#F0A0B0"/>
      <polygon points="35,5 38,5 58,80 55,80" fill="#E890A0"/>
      <ellipse cx="35" cy="80" rx="22" ry="5" fill="#D94F5C"/>
      <polygon points="35,2 32,10 38,10" fill="#D4AF37"/>
      <circle cx="35" cy="3" r="3" fill="#D4AF37"/>
      <line x1="25" y1="35" x2="45" y2="35" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <line x1="22" y1="50" x2="48" y2="50" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <line x1="19" y1="65" x2="51" y2="65" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
    </svg>

    {/*  Cassette bottom-right  */}
    <svg className="splash-deco-br" viewBox="0 0 80 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="50" rx="4" fill="#3A2E2E" stroke="#D94F5C" strokeWidth="1.5"/>
      <rect x="8" y="8" width="64" height="30" rx="2" fill="#EDE8DF" opacity="0.9"/>
      <circle cx="28" cy="23" r="10" fill="none" stroke="#3A2E2E" strokeWidth="2"/>
      <circle cx="28" cy="23" r="4" fill="#3A2E2E"/>
      <circle cx="52" cy="23" r="10" fill="none" stroke="#3A2E2E" strokeWidth="2"/>
      <circle cx="52" cy="23" r="4" fill="#3A2E2E"/>
      <rect x="32" y="18" width="16" height="10" fill="#3A2E2E" opacity="0.3" rx="1"/>
      <rect x="20" y="42" width="40" height="6" rx="3" fill="#3A2E2E" opacity="0.5"/>
      <text x="40" y="47" text-anchor="middle" font-size="4" fill="#EDE8DF" font-family="monospace">SIDE A</text>
    </svg>

    <div className="splash-content">
      <p className="splash-subtitle">Martin te invita a su</p>
      <h1 className="splash-title">Noche de Cumple</h1>
      <p className="splash-detail">Trae tu bebida favorita para compartir</p>
      <p className="splash-date">24 de abril &middot; 7:00 p.m.</p>

      {/*  Number 30 balloons  */}
      <div className="splash-number">
        <svg width="140" height="100" viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="balloonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8C0D0"/>
              <stop offset="50%" stopColor="#F0A0B0"/>
              <stop offset="100%" stopColor="#D88090"/>
            </linearGradient>
          </defs>
          {/*  3  */}
          <ellipse cx="40" cy="42" rx="30" ry="38" fill="url(#balloonGrad)"/>
          <ellipse cx="32" cy="32" rx="6" ry="8" fill="#fff" opacity="0.3"/>
          <text x="40" y="55" text-anchor="middle" font-size="40" font-weight="bold" fill="#fff" font-family="sans-serif">3</text>
          <line x1="40" y1="80" x2="42" y2="98" stroke="#D94F5C" strokeWidth="1"/>
          {/*  0  */}
          <ellipse cx="100" cy="42" rx="30" ry="38" fill="url(#balloonGrad)"/>
          <ellipse cx="92" cy="32" rx="6" ry="8" fill="#fff" opacity="0.3"/>
          <text x="100" y="55" text-anchor="middle" font-size="40" font-weight="bold" fill="#fff" font-family="sans-serif">0</text>
          <line x1="100" y1="80" x2="98" y2="98" stroke="#D94F5C" strokeWidth="1"/>
        </svg>
      </div>

      <button className="enter-btn" id="enterBtn" onClick={() => {}}>Abrir invitacion</button>
    </div>

    {/*  Bow/ribbon decoration  */}
    <svg  viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 20 C15 10, 5 10, 5 18 C5 25, 15 28, 25 20" fill="#F0A0B0"/>
      <path d="M25 20 C35 10, 45 10, 45 18 C45 25, 35 28, 25 20" fill="#F0A0B0"/>
      <circle cx="25" cy="20" r="4" fill="#D94F5C"/>
      <path d="M22 24 Q25 35 23 40" stroke="#F0A0B0" strokeWidth="2" fill="none"/>
      <path d="M28 24 Q25 35 27 40" stroke="#F0A0B0" strokeWidth="2" fill="none"/>
    </svg>
  </div>

  {/*  ===== MAIN CONTENT =====  */}
  <div className="main-content" id="mainContent">

    {/*  Music Button  */}
    <button className="music-btn" id="musicBtn" onClick={() => {}} aria-label="Musica">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    </button>

    {/*  HERO  */}
    <section className="hero reveal">
      <svg width="80" height="95" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <line x1="60" y1="0" x2="60" y2="20" stroke="#888" strokeWidth="2"/>
        <circle cx="60" cy="70" r="48" fill="url(#discoGrad2)"/>
        <g opacity="0.4">
          <line x1="20" y1="40" x2="100" y2="40" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="16" y1="55" x2="104" y2="55" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="14" y1="70" x2="106" y2="70" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="16" y1="85" x2="104" y2="85" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="20" y1="100" x2="100" y2="100" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="35" y1="24" x2="35" y2="116" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="48" y1="23" x2="48" y2="117" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="60" y1="22" x2="60" y2="118" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="72" y1="23" x2="72" y2="117" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="85" y1="24" x2="85" y2="116" stroke="#ccc" strokeWidth="0.5"/>
        </g>
        <circle cx="45" cy="55" r="3" fill="#fff" opacity="0.8"/>
        <circle cx="70" cy="65" r="2" fill="#fff" opacity="0.6"/>
        <circle cx="55" cy="80" r="2.5" fill="#fff" opacity="0.7"/>
        <defs>
          <radialGradient id="discoGrad2" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#E8E8E8"/>
            <stop offset="60%" stopColor="#B0B0B0"/>
            <stop offset="100%" stopColor="#808080"/>
          </radialGradient>
        </defs>
      </svg>
      <h1 className="splash-name">Martin</h1>
      <p className="hero-date">Sabado 24 de abril de 2027</p>
      <div className="countdown" id="countdown">
        <div className="countdown-item"><span className="number" id="days">--</span><span className="label">Dias</span></div>
        <div className="countdown-item"><span className="number" id="hours">--</span><span className="label">Horas</span></div>
        <div className="countdown-item"><span className="number" id="mins">--</span><span className="label">Min</span></div>
        <div className="countdown-item"><span className="number" id="secs">--</span><span className="label">Seg</span></div>
      </div>
    </section>

    {/*  FRASE  */}
    <section className="reveal">
      <div className="frase">
        <p>&iexcl;No se cumplen 30 todos los dias! Veni a festejar conmigo esta noche epica.</p>
      </div>
    </section>

    {/*  CUANDO / DONDE  */}
    <section className="reveal">
      <div className="info-card">
        <svg className="icon-inline" viewBox="0 0 24 24" fill="none" stroke="#D94F5C" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <h3>Cuando</h3>
        <p>Sabado 24 de abril de 2027</p>
        <p>19:00 hs</p>
      </div>
      <div className="info-card">
        <svg className="icon-inline" viewBox="0 0 24 24" fill="none" stroke="#D94F5C" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <h3>Donde</h3>
        <p>Casa de Martin</p>
        <p>Calle Mitre 789</p>
      </div>
    </section>

    {/*  QUE TRAER  */}
    <section className="reveal">
      <div className="info-card">
        <svg className="icon-inline" viewBox="0 0 24 24" fill="none" stroke="#D94F5C" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
        <h3>Que traer</h3>
        <p>Trae tu bebida favorita para compartir</p>
        <p >Cerveza, vino, fernet, lo que te guste. La comida va por mi cuenta.</p>
      </div>
    </section>

    {/*  MESA DE REGALOS  */}
    <section className="reveal">
      <div className="info-card">
        <svg className="icon-inline" viewBox="0 0 24 24" fill="none" stroke="#D94F5C" strokeWidth="2"><rect x="3" y="8" width="18" height="14" rx="1"/><path d="M12 8v14"/><path d="M3 12h18"/><path d="M8 8c0-2 1-4 4-4s4 2 4 4"/></svg>
        <h3>Mesa de regalos</h3>
        <p >Si queres hacerme un regalo, podes transferir:</p>
        <div className="copy-row">
          <span>cumple.martin.30</span>
          <button onClick={() => {}}>Copiar alias</button>
        </div>
        <div className="copy-row">
          <span>0000003100022222222222</span>
          <button onClick={() => {}}>Copiar CBU</button>
        </div>
        <button className="enter-btn"  onClick={() => {}}>Ver datos de pago</button>
      </div>
    </section>

    
    {/*  DRESS CODE INYECTADO  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Dress Code</h2>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <h3 style={{fontSize: "1.2rem", marginBottom: "0.5rem"}}>Elegante Sport</h3>
        <p style={{opacity: 0.8}}>Vení con tu mejor outfit para disfrutar la noche.</p>
      </div>
    </section>

    {/*  UBICACION INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Ubicación</h2>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <h3 style={{fontSize: "1.2rem", marginBottom: "0.5rem"}}>Salón Principal</h3>
        <p style={{opacity: 0.8, marginBottom: "1.5rem"}}>Av. Siempre Viva 1234</p>
        <button style={{background: "currentColor", color: "var(--bg, #fff)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "50px", fontWeight: "bold", cursor: "pointer"}}>Ver en Maps</button>
      </div>
    </section>

    {/*  RSVP  */}
    <section className="reveal">
      <h3 >Confirma tu asistencia</h3>
      <p >Avisame si venis asi organizo mejor la fiesta</p>
                  {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-cumple-minimalista") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-cumple-minimalista",
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

              <button type="submit" id="btnSubmitRsvp-demo-cumple-minimalista" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
      <p className="hashtag">#Los30DeMartin</p>
    </section>

    {/*  GALERIA  */}
    <section className="reveal">
      <h3 >Galeria</h3>
      <p >Comparti tus fotos de la noche</p>
      <div className="gallery-grid">
        <div className="photo-placeholder">Foto 1</div>
        <div className="photo-placeholder">Foto 2</div>
        <div className="photo-placeholder">Foto 3</div>
        <div className="photo-placeholder">Foto 4</div>
        <div className="photo-placeholder">Foto 5</div>
        <div className="photo-placeholder">Foto 6</div>
      </div>
    </section>

    {/*  CIERRE  */}
    <section className="reveal">
      <svg width="60" height="75" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <line x1="60" y1="0" x2="60" y2="20" stroke="#888" strokeWidth="2"/>
        <circle cx="60" cy="70" r="48" fill="url(#discoGrad3)"/>
        <g opacity="0.4">
          <line x1="20" y1="40" x2="100" y2="40" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="14" y1="70" x2="106" y2="70" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="20" y1="100" x2="100" y2="100" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="35" y1="24" x2="35" y2="116" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="60" y1="22" x2="60" y2="118" stroke="#ccc" strokeWidth="0.5"/>
          <line x1="85" y1="24" x2="85" y2="116" stroke="#ccc" strokeWidth="0.5"/>
        </g>
        <circle cx="50" cy="60" r="3" fill="#fff" opacity="0.7"/>
        <circle cx="72" cy="75" r="2" fill="#fff" opacity="0.5"/>
        <defs>
          <radialGradient id="discoGrad3" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#E8E8E8"/>
            <stop offset="60%" stopColor="#B0B0B0"/>
            <stop offset="100%" stopColor="#808080"/>
          </radialGradient>
        </defs>
      </svg>
      <h3 >Esta noche va a ser epica</h3>
      <p >Te espero para festejar juntos</p>
    </section>

    {/*  CONTACTO FOOTER  */}
    <section className="contacto reveal">
      <p >Invitacion creada con</p>
      <p >Te Invito</p>
      <p >
        <a href="https://wa.me/5493425299942" target="_blank" rel="noopener">WhatsApp: +54 9 342 529 9942</a>
      </p>
      <p >
        <a href="https://instagram.com/teinvitoapp" target="_blank" rel="noopener">@teinvitoapp</a>
      </p>
    </section>

    {/*  FOOTER BRAND  */}
    <div className="footer-brand">
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
        <span>cumple.martin.30</span>
        <button onClick={() => {}}>Copiar</button>
      </div>
      <div className="copy-row">
        <span>0000003100022222222222</span>
        <button onClick={() => {}}>Copiar</button>
      </div>
    </div>
  </div>

  {/*  ===== SCRIPTS =====  */}
  
        </div>
    );
}
