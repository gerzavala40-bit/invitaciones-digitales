import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav>
        <div className="logo">Te <em>invito</em></div>
        <Link className="nav-cta" href="#planes">Ver planes</Link>
      </nav>

      <section className="hero wrap">
        <div className="seal">ID</div>
        <div className="eyebrow" style={{ textAlign: "center" }}>Invitaciones web a medida</div>
        <h1>Tu invitación merece <span className="accent">una invitación</span> que sea única</h1>
        <p className="sub">Diseñamos la invitación como una pieza — con la calma de un papel fino, pero lista para abrirse en un WhatsApp.</p>
        <div className="event-types">
          <span>Bodas</span><span>15 Años</span><span>Bautismos</span><span>Cumpleaños</span><span>Eventos</span>
        </div>
        <div className="hero-ctas">
          <Link className="btn-seal" href="#planes">Ver planes y precios</Link>
          <a className="btn-ghost" href="https://wa.me/5493425299942?text=Hola!%20Quiero%20info%20sobre%20invitaciones%20digitales" target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
        </div>
      </section>

      <div className="torn"></div>

      <section className="features">
        <div className="wrap">
          <div className="features-head">
            <div className="eyebrow">Lo que incluye</div>
            <h2>Todo en un solo link</h2>
          </div>
          <div className="grid">
            <div className="card"><span className="num">I.</span><h3>Cuenta regresiva</h3><p>El tiempo hasta el evento, corriendo en vivo desde que abren el link.</p></div>
            <div className="card"><span className="num">II.</span><h3>Mapa y ubicación</h3><p>Un toque y llegan. Google Maps integrado, sin buscar direcciones.</p></div>
            <div className="card"><span className="num">III.</span><h3>Confirmación RSVP</h3><p>Tus invitados confirman desde ahí. Vos ves la lista en tiempo real.</p></div>
            <div className="card"><span className="num">IV.</span><h3>Sección regalos</h3><p>Alias o CBU con botón de copiar, sin incomodidad de preguntar.</p></div>
            <div className="card"><span className="num">V.</span><h3>Música de fondo</h3><p>La canción que elijan suena apenas se abre la invitación.</p></div>
            <div className="card"><span className="num">VI.</span><h3>Galería de fotos</h3><p>Un carrusel prolijo con las fotos que ustedes elijan.</p></div>
          </div>
        </div>
      </section>

      <section className="preview wrap">
        <div className="eyebrow">Así se ve</div>
        <h2 style={{ marginBottom: 48 }}>Una invitación, no una app</h2>
        <div className="invite-card">
          <div className="eyebrow">Nos casamos</div>
          <h3>Valentina &amp; Matías</h3>
          <div className="names">12 de diciembre, 2026 — Córdoba</div>
          <div className="countdown">
            <div><span className="n">48</span><span className="l">Días</span></div>
            <div><span className="n">14</span><span className="l">Horas</span></div>
            <div><span className="n">22</span><span className="l">Min</span></div>
          </div>
          <Link className="rsvp" href="#">Confirmar asistencia</Link>
        </div>
      </section>

      <section id="planes" className="plans">
        <div className="wrap">
          <div className="plans-head">
            <div className="eyebrow" style={{ textAlign: "center" }}>Planes y precios</div>
            <h2>Elegí el nivel de tu evento</h2>
          </div>
          <p className="plans-note">30% OFF abonando por transferencia</p>
          <div className="plans-grid">
            <div className="plan">
              <h3>Básico</h3>
              <div className="desc">Ideal para eventos simples</div>
              <div className="price">$25.000</div>
              <ul>
                <li>Cuenta regresiva</li>
                <li>Ubicación con mapa</li>
                <li>Confirmación por WhatsApp</li>
                <li>Sección regalos</li>
                <li>Dress code</li>
                <li>Envíos ilimitados</li>
              </ul>
              <CheckoutButton planId="BASICO" className="plan-btn">Elegir plan</CheckoutButton>
            </div>
            <div className="plan featured">
              <h3>Premium</h3>
              <div className="desc">Para bodas y 15 años</div>
              <div className="price">$45.000</div>
              <ul>
                <li>Todo lo del Básico</li>
                <li>Sistema RSVP propio</li>
                <li>Listado en tiempo real</li>
                <li>Música de fondo</li>
                <li>Galería (8 fotos)</li>
                <li>Exportar Excel</li>
              </ul>
              <CheckoutButton planId="PREMIUM" className="plan-btn">Elegir plan</CheckoutButton>
            </div>
            <div className="plan">
              <h3>Premium Plus</h3>
              <div className="desc">La experiencia completa</div>
              <div className="price">$65.000</div>
              <ul>
                <li>Todo lo del Premium</li>
                <li>Invitación personalizada</li>
                <li>Trivia interactiva</li>
                <li>Álbum QR compartido</li>
                <li>Fotos ilimitadas</li>
                <li>Soporte prioritario</li>
              </ul>
              <CheckoutButton planId="PREMIUM_PLUS" className="plan-btn">Elegir plan</CheckoutButton>
            </div>
          </div>
          <p className="express">¿Lo necesitás urgente? Agregá <b>Express 24hs</b> por solo <b>+$8.000</b></p>
        </div>
      </section>

      <section className="demos wrap">
        <div className="demos-head">
          <div className="eyebrow" style={{ textAlign: "center" }}>Diseños en vivo</div>
          <h2>Mirá cómo quedan</h2>
        </div>
        <div className="demos-grid">
          <Link className="demo-card" href="/demo-boda-elegante-oscuro.html" target="_blank" rel="noreferrer">
            <div className="demo-thumb d1">Elegante Oscuro</div>
            <div className="demo-info">
              <div className="t">Elegante Oscuro</div>
              <div className="s">Ideal para bodas de noche</div>
              <div className="cta">Ver demo →</div>
            </div>
          </Link>
          <Link className="demo-card" href="/demo-boda-floral-claro.html" target="_blank" rel="noreferrer">
            <div className="demo-thumb d2">Floral Claro</div>
            <div className="demo-info">
              <div className="t">Floral Claro</div>
              <div className="s">Perfecto para bodas al aire libre</div>
              <div className="cta">Ver demo →</div>
            </div>
          </Link>
          <Link className="demo-card" href="/demo-cumple-minimalista.html" target="_blank" rel="noreferrer">
            <div className="demo-thumb d3">Minimalista</div>
            <div className="demo-info">
              <div className="t">Minimalista</div>
              <div className="s">Moderno, ideal para cumpleaños</div>
              <div className="cta">Ver demo →</div>
            </div>
          </Link>
          <Link className="demo-card" href="/15-anos-catalina" target="_blank" rel="noreferrer">
            <div className="demo-thumb d4">15 Años Glam</div>
            <div className="demo-info">
              <div className="t">15 Años Glam</div>
              <div className="s">Elegante y dorado para quinceañeras</div>
              <div className="cta">Ver demo →</div>
            </div>
          </Link>
          <Link className="demo-card" href="/bautismo-emma" target="_blank" rel="noreferrer">
            <div className="demo-thumb d5">Bautismo Tierno</div>
            <div className="demo-info">
              <div className="t">Bautismo Tierno</div>
              <div className="s">Delicado y cálido para bautismos</div>
              <div className="cta">Ver demo →</div>
            </div>
          </Link>
          <Link className="demo-card" href="/gala-anual-vertex" target="_blank" rel="noreferrer">
            <div className="demo-thumb d6">Corporativo</div>
            <div className="demo-info">
              <div className="t">Corporativo Institucional</div>
              <div className="s">Profesional para eventos de empresa</div>
              <div className="cta">Ver demo →</div>
            </div>
          </Link>
        </div>
      </section>

      <section className="testimonials">
        <div className="wrap">
          <div className="testimonials-head">
            <div className="eyebrow">Más de 200 eventos realizados</div>
            <h2>Lo que dicen nuestros clientes</h2>
          </div>
          <div className="testimonials-grid">
            <div className="t-card">
              <p className="quote">Nuestros invitados no podían creer que era una invitación web. La cuenta regresiva y la confirmación fueron geniales.</p>
              <div className="t-author">
                <div className="t-avatar">V</div>
                <div><div className="t-name">Valentina R.</div><div className="t-event">Boda</div></div>
              </div>
            </div>
            <div className="t-card">
              <p className="quote">La armé en 3 días y me ahorré fortunas en papel. Mis amigos la compartieron por WhatsApp al toque.</p>
              <div className="t-author">
                <div className="t-avatar">M</div>
                <div><div className="t-name">Martín G.</div><div className="t-event">Cumpleaños 30</div></div>
              </div>
            </div>
            <div className="t-card">
              <p className="quote">Mi hija quedó fascinada con el diseño floral. La música de fondo y las fotos quedaron impresionantes.</p>
              <div className="t-author">
                <div className="t-avatar">C</div>
                <div><div className="t-name">Carolina S.</div><div className="t-event">15 Años</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq wrap">
        <div className="faq-head">
          <div className="eyebrow" style={{ textAlign: "center" }}>Preguntas frecuentes</div>
          <h2>Todo lo que necesitás saber</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item" open>
            <summary>¿Cuánto demora la entrega?</summary>
            <p>La entrega estándar es en 3 días hábiles. Con Express se entrega en 24 horas.</p>
          </details>
          <details className="faq-item">
            <summary>¿Puedo enviarla a todos mis invitados?</summary>
            <p>Sí, los envíos son ilimitados. Compartí el link por WhatsApp a todos sin costo extra.</p>
          </details>
          <details className="faq-item">
            <summary>¿Puedo hacer cambios después?</summary>
            <p>Sí, al ser una página web cualquier cambio se actualiza al instante para todos.</p>
          </details>
          <details className="faq-item">
            <summary>¿Cómo pago?</summary>
            <p>Transferencia (30% OFF), MercadoPago o tarjeta en hasta 3 cuotas. Seña del 50% para arrancar.</p>
          </details>
          <details className="faq-item">
            <summary>¿Mis invitados necesitan descargar algo?</summary>
            <p>No. Es una página web que se abre directo desde WhatsApp en cualquier celular.</p>
          </details>
          <details className="faq-item">
            <summary>¿Funciona en todos los celulares?</summary>
            <p>Sí, es 100% responsive y funciona en cualquier dispositivo con navegador web.</p>
          </details>
        </div>
      </section>

      <section className="cta-final">
        <div className="wrap">
          <h2>¿Listos para <em style={{ fontStyle: "italic", color: "#D9B87A" }}>sorprender</em>?</h2>
          <p>Te la armamos en 3 días hábiles. Envíos ilimitados por WhatsApp.</p>
          <a className="btn-seal" href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitacion%20digital" target="_blank" rel="noreferrer" style={{ background: "var(--gold)" }}>Escribinos por WhatsApp</a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-row">
            <div className="logo">Te <em>invito</em></div>
            <div className="footer-links">
              <Link href="#planes">Planes</Link>
              <Link href="#planes">Demos</Link>
              <Link href="#planes">FAQ</Link>
              <a href="https://instagram.com/teinvitoapp" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://wa.me/5493425299942" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="footer-copy">
            © 2026 Te invito · <a href="https://instagram.com/teinvitoapp" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>@teinvitoapp</a> en Instagram
            {" · "}
            <Link href="/admin" style={{ color: "inherit", opacity: 0.5 }}>Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
