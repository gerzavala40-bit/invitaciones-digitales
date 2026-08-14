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
                    (entry.target as HTMLElement).style.opacity = '1';
                    (entry.target as HTMLElement).style.transform = 'translateY(0)';
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
            
  {/*  ===== CANVAS ANIMATED LEAVES =====  */}
  <canvas id="leafCanvas"></canvas>

  <audio id="bgAudio" loop preload="auto"><source src="/abel-pintos.mp3" type="audio/mpeg" /></audio>

  {/*  ===== SPLASH CON VIDEO DE FONDO =====  */}
  <div className="splash" id="splash">
    {/*  Video fullscreen de fondo  */}
    <video
      className="splash-video"
      id="splashVideo"
      autoPlay
      muted
      playsInline
      preload="auto"
    >
      <source src="/bienvenidos%20a%20mi%20fiesta.mp4" type="video/mp4" />
    </video>

    {/*  Overlay oscuro gradiente  */}
    <div className="splash-overlay"></div>

    {/*  Boton saltar (top right)  */}
    <button className="splash-skip" id="skipBtn" onClick={() => {}}>Saltar ↓</button>

    {/*  Contenido flotante (nombres + fecha + boton)  */}
    <div className="splash-content">
      <p className="splash-subtitle" id="sp-sub">NUESTRA BODA</p>
      <div className="splash-names" id="sp-names">
        <span className="splash-name">Luciana</span>
        <span className="splash-amp">&amp;</span>
        <span className="splash-name">Gonzalo</span>
      </div>
      <div className="splash-date" id="sp-date">
        <span>Sábado</span>
        <span className="sep"></span>
        <span>14 Marzo</span>
        <span className="sep"></span>
        <span>17:30 HS</span>
      </div>
      <p className="splash-location" id="sp-loc">Quinta Los Robles, Santa Fe</p>
      <button className="splash-btn" id="enterBtn" onClick={() => {}}>
        <span>💌</span> INGRESAR
      </button>
    </div>
  </div>

  {/*  ===== MAIN CONTENT =====  */}
  <div className="main" id="mainContent">

    {/*  Floating Music Pill Control  */}
    <div className="music-pill paused" id="musicPill" onClick={() => {}}>
      <div className="music-icon-btn">🎵</div>
      <div className="music-info">
        <span className="music-title">Abel Pintos - Motivos</span>
        <span className="music-status" id="musicStatusText">Toca para reproducir</span>
      </div>
      <div className="eq-bars">
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
      </div>
    </div>

    {/*  HERO CON FOTO REDONDA DESTACADA  */}
    <section className="hero" data-aos="fade-up">
      <img src="/boda-galeria/hero.jpg" alt="Luciana y Gonzalo" className="hero-photo" />
      <h1>Luciana &amp; Gonzalo</h1>
      <p className="hero-date">SÁBADO 14 DE MARZO DE 2027</p>
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
      <p >Deslizá para ver los detalles ↓</p>
    </section>

    {/*  FRASE INTRODUCTORIA  */}
    <section className="frase" data-aos="fade-up">
      <blockquote>"Que comience la historia… Nos llenaría de absoluta felicidad compartir este día tan especial e inolvidable con ustedes."</blockquote>
    </section>

    {/*  🎠 CAROUSEL SLIDER 1 (FOTO CEREMONIA Y FOTO RECEPCION)  */}
    <div className="photo-slider-container" data-aos="zoom-in-up">
      <div className="photo-slider" id="slider1">
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/boda-galeria/ceremonia.jpg" alt="Ceremonia Boda" />
        </div>
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/boda-galeria/recepcion.jpg" alt="Recepción Boda" />
        </div>
      </div>
      <div className="slider-dots" id="dots1">
        <span className="slider-dot active" onClick={() => {}}></span>
        <span className="slider-dot" onClick={() => {}}></span>
      </div>
    </div>

    {/*  CUANDO Y DONDE  */}
    <section data-aos="fade-up">
      <h2 className="section-title">Ceremonia &amp; Fiesta</h2>
      <div className="section-subtitle">¿Cuándo &amp; Dónde?</div>
      <div className="section-divider"></div>
      
      <div className="card" data-aos="slide-up">
        <div className="card-icon">💒</div>
        <h3>Ceremonia Religiosa</h3>
        <p><span className="highlight">Sábado 14 de Marzo de 2027</span></p>
        <p>A las 17:30 HS</p>
        <p>Parroquia Nuestra Señora de la Merced</p>
        <a href="https://maps.google.com/?q=Parroquia+Nuestra+Senora+de+la+Merced+Santa+Fe" target="_blank" className="btn btn-secondary" >
          🗺️ CÓMO LLEGAR
        </a>
      </div>

      <div className="card" data-aos="slide-up">
        <div className="card-icon">🎉</div>
        <h3>Fiesta de Celebración</h3>
        <p><span className="highlight">Quinta Los Robles</span></p>
        <p>Calle Los Álamos 123, Santa Fe</p>
        <p>A partir de las 19:30 HS</p>
        <a href="https://maps.google.com/?q=Quinta+Los+Robles+Santa+Fe" target="_blank" className="btn" >
          🗺️ CÓMO LLEGAR
        </a>
        <br/>
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Luciana+y+Gonzalo&dates=20270314T173000/20270315T030000&details=¡Celebramos+nuestra+boda+en+Quinta+Los+Robles!&location=Quinta+Los+Robles,+Santa+Fe" target="_blank" className="btn btn-secondary" >
          📅 AGENDAR EN GOOGLE CALENDAR
        </a>
      </div>
    </section>

    {/*  🎠 CAROUSEL SLIDER 2 (FOTO BRINDIS Y FOTO ANILLOS)  */}
    <div className="photo-slider-container" data-aos="zoom-in-up">
      <div className="photo-slider" id="slider2">
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/boda-galeria/brindis.jpg" alt="Brindis Boda" />
        </div>
        <div className="photo-slide-item" onClick={() => {}}>
          <img src="/boda-galeria/anillos.jpg" alt="Anillos Boda" />
        </div>
      </div>
      <div className="slider-dots" id="dots2">
        <span className="slider-dot active" onClick={() => {}}></span>
        <span className="slider-dot" onClick={() => {}}></span>
      </div>
    </div>

    {/*  DRESS CODE  */}
    <section data-aos="fade-up">
      <h2 className="section-title">Dress Code</h2>
      <div className="section-divider"></div>
      <div className="card" data-aos="slide-up">
        <div className="card-icon">👔</div>
        <h3>Elegante / Gala</h3>
        <p>Elegimos un dress code <span className="highlight">Elegante</span>. Los esperamos listos para festejar con su mejor outfit.</p>
        <div className="pills">
          <span>Verde Eucalipto</span>
          <span>Dorado Soft</span>
          <span>Negro / Traje</span>
          <span>Vestido Largo</span>
        </div>
      </div>
    </section>

    {/*  ACCESOS SEGUROS: BOTONES A OTRA PANTALLA / MODAL DE VALOR DE TARJETA Y REGALOS  */}
    <section data-aos="fade-up" id="regalos">
      <h2 className="section-title">Pases &amp; Datos Bancarios</h2>
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

    {/*  FORMULARIO RSVP — ENVÍA A /api/rsvp (Supabase)  */}
    <section data-aos="fade-up" id="rsvp-section">
      <h2 className="section-title">Confirmá tu Asistencia</h2>
      <div className="section-subtitle">Por favor respondé antes del 1 de Marzo de 2027</div>
      <div className="section-divider"></div>

      {/*  FORMULARIO (visible por defecto)  */}
      <div className="card" data-aos="slide-up" id="rsvpFormCard">
        <div className="form-group">
          <label htmlFor="inlineName">Nombre y Apellido *</label>
          <input type="text" id="inlineName" className="form-control" placeholder="Tu nombre completo" required />
        </div>

        <div className="form-group">
          <label htmlFor="inlineGuests">Cantidad de personas (incluídote) *</label>
          <select id="inlineGuests" className="form-control">
            <option value="1">Solo yo (1 persona)</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6">6 o más</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inlineMenu">Menú Especial</label>
          <select id="inlineMenu" className="form-control">
            <option value="">Sin preferencia especial</option>
            <option value="Vegetariano">Vegetariano</option>
            <option value="Vegano">Vegano</option>
            <option value="Celíaco (Sin TACC)">Celíaco / Sin TACC</option>
            <option value="Menú Infantil">Menú Infantil</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inlineSong">🎵 ¿Qué tema querés bailar? (opcional)</label>
          <input type="text" id="inlineSong" className="form-control" placeholder="Ej: Pepas - Farruko" />
        </div>

        {/*  Spinner estado  */}
        <div id="rsvpSpinner" >
          <div ></div>
          <p >Guardando tu confirmación...</p>
        </div>

        <button className="btn" id="rsvpSubmitBtn"  onClick={() => {}}>
          ✅ CONFIRMAR ASISTENCIA
        </button>
      </div>

      {/*  PANTALLA DE ÉXITO (oculta por defecto)  */}
      <div className="card" id="rsvpSuccessCard" >
        <div >🎉</div>
        <h3 >¡Confirmación recibida!</h3>
        <p >Gracias por confirmar tu asistencia. Guardá este código QR — te lo pedirán en la entrada.</p>
        <div id="rsvpQrContainer" ></div>
        <p id="rsvpQrCode" ></p>
        <p >Luciana &amp; Gonzalo te esperan el 14 de Marzo 💒</p>
      </div>
    </section>

    {/*  FOTO DESTACADA FINAL  */}
    <div className="photo-slider-container" data-aos="fade-up" >
      <div className="photo-slide-item" onClick={() => {}}>
        <img src="/boda-galeria/hero.jpg" alt="Foto Novios" />
      </div>
    </div>

    {/*  CIERRE ELEGANTE  */}
    <section className="cierre" data-aos="fade-up">
      <div className="cierre-text">
        <blockquote>"✦ BRILLEMOS JUNTOS… ¡TE ESPERO!"</blockquote>
        <p className="cierre-names">Luciana &amp; Gonzalo</p>
        <p className="cierre-date">14 · 03 · 2027</p>
        <p className="hashtag" >#BodaLucianaYGonzalo2027</p>
      </div>
    </section>

    {/*  CONTACTO FOOTER  */}
    <div className="contacto-footer">
      <p>Invitación digital interactiva creada por</p>
      <div className="contacto-links">
                    
    {/*  UBICACION INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Ubicación</h2>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <h3 style={{fontSize: "1.2rem", marginBottom: "0.5rem"}}>Salón Principal</h3>
        <p style={{opacity: 0.8, marginBottom: "1.5rem"}}>Av. Siempre Viva 1234</p>
        <button style={{background: "currentColor", color: "var(--bg, #fff)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "50px", fontWeight: "bold", cursor: "pointer"}}>Ver en Maps</button>
      </div>
    </section>

    {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-boda-floral-claro") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-boda-floral-claro",
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

              <button type="submit" id="btnSubmitRsvp-demo-boda-floral-claro" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
        <a href="https://instagram.com/teinvitoapp" target="_blank">
          @teinvitoapp
        </a>
      </div>
    </div>

    {/*  FOOTER  */}
    <div className="footer">
      <p>Hecho con ❤️ por <a href="https://teinvitoapp.com.ar" target="_blank">Te Invito App</a></p>
    </div>

  </div>{/*  /main  */}

  {/*  Party Cam Floating Button  */}
  <a className="party-cam" id="partyCam" href="/demo-wall/upload" aria-label="Party Cam" title="Subir fotos a Party Cam">
    📷
  </a>

  {/*  Toast Notification  */}
  <div className="toast" id="toast"><span>✓</span> <span id="toastMsg">Notificación</span></div>

  {/*  MODAL 1: VALOR DE TARJETA  */}
  <div className="modal-overlay" id="cardPriceModal" onClick={() => {}}>
    <div className="modal">
      <button className="modal-close" onClick={() => {}}>&times;</button>
      <div >💳</div>
      <h3 >Valor de la Tarjeta</h3>
      <p >Información detallada para realizar el pago de pases:</p>

      <div className="price-row">
        <span className="label-price">Adultos</span>
        <span className="amount">$65.000</span>
      </div>
      <div className="price-row">
        <span className="label-price">Menores (5 a 12 años)</span>
        <span className="amount">$40.000</span>
      </div>
      <div className="price-row">
        <span className="label-price">Menores de 5 años</span>
        <span className="amount">Sin cargo</span>
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
      <p >Cuenta oficial para transferencias y muestras de afecto:</p>

      <div className="copy-row">
        <div>
          <div >ALIAS</div>
          <span id="alias-modal-text">luciana.gonzalo.2027</span>
        </div>
        <button className="copy-btn" onClick={() => {}}>Copiar Alias</button>
      </div>

      <div className="copy-row">
        <div>
          <div >CBU</div>
          <span id="cbu-modal-text">0000003100055555555555</span>
        </div>
        <button className="copy-btn" onClick={() => {}}>Copiar CBU</button>
      </div>

      <p >Titular: Luciana &amp; Gonzalo Ruiz</p>

      <button className="btn btn-secondary"  onClick={() => {}}>
        Entendido / Cerrar
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
