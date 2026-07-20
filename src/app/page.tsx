import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* HEADER */}
      <header className="landing-header">
        <div className="header-inner">
          <span className="logo">Te invito</span>
          <a href="#planes" className="cta-btn">Ver planes</a>
        </div>
      </header>

      {/* HERO */}
      <section className="landing-hero">
        <div className="monogram">
          <span className="dot"></span>
          <div className="circle"><span>ID</span></div>
          <span className="dot"></span>
        </div>

        <p className="subtitle">Invitaciones web a medida</p>

        <h1>
          Tu invitación merece <em>una invitación</em> que sea única
        </h1>

        <p className="description">
          Diseñamos la invitación como una pieza — con la calma de un papel fino, pero lista para abrirse en un WhatsApp.
        </p>

        <div className="tags">
          <span>Bodas</span><span className="separator">·</span>
          <span>15 Años</span><span className="separator">·</span>
          <span>Bautismos</span><span className="separator">·</span>
          <span>Cumpleaños</span><span className="separator">·</span>
          <span>Eventos</span>
        </div>

        <div className="buttons">
          <a href="#planes" className="btn-primary">Ver planes y precios</a>
          <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20info%20sobre%20invitaciones%20digitales" target="_blank" className="btn-secondary">Hablar por WhatsApp</a>
        </div>
      </section>

      {/* LO QUE INCLUYE */}
      <section className="landing-section">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="section-label">Lo que incluye</p>
          <h2 className="section-title">Todo en un solo link</h2>
          <div className="features-grid">
            {[
              { num: "I", title: "Cuenta regresiva", desc: "El tiempo hasta el evento, corriendo en vivo desde que abren el link." },
              { num: "II", title: "Mapa y ubicación", desc: "Un toque y llegan. Google Maps integrado, sin buscar direcciones." },
              { num: "III", title: "Confirmación RSVP", desc: "Tus invitados confirman desde ahí. Vos ves la lista en tiempo real." },
              { num: "IV", title: "Sección regalos", desc: "Alias o CBU con botón de copiar, sin incomodidad de preguntar." },
              { num: "V", title: "Música de fondo", desc: "La canción que elijan suena apenas se abre la invitación." },
              { num: "VI", title: "Galería de fotos", desc: "Un carrusel prolijo con las fotos que ustedes elijan." },
            ].map((item) => (
              <div key={item.num} className="feature-item">
                <span className="num">{item.num}.</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASÍ SE VE */}
      <section className="landing-section bg-warm">
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label">Así se ve</p>
          <h2 className="section-title">Una invitación, no una app</h2>
          <div className="preview-card">
            <p className="pre-title">Nos casamos</p>
            <h3 className="font-serif">Valentina & Matías</h3>
            <p className="date">12 de diciembre, 2026 — Córdoba</p>
            <div className="countdown-row">
              <div className="countdown-item"><div className="value">48</div><div className="label">Días</div></div>
              <div className="countdown-item"><div className="value">14</div><div className="label">Horas</div></div>
              <div className="countdown-item"><div className="value">22</div><div className="label">Min</div></div>
            </div>
            <div className="btn-confirm">Confirmar asistencia</div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="landing-section">
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label">Planes y precios</p>
          <h2 className="section-title">Elegí el nivel de tu evento</h2>
          <p style={{ color: "var(--ink-muted)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
            <strong style={{ color: "#2e7d32" }}>30% OFF</strong> abonando por transferencia
          </p>

          <div className="plans-grid">
            <div className="plan-card">
              <h3>Básico</h3>
              <p className="plan-desc">Ideal para eventos simples</p>
              <p className="price">$25.000</p>
              <ul>
                {["Cuenta regresiva", "Ubicación con mapa", "Confirmación por WhatsApp", "Sección regalos", "Dress code", "Envíos ilimitados"].map(f => (
                  <li key={f}><span className="check">✓</span>{f}</li>
                ))}
              </ul>
              <CheckoutButton planId="BASICO" className="plan-btn">Elegir plan</CheckoutButton>
            </div>

            <div className="plan-card featured">
              <span className="badge">Más elegido</span>
              <h3>Premium</h3>
              <p className="plan-desc">Para bodas y 15 años</p>
              <p className="price">$45.000</p>
              <ul>
                {["Todo lo del Básico", "Sistema RSVP propio", "Listado en tiempo real", "Música de fondo", "Galería (8 fotos)", "Exportar Excel"].map(f => (
                  <li key={f}><span className="check">✓</span>{f}</li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM" className="plan-btn">Elegir plan</CheckoutButton>
            </div>

            <div className="plan-card">
              <h3>Premium Plus</h3>
              <p className="plan-desc">La experiencia completa</p>
              <p className="price">$65.000</p>
              <ul>
                {["Todo lo del Premium", "Invitación personalizada", "Trivia interactiva", "Álbum QR compartido", "Fotos ilimitadas", "Soporte prioritario"].map(f => (
                  <li key={f}><span className="check">✓</span>{f}</li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM_PLUS" className="plan-btn">Elegir plan</CheckoutButton>
            </div>
          </div>

          <p style={{ color: "var(--ink-muted)", fontSize: "0.85rem", marginTop: "2rem" }}>
            ¿Lo necesitás urgente? Agregá <strong style={{ color: "var(--ink)" }}>Express 24hs</strong> por solo +$8.000
          </p>
        </div>
      </section>

      {/* DEMOS */}
      <section className="landing-section bg-warm">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="section-label">Diseños en vivo</p>
          <h2 className="section-title">Mirá cómo quedan</h2>
          <div className="demos-grid">
            {[
              { name: "Elegante Oscuro", desc: "Ideal para bodas de noche", slug: "boda-valentina-y-matias", bg: "linear-gradient(135deg, #1a1a2e, #0f3460)", color: "white" },
              { name: "Floral Claro", desc: "Perfecto para bodas al aire libre", slug: "boda-luciana-y-gonzalo", bg: "linear-gradient(135deg, #fef1ee, #fdf8f4)", color: "#4a3728" },
              { name: "Minimalista", desc: "Moderno, ideal para cumpleaños", slug: "cumple-30-martin", bg: "#fff", color: "#111" },
              { name: "15 Años Glam", desc: "Fucsia y dorado", slug: "boda-valentina-y-matias", bg: "linear-gradient(135deg, #2d1b4e, #1a1a2e)", color: "white" },
              { name: "Bautismo Tierno", desc: "Celeste suave, delicado", slug: "boda-luciana-y-gonzalo", bg: "linear-gradient(135deg, #e8f4f8, #f0f8ff)", color: "#2c5f7c" },
              { name: "Corporativo", desc: "Para eventos de empresa", slug: "cumple-30-martin", bg: "#f8f8f8", color: "#333" },
            ].map((demo) => (
              <a key={demo.name} href={`/${demo.slug}`} target="_blank" className="demo-card" style={{ background: demo.bg, color: demo.color }}>
                <h4>{demo.name}</h4>
                <p>{demo.desc}</p>
                <span className="arrow">Ver demo →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="landing-section">
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label">Más de 200 eventos realizados</p>
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="testimonials-grid">
            {[
              { text: "Nuestros invitados no podían creer que era una invitación web. La cuenta regresiva y la confirmación fueron geniales.", name: "Valentina R.", event: "Boda" },
              { text: "La armé en 3 días y me ahorré fortunas en papel. Mis amigos la compartieron por WhatsApp al toque.", name: "Martín G.", event: "Cumpleaños 30" },
              { text: "Mi hija quedó fascinada con el diseño floral. La música de fondo y las fotos quedaron impresionantes.", name: "Carolina S.", event: "15 Años" },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <p className="quote">&ldquo;{review.text}&rdquo;</p>
                <div className="author">
                  <div className="avatar">{review.name[0]}</div>
                  <div>
                    <p className="author-name">{review.name}</p>
                    <p className="author-event">{review.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section bg-warm">
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label">Preguntas frecuentes</p>
          <h2 className="section-title">Todo lo que necesitás saber</h2>
          <div className="faq-list">
            {[
              { q: "¿Cuánto demora la entrega?", a: "La entrega estándar es en 3 días hábiles. Con Express se entrega en 24 horas." },
              { q: "¿Puedo enviarla a todos mis invitados?", a: "Sí, los envíos son ilimitados. Compartí el link por WhatsApp a todos sin costo extra." },
              { q: "¿Puedo hacer cambios después?", a: "Sí, al ser una página web cualquier cambio se actualiza al instante para todos." },
              { q: "¿Cómo pago?", a: "Transferencia (30% OFF), MercadoPago o tarjeta en hasta 3 cuotas. Seña del 50% para arrancar." },
              { q: "¿Mis invitados necesitan descargar algo?", a: "No. Es una página web que se abre directo desde WhatsApp en cualquier celular." },
              { q: "¿Funciona en todos los celulares?", a: "Sí, es 100% responsive y funciona en cualquier dispositivo con navegador web." },
            ].map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="landing-cta">
        <h2>¿Listos para sorprender?</h2>
        <p>Te la armamos en 3 días hábiles. Envíos ilimitados por WhatsApp.</p>
        <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitacion%20digital" target="_blank" className="btn-wa">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Escribinos por WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <span className="footer-logo">Te invito</span>
          <nav>
            <a href="#planes">Planes</a>
            <a href="#planes">Demos</a>
            <a href="#planes">FAQ</a>
            <a href="https://instagram.com/teinvitoapp" target="_blank">Instagram</a>
            <a href="https://wa.me/5493425299942" target="_blank">WhatsApp</a>
          </nav>
        </div>
        <div className="copyright">
          © 2026 Te invito · <a href="https://instagram.com/teinvitoapp" target="_blank" style={{ color: "inherit" }}>@teinvitoapp</a> en Instagram
          {" · "}
          <Link href="/admin" style={{ color: "inherit", opacity: 0.5 }}>Admin</Link>
        </div>
      </footer>
    </div>
  );
}
