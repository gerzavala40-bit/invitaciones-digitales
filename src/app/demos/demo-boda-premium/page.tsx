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
            
  
  {/*  SPLASH SCREEN ENVELOPE  */}
  <div id="splashScreen" className="splash-screen">
    <div className="splash-content">
      <button id="btnOpenInvite" className="btn-abrir">ABRIR INVITACIÓN</button>
      
    </div>
  </div>

  {/*  Audio Botón  */}
  <div className="audio-btn" id="btnMusic">
    <i className="fas fa-music" id="iconMusic"></i>
  </div>
  <audio id="music" src="/assets-demos/camila.mp3" loop></audio>

  {/*  Portada Híbrida  */}
  

  
  
  
  

  
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
          <li><i className="fab fa-whatsapp" ></i>             
    {/*  CUENTA REGRESIVA INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "2rem"}}>Faltan</h2>
      <div style={{display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap"}}>
        <div style={{background: "rgba(128,128,128,0.1)", padding: "1rem", borderRadius: "12px", minWidth: "70px"}}>
          <div style={{fontSize: "2rem", fontWeight: "bold"}}>--</div>
          <div style={{fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7}}>Días</div>
        </div>
        <div style={{background: "rgba(128,128,128,0.1)", padding: "1rem", borderRadius: "12px", minWidth: "70px"}}>
          <div style={{fontSize: "2rem", fontWeight: "bold"}}>--</div>
          <div style={{fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7}}>Hs</div>
        </div>
        <div style={{background: "rgba(128,128,128,0.1)", padding: "1rem", borderRadius: "12px", minWidth: "70px"}}>
          <div style={{fontSize: "2rem", fontWeight: "bold"}}>--</div>
          <div style={{fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7}}>Min</div>
        </div>
      </div>
    </section>

    {/*  MESA DE REGALOS INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Mesa de Regalos</h2>
      <p style={{marginBottom: "2rem", opacity: 0.8}}>Tu presencia es el mejor regalo. Si deseás sumar un detalle:</p>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <p style={{marginBottom: "1rem"}}><strong>Alias:</strong> mi.fiesta.2026</p>
        <p style={{marginBottom: "1rem"}}><strong>CBU:</strong> 00000000000000000000</p>
        <button style={{background: "currentColor", color: "var(--bg, #fff)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "50px", fontWeight: "bold", cursor: "pointer"}}>Copiar Datos</button>
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

    {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-boda-premium") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-boda-premium",
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

              <button type="submit" id="btnSubmitRsvp-demo-boda-premium" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
                Confirmar Asistencia
              </button>
            </form></li>
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

  {/*  Footer  */}

  <footer>
    <p>Invitaciones Digitales 2026. Todos los derechos reservados.</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
        </div>
    );
}
