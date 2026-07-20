import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* HEADER / NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur-sm border-b border-[#e8e6e3]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif text-xl font-bold tracking-tight">Te invito</span>
          <a href="#planes" className="text-sm font-medium border border-[#1a1a1a] px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-white transition">
            Ver planes
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-[#999] mb-6">ID</p>
        <p className="text-sm text-[#666] mb-4">Invitaciones web a medida</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] mb-6 max-w-4xl">
          Tu invitación merece ser <em className="font-normal italic">única</em>
        </h1>
        <p className="text-[#666] text-lg max-w-xl mb-8 leading-relaxed">
          Diseñamos la invitación como una pieza — con la calma de un papel fino, pero lista para abrirse en un WhatsApp.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {["Bodas", "15 Años", "Bautismos", "Cumpleaños", "Eventos"].map((tag) => (
            <span key={tag} className="text-xs border border-[#ddd] px-3 py-1.5 rounded-full text-[#666]">{tag}</span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#planes" className="bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#333] transition">
            Ver planes y precios
          </a>
          <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20info%20sobre%20invitaciones%20digitales" target="_blank"
            className="border border-[#ddd] px-7 py-3.5 rounded-full text-sm font-medium hover:border-[#999] transition">
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      {/* LO QUE INCLUYE */}
      <section className="py-24 px-6 border-t border-[#e8e6e3]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-2">Lo que incluye</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-16">Todo en un solo link</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { num: "I", title: "Cuenta regresiva", desc: "El tiempo hasta el evento, corriendo en vivo desde que abren el link." },
              { num: "II", title: "Mapa y ubicación", desc: "Un toque y llegan. Google Maps integrado, sin buscar direcciones." },
              { num: "III", title: "Confirmación RSVP", desc: "Tus invitados confirman desde ahí. Vos ves la lista en tiempo real." },
              { num: "IV", title: "Sección regalos", desc: "Alias o CBU con botón de copiar, sin incomodidad de preguntar." },
              { num: "V", title: "Música de fondo", desc: "La canción que elijan suena apenas se abre la invitación." },
              { num: "VI", title: "Galería de fotos", desc: "Un carrusel prolijo con las fotos que ustedes elijan." },
            ].map((item) => (
              <div key={item.num} className="flex gap-4">
                <span className="text-xs text-[#bbb] font-serif italic mt-1">{item.num}.</span>
                <div>
                  <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASI SE VE - PREVIEW */}
      <section className="py-24 px-6 bg-[#f3f1ee] border-t border-[#e8e6e3]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-2">Así se ve</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-16">Una invitación, no una app</h2>

          {/* Preview card */}
          <div className="max-w-sm mx-auto bg-gradient-to-b from-[#1a1a2e] to-[#0f2027] rounded-3xl p-10 text-white shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Nos casamos</p>
            <h3 className="font-serif text-3xl font-bold mb-2">Valentina & Matías</h3>
            <p className="text-gray-400 text-sm mb-8">12 de diciembre, 2026 — Córdoba</p>

            <div className="flex justify-center gap-4 mb-8">
              {[
                { value: "48", label: "Días" },
                { value: "14", label: "Horas" },
                { value: "22", label: "Min" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <span className="block text-2xl font-bold text-[#d4af37]">{item.value}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-full text-sm font-medium">
              Confirmar asistencia
            </button>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-24 px-6 border-t border-[#e8e6e3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-2">Planes y precios</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Elegí el nivel de tu evento</h2>
          </div>
          <p className="text-center text-green-700 text-sm font-medium mb-12">30% OFF abonando por transferencia</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* BASICO */}
            <div className="bg-white border border-[#e8e6e3] rounded-2xl p-7 flex flex-col">
              <h3 className="font-semibold text-lg mb-1">Básico</h3>
              <p className="text-[#999] text-xs mb-4">Ideal para eventos simples</p>
              <p className="text-3xl font-bold mb-6">$25.000</p>
              <ul className="space-y-2.5 mb-8 flex-1 text-sm text-[#444]">
                {["Cuenta regresiva", "Ubicación con mapa", "Confirmación por WhatsApp", "Sección regalos", "Dress code", "Envíos ilimitados"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton planId="BASICO" className="w-full border border-[#1a1a1a] text-[#1a1a1a] py-3 rounded-full text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition">
                Elegir plan
              </CheckoutButton>
            </div>

            {/* PREMIUM */}
            <div className="bg-white border-2 border-[#1a1a1a] rounded-2xl p-7 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">Más elegido</span>
              <h3 className="font-semibold text-lg mb-1">Premium</h3>
              <p className="text-[#999] text-xs mb-4">Para bodas y 15 años</p>
              <p className="text-3xl font-bold mb-6">$45.000</p>
              <ul className="space-y-2.5 mb-8 flex-1 text-sm text-[#444]">
                {["Todo lo del Básico", "Sistema RSVP propio", "Listado en tiempo real", "Música de fondo", "Galería (8 fotos)", "Exportar Excel"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM" className="w-full bg-[#1a1a1a] text-white py-3 rounded-full text-sm font-medium hover:bg-[#333] transition">
                Elegir plan
              </CheckoutButton>
            </div>

            {/* PREMIUM PLUS */}
            <div className="bg-white border border-[#e8e6e3] rounded-2xl p-7 flex flex-col">
              <h3 className="font-semibold text-lg mb-1">Premium Plus</h3>
              <p className="text-[#999] text-xs mb-4">La experiencia completa</p>
              <p className="text-3xl font-bold mb-6">$65.000</p>
              <ul className="space-y-2.5 mb-8 flex-1 text-sm text-[#444]">
                {["Todo lo del Premium", "Invitación personalizada", "Trivia interactiva", "Álbum QR compartido", "Fotos ilimitadas", "Soporte prioritario"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM_PLUS" className="w-full border border-[#1a1a1a] text-[#1a1a1a] py-3 rounded-full text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition">
                Elegir plan
              </CheckoutButton>
            </div>
          </div>

          <p className="text-center text-[#999] text-sm mt-8">
            ¿Lo necesitás urgente? Agregá <strong className="text-[#1a1a1a]">Express 24hs</strong> por solo +$8.000
          </p>
        </div>
      </section>

      {/* DEMOS */}
      <section className="py-24 px-6 border-t border-[#e8e6e3] bg-[#f3f1ee]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-2">Diseños en vivo</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Mirá cómo quedan</h2>

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
                  <h3 className="font-semibold text-sm">{demo.name}</h3>
                  <p className="text-xs opacity-70 mt-1">{demo.desc}</p>
                  <span className="text-xs opacity-50 mt-2 group-hover:opacity-100 transition">Ver demo →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-6 border-t border-[#e8e6e3]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-2 text-center">Más de 200 eventos realizados</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Lo que dicen nuestros clientes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Nuestros invitados no podían creer que era una invitación web. La cuenta regresiva y la confirmación fueron geniales.", name: "Valentina R.", event: "Boda" },
              { text: "La armé en 3 días y me ahorré fortunas en papel. Mis amigos la compartieron por WhatsApp al toque.", name: "Martín G.", event: "Cumpleaños 30" },
              { text: "Mi hija quedó fascinada con el diseño floral. La música de fondo y las fotos quedaron impresionantes.", name: "Carolina S.", event: "15 Años" },
            ].map((review, i) => (
              <div key={i} className="bg-white border border-[#e8e6e3] rounded-2xl p-6">
                <p className="text-sm text-[#444] leading-relaxed italic mb-6">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f3f1ee] flex items-center justify-center text-xs font-bold text-[#999]">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-[#999]">{review.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-[#e8e6e3] bg-[#f3f1ee]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#999] mb-2 text-center">Preguntas frecuentes</p>
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">Todo lo que necesitás saber</h2>

          <div className="space-y-3">
            {[
              { q: "¿Cuánto demora la entrega?", a: "La entrega estándar es en 3 días hábiles. Con Express se entrega en 24 horas." },
              { q: "¿Puedo enviarla a todos mis invitados?", a: "Sí, los envíos son ilimitados. Compartí el link por WhatsApp a todos sin costo extra." },
              { q: "¿Puedo hacer cambios después?", a: "Sí, al ser una página web cualquier cambio se actualiza al instante para todos." },
              { q: "¿Cómo pago?", a: "Transferencia (30% OFF), MercadoPago o tarjeta en hasta 3 cuotas. Seña del 50% para arrancar." },
              { q: "¿Mis invitados necesitan descargar algo?", a: "No. Es una página web que se abre directo desde WhatsApp en cualquier celular." },
              { q: "¿Funciona en todos los celulares?", a: "Sí, es 100% responsive y funciona en cualquier dispositivo con navegador web." },
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-[#e8e6e3] rounded-xl p-5 cursor-pointer group">
                <summary className="font-medium text-sm flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#999] group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="text-[#666] text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 border-t border-[#e8e6e3] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">¿Listos para sorprender?</h2>
          <p className="text-[#666] mb-8">Te la armamos en 3 días hábiles. Envíos ilimitados por WhatsApp.</p>
          <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitacion%20digital" target="_blank"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#333] transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e8e6e3] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-lg font-bold">Te invito</span>
          <nav className="flex flex-wrap gap-6 text-sm text-[#666]">
            <a href="#planes" className="hover:text-[#1a1a1a] transition">Planes</a>
            <a href="#planes" className="hover:text-[#1a1a1a] transition">Demos</a>
            <a href="#planes" className="hover:text-[#1a1a1a] transition">FAQ</a>
            <a href="https://instagram.com/teinvitoapp" target="_blank" className="hover:text-[#1a1a1a] transition">Instagram</a>
            <a href="https://wa.me/5493425299942" target="_blank" className="hover:text-[#1a1a1a] transition">WhatsApp</a>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-[#e8e6e3] flex items-center justify-between text-xs text-[#999]">
          <p>© 2026 Te invito · <a href="https://instagram.com/teinvitoapp" target="_blank" className="hover:text-[#666]">@teinvitoapp</a> en Instagram</p>
          <Link href="/admin" className="hover:text-[#666]">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
