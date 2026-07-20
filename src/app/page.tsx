import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] min-h-screen flex items-center justify-center text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">Invitaciones Digitales Interactivas</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Tu evento merece una <span className="text-[#d4af37]">invitación única</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Sorprendé a tus invitados con una invitación web elegante, interactiva y lista para compartir por WhatsApp.
          </p>
          <p className="text-gray-400 mb-8">Bodas | 15 años | Bautismos | Cumpleaños | Eventos corporativos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#planes" className="bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/30 transition">
              Ver Planes y Precios
            </a>
            <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20info%20sobre%20invitaciones%20digitales" target="_blank"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition">
              Consultanos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todo en una sola invitación</h2>
          <p className="text-gray-500 mb-12">Sin apps, sin descargas. Tus invitados solo abren un link desde WhatsApp.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Cuenta regresiva", desc: "Contador en tiempo real hasta el evento." },
              { icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", title: "Ubicación y mapas", desc: "Google Maps integrado para llegar fácil." },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Confirmación RSVP", desc: "Tus invitados confirman desde la invitación." },
              { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Sección regalos", desc: "Alias/CBU con botón copiar integrado." },
              { icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z", title: "Música de fondo", desc: "El tema que elijas suena de fondo." },
              { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14", title: "Galería de fotos", desc: "Carrusel elegante con tus mejores fotos." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-gradient-to-r from-[#d4af37] to-[#f5d060] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#1a1a2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center font-bold text-gray-900 mb-4">Planes y Precios</h2>
          <p className="text-center text-green-600 font-semibold mb-12">30% OFF abonando por transferencia</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BASICO */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all">
              <h3 className="font-bold text-xl mb-2">Plan Básico</h3>
              <p className="text-gray-500 text-sm mb-4">Ideal para eventos simples</p>
              <p className="text-4xl font-bold mb-6">$25.000</p>
              <ul className="space-y-2 mb-8 text-sm">
                {["Cuenta regresiva", "Ubicación con mapa", "Confirmación por WhatsApp", "Sección regalos", "Dress code", "Envíos ilimitados"].map(f => (
                  <li key={f} className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>
                ))}
              </ul>
              <CheckoutButton planId="BASICO" className="block w-full text-center border-2 border-gray-900 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition">Elegir Plan</CheckoutButton>
            </div>
            {/* PREMIUM */}
            <div className="bg-white border-2 border-[#d4af37] rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all relative shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] text-xs font-bold px-4 py-1 rounded-full">MÁS ELEGIDO</span>
              <h3 className="font-bold text-xl mb-2">Plan Premium</h3>
              <p className="text-gray-500 text-sm mb-4">Para bodas y 15 años</p>
              <p className="text-4xl font-bold mb-6">$45.000</p>
              <ul className="space-y-2 mb-8 text-sm">
                {["Todo lo del Plan Básico", "Sistema RSVP propio", "Listado en tiempo real", "Música de fondo", "Galería (8 fotos)", "Exportar Excel", "Templates premium"].map(f => (
                  <li key={f} className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM" className="block w-full text-center bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] py-3 rounded-full font-bold hover:shadow-lg transition">Elegir Plan</CheckoutButton>
            </div>
            {/* PREMIUM PLUS */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all">
              <h3 className="font-bold text-xl mb-2">Plan Premium Plus</h3>
              <p className="text-gray-500 text-sm mb-4">La experiencia completa</p>
              <p className="text-4xl font-bold mb-6">$65.000</p>
              <ul className="space-y-2 mb-8 text-sm">
                {["Todo lo del Premium", "Invitación personalizada", "Trivia interactiva", "Álbum QR compartido", "Fotos ilimitadas", "Canciones sugeridas", "Soporte prioritario"].map(f => (
                  <li key={f} className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>
                ))}
              </ul>
              <CheckoutButton planId="PREMIUM_PLUS" className="block w-full text-center border-2 border-gray-900 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition">Elegir Plan</CheckoutButton>
            </div>
          </div>
          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <p className="font-bold text-amber-800">¿Necesitás tu invitación URGENTE?</p>
            <p className="text-amber-700 mt-1">Agregá <strong>Express 24hs</strong> por solo <strong>+$8.000</strong></p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-center text-gray-500 mb-12">Más de 200 eventos realizados con éxito</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Valentina R.", event: "Boda", text: "Nuestros invitados no podían creer que era una invitación web. La cuenta regresiva y la confirmación fueron geniales. ¡Todos comentaban lo hermosa que era!", stars: 5 },
              { name: "Martín G.", event: "Cumpleaños 30", text: "La armé en 3 días y me ahorré fortunas en papel. Mis amigos la compartieron por WhatsApp al toque. El alias para regalos fue un golazo.", stars: 5 },
              { name: "Carolina S.", event: "15 Años", text: "Mi hija quedó fascinada con el diseño floral. La música de fondo y las fotos del book quedaron impresionantes. Super recomendable.", stars: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d060] flex items-center justify-center text-xs font-bold text-[#1a1a2e]">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMOS INTERACTIVAS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mirá nuestros diseños en vivo</h2>
          <p className="text-gray-500 mb-12">Clickeá en cada demo para ver la invitación completa</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Elegante Oscuro", desc: "Ideal para bodas de noche", slug: "boda-valentina-y-matias", gradient: "from-[#1a1a2e] to-[#0f3460]", textColor: "text-[#d4af37]" },
              { name: "Floral Claro", desc: "Perfecto para bodas y 15 años", slug: "boda-luciana-y-gonzalo", gradient: "from-[#fef1ee] to-[#fdf8f4]", textColor: "text-[#c27a6e]" },
              { name: "Minimalista", desc: "Moderno y unisex", slug: "cumple-30-martin", gradient: "from-white to-gray-50", textColor: "text-black" },
            ].map((demo, i) => (
              <a key={i} href={`/${demo.slug}`} target="_blank" className="group block">
                <div className={`bg-gradient-to-br ${demo.gradient} rounded-2xl p-8 h-48 flex flex-col items-center justify-center border border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2 transition-all`}>
                  <p className={`font-serif text-2xl font-bold ${demo.textColor}`}>{demo.name}</p>
                  <p className="text-gray-500 text-sm mt-2">{demo.desc}</p>
                  <span className="mt-4 text-xs font-medium text-gray-400 group-hover:text-gray-600 transition">Click para ver demo →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: "¿Cuánto demora la entrega?", a: "La entrega estándar es en 3 días hábiles. Con Express se entrega en 24 horas." },
              { q: "¿Puedo enviarla a todos mis invitados?", a: "Sí, los envíos son ilimitados. Compartí el link por WhatsApp a todos sin costo extra." },
              { q: "¿Puedo hacer cambios después?", a: "Sí, al ser una página web cualquier cambio se actualiza al instante para todos." },
              { q: "¿Cómo pago?", a: "Transferencia (30% OFF), MercadoPago o tarjeta en hasta 3 cuotas. Seña del 50% para arrancar." },
              { q: "¿Mis invitados necesitan descargar algo?", a: "No. Es una página web que se abre directo desde WhatsApp en cualquier celular." },
              { q: "¿Funciona en todos los celulares?", a: "Sí, es 100% responsive y funciona en cualquier dispositivo con navegador web." },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-6 cursor-pointer shadow-sm border border-gray-100">
                <summary className="font-semibold text-gray-900">{faq.q}</summary>
                <p className="text-gray-600 mt-3 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">¿Listo para sorprender a tus invitados?</h2>
          <p className="text-gray-300 mb-8">Escribinos y te armamos tu invitación personalizada.</p>
          <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitacion%20digital" target="_blank"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition">
            Escribinos por WhatsApp
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>© 2025 TeInvitoApp | Invitaciones Digitales Interactivas</p>
        <p className="mt-2"><a href="https://instagram.com/teinvitoapp" target="_blank" className="text-[#d4af37] hover:underline">@teinvitoapp</a></p>
        <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-xs mt-2 inline-block">Admin</Link>
      </footer>
    </div>
  );
}
