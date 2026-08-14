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
            
  <audio id="bgAudio" loop preload="auto"><source src="/camila.mp3" type="audio/mpeg" /></audio>

  {/*  SPLASH  */}
  <div className="splash" id="splash">
    <div className="splash-frame"></div>
    {/*  Teddy Bear SVG  */}
    <svg className="splash-bear" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/*  Body  */}
      <ellipse cx="150" cy="360" rx="110" ry="130" fill="#D4C5A9"/>
      {/*  Belly  */}
      <ellipse cx="150" cy="380" rx="70" ry="85" fill="#E8DCC8"/>
      {/*  Head  */}
      <circle cx="150" cy="180" r="90" fill="#D4C5A9"/>
      {/*  Left Ear  */}
      <circle cx="80" cy="110" r="35" fill="#D4C5A9"/>
      <circle cx="80" cy="110" r="20" fill="#6B4E3D"/>
      {/*  Right Ear  */}
      <circle cx="220" cy="110" r="35" fill="#D4C5A9"/>
      <circle cx="220" cy="110" r="20" fill="#6B4E3D"/>
      {/*  Muzzle  */}
      <ellipse cx="150" cy="210" rx="40" ry="30" fill="#E8DCC8"/>
      {/*  Eyes (closed/sleeping)  */}
      <path d="M120 175 Q130 182 140 175" stroke="#6B4E3D" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M160 175 Q170 182 180 175" stroke="#6B4E3D" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/*  Nose (heart shape)  */}
      <path d="M150 200 C145 195 138 198 138 203 C138 208 150 215 150 215 C150 215 162 208 162 203 C162 198 155 195 150 200Z" fill="#E8A0A0"/>
      {/*  Mouth  */}
      <path d="M145 218 Q150 223 155 218" stroke="#6B4E3D" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/*  Left Arm  */}
      <ellipse cx="70" cy="330" rx="30" ry="55" fill="#D4C5A9" transform="rotate(-15 70 330)"/>
      {/*  Right Arm  */}
      <ellipse cx="230" cy="330" rx="30" ry="55" fill="#D4C5A9" transform="rotate(15 230 330)"/>
      {/*  Left Foot  */}
      <ellipse cx="110" cy="475" rx="35" ry="25" fill="#D4C5A9"/>
      <ellipse cx="110" cy="475" rx="22" ry="16" fill="#E8DCC8"/>
      {/*  Right Foot  */}
      <ellipse cx="190" cy="475" rx="35" ry="25" fill="#D4C5A9"/>
      <ellipse cx="190" cy="475" rx="22" ry="16" fill="#E8DCC8"/>
      {/*  Bow tie  */}
      <path d="M130 260 L150 275 L170 260 L170 285 L150 275 L130 285 Z" fill="#E8A0A0" opacity="0.8"/>
      <circle cx="150" cy="275" r="6" fill="#E8A0A0"/>
    </svg>
    <div className="splash-content">
      <p className="splash-top-text">Acompa&ntilde;anos a celebrar nuestro</p>
      <h1 className="splash-title">Baby Shower</h1>
      <p className="splash-date">03.09.2026</p>
      <button className="splash-enter" id="enterBtn">Abrir invitaci&oacute;n</button>
    </div>
  </div>

  {/*  MAIN  */}
  <div className="main" id="mainContent">

    {/*  MUSIC BTN  */}
    <button className="music-btn" id="musicBtn" aria-label="Musica">&#9835;</button>

    {/*  HERO  */}
    <section className="hero">
      <h1>Malena</h1>
      <p className="hero-date">Jueves 3 de septiembre de 2026 &middot; 13:00 hs</p>
      <div className="countdown" id="countdown">
        <div className="countdown-item">
          <span className="number" id="cd-days">--</span>
          <span className="label">D&iacute;as</span>
        </div>
        <div className="countdown-item">
          <span className="number" id="cd-hours">--</span>
          <span className="label">Horas</span>
        </div>
        <div className="countdown-item">
          <span className="number" id="cd-mins">--</span>
          <span className="label">Min</span>
        </div>
        <div className="countdown-item">
          <span className="number" id="cd-secs">--</span>
          <span className="label">Seg</span>
        </div>
      </div>
    </section>

    {/*  FRASE  */}
    <div className="frase reveal">
      <p>Una carita nueva est&aacute; por llegar...</p>
    </div>

    {/*  CUANDO / DONDE  */}
    <section className="reveal">
      <h2 className="section-title">Cuando y Donde</h2>
      <p className="section-subtitle">Los detalles del evento</p>
      <div className="info-card">
        <div className="card-icon">&#128197;</div>
        <h3>Fecha</h3>
        <p>Jueves 3 de septiembre de 2026<br />13:00 hs</p>
      </div>
      <div className="info-card">
        <div className="card-icon">&#128205;</div>
        <h3>Lugar</h3>
        <p>Casa de la familia<br />Calle Cualquiera 123, Cualquier Lugar</p>
        <a href="https://maps.google.com" target="_blank" rel="noopener">Ver mapa</a>
      </div>
    </section>

    {/*  LISTA DE DESEOS  */}
    <section className="reveal">
      <h2 className="section-title">Lista de Deseos</h2>
      <p className="section-subtitle">Sugerencias de regalitos</p>
      <div className="wishes-list">
        <span className="wish-tag">Bodys</span>
        <span className="wish-tag">Baberos</span>
        <span className="wish-tag">Mantitas</span>
        <span className="wish-tag">Pa&ntilde;ales RN</span>
        <span className="wish-tag">Toallitas</span>
        <span className="wish-tag">Sonajeros</span>
        <span className="wish-tag">Medias</span>
        <span className="wish-tag">Gorros</span>
        <span className="wish-tag">Chupetes</span>
        <span className="wish-tag">Mamaderas</span>
        <span className="wish-tag">Cremas beb&eacute;</span>
        <span className="wish-tag">Peluches</span>
      </div>
    </section>

    {/*  MESA DE REGALOS  */}
    <section className="reveal">
      <h2 className="section-title">Mesa de Regalos</h2>
      <p className="section-subtitle">Si prefer&iacute;s contribuir</p>
      <div className="gift-box">
        <label>Alias</label>
        <div className="copy-row">
          <span>babyshower.malena</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
      </div>
      <div className="gift-box">
        <label>CBU</label>
        <div className="copy-row">
          <span>0000003100044444444444</span>
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
    <section className="rsvp-section reveal">
      <h2 className="section-title">Confirmanos</h2>
      <p className="section-subtitle">Tu asistencia</p>
                  {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-babyshower-malena") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-babyshower-malena",
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

              <button type="submit" id="btnSubmitRsvp-demo-babyshower-malena" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form>
      <br />
      <button className="btn-secondary" id="showPayBtn">Ver datos de pago</button>
    </section>

    {/*  GALERIA  */}
    <section className="reveal">
      <h2 className="section-title">Galeria</h2>
      <p className="section-subtitle">Momentos especiales</p>
      <div className="gallery-grid">
        <div className="gallery-item">&#128247;</div>
        <div className="gallery-item">&#128118;</div>
        <div className="gallery-item">&#127872;</div>
        <div className="gallery-item">&#128149;</div>
      </div>
    </section>

    {/*  CIERRE  */}
    <section className="cierre reveal">
      <p>Te esperamos con mucho amor para celebrar la llegada de Malena</p>
      <span className="hashtag">#BabyShowerMalena</span>
      {/*  Mini bear decorative  */}
      <svg className="mini-bear" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="55" r="30" fill="#D4C5A9"/>
        <circle cx="30" cy="30" r="12" fill="#D4C5A9"/>
        <circle cx="30" cy="30" r="7" fill="#6B4E3D"/>
        <circle cx="70" cy="30" r="12" fill="#D4C5A9"/>
        <circle cx="70" cy="30" r="7" fill="#6B4E3D"/>
        <ellipse cx="50" cy="62" rx="12" ry="9" fill="#E8DCC8"/>
        <path d="M46 55 Q50 59 54 55" stroke="#6B4E3D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M50 60 C48 58 45 59 45 61 C45 63 50 66 50 66 C50 66 55 63 55 61 C55 59 52 58 50 60Z" fill="#E8A0A0"/>
        <ellipse cx="50" cy="95" rx="22" ry="20" fill="#D4C5A9"/>
        <ellipse cx="50" cy="95" rx="14" ry="13" fill="#E8DCC8"/>
      </svg>
    </section>

    {/*  CONTACTO FOOTER  */}
    <div className="contacto">
      <p>Invitacion digital creada por</p>
      <p><a href="https://wa.me/5493425299942" target="_blank" rel="noopener">WhatsApp: +54 9 342 529 9942</a></p>
      <p><a href="https://instagram.com/teinvitoapp" target="_blank" rel="noopener">@teinvitoapp</a></p>
    </div>

    {/*  FOOTER  */}
    <div className="footer">
      <p>Te Invito</p>
    </div>

    {/*  PARTY CAM  */}
    <a className="party-cam" href="#" aria-label="Party Cam">&#128247;</a>
  </div>

  {/*  MODAL PAGO  */}
  <div className="modal-overlay" id="payModal">
    <div className="modal-content">
      <h3>Datos de Pago</h3>
      <div className="gift-box">
        <label>Alias</label>
        <div className="copy-row">
          <span>babyshower.malena</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
      </div>
      <div className="gift-box">
        <label>CBU</label>
        <div className="copy-row">
          <span>0000003100044444444444</span>
          <button className="copy-btn" onClick={() => {}}>Copiar</button>
        </div>
      </div>
      <button className="modal-close" id="closePayModal">Cerrar</button>
    </div>
  </div>

  {/*  TOAST  */}
  <div className="toast" id="toast">Copiado al portapapeles</div>

  
        </div>
    );
}
