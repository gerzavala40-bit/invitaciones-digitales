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
            
  <audio id="bgAudio" loop preload="auto"><source src="/bruno-mars.mp3" type="audio/mpeg" /></audio>

  {/*  SPLASH  */}
  <div className="splash" id="splash">
    {/*  Sparkles  */}
    <div className="sparkle" ><svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z"/></svg></div>
    <div className="sparkle" ><svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z"/></svg></div>
    <div className="sparkle" ><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z"/></svg></div>
    <div className="sparkle" ><svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z"/></svg></div>

    <div className="splash-content" >
      <h1 className="splash-title">FIESTA DE<br />FIN DE A&#209;O</h1>
      <div className="splash-badge">2027</div>
      <div className="splash-date-pill">S&#193;BADO 20 DE DICIEMBRE</div>

      {/*  Gift SVG illustration  */}
      <div >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="140" height="140">
          {/*  Box body  */}
          <rect x="30" y="100" width="140" height="80" rx="8" fill="#E53E3E"/>
          {/*  Box lid  */}
          <rect x="24" y="80" width="152" height="28" rx="6" fill="#C53030"/>
          {/*  Vertical ribbon  */}
          <rect x="90" y="80" width="20" height="100" fill="#F7B731"/>
          {/*  Horizontal ribbon  */}
          <rect x="24" y="88" width="152" height="12" fill="#F7B731"/>
          {/*  Bow left  */}
          <ellipse cx="85" cy="72" rx="20" ry="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2"/>
          {/*  Bow right  */}
          <ellipse cx="115" cy="72" rx="20" ry="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2"/>
          {/*  Bow center  */}
          <circle cx="100" cy="75" r="8" fill="#F7B731"/>
          {/*  Bow tails  */}
          <path d="M92 75 Q80 50 70 55 Q82 60 88 72Z" fill="#E53E3E"/>
          <path d="M108 75 Q120 50 130 55 Q118 60 112 72Z" fill="#E53E3E"/>
        </svg>
      </div>

      {/*  Agenda items  */}
      <div className="splash-agenda">
        <div className="splash-agenda-item">
          <span className="starburst starburst--teal"><svg viewBox="0 0 24 24"><path d="M20 12l-2-2V6h-4L12 4l-2 2H6v4L4 12l2 2v4h4l2 2 2-2h4v-4l2-2z"/></svg></span>
          Entrega de regalos
        </div>
        <div className="splash-agenda-item">
          <span className="starburst starburst--orange"><svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg></span>
          Almuerzo
        </div>
      </div>

      <p className="splash-note">Veni a cerrar el a&#241;o con todo el equipo de <strong>Gala Vertex</strong></p>
      <p className="splash-name" ></p>
      <button className="btn btn-dark" id="enterBtn">Abrir invitaci&#243;n</button>
    </div>
  </div>

  {/*  MUSIC BTN  */}
  <button className="music-btn" id="musicBtn" onClick={() => {}} aria-label="Musica">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  </button>

  {/*  MAIN CONTENT  */}
  <div className="main" id="mainContent">

    {/*  HERO  */}
    <section className="reveal">
      <h1 className="section-title" >FIESTA DE FIN DE A&#209;O 2027</h1>
      <p >Gala Vertex</p>
      <div className="splash-date-pill">S&#193;BADO 20 DE DICIEMBRE &middot; 12:00 HS</div>
      <div className="countdown">
        <div className="cd-block"><span className="cd-num" id="cd-days">--</span><span className="cd-label">D&#237;as</span></div>
        <div className="cd-block"><span className="cd-num" id="cd-hours">--</span><span className="cd-label">Horas</span></div>
        <div className="cd-block"><span className="cd-num" id="cd-mins">--</span><span className="cd-label">Min</span></div>
        <div className="cd-block"><span className="cd-num" id="cd-secs">--</span><span className="cd-label">Seg</span></div>
      </div>
    </section>

    {/*  FRASE  */}
    <section className="reveal" >
      <blockquote >&ldquo;Otro a&#241;o de logros increibles. Celebremos juntos todo lo que construimos como equipo.&rdquo;</blockquote>
    </section>

    {/*  CUANDO Y DONDE  */}
    <section className="reveal">
      <h2 className="section-title">Cu&#225;ndo y D&#243;nde</h2>
      <div className="section-divider"></div>
      <div className="card">
        <div >&#128197;</div>
        <h3>Fecha</h3>
        <p><span className="highlight">S&#225;bado 20 de diciembre de 2027</span></p>
        <p>A las 12:00 hs</p>
      </div>
      <div className="card">
        <div >&#128205;</div>
        <h3>Lugar</h3>
        <p><span className="highlight">Oficinas centrales</span></p>
        <p>Av. C&#243;rdoba 1500, CABA</p>
        <a href="https://maps.google.com" target="_blank" className="btn btn-dark" >Ver mapa</a>
      </div>
    </section>

    {/*  AGENDA  */}
    <section className="reveal">
      <h2 className="section-title">Programa</h2>
      <div className="section-divider"></div>
      <div className="timeline">
        <div className="timeline-item">
          <span className="starburst starburst--teal"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></span>
          <div className="timeline-content"><span className="timeline-time">12:00</span><h4>Recepci&#243;n y bienvenida</h4><p>Llegada y welcome drinks</p></div>
        </div>
        <div className="timeline-item">
          <span className="starburst starburst--orange"><svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg></span>
          <div className="timeline-content"><span className="timeline-time">13:00</span><h4>Almuerzo</h4><p>Comida para todo el equipo</p></div>
        </div>
        <div className="timeline-item">
          <span className="starburst starburst--teal"><svg viewBox="0 0 24 24"><path d="M20 12l-2-2V6h-4L12 4l-2 2H6v4L4 12l2 2v4h4l2 2 2-2h4v-4l2-2z"/></svg></span>
          <div className="timeline-content"><span className="timeline-time">14:30</span><h4>Entrega de regalos</h4><p>Amigo invisible y sorpresas</p></div>
        </div>
        <div className="timeline-item">
          <span className="starburst starburst--red"><svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></span>
          <div className="timeline-content"><span className="timeline-time">15:30</span><h4>DJ y fiesta</h4><p>Musica y baile hasta el cierre</p></div>
        </div>
      </div>
    </section>

    {/*  MESA DE REGALOS  */}
    <section className="reveal" id="regalos">
      <h2 className="section-title">Amigo Invisible</h2>
      <div className="section-divider"></div>
      <p >Si necesitas transferir para el amigo invisible, usa estos datos:</p>
      <div className="card">
        <h3>Datos bancarios</h3>
        <div className="copy-row">
          <span id="alias-text">gala.vertex.2027</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
        <div className="copy-row">
          <span id="cbu-text">0000003100077777777777</span>
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
    <section className="reveal">
      <h2 className="section-title">Confirmar Asistencia</h2>
      <div className="section-divider"></div>
      <p >Confirmanos tu asistencia por WhatsApp antes del 10 de diciembre.</p>
                  {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-corporativo-gala") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-corporativo-gala",
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

              <button type="submit" id="btnSubmitRsvp-demo-corporativo-gala" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
      <br/>
      <button className="btn btn-dark"  onClick={() => {}}>Ver datos de pago</button>
    </section>

    {/*  GALERIA  */}
    <section className="reveal">
      <h2 className="section-title">Galeria</h2>
      <div className="section-divider"></div>
      <div className="gallery-grid">
        <div className="gallery-item">&#128247;</div>
        <div className="gallery-item">&#128247;</div>
        <div className="gallery-item">&#128247;</div>
        <div className="gallery-item">&#128247;</div>
        <div className="gallery-item">&#128247;</div>
        <div className="gallery-item">&#128247;</div>
      </div>
      <p className="hashtag">#GalaVertex2027</p>
    </section>

    {/*  CIERRE  */}
    <section className="cierre reveal">
      <div className="cierre-text">
        <blockquote>&ldquo;Gracias por ser parte de este equipo increible. Nos vemos en la fiesta!&rdquo;</blockquote>
        <p >Gala Vertex</p>
        <p >20 . 12 . 2027</p>
      </div>
    </section>

    {/*  CONTACTO FOOTER  */}
    <div className="contacto-footer">
      <p>Invitacion digital creada por</p>
      <div className="contacto-links">
        <a href="https://wa.me/5493425299942" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.63-1.263A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.237 0-4.308-.744-5.975-1.998l-.352-.263-3.278.894.724-3.14-.287-.376A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
          WhatsApp
        </a>
        <a href="https://instagram.com/teinvitoapp" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          @teinvitoapp
        </a>
      </div>
    </div>

    {/*  FOOTER  */}
    <div className="footer">
      <p>Hecho con &#10084; por <a href="https://teinvitoapp.com.ar" target="_blank">Te Invito</a></p>
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
        <span>gala.vertex.2027</span>
        <button className="copy-btn" onClick={() => {}}>Copiar</button>
      </div>
      <div className="copy-row">
        <span>0000003100077777777777</span>
        <button className="copy-btn" onClick={() => {}}>Copiar</button>
      </div>
    </div>
  </div>

  
        </div>
    );
}
