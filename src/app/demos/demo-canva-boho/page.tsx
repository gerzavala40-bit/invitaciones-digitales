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

  {/*  Audio de fondo  */}
  <audio id="bgMusic" loop preload="auto" playsInline webkit-playsInline>
    <source src="/abel-pintos.mp3" type="audio/mpeg" />
    {/*  Opcional: URL externa (Spotify no funciona como <audio>)
    <source src="/assets-demos/[URL_MP3]" type="audio/mpeg" />
     */}
  </audio>

  {/*  ========== BIENVENIDA ==========  */}
  <div id="splash" role="dialog" aria-label="Bienvenida">
    <div className="splash-inner">
      <div className="splash-ornament" aria-hidden="true">❀</div>
      <p className="splash-label">Bienvenida</p>
      <p className="splash-kicker">¡Nos casamos!</p>
      <h1 className="splash-name">Luciana<br /><span >&amp;</span><br />Gonzalo</h1>
      <p className="splash-date">14 · 03 · 2027</p>
      <button type="button" className="splash-btn" id="enterBtn">
        Abrir invitación
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
      <div className="wrap reveal canva-boho-hero">
        <div className="canva-boho-photo-wrapper">
          <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop" alt="Pareja" className="canva-boho-photo" />
        </div>
        <div className="canva-boho-script">¡Nos casamos!</div>
        <h1 className="canva-boho-title">Olivia Y Lucas</h1>
        
        <p className="hero-date" >| 14 de febrero de 2027 | 21 hs |</p>
        <p className="lead" >Los esperamos con muchas ganas de divertirse en:<br />Calle Cualquiera 123, Cualquier Lugar</p>

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
        <p className="script">Después de siete primaveras…</p>
        <p className="lead" >
          Queremos celebrarlo con quienes más queremos.
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
            <strong>Sábado 14 de marzo de 2027</strong>
            17:30 hs
          </p>
        </div>

        <div className="card reveal">
          <div className="icon">◎</div>
          <h3>¿Dónde?</h3>
          <p>
            <strong>Quinta Los Robles</strong>
            Pilar, Buenos Aires
          </p>
          {/*  EDITAR URL_MAPS  */}
          <a className="link" href="https://www.google.com/maps/search/?api=1&query=Quinta+Los+Robles+Pilar" target="_blank" rel="noopener">
            Cómo llegar →
          </a>
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
          <h3>Elegante campestre</h3>
          <p>Colores suaves y tonos tierra</p>
          <div className="pills">
            <span>Beige</span>
            <span>Verde</span>
            <span>Flores</span>
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
          <p className="value" id="aliasValue">luciana.gonzalo.boda</p>
          <p className="sub">CVU / CBU: 0000003100022222222222</p>
          <p className="sub" >Titular: Luciana Fernández</p>
          <button type="button" className="copy-btn" id="copyAliasBtn" data-copy="luciana.gonzalo.boda">
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
          Por favor respondé antes del <strong >1 de marzo de 2027</strong>.
        </p>

        <div className="btn-row reveal">
          {/* 
            LINK_WHATSAPP: wa.me/549XXXXXXXXX?text=...
            El mensaje se arma abajo en CONFIG JS también.
           */}
                      {/* Formulario RSVP Headless Inyectado */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const btn = document.getElementById("btnSubmitRsvp-demo-canva-boho") as HTMLButtonElement;
              const prevText = btn.innerHTML;
              btn.innerHTML = "Guardando...";
              btn.disabled = true;
              
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                const res = await fetch('/api/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventId: "demo-canva-boho",
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

              <button type="submit" id="btnSubmitRsvp-demo-canva-boho" style={{width: "100%", padding: "1rem", borderRadius: "99px", border: "none", background: "currentColor", color: "var(--bg, #fff)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer"}}>
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
          <div className="ph"><img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop" alt="Foto" /></div>
          <div className="ph"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop" alt="Foto" /></div>
          <div className="ph wide"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop" alt="Foto" /></div>
          <div className="ph"><img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop" alt="Foto" /></div>
          <div className="ph"><img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop" alt="Foto" /></div>
        </div>
        <p className="hashtag reveal">#LuciYGonza2027</p>
      </div>
    </section>

      {/*  ==============================================
           SECCIÓN: MURO SOCIAL (Simulación Taggbox)
      ===============================================  */}
      <section className="section">
        <h2 className="section-title reveal">Social Wall en Vivo</h2>
        <p className="lead reveal" >
          Subí tus fotos a Instagram con el hashtag <strong>#LuciYGonza2027</strong> y van a aparecer acá al instante (vía Taggbox).
        </p>
        
        {/*  Contenedor que simula el iframe de Taggbox  */}
        <div className="reveal" >
          <div >
            
            {/*  Post 1  */}
            <div >
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop"  alt="post" />
              <div >
                <div >IG</div>
                <span >@flor.martinez</span>
              </div>
            </div>

            {/*  Post 2  */}
            <div >
              <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&auto=format&fit=crop"  alt="post" />
              <div >
                <div >IG</div>
                <span >@juanperez99</span>
              </div>
            </div>

            {/*  Post 3  */}
            <div >
              <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&auto=format&fit=crop"  alt="post" />
              <div >
                <div >IG</div>
                <span >@valeria_ok</span>
              </div>
            </div>

            {/*  Post 4  */}
            <div >
              <div>
                <div >+</div>
                <p >Esperando más<br />fotos...</p>
              </div>
            </div>

          </div>
          <div >
            <span >Powered by Taggbox</span>
          </div>
        </div>
        
        <p className="hashtag reveal" >¡Sé el próximo en aparecer!</p>
        <p className="lead reveal" >
          Usá el hashtag en tus stories y publicaciones.
        </p>
      </section>
    {/*  CIERRE  */}
    <section className="section close-section" id="cierre">
      <div className="wrap reveal">
        <div  aria-hidden="true">❀</div>
        <p className="close-quote">“El amor en flor…”</p>
        <p className="lead" >Los esperamos en el jardín.</p>
        <p className="close-name">Luciana & Gonzalo</p>
        <p >
          14 · 03 · 2027
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
      <p>Demo · Boda Floral Claro</p>
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
          <p className="value">luciana.gonzalo.boda</p>
          <button type="button" className="copy-btn" data-copy="luciana.gonzalo.boda">Copiar alias</button>
        </div>
        <div className="alias-box">
          <p className="label">CBU / CVU</p>
          <p className="value" >0000003100022222222222</p>
          <p className="sub">Titular: Luciana Fernández</p>
          <button type="button" className="copy-btn" data-copy="0000003100022222222222">Copiar CBU</button>
        </div>
      </div>
    </div>
  </div>

  
        </div>
    );
}
