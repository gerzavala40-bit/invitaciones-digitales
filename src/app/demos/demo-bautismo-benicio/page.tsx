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
            
  <audio id="bgAudio" loop preload="auto"><source src="/carin-leon.mp3" type="audio/mpeg" /></audio>
  {/*  ===== SPLASH =====  */}
  <div id="splash">
    {/*  Olive leaves top  */}
    <svg className="splash-leaf-top" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M280 10 C260 30, 240 25, 220 40 C200 55, 195 50, 175 60 C155 70, 150 65, 130 72 C110 79, 105 75, 85 80" stroke="#7A8B6F" strokeWidth="1.5" fill="none"/>
        <path d="M220 40 C215 30, 225 20, 230 28 C235 36, 225 42, 220 40Z" fill="#9BAF8E" opacity="0.7"/>
        <path d="M175 60 C170 50, 180 42, 185 50 C190 58, 180 63, 175 60Z" fill="#7A8B6F" opacity="0.6"/>
        <path d="M130 72 C125 62, 135 55, 140 63 C145 71, 135 75, 130 72Z" fill="#9BAF8E" opacity="0.7"/>
        <path d="M250 20 C245 10, 255 5, 260 12 C265 19, 255 23, 250 20Z" fill="#7A8B6F" opacity="0.5"/>
        <path d="M195 50 C190 40, 200 34, 205 42 C210 50, 200 53, 195 50Z" fill="#9BAF8E" opacity="0.6"/>
        <path d="M150 65 C145 55, 155 48, 160 56 C165 64, 155 68, 150 65Z" fill="#7A8B6F" opacity="0.5"/>
        <path d="M105 75 C100 65, 110 58, 115 66 C120 74, 110 78, 105 75Z" fill="#9BAF8E" opacity="0.6"/>
        <path d="M290 5 C270 20, 250 15, 235 28" stroke="#9BAF8E" strokeWidth="1" fill="none" opacity="0.5"/>
        <path d="M260 15 C255 5, 265 0, 270 7 C275 14, 265 18, 260 15Z" fill="#7A8B6F" opacity="0.4"/>
      </g>
    </svg>
    {/*  Olive leaves bottom  */}
    <svg className="splash-leaf-bottom" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M280 10 C260 30, 240 25, 220 40 C200 55, 195 50, 175 60 C155 70, 150 65, 130 72 C110 79, 105 75, 85 80" stroke="#7A8B6F" strokeWidth="1.5" fill="none"/>
        <path d="M220 40 C215 30, 225 20, 230 28 C235 36, 225 42, 220 40Z" fill="#9BAF8E" opacity="0.7"/>
        <path d="M175 60 C170 50, 180 42, 185 50 C190 58, 180 63, 175 60Z" fill="#7A8B6F" opacity="0.6"/>
        <path d="M130 72 C125 62, 135 55, 140 63 C145 71, 135 75, 130 72Z" fill="#9BAF8E" opacity="0.7"/>
        <path d="M250 20 C245 10, 255 5, 260 12 C265 19, 255 23, 250 20Z" fill="#7A8B6F" opacity="0.5"/>
        <path d="M195 50 C190 40, 200 34, 205 42 C210 50, 200 53, 195 50Z" fill="#9BAF8E" opacity="0.6"/>
        <path d="M150 65 C145 55, 155 48, 160 56 C165 64, 155 68, 150 65Z" fill="#7A8B6F" opacity="0.5"/>
        <path d="M105 75 C100 65, 110 58, 115 66 C120 74, 110 78, 105 75Z" fill="#9BAF8E" opacity="0.6"/>
      </g>
    </svg>

    <div className="splash-inner">
      {/*  Circular photo placeholder  */}
      <div className="splash-photo">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.5"/>
          <path d="M32 34c-10 0-18 5-18 12v4h36v-4c0-7-8-12-18-12z" fill="currentColor" opacity="0.4"/>
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        </svg>
      </div>

      <h1 className="splash-title">Mi Bautismo</h1>
      <p className="splash-subtitle">Estas cordialmente invitado a la celebracion de bautismo de nuestro hijo <strong>Benicio</strong></p>

      <div className="splash-info">
        <div className="splash-info-item">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/></svg>
          <span>Sabado 15 de agosto</span>
        </div>
        <div className="splash-info-item">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          <span>16 hs</span>
        </div>
      </div>

      <p className="splash-waiting">Te esperamos!</p>

      <button className="enter-btn" id="enterBtn" onClick={() => {}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l9 6 9-6"/><rect x="3" y="4" width="18" height="16" rx="2" fill="none"/></svg>
        Abrir invitacion
      </button>
    </div>
  </div>
  {/*  ===== MAIN CONTENT =====  */}
  <div id="mainContent">

    {/*  HERO  */}
    <section className="hero">
      <p className="hero-label reveal">Bautismo</p>
      <h1 className="reveal splash-name">Benicio</h1>
      <p className="hero-date reveal">Sabado 15 de agosto de 2027 &middot; 16:00 hs</p>
      <div className="countdown reveal" id="countdown">
        <div className="countdown-item"><span className="num" id="cd-days">--</span><span className="lbl">Dias</span></div>
        <div className="countdown-item"><span className="num" id="cd-hours">--</span><span className="lbl">Horas</span></div>
        <div className="countdown-item"><span className="num" id="cd-mins">--</span><span className="lbl">Min</span></div>
        <div className="countdown-item"><span className="num" id="cd-secs">--</span><span className="lbl">Seg</span></div>
      </div>
    </section>

    {/*  FRASE  */}
    <section className="frase reveal">
      <blockquote>"Dejen que los ninos vengan a mi, porque de ellos es el reino de los cielos"</blockquote>
      <cite>Mateo 19:14</cite>
    </section>

    {/*  CUANDO Y DONDE  */}
    <section className="reveal">
      <h2 className="section-title">Cuando y Donde</h2>
      <div className="section-divider"></div>

      <div className="card">
        <svg className="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/></svg>
        <h3>Ceremonia</h3>
        <p>Sabado 15 de agosto de 2027</p>
        <p>16:00 hs</p>
      </div>

      <div className="card">
        <svg className="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        <h3>Lugar</h3>
        <p>Parroquia San Jose</p>
        <p className="detail">Calle San Martin 456</p>
        <a href="https://maps.google.com/?q=Parroquia+San+Jose+Calle+San+Martin+456" target="_blank" className="map-link">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
          Ver en mapa
        </a>
      </div>
    </section>

    {/*  PADRINOS  */}
    <section className="reveal">
      <h2 className="section-title">Padrinos</h2>
      <div className="section-divider"></div>
      <div className="card padrinos-card">
        <svg className="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        <h3>Nos acompanan</h3>
        <p className="names">Maria & Juan</p>
      </div>
    </section>
    {/*  MESA DE REGALOS  */}
    <section className="regalos reveal">
      <h2 className="section-title">Mesa de Regalos</h2>
      <div className="section-divider"></div>
      <div className="card">
        <svg className="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="10" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M12 6v16" stroke="currentColor" strokeWidth="1.5"/><rect x="4" y="6" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M12 6c-1-3-4-4-5-3s0 3 5 3" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M12 6c1-3 4-4 5-3s0 3-5 3" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        <h3>Datos para transferencia</h3>
        <p className="detail" >Si deseas hacernos un regalo, podes transferir al siguiente alias o CBU:</p>
        <div className="copy-row">
          <span>bautismo.benicio.2027</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
        <div className="copy-row">
          <span>0000003100033333333333</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
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

    {/*  RSVP  */}
    <section className="rsvp reveal">
      <h2 className="section-title">Confirmar Asistencia</h2>
      <div className="section-divider"></div>
      <p className="rsvp-text">Confirmanos tu asistencia para que podamos organizar todo con amor</p>
                  {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-bautismo-benicio") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-bautismo-benicio",
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

              <button type="submit" id="btnSubmitRsvp-demo-bautismo-benicio" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
    </section>

    {/*  GALERIA  */}
    <section className="reveal">
      <h2 className="section-title">Galeria</h2>
      <div className="section-divider"></div>
      <div className="gallery-grid">
        <div className="gallery-item"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" opacity="0.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
        <div className="gallery-item"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" opacity="0.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
        <div className="gallery-item"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" opacity="0.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
        <div className="gallery-item"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" opacity="0.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
      </div>
    </section>
    {/*  CIERRE  */}
    <section className="cierre reveal">
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M10 35 C20 25, 30 20, 40 20 C50 20, 60 25, 70 35" stroke="#7A8B6F" strokeWidth="1" fill="none"/>
        <path d="M25 28 C23 22, 28 18, 30 23 C32 28, 27 30, 25 28Z" fill="#9BAF8E" opacity="0.7"/>
        <path d="M40 20 C38 14, 43 10, 45 15 C47 20, 42 22, 40 20Z" fill="#7A8B6F" opacity="0.6"/>
        <path d="M55 28 C53 22, 58 18, 60 23 C62 28, 57 30, 55 28Z" fill="#9BAF8E" opacity="0.7"/>
      </svg>
      <h2>Gracias por acompanarnos</h2>
      <p>Esperamos compartir este dia tan especial junto a vos. Tu presencia es el mejor regalo.</p>
      <p className="cierre-hashtag">#BautismoBenicio</p>
    </section>

    {/*  CONTACTO FOOTER  */}
    <section className="contacto">
      <h3>Contacto</h3>
      <p>Invitacion digital creada por <a href="https://wa.me/5493425299942" target="_blank">teinvitoapp</a></p>
      <p><a href="https://wa.me/5493425299942" target="_blank">WhatsApp: +54 9 342 529 9942</a></p>
      <p><a href="https://instagram.com/teinvitoapp" target="_blank">@teinvitoapp</a></p>
    </section>

    {/*  FOOTER  */}
    <footer>
      <div className="brand">Te Invito</div>
      <div className="copy">teinvitoapp.com.ar</div>
    </footer>

  </div>{/*  /mainContent  */}

  {/*  MUSIC BUTTON  */}
  <button className="music-btn" id="musicBtn" aria-label="Musica" >
    <span id="musicIcon">&#9835;</span>
  </button>

  {/*  PARTY CAM  */}
  <a href="#" className="party-cam" id="partyCam" title="Party Cam">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
  </a>

  {/*  TOAST  */}
  <div className="toast" id="toast">Copiado!</div>

  {/*  MODAL REGALOS  */}
  <div className="modal-overlay" id="modalRegalos">
    <div className="modal">
      <h3>Mesa de Regalos</h3>
      <div className="card" >
        <p className="detail" >Alias y CBU para transferencias:</p>
        <div className="copy-row" >
          <span>bautismo.benicio.2027</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
        <div className="copy-row">
          <span>0000003100033333333333</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
      </div>
      <button className="modal-close" onClick={() => {}}>Cerrar</button>
    </div>
  </div>
  
        </div>
    );
}
