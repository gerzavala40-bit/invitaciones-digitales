import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFA] text-[#1a1a1a]">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap');
        .font-editorial { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .text-gold { color: #8B6914; }
        .text-burgundy { color: #6B2D3B; }
        .bg-burgundy { background-color: #6B2D3B; }
        .border-gold { border-color: #C9A84C; }
        .bg-gold-light { background-color: #C9A84C20; }
      `}} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCFA]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-editorial text-xl italic text-gold">Te invito</span>
          <a href="#planes" className="font-body text-xs uppercase tracking-wider border border-[#1a1a1a] px-5 py-2.5 hover:bg-[#1a1a1a] hover:text-white transition">
            Ver planes
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        {/* Logo ID */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-burgundy"></span>
          <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center">
            <span className="font-editorial italic text-lg text-gold">ID</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-burgundy"></span>
        </div>

        <p className="font-body text-xs uppercase tracking-[0.35em] text-[#666] mb-8">Invitaciones web a medida</p>

        <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 max-w-4xl font-medium">
          Tu invitación merece{" "}
          <em className="text-burgundy italic">una<br />invitación</em>{" "}
          que sea única
        </h1>

        <p className="font-body text-[#555] text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          Diseñamos la invitación como una pieza — con la calma de un papel fino, pero lista para abrirse en un WhatsApp.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-body text-xs uppercase tracking-[0.2em] text-[#888]">
          {["Bodas", "15 Años", "Bautismos", "Cumpleaños", "Eventos"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#ccc]">·</span>}
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#planes" className="bg-burgundy text-white font-body text-xs uppercase tracking-[0.15em] px-8 py-4 hover:opacity-90 transition">
            Ver planes y precios
          </a>
          <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20info%20sobre%20invitaciones%20digitales" target="_blank"
            className="border border-[#333] font-body text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-[#333] hover:text-white transition">
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      {/* LO QUE INCLUYE */}
      <section className="py-24 px-6 border-t border-[#eee]">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Lo que incluye</p>
          <h2 className="font-editorial text-4xl md:text-5xl font-medium mb-16">Todo en un solo link</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
            {[
              { num: "I", title: "Cuenta regresiva", desc: "El tiempo hasta el evento, corriendo en vivo desde que abren el link." },
              { num: "II", title: "Mapa y ubicación", desc: "Un toque y llegan. Google Maps integrado, sin buscar direcciones." },
              { num: "III", title: "Confirmación RSVP", desc: "Tus invitados confirman desde ahí. Vos ves la lista en tiempo real." },
              { num: "IV", title: "Sección regalos", desc: "Alias o CBU con botón de copiar, sin incomodidad de preguntar." },
              { num: "V", title: "Música de fondo", desc: "La canción que elijan suena apenas se abre la invitación." },
              { num: "VI", title: "Galería de fotos", desc: "Un carrusel prolijo con las fotos que ustedes elijan." },
            ].map((item) => (
              <div key={item.num} className="flex gap-5">
                <span className="font-editorial italic text-sm text-gold mt-0.5">{item.num}.</span>
                <div>
                  <h3 className="font-body font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="font-body text-[#666] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASÍ SE VE */}
      <section className="py-24 px-6 bg-[#F7F5F2] border-t border-[#eee]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Así se ve</p>
          <h2 className="font-editorial text-4xl md:text-5xl font-medium mb-16">Una invitación, no una app</h2>

          <div className="max-w-xs mx-auto bg-gradient-to-b from-[#1a1a2e] to-[#0f1923] rounded-3xl p-10 text-white shadow-2xl shadow-black/20">
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-5">Nos casamos</p>
            <h3 className="font-editorial text-3xl font-medium mb-2">Valentina & Matías</h3>
            <p className="font-body text-gray-400 text-xs mb-10">12 de diciembre, 2026 — Córdoba</p>

            <div className="flex justify-center gap-6 mb-10">
              {[
                { value: "48", label: "Días" },
                { value: "14", label: "Horas" },
                { value: "22", label: "Min" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <span className="block text-2xl font-editorial font-bold text-[#C9A84C]">{item.value}</span>
                  <span className="font-body text-[9px] uppercase tracking-widest text-gray-500 mt-1 block">{item.label}</span>
                </div>
              ))}
            </div>

            <button className="w-full border border-white/20 text-white/80 py-3 rounded-full font-body text-xs tracking-wider">
              Confirmar asistencia
            </button>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-24 px-6 border-t border-[#eee]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Planes y precios</p>
            <h2 className="font-editorial text-4xl md:text-5xl font-medium mb-3">Elegí el nivel de tu evento</h2>
          </div>
          <p className="text-center font-body text-green-700 text-sm mb-14">30% OFF abonando por transferencia</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* BASICO */}
            <div className="border border-[#e8e6e3] rounded-2xl p-7 flex flex-col bg-white">
              <h3 className="font-editorial text-xl font-medium mb-1">Básico</h3>
              <p className="font-body text-[#999] text-xs mb-5">Ideal para eventos simples</p>
              <p className="font-editorial text-4xl font-bold mb-7">$25.000</p>
              <ul className="space-y-3 mb-8 flex-1 font-body text-sm text-[#444]">
                {["Cuenta regresiva", "Ubicación con mapa", "Confirmación por WhatsApp", "Sección regalos", "Dress code", "Envíos ilimitados"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-green-600 text-xs mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton planId="BASICO" className="w-full border border-[#333] py-3.5 font-body text-xs uppercase tracking-wider hover:bg-[#333] hover:text-white transition">
                Elegir plan
              </CheckoutButton>
            </div>

            {/* PREMIUM */}
            <div className="border-2 border-burgundy rounded-2xl p-7 flex flex-col bg-white relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-burgundy text-white font-body text-[10px] uppercase tracking-wider px-4 py-1 rounded-full">Más elegido</span>
              <h3 className="font-editorial text-xl font-medium mb-1">Premium</h3>
              <p className="font-body text-[#999] text-xs mb-5">Para bodas y 15 años</p>
              <p className="font-editorial text-4xl font-bold mb-7">$45.000</p>
              <ul className="space-y-3 mb-8 flex-1 font-body text-sm text-[#444]">
                {["Todo lo del Básico", "Sistema RSVP propio", "Listado en tiempo real", "Música de fondo", "Galería (8 fotos)", "Exportar Excel"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-green-600 text-xs mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM" className="w-full bg-burgundy text-white py-3.5 font-body text-xs uppercase tracking-wider hover:opacity-90 transition">
                Elegir plan
              </CheckoutButton>
            </div>

            {/* PREMIUM PLUS */}
            <div className="border border-[#e8e6e3] rounded-2xl p-7 flex flex-col bg-white">
              <h3 className="font-editorial text-xl font-medium mb-1">Premium Plus</h3>
              <p className="font-body text-[#999] text-xs mb-5">La experiencia completa</p>
              <p className="font-editorial text-4xl font-bold mb-7">$65.000</p>
              <ul className="space-y-3 mb-8 flex-1 font-body text-sm text-[#444]">
                {["Todo lo del Premium", "Invitación personalizada", "Trivia interactiva", "Álbum QR compartido", "Fotos ilimitadas", "Soporte prioritario"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-green-600 text-xs mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM_PLUS" className="w-full border border-[#333] py-3.5 font-body text-xs uppercase tracking-wider hover:bg-[#333] hover:text-white transition">
                Elegir plan
              </CheckoutButton>
            </div>
          </div>

          <p className="text-center font-body text-[#999] text-sm mt-10">
            ¿Lo necesitás urgente? Agregá <strong className="text-[#1a1a1a]">Express 24hs</strong> por solo +$8.000
          </p>
        </div>
      </section>

      {/* DEMOS */}
      <section className="py-24 px-6 border-t border-[#eee] bg-[#F7F5F2]">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Diseños en vivo</p>
          <h2 className="font-editorial text-4xl md:text-5xl font-medium mb-14">Mirá cómo quedan</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Elegante Oscuro", desc: "Ideal para bodas de noche", slug: "boda-valentina-y-matias", bg: "bg-gradient-to-br from-[#1a1a2e] to-[#0f3460]", text: "text-white" },
              { name: "Floral Claro", desc: "Perfecto para bodas al aire libre", slug: "boda-luciana-y-gonzalo", bg: "bg-gradient-to-br from-[#fef1ee] to-[#fdf8f4]", text: "text-[#4a3728]" },
              { name: "Minimalista", desc: "Moderno, ideal para cumpleaños", slug: "cumple-30-martin", bg: "bg-white", text: "text-[#111]" },
              { name: "15 Años Glam", desc: "Fucsia y dorado, pensado para quince", slug: "boda-valentina-y-matias", bg: "bg-gradient-to-br from-[#2d1b4e] to-[#1a1a2e]", text: "text-white" },
              { name: "Bautismo Tierno", desc: "Celeste suave, delicado", slug: "boda-luciana-y-gonzalo", bg: "bg-gradient-to-br from-[#e8f4f8] to-[#f0f8ff]", text: "text-[#2c5f7c]" },
              { name: "Corporativo", desc: "Para eventos de empresa", slug: "cumple-30-martin", bg: "bg-gradient-to-br from-[#f8f8f8] to-[#eee]", text: "text-[#333]" },
            ].map((demo) => (
              <a key={demo.name} href={`/${demo.slug}`} target="_blank" className="group block">
                <div className={`${demo.bg} ${demo.text} rounded-2xl p-8 h-44 flex flex-col justify-end border border-[#e8e6e3] group-hover:shadow-lg group-hover:-translate-y-1 transition-all`}>
                  <h3 className="font-body font-semibold text-sm">{demo.name}</h3>
                  <p className="font-body text-xs opacity-70 mt-1">{demo.desc}</p>
                  <span className="font-body text-xs opacity-40 mt-2 group-hover:opacity-100 transition">Ver demo →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-6 border-t border-[#eee]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#999] mb-3">Más de 200 eventos realizados</p>
          <h2 className="font-editorial text-4xl md:text-5xl font-medium mb-14">Lo que dicen nuestros clientes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { text: "Nuestros invitados no podían creer que era una invitación web. La cuenta regresiva y la confirmación fueron geniales.", name: "Valentina R.", event: "Boda" },
              { text: "La armé en 3 días y me ahorré fortunas en papel. Mis amigos la compartieron por WhatsApp al toque.", name: "Martín G.", event: "Cumpleaños 30" },
              { text: "Mi hija quedó fascinada con el diseño floral. La música de fondo y las fotos quedaron impresionantes.", name: "Carolina S.", event: "15 Años" },
            ].map((review, i) => (
              <div key={i} className="border border-[#eee] rounded-2xl p-7 bg-white">
                <p className="font-body text-sm text-[#444] leading-relaxed italic mb-6">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F7F5F2] border border-[#eee] flex items-center justify-center font-editorial text-sm italic text-gold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium">{review.name}</p>
                    <p className="font-body text-xs text-[#999]">{review.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-[#eee] bg-[#F7F5F2]">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#999] mb-3 text-center">Preguntas frecuentes</p>
          <h2 className="font-editorial text-4xl font-medium mb-14 text-center">Todo lo que necesitás saber</h2>

          <div className="space-y-3">
            {[
              { q: "¿Cuánto demora la entrega?", a: "La entrega estándar es en 3 días hábiles. Con Express se entrega en 24 horas." },
              { q: "¿Puedo enviarla a todos mis invitados?", a: "Sí, los envíos son ilimitados. Compartí el link por WhatsApp a todos sin costo extra." },
              { q: "¿Puedo hacer cambios después?", a: "Sí, al ser una página web cualquier cambio se actualiza al instante para todos." },
              { q: "¿Cómo pago?", a: "Transferencia (30% OFF), MercadoPago o tarjeta en hasta 3 cuotas. Seña del 50% para arrancar." },
              { q: "¿Mis invitados necesitan descargar algo?", a: "No. Es una página web que se abre directo desde WhatsApp en cualquier celular." },
              { q: "¿Funciona en todos los celulares?", a: "Sí, es 100% responsive y funciona en cualquier dispositivo con navegador web." },
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-[#eee] rounded-xl p-5 cursor-pointer group">
                <summary className="font-body font-medium text-sm flex items-center justify-between list-none">
                  {faq.q}
                  <span className="text-gold group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="font-body text-[#666] text-sm mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 border-t border-[#eee] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-editorial text-4xl md:text-5xl font-medium mb-4">¿Listos para sorprender?</h2>
          <p className="font-body text-[#666] mb-10">Te la armamos en 3 días hábiles. Envíos ilimitados por WhatsApp.</p>
          <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitacion%20digital" target="_blank"
            className="inline-flex items-center gap-3 bg-burgundy text-white px-8 py-4 font-body text-xs uppercase tracking-[0.15em] hover:opacity-90 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#eee] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-editorial text-xl italic text-gold">Te invito</span>
          <nav className="flex flex-wrap gap-6 font-body text-xs uppercase tracking-wider text-[#888]">
            <a href="#planes" className="hover:text-[#1a1a1a] transition">Planes</a>
            <a href="#planes" className="hover:text-[#1a1a1a] transition">Demos</a>
            <a href="#planes" className="hover:text-[#1a1a1a] transition">FAQ</a>
            <a href="https://instagram.com/teinvitoapp" target="_blank" className="hover:text-[#1a1a1a] transition">Instagram</a>
            <a href="https://wa.me/5493425299942" target="_blank" className="hover:text-[#1a1a1a] transition">WhatsApp</a>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#eee] text-center">
          <p className="font-body text-xs text-[#999]">© 2026 Te invito · <a href="https://instagram.com/teinvitoapp" target="_blank" className="hover:text-[#666]">@teinvitoapp</a> en Instagram</p>
          <Link href="/admin" className="font-body text-[10px] text-[#ccc] hover:text-[#999] mt-2 inline-block">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
