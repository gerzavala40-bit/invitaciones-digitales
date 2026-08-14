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

        return () => {
            if (enterBtn) enterBtn.removeEventListener('click', handleEnter);
            if (musicBtn) musicBtn.removeEventListener('click', handleMusic);
        };
    }, []);

    return (
        <div className="demo-wrapper">
            
  {/*  ===== CANVAS BUTTERFLIES =====  */}
  <canvas id="butterflyCanvas"></canvas>

  <audio id="bgAudio" loop preload="auto"><source src="/music/cancion-clara.mp3" type="audio/mpeg" /></audio>

  {/*  ===== SPLASH SCREEN =====  */}
  <div className="splash" id="splash">
    <div className="splash-content">
      <p className="splash-subtitle" id="sp-sub">MIS 15 AÑOS</p>
      <div className="splash-names" id="sp-names">
        <span className="splash-name">Clari</span>
      </div>
      <div className="splash-date" id="sp-date">
        <span>Viernes</span>
        <span className="sep"></span>
        <span>20 Marzo</span>
        <span className="sep"></span>
        <span>21:00 HS</span>
      </div>
      <p className="splash-location" id="sp-loc">Salón Cristal, Santa Fe</p>
      <button className="splash-btn" id="enterBtn" onClick={() => {}}>
        <span>✨</span> INGRESAR
      </button>
    </div>
  </div>

  {/*  ===== MAIN CONTENT =====  */}
  <div className="main" id="mainContent">

    {/*  Floating Music Pill Control  */}
    <div className="music-pill paused" id="musicPill" onClick={() => {}}>
      <div className="music-icon-btn">🎵</div>
      <div className="music-info">
        <span className="music-title">Canción de Mis 15 - Clara</span>
        <span className="music-status" id="musicStatusText">Toca para reproducir</span>
      </div>
      <div className="eq-bars">
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
      </div>
    </div>

    {/*  HERO  */}
    <section className="hero" data-aos="fade-up">
      <img src="/clara-galeria/foto-nueva.jpg" alt="Clari" className="hero-photo" />
      <h1>Mis XV Clari</h1>
      <p className="hero-date">VIERNES 20 DE MARZO DE 2027</p>
      <div className="countdown-wrap" id="countdown">
        <div className="countdown-item">
          <span className="countdown-num" id="cd-days">000</span>
          <span className="countdown-label">Días</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-num" id="cd-hours">00</span>
          <span className="countdown-label">Horas</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-num" id="cd-mins">00</span>
          <span className="countdown-label">Min</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-num" id="cd-secs">00</span>
          <span className="countdown-label">Seg</span>
        </div>
      </div>
    </section>

    {/*  FRASE  */}
    <section className="frase" data-aos="fade-up">
      <blockquote>"Hay momentos inolvidables que se atesoran en el corazón para siempre... Quiero que compartas conmigo esta noche tan especial."</blockquote>
    </section>

    {/*  🎠 CAROUSEL SLIDER 1 (FOTO 1 Y FOTO 2)  */}
    <div className="photo-slider-container" data-aos="zoom-in-up">
      <div className="photo-slider" id="slider1">
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/clara-galeria/1.jpg" alt="Momento 1" />
        </div>
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/clara-galeria/2.jpg" alt="Momento 2" />
        </div>
      </div>
      <div className="slider-dots" id="dots1">
        <span className="slider-dot active" onClick={() => {}}></span>
        <span className="slider-dot" onClick={() => {}}></span>
      </div>
    </div>

    {/*  CUANDO Y DONDE  */}
    <section data-aos="fade-up">
      <h2 className="section-title">Fiesta de 15</h2>
      <div className="section-subtitle">¿Cuándo y Dónde?</div>
      <div className="section-divider"></div>
      <div className="card" data-aos="slide-up">
        <div className="card-icon">📅</div>
        <h3>Cuándo</h3>
        <p><span className="highlight">Viernes 20 de Marzo de 2027</span></p>
        <p>A las 21:00 HS</p>
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+15+Clari&dates=20270320T210000/20270321T060000&details=¡Celebramos+los+15+de+Clara+en+Salón+Cristal!&location=Salón+Cristal,+Calle+Las+Rosas+456,+Santa+Fe" target="_blank" className="btn btn-secondary" >
          📅 AGENDAR EN GOOGLE CALENDAR
        </a>
      </div>
      <div className="card" data-aos="slide-up">
        <div className="card-icon">📍</div>
        <h3>Dónde</h3>
        <p><span className="highlight">Salón Cristal</span></p>
        <p>Calle Las Rosas 456, Santa Fe</p>
        <a href="https://maps.google.com/?q=Salon+Cristal+Santa+Fe" target="_blank" className="btn" >
          🗺️ CÓMO LLEGAR
        </a>
      </div>
    </section>

    {/*  🎠 CAROUSEL SLIDER 2 (FOTO 3 Y FOTO 4)  */}
    <div className="photo-slider-container" data-aos="zoom-in-up">
      <div className="photo-slider" id="slider2">
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/clara-galeria/3.jpg" alt="Momento 3" />
        </div>
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/clara-galeria/4.jpg" alt="Momento 4" />
        </div>
      </div>
      <div className="slider-dots" id="dots2">
        <span className="slider-dot active" onClick={() => {}}></span>
        <span className="slider-dot" onClick={() => {}}></span>
      </div>
    </div>

    {/*  DRESS CODE  */}
    <section data-aos="fade-up">
      <h2 className="section-title">Código de Vestimenta</h2>
      <div className="section-divider"></div>
      <div className="card" data-aos="slide-up">
        <div className="card-icon">👗</div>
        <h3>Elegante / Glam</h3>
        <p>Elegimos un dress code <span className="highlight">Elegante Glam</span>. ¡Vení preparado para brillar y sacar muchas fotos!</p>
      </div>
    </section>

    {/*  ACCESOS SEGUROS: BOTONES A OTRA PANTALLA / MODAL  */}
    <section data-aos="fade-up" id="regalos">
      <h2 className="section-title">Información de Accesos</h2>
      <div className="section-subtitle">Pases &amp; Datos Bancarios</div>
      <div className="section-divider"></div>

      {/*  BOTON 1: VALOR TARJETA  */}
      <div className="action-btn-card" data-aos="slide-up" onClick={() => {}}>
        <div className="action-icon">💳</div>
        <div className="action-title">Valor de la Tarjeta</div>
        <div className="action-sub">VER VALOR TARJETA</div>
      </div>

      {/*  BOTON 2: DATOS BANCARIOS / REGALOS  */}
      <div className="action-btn-card" data-aos="slide-up" onClick={() => {}}>
        <div className="action-icon">🎁</div>
        <div className="action-title">Datos Bancarios &amp; Regalos</div>
        <div className="action-sub">Toca para ver Alias y CBU de la cuenta</div>
      </div>
    </section>

    {/*  RSVP  */}
    <section data-aos="fade-up">
      <h2 className="section-title">Confirmar Asistencia</h2>
      <div className="section-subtitle">Por favor confirma antes del 5 de Marzo</div>
      <div className="section-divider"></div>
      <p >Quiero saber si cuento con vos para bailar y celebrar mis 15.</p>
      <button className="btn btn-whatsapp" onClick={() => {}}>✨ CONFIRMAR ASISTENCIA AHORA</button>
    </section>

    {/*  FOTO DESTACADA FINAL  */}
    <div className="photo-slider-container" data-aos="fade-up" >
      <div className="photo-slide-item" onClick={() => {}}>
        <img src="/clara-galeria/5.jpg" alt="Foto Final" />
      </div>
    </div>

    {/*  SUGERIR CANCION  */}
    <section data-aos="fade-up">
      <h2 className="section-title">¿Qué tema querés bailar?</h2>
      <div className="section-subtitle">Sugerencia de Canción para el DJ</div>
      <div className="section-divider"></div>
      <div className="card" data-aos="slide-up">
        <div className="form-group">
          <label htmlFor="songName">Canción y Artista</label>
          <input type="text" id="songName" className="form-control" placeholder="Ej: Motomami - Rosalía" />
        </div>
        <div className="form-group">
          <label htmlFor="songGuest">Tu Nombre</label>
          <input type="text" id="songGuest" className="form-control" placeholder="Tu nombre" />
        </div>
        <button className="btn" onClick={() => {}}>🎶 Enviar Recomendación</button>
      </div>
    </section>

    {/*  CIERRE  */}
    <section className="cierre" data-aos="fade-up">
      <div className="cierre-text">
        <blockquote>"BRILLEMOS JUNTOS... ¡TE ESPERO!"</blockquote>
        <p className="cierre-names">Clari</p>
        <p className="cierre-date">20 . 03 . 2027</p>
        <p className="hashtag" >#MisXVClari</p>
      </div>
    </section>

    {/*  CONTACTO FOOTER  */}
    <div className="contacto-footer">
      <p>Invitación digital interactiva creada por</p>
      <div className="contacto-links">
                    {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-15anos-clara") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-15anos-clara",
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

              <button type="submit" id="btnSubmitRsvp-demo-15anos-clara" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
        <a href="https://instagram.com/teinvitoapp" target="_blank">@teinvitoapp</a>
      </div>
    </div>

    <div className="footer">
      <p>Hecho con ❤️ por <a href="https://teinvitoapp.com.ar" target="_blank">Te Invito App</a></p>
    </div>

  </div>{/*  /main  */}

  {/*  Party Cam Floating Button  */}
  <a className="party-cam" id="partyCam" href="/demo-wall/upload" aria-label="Party Cam" title="Subir fotos a Party Cam">
    📷
  </a>

  {/*  Toast  */}
  <div className="toast" id="toast"><span>✓</span> <span id="toastMsg">Notificación</span></div>

  {/*  MODAL 1: VALOR DE TARJETA  */}
  <div className="modal-overlay" id="cardPriceModal" onClick={() => {}}>
    <div className="modal">
      <button className="modal-close" onClick={() => {}}>&times;</button>
      <div >💳</div>
      <h3 >Valor de la Tarjeta</h3>
      <p >Información detallada para realizar el pago de pases:</p>

      <div className="price-row">
        <span className="label-price">Mayores</span>
        <span className="amount">$61.900</span>
      </div>
      <div className="price-row">
        <span className="label-price">6 a 12 años</span>
        <span className="amount">$43.500</span>
      </div>
      <div className="price-row">
        <span className="label-price">2 a 5 años</span>
        <span className="amount">$23.600</span>
      </div>
      <div className="price-row">
        <span className="label-price">Trasnoche</span>
        <span className="amount">$33.000</span>
      </div>

      <button className="btn btn-secondary"  onClick={() => {}}>
        Entendido / Cerrar
      </button>
    </div>
  </div>

  {/*  MODAL 2: DATOS BANCARIOS & REGALOS  */}
  <div className="modal-overlay" id="bankDataModal" onClick={() => {}}>
    <div className="modal">
      <button className="modal-close" onClick={() => {}}>&times;</button>
      <div >🎁</div>
      <h3 >Datos Bancarios &amp; Regalos</h3>
      <p >Cuenta oficial para transferencias y regalos:</p>

      <div className="copy-row">
        <div>
          <div >ALIAS</div>
          <span id="alias-modal-text">clari.xv.2027</span>
        </div>
        <button className="copy-btn" onClick={() => {}}>Copiar Alias</button>
      </div>

      <div className="copy-row">
        <div>
          <div >CBU</div>
          <span id="cbu-modal-text">0000003100077777777777</span>
        </div>
        <button className="copy-btn" onClick={() => {}}>Copiar CBU</button>
      </div>

      <p >Titular: Clari Ruiz</p>

      <button className="btn btn-secondary"  onClick={() => {}}>
        Entendido / Cerrar
      </button>
    </div>
  </div>

  {/*  MODAL RSVP  */}
  <div className="modal-overlay" id="rsvpModalOverlay" onClick={() => {}}>
    <div className="modal">
      <button className="modal-close" onClick={() => {}}>&times;</button>
      <h3 >Confirmar Asistencia</h3>
      <p >Completa tus datos para notificar a Clari</p>
      
      <div className="form-group">
        <label htmlFor="rsvpName">Nombre y Apellido *</label>
        <input type="text" id="rsvpName" className="form-control" placeholder="Tu nombre completo" required />
      </div>

      <div className="form-group">
        <label htmlFor="rsvpStatus">¿Asistirás? *</label>
        <select id="rsvpStatus" className="form-control">
          <option value="¡Sí, voy a festejar con vos!">¡Sí, voy a festejar con vos!</option>
          <option value="Lamentablemente no puedo">Lamentablemente no podré asistir</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rsvpGuests">Acompañantes</label>
        <select id="rsvpGuests" className="form-control">
          <option value="Solo yo">Solo yo</option>
          <option value="+1 Acompañante">+1 Acompañante</option>
          <option value="+2 Acompañantes">+2 Acompañantes</option>
          <option value="+3 o más">+3 o más acompañantes</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rsvpMenu">Menú Especial</label>
        <select id="rsvpMenu" className="form-control">
          <option value="Estándar / Ninguno">Sin requerimiento especial</option>
          <option value="Vegetariano">Vegetariano</option>
          <option value="Vegano">Vegano</option>
          <option value="Celíaco (Sin TACC)">Celíaco / Sin TACC</option>
          <option value="Menú Infantil">Menú Infantil</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rsvpNotes">Mensaje o Dedicatoria para Clari</label>
        <textarea id="rsvpNotes" className="form-control" placeholder="Un mensaje lindo para la cumpleañera..."></textarea>
      </div>

      <button className="btn btn-whatsapp"  onClick={() => {}}>
        Enviar Confirmación por WhatsApp
      </button>
    </div>
  </div>

  {/*  MODAL LIGHTBOX  */}
  <div className="modal-overlay" id="lightboxModal" onClick={() => {}}>
    <div >
      <button className="modal-close"  onClick={() => {}}>&times;</button>
      <img id="lightboxImage" className="lightbox-img" src="" alt="Vista ampliada" />
    </div>
  </div>

  
        </div>
    );
}
