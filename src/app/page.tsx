import Link from "next/link";

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
            <a href="https://wa.me/5493512912596?text=Hola!%20Quiero%20info%20sobre%20invitaciones%20digitales" target="_blank"
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
              <a href="https://wa.me/5493512912596?text=Hola!%20Quiero%20el%20Plan%20Basico" target="_blank" className="block w-full text-center border-2 border-gray-900 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition">Elegir Plan</a>
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
              <a href="https://wa.me/5493512912596?text=Hola!%20Quiero%20el%20Plan%20Premium" target="_blank" className="block w-full text-center bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] py-3 rounded-full font-bold hover:shadow-lg transition">Elegir Plan</a>
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
              <a href="https://wa.me/5493512912596?text=Hola!%20Quiero%20el%20Plan%20Premium%20Plus" target="_blank" className="block w-full text-center border-2 border-gray-900 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition">Elegir Plan</a>
            </div>
          </div>
          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <p className="font-bold text-amber-800">¿Necesitás tu invitación URGENTE?</p>
            <p className="text-amber-700 mt-1">Agregá <strong>Express 24hs</strong> por solo <strong>+$8.000</strong></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">¿Listo para sorprender a tus invitados?</h2>
          <p className="text-gray-300 mb-8">Escribinos y te armamos tu invitación personalizada.</p>
          <a href="https://wa.me/5493512912596?text=Hola!%20Quiero%20una%20invitacion%20digital" target="_blank"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#f5d060] text-[#1a1a2e] px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition">
            Escribinos por WhatsApp
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>© 2025 MiPlataforma.com | Invitaciones Digitales</p>
        <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-xs mt-2 inline-block">Admin</Link>
      </footer>
    </div>
  );
}
