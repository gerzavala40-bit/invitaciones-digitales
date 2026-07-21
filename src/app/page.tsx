"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectStyle = (style: string, event: string) => {
    setSelectedStyle(style);
    setSelectedEvent(event);
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectCustom = () => {
    setSelectedStyle("A medida / personalizado");
    setSelectedEvent("");
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClearStyle = () => {
    setSelectedStyle("");
    setSelectedEvent("");
    document.getElementById("estilos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const estilo = selectedStyle || "No especificado (me ayudan a elegir)";
    const evento = formData.get("evento") as string;
    const nombres = formData.get("nombres") as string;
    const fecha = formData.get("fecha") as string;
    const lugar = (formData.get("lugar") as string) || "—";
    const plan = formData.get("plan") as string;
    const express = formData.get("express") ? "Sí (+$8.000)" : "No";
    const whatsapp = formData.get("whatsapp") as string;
    const notas = (formData.get("notas") as string) || "—";

    let fechaFmt = fecha;
    try {
      const d = new Date(fecha + "T12:00:00");
      fechaFmt = d.toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    } catch (_) {}

    const msg = `Hola! Quiero pedir una invitación digital 🎉

*Estilo:* ${estilo}
*Evento:* ${evento}
*Nombres:* ${nombres}
*Fecha:* ${fechaFmt}
*Lugar:* ${lugar}
*Plan:* ${plan}
*Express 24hs:* ${express}
*Mi WhatsApp:* ${whatsapp}
*Notas:* ${notas}

¡Quedo a la espera para coordinar la seña!`;

    const url = "https://wa.me/5493425299942?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  };

  return (
    <div className="font-sans bg-ink-50 text-ink-900 antialiased min-h-screen">
      {/* ========== NAV ========== */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          navScrolled ? "bg-ink-50/90 backdrop-blur-md shadow-soft border-b border-ink-100/50" : ""
        }`}
        id="navbar"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
            <Link href="#" className="font-display text-xl sm:text-2xl tracking-tight text-ink-900">
              Te <em className="italic text-terracotta-600">invito</em>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-600">
              <Link href="#estilos" className="hover:text-ink-900 transition">Estilos</Link>
              <Link href="#como-funciona" className="hover:text-ink-900 transition">Cómo funciona</Link>
              <Link href="#pricing" className="hover:text-ink-900 transition">Precios</Link>
              <Link href="#faq" className="hover:text-ink-900 transition">FAQ</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="#pedido" className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-semibold text-ink-800 border border-ink-200 hover:border-ink-400 hover:bg-white transition">
                Hacer pedido
              </Link>
              <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitación" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-semibold text-white bg-terracotta-600 hover:bg-terracotta-700 shadow-soft transition">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <header className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-terracotta-100/60 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-ink-100 shadow-soft mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse-soft"></span>
                <span className="text-xs font-semibold tracking-wide text-ink-600 uppercase">Lista en 3 días · Express 24hs</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.08] tracking-tight text-ink-950 text-balance">
                Elegí tu estilo.<br />
                Nosotros la <span className="italic text-terracotta-600">armamos</span>.
              </h1>

              <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-ink-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Mirás las demos, nos pasás los datos de tu evento y en 3 días tenés tu invitación web lista para WhatsApp. Sin apps. Sin vueltas.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link href="#estilos" className="w-full sm:w-auto inline-flex items-center justify-center h-13 px-8 rounded-full text-base font-semibold text-white bg-terracotta-600 hover:bg-terracotta-700 shadow-glow transition group">
                  Ver estilos y elegir
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link href="#como-funciona" className="w-full sm:w-auto inline-flex items-center justify-center h-13 px-8 rounded-full text-base font-semibold text-ink-800 bg-white border border-ink-200 hover:border-ink-400 hover:bg-ink-50 transition">
                  Cómo funciona
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  +200 eventos
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-ink-300"></span>
                <span>Envíos ilimitados</span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-ink-300"></span>
                <span>30% OFF transferencia</span>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-terracotta-400/20 blur-3xl rounded-full scale-90"></div>
                <div className="relative phone-frame rounded-[2.5rem] p-3 w-[280px] sm:w-[300px]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl bg-ink-950 z-10"></div>
                  <div className="relative rounded-[2rem] overflow-hidden bg-ink-50 aspect-[9/19]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-ink-50 to-ink-100">
                      <div className="w-12 h-12 rounded-full border border-gold-400 flex items-center justify-center mb-4">
                        <span className="font-display italic text-gold-600 text-lg">V&M</span>
                      </div>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-terracotta-600 font-semibold mb-2">Nos casamos</p>
                      <h3 className="font-display text-2xl text-ink-900 leading-tight">Valentina<br /><span className="italic text-terracotta-600">&</span> Matías</h3>
                      <p className="text-[11px] text-ink-500 mt-2 tracking-wide">12 Dic 2026 · Córdoba</p>
                      <div className="flex gap-3 mt-5">
                        <div className="text-center"><div className="font-display text-xl text-terracotta-600">48</div><div className="text-[8px] uppercase tracking-wider text-ink-400">Días</div></div>
                        <div className="text-center"><div className="font-display text-xl text-terracotta-600">14</div><div className="text-[8px] uppercase tracking-wider text-ink-400">Hs</div></div>
                        <div className="text-center"><div className="font-display text-xl text-terracotta-600">22</div><div className="text-[8px] uppercase tracking-wider text-ink-400">Min</div></div>
                      </div>
                      <div className="mt-5 px-5 py-2 rounded-full border border-sage-500 text-[10px] tracking-wider uppercase text-sage-600 font-medium">Confirmar asistencia</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-4 sm:-left-8 top-1/4 bg-white rounded-2xl shadow-card px-3.5 py-2.5 flex items-center gap-2">
                  <span className="text-lg">🗺️</span>
                  <div><p className="text-[10px] font-semibold text-ink-800">Mapa integrado</p><p className="text-[9px] text-ink-400">Un toque y llegan</p></div>
                </div>
                <div className="absolute -right-2 sm:-right-6 bottom-1/4 bg-white rounded-2xl shadow-card px-3.5 py-2.5 flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <div><p className="text-[10px] font-semibold text-ink-800">RSVP en vivo</p><p className="text-[9px] text-ink-400">Lista en tiempo real</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== CÓMO FUNCIONA ========== */}
      <section id="como-funciona" className="py-20 sm:py-24 bg-white border-y border-ink-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-600 mb-3">Simple y sin vueltas</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-950 tracking-tight">
              Así de fácil es
            </h2>
            <p className="mt-4 text-ink-500 text-lg">Vos elegís y nos pasás los datos. Nosotros diseñamos y te entregamos el link listo.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-terracotta-100 text-terracotta-700 font-display text-2xl mb-5 step-num">1</div>
              <h3 className="font-display text-xl text-ink-900 mb-2">Elegís el estilo</h3>
              <p className="text-ink-500 text-[15px] leading-relaxed">Mirás las demos en vivo y elegís el que más te guste para tu evento.</p>
            </div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-100 text-gold-700 font-display text-2xl mb-5 step-num">2</div>
              <h3 className="font-display text-xl text-ink-900 mb-2">Nos pasás los datos</h3>
              <p className="text-ink-500 text-[15px] leading-relaxed">Nombres, fecha, lugares, fotos y el plan. Todo en un formulario rápido.</p>
            </div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage-100 text-sage-700 font-display text-2xl mb-5 step-num">3</div>
              <h3 className="font-display text-xl text-ink-900 mb-2">La diseñamos</h3>
              <p className="text-ink-500 text-[15px] leading-relaxed">En 3 días hábiles (o 24hs Express) armamos tu invitación personalizada.</p>
            </div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ink-100 text-ink-700 font-display text-2xl mb-5 step-num">4</div>
              <h3 className="font-display text-xl text-ink-900 mb-2">Recibís el link</h3>
              <p className="text-ink-500 text-[15px] leading-relaxed">Te mandamos el link final. Lo compartís por WhatsApp a todos, sin límite.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="#estilos" className="inline-flex items-center gap-2 text-terracotta-600 font-semibold hover:text-terracotta-700 transition">
              Empezar eligiendo estilo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ESTILOS / DEMOS ========== */}
      <section id="estilos" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-600 mb-3">Paso 1</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink-950 tracking-tight">
              Elegí tu estilo
            </h2>
            <p className="mt-4 text-ink-500 text-lg">
              Abrí cualquier demo, sentí la experiencia y hacé clic en <strong className="text-ink-800">“Quiero este estilo”</strong>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" id="styles-grid">
            
            {/* Demo 1 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "Elegante Oscuro" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-boda-noche-dorada.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-gradient-to-br from-ink-950 to-ink-800 flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-gold-400/90">Elegante Oscuro</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "Elegante Oscuro" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg text-ink-900">Elegante Oscuro</h3>
                    <p className="text-sm text-ink-400 mt-0.5">Bodas de noche · Sofisticado</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-boda-noche-dorada.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("Elegante Oscuro", "Boda")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">
                    Quiero este
                  </button>
                </div>
              </div>
            </div>

            {/* Demo 2 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "Floral Claro" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-boda-floral-claro.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-ink-700">Floral Claro</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "Floral Claro" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900">Floral Claro</h3>
                <p className="text-sm text-ink-400 mt-0.5">Bodas jardín · Romántico</p>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-boda-floral-claro.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("Floral Claro", "Boda")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
                </div>
              </div>
            </div>

            {/* Demo 3 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "Minimalista" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-cumple-minimalista.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-white/90">Minimalista</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "Minimalista" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900">Minimalista</h3>
                <p className="text-sm text-ink-400 mt-0.5">Cumpleaños · Moderno</p>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-cumple-minimalista.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("Minimalista", "Cumpleaños")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
                </div>
              </div>
            </div>

            {/* Demo 4 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "15 Años Glam" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-15-camila-glam.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-gradient-to-br from-pink-600 to-fuchsia-800 flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-white/90">15 Años Glam</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "15 Años Glam" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900">15 Años Glam</h3>
                <p className="text-sm text-ink-400 mt-0.5">Quince · Fucsia y dorado</p>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-15-camila-glam.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("15 Años Glam", "15 Años")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
                </div>
              </div>
            </div>

            {/* Demo 5 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "Bautismo Tierno" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-bautismo-benicio.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-ink-700">Bautismo Tierno</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "Bautismo Tierno" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900">Bautismo Tierno</h3>
                <p className="text-sm text-ink-400 mt-0.5">Bautismos · Celeste suave</p>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-bautismo-benicio.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("Bautismo Tierno", "Bautismo")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
                </div>
              </div>
            </div>

            {/* Demo 6 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "Corporativo" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-corporativo-gala.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-gradient-to-br from-slate-800 to-blue-900 flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-blue-200">Corporativo</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "Corporativo" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900">Corporativo</h3>
                <p className="text-sm text-ink-400 mt-0.5">Eventos de empresa</p>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-corporativo-gala.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("Corporativo", "Corporativo")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
                </div>
              </div>
            </div>

            {/* Demo 7 */}
            <div className={`style-card group bg-white rounded-2xl overflow-hidden border-2 shadow-soft hover:shadow-card transition duration-300 cursor-pointer ${selectedStyle === "Boda Boho / Canva" ? "selected border-terracotta-500 ring-2 shadow-[0_0_0_2px_#C45C4A]" : "border-ink-100"}`}>
              <a href="/demo-canva-boho.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="h-44 sm:h-48 bg-[#F4F2EE] flex items-center justify-center relative">
                  <span className="font-display italic text-2xl text-[#2C2A28]">Boda Boho / Canva</span>
                  <div className={`absolute top-3 right-3 check-badge transition duration-200 w-7 h-7 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-sm font-bold ${selectedStyle === "Boda Boho / Canva" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>✓</div>
                </div>
              </a>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-900">Boda Boho / Canva</h3>
                <p className="text-sm text-ink-400 mt-0.5">Estilo Canva · Tonos crema</p>
                <div className="mt-4 flex gap-2">
                  <a href="/demo-canva-boho.html" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center h-10 rounded-full text-xs font-semibold tracking-wide uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</a>
                  <button type="button" onClick={() => handleSelectStyle("Boda Boho / Canva", "Boda")} className="flex-1 h-10 rounded-full text-xs font-semibold tracking-wide uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
                </div>
              </div>
            </div>

          </div>

          <p className="text-center mt-10 text-ink-500 text-sm">
            ¿No encontrás el estilo ideal? <button type="button" onClick={handleSelectCustom} className="text-terracotta-600 font-semibold hover:underline">Contanos qué buscás</button> y lo diseñamos a medida.
          </p>
        </div>
      </section>

      {/* ========== FORMULARIO DE PEDIDO ========== */}
      <section id="pedido" className="py-20 sm:py-28 bg-ink-100/60">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-600 mb-3">Paso 2</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-950 tracking-tight">
              Contanos de tu evento
            </h2>
            <p className="mt-3 text-ink-500">Completá los datos y te contactamos por WhatsApp para confirmar y coordinar la seña.</p>
          </div>

          {/* Selected style banner */}
          <div className={`mb-6 p-4 rounded-2xl bg-white border-2 border-terracotta-500 shadow-soft flex items-center justify-between gap-4 ${selectedStyle ? "" : "hidden"}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-600 font-bold">✓</div>
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wide">Estilo elegido</p>
                <p className="font-display text-lg text-ink-900">{selectedStyle || "—"}</p>
              </div>
            </div>
            <button type="button" onClick={handleClearStyle} className="text-xs text-ink-400 hover:text-ink-600 underline">Cambiar</button>
          </div>

          <form id="order-form" className="bg-white rounded-3xl p-6 sm:p-8 border border-ink-100 shadow-card space-y-5" onSubmit={handleSubmitOrder}>
            
            {/* Tipo de evento */}
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Tipo de evento *</label>
              <select name="evento" required value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className="form-input w-full h-12 px-4 rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 text-[15px]">
                <option value="">Seleccionar…</option>
                <option value="Boda">Boda</option>
                <option value="15 Años">15 Años</option>
                <option value="Bautismo">Bautismo</option>
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Corporativo">Corporativo / Empresa</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Nombres */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Nombre(s) *</label>
                <input type="text" name="nombres" required placeholder="Ej: Valentina & Matías" className="form-input w-full h-12 px-4 rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 text-[15px] placeholder:text-ink-300" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Fecha del evento *</label>
                <input type="date" name="fecha" required className="form-input w-full h-12 px-4 rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 text-[15px]" />
              </div>
            </div>

            {/* Lugar */}
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Ciudad / Lugar</label>
              <input type="text" name="lugar" placeholder="Ej: Córdoba · Salón Los Álamos" className="form-input w-full h-12 px-4 rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 text-[15px] placeholder:text-ink-300" />
            </div>

            {/* Plan */}
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Plan *</label>
              <div className="grid grid-cols-3 gap-3">
                <label className="relative cursor-pointer">
                  <input type="radio" name="plan" value="Básico" required className="peer sr-only" />
                  <div className="h-full p-2 sm:p-3 rounded-xl border-2 border-ink-200 peer-checked:border-terracotta-500 peer-checked:bg-terracotta-50 text-center transition">
                    <p className="font-display text-ink-900 text-[13px] sm:text-sm">Básico</p>
                    <p className="text-[11px] sm:text-xs text-ink-400 mt-0.5">$25.000</p>
                  </div>
                </label>
                <label className="relative cursor-pointer">
                  <input type="radio" name="plan" value="Premium" defaultChecked className="peer sr-only" />
                  <div className="h-full p-2 sm:p-3 rounded-xl border-2 border-ink-200 peer-checked:border-terracotta-500 peer-checked:bg-terracotta-50 text-center transition">
                    <p className="font-display text-ink-900 text-[13px] sm:text-sm">Premium</p>
                    <p className="text-[11px] sm:text-xs text-ink-400 mt-0.5">$45.000</p>
                  </div>
                </label>
                <label className="relative cursor-pointer">
                  <input type="radio" name="plan" value="Premium Plus" className="peer sr-only" />
                  <div className="h-full p-2 sm:p-3 rounded-xl border-2 border-ink-200 peer-checked:border-terracotta-500 peer-checked:bg-terracotta-50 text-center transition">
                    <p className="font-display text-ink-900 text-[13px] sm:text-sm">Plus</p>
                    <p className="text-[11px] sm:text-xs text-ink-400 mt-0.5">$65.000</p>
                  </div>
                </label>
              </div>
              <p className="mt-2 text-center text-xs font-semibold text-terracotta-600 bg-terracotta-50 rounded-lg py-1.5 border border-terracotta-200">
                🎁 30% OFF abonando por transferencia
              </p>
            </div>

            {/* Express */}
            <label className="flex items-center gap-3 p-4 rounded-xl border border-ink-100 bg-ink-50/50 cursor-pointer hover:bg-ink-50 transition">
              <input type="checkbox" name="express" className="w-4 h-4 rounded border-ink-300 text-terracotta-600 focus:ring-terracotta-500" />
              <div>
                <p className="text-sm font-semibold text-ink-800">Express 24hs <span className="text-terracotta-600 font-normal">+$8.000</span></p>
                <p className="text-xs text-ink-400">Entrega en 24 horas hábiles</p>
              </div>
            </label>

            {/* WhatsApp del cliente */}
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Tu WhatsApp *</label>
              <input type="tel" name="whatsapp" required placeholder="Ej: 351 123 4567" className="form-input w-full h-12 px-4 rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 text-[15px] placeholder:text-ink-300" />
            </div>

            {/* Notas / referencias */}
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-ink-500 mb-2">Notas o referencias (opcional)</label>
              <textarea name="notas" rows={3} placeholder="Colores preferidos, frase especial, link de fotos, algo que quieras destacar…" className="form-input w-full px-4 py-3 rounded-xl border border-ink-200 bg-ink-50/50 text-ink-900 text-[15px] placeholder:text-ink-300 resize-none"></textarea>
            </div>

            <button type="submit" className="w-full h-14 rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-base shadow-glow transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52--.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Enviar pedido por WhatsApp
            </button>

            <p className="text-center text-xs text-ink-400">
              Al enviar se abre WhatsApp con tu pedido armado. Seña del 50% para iniciar.
            </p>
          </form>
        </div>
      </section>

      {/* ========== FEATURES (resumen) ========== */}
      <section id="features" className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-600 mb-3">Todo incluido</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-950 tracking-tight">Lo que lleva tu invitación</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft">
              <span className="text-2xl mb-3 block">⏱️</span>
              <h3 className="font-display text-lg text-ink-900 mb-1">Cuenta regresiva</h3>
              <p className="text-sm text-ink-500">En vivo desde que abren el link.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft">
              <span className="text-2xl mb-3 block">📍</span>
              <h3 className="font-display text-lg text-ink-900 mb-1">Mapa y ubicación</h3>
              <p className="text-sm text-ink-500">Google Maps. Un toque y llegan.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft">
              <span className="text-2xl mb-3 block">✅</span>
              <h3 className="font-display text-lg text-ink-900 mb-1">Confirmación RSVP</h3>
              <p className="text-sm text-ink-500">Lista en tiempo real (según plan).</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft">
              <span className="text-2xl mb-3 block">🎁</span>
              <h3 className="font-display text-lg text-ink-900 mb-1">Sección regalos</h3>
              <p className="text-sm text-ink-500">Alias/CBU con botón copiar.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft">
              <span className="text-2xl mb-3 block">🎵</span>
              <h3 className="font-display text-lg text-ink-900 mb-1">Música de fondo</h3>
              <p className="text-sm text-ink-500">La canción que elijan al abrir.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft">
              <span className="text-2xl mb-3 block">📸</span>
              <h3 className="font-display text-lg text-ink-900 mb-1">Galería de fotos</h3>
              <p className="text-sm text-ink-500">Carrusel con sus fotos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-20 sm:py-28 bg-ink-900 text-ink-50 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-30 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-400 mb-3">Planes</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">Elegí el nivel</h2>
          </div>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-500/20 text-sage-300 text-sm font-semibold border border-sage-500/30">
              30% OFF abonando por transferencia
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <div className="bg-ink-800/80 rounded-3xl p-7 border border-ink-700 flex flex-col">
              <h3 className="font-display text-2xl text-white">Básico</h3>
              <p className="text-sm text-ink-400 mt-1 mb-5">Eventos simples</p>
              <p className="font-display text-4xl text-white mb-6">$25.000</p>
              <ul className="space-y-3 text-[15px] text-ink-300 mb-8 flex-1">
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Cuenta regresiva + mapa</li>
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Confirmación WhatsApp</li>
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Regalos + dress code</li>
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Envíos ilimitados</li>
              </ul>
              <button type="button" onClick={() => { document.querySelector<HTMLInputElement>('input[value=Básico]')!.checked = true; document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }); }} className="block text-center h-12 leading-[3rem] rounded-full border border-ink-500 text-white font-semibold text-sm hover:bg-ink-700 transition w-full">Elegir Básico</button>
            </div>

            <div className="bg-ink-800 rounded-3xl p-7 border-2 border-terracotta-500 shadow-glow flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-terracotta-600 text-white text-[11px] font-bold tracking-wider uppercase">Más elegido</span>
              </div>
              <h3 className="font-display text-2xl text-white">Premium</h3>
              <p className="text-sm text-ink-400 mt-1 mb-5">Bodas y 15 años</p>
              <p className="font-display text-4xl text-white mb-6">$45.000</p>
              <ul className="space-y-3 text-[15px] text-ink-200 mb-8 flex-1">
                <li className="flex gap-2"><span className="text-gold-400">✓</span> Todo lo del Básico</li>
                <li className="flex gap-2"><span className="text-gold-400">✓</span> RSVP propio + Excel</li>
                <li className="flex gap-2"><span className="text-gold-400">✓</span> Música de fondo</li>
                <li className="flex gap-2"><span className="text-gold-400">✓</span> Galería (8 fotos)</li>
              </ul>
              <button type="button" onClick={() => { document.querySelector<HTMLInputElement>('input[value=Premium]')!.checked = true; document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }); }} className="block text-center h-12 leading-[3rem] rounded-full bg-terracotta-600 text-white font-semibold text-sm hover:bg-terracotta-500 transition w-full">Elegir Premium</button>
            </div>

            <div className="bg-ink-800/80 rounded-3xl p-7 border border-ink-700 flex flex-col">
              <h3 className="font-display text-2xl text-white">Premium Plus</h3>
              <p className="text-sm text-ink-400 mt-1 mb-5">Experiencia completa</p>
              <p className="font-display text-4xl text-white mb-6">$65.000</p>
              <ul className="space-y-3 text-[15px] text-ink-300 mb-8 flex-1">
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Todo lo del Premium</li>
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Personalizada + trivia</li>
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Álbum QR compartido</li>
                <li className="flex gap-2"><span className="text-sage-400">✓</span> Fotos ilimitadas + soporte</li>
              </ul>
              <button type="button" onClick={() => { document.querySelector<HTMLInputElement>('input[value="Premium Plus"]')!.checked = true; document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }); }} className="block text-center h-12 leading-[3rem] rounded-full border border-ink-500 text-white font-semibold text-sm hover:bg-ink-700 transition w-full">Elegir Plus</button>
            </div>
          </div>
          <p className="text-center mt-10 text-ink-400 text-sm">Express 24hs: <strong className="text-gold-400">+$8.000</strong> · Seña 50% para iniciar</p>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-600 mb-3">+200 eventos</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-950">Lo que dicen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-ink-100 shadow-soft">
              <div className="flex gap-0.5 text-gold-400 mb-4">★★★★★</div>
              <p className="text-ink-600 leading-relaxed mb-6">“Elegimos el estilo, mandamos los datos y en 3 días teníamos el link. Los invitados quedaron encantados.”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center font-display italic text-terracotta-700">V</div>
                <div><p className="font-semibold text-sm text-ink-900">Valentina R.</p><p className="text-xs text-ink-400">Boda</p></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-ink-100 shadow-soft">
              <div className="flex gap-0.5 text-gold-400 mb-4">★★★★★</div>
              <p className="text-ink-600 leading-relaxed mb-6">“Cero complicaciones. Les pasé todo por el formulario y me devolvieron la invitación perfecta.”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center font-display italic text-sage-700">M</div>
                <div><p className="font-semibold text-sm text-ink-900">Martín G.</p><p className="text-xs text-ink-400">Cumpleaños 30</p></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-ink-100 shadow-soft">
              <div className="flex gap-0.5 text-gold-400 mb-4">★★★★★</div>
              <p className="text-ink-600 leading-relaxed mb-6">“El estilo Glam quedó soñado. Mi hija no podía creer que era una invitación web.”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center font-display italic text-gold-700">C</div>
                <div><p className="font-semibold text-sm text-ink-900">Carolina S.</p><p className="text-xs text-ink-400">15 Años</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-20 sm:py-24 bg-ink-100/50">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-600 mb-3">FAQ</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-950">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-3">
            <details className="group bg-white rounded-2xl border border-ink-100 shadow-soft" open>
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                <span className="font-display text-lg text-ink-900 pr-4">¿Cómo es el proceso?</span>
                <span className="faq-icon w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500 text-xl font-light flex-shrink-0 transition-transform">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1"><p className="text-ink-500 leading-relaxed">Elegís un estilo de las demos, completás el formulario con los datos de tu evento y nos llega por WhatsApp. Coordinamos la seña (50%), diseñamos y en 3 días hábiles te entregamos el link listo para compartir.</p></div>
            </details>
            <details className="group bg-white rounded-2xl border border-ink-100 shadow-soft">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                <span className="font-display text-lg text-ink-900 pr-4">¿Puedo pedir cambios?</span>
                <span className="faq-icon w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500 text-xl font-light flex-shrink-0 transition-transform">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1"><p className="text-ink-500 leading-relaxed">Sí. Te mandamos un preview antes de la entrega final. Podés pedir ajustes de textos, fotos o detalles. Al ser web, los cambios se ven al instante para todos.</p></div>
            </details>
            <details className="group bg-white rounded-2xl border border-ink-100 shadow-soft">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                <span className="font-display text-lg text-ink-900 pr-4">¿Cuánto demora?</span>
                <span className="faq-icon w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500 text-xl font-light flex-shrink-0 transition-transform">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1"><p className="text-ink-500 leading-relaxed">Estándar: <strong className="text-ink-800">3 días hábiles</strong>. Express: <strong className="text-ink-800">24 horas</strong> (+$8.000).</p></div>
            </details>
            <details className="group bg-white rounded-2xl border border-ink-100 shadow-soft">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                <span className="font-display text-lg text-ink-900 pr-4">¿Los envíos tienen costo extra?</span>
                <span className="faq-icon w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500 text-xl font-light flex-shrink-0 transition-transform">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1"><p className="text-ink-500 leading-relaxed">No. Un solo link, envíos ilimitados por WhatsApp a todos tus invitados.</p></div>
            </details>
            <details className="group bg-white rounded-2xl border border-ink-100 shadow-soft">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                <span className="font-display text-lg text-ink-900 pr-4">¿Cómo pago?</span>
                <span className="faq-icon w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500 text-xl font-light flex-shrink-0 transition-transform">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1"><p className="text-ink-500 leading-relaxed">Transferencia (<strong className="text-ink-800">30% OFF</strong>), MercadoPago o tarjeta en hasta 3 cuotas. Seña del 50% para arrancar.</p></div>
            </details>
            <details className="group bg-white rounded-2xl border border-ink-100 shadow-soft">
              <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 list-none">
                <span className="font-display text-lg text-ink-900 pr-4">¿Mis invitados necesitan una app?</span>
                <span className="faq-icon w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500 text-xl font-light flex-shrink-0 transition-transform">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1"><p className="text-ink-500 leading-relaxed">No. Es una página web que se abre directo en el celular desde WhatsApp. 100% responsive.</p></div>
            </details>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-ink-900"></div>
        <div className="absolute inset-0 grain opacity-20 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 relative text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
            Elegí el estilo.<br />Nosotros la <em className="italic text-gold-400">dejamos lista</em>.
          </h2>
          <p className="mt-5 text-ink-300 text-lg max-w-md mx-auto">En 3 días tenés tu invitación web lista para sorprender a todos por WhatsApp.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#estilos" className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full text-base font-semibold text-ink-900 bg-gold-400 hover:bg-gold-300 transition shadow-lg">
              Ver estilos y empezar
            </Link>
            <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitación" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full text-base font-semibold text-white border border-ink-600 hover:border-ink-400 hover:bg-ink-800 transition">
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-ink-950 text-ink-400 py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <Link href="#" className="font-display text-2xl text-ink-100">Te <em className="italic text-terracotta-500">invito</em></Link>
              <p className="mt-2 text-sm text-ink-500 max-w-xs">Invitaciones digitales elegantes. Elegís el estilo, nosotros la entregamos lista.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="#estilos" className="hover:text-ink-200 transition">Estilos</Link>
              <Link href="#como-funciona" className="hover:text-ink-200 transition">Cómo funciona</Link>
              <Link href="#pricing" className="hover:text-ink-200 transition">Precios</Link>
              <Link href="#pedido" className="hover:text-ink-200 transition">Hacer pedido</Link>
              <a href="https://instagram.com/teinvitoapp" target="_blank" rel="noopener noreferrer" className="hover:text-ink-200 transition">Instagram</a>
            </div>
          </div>
          <div className="border-t border-ink-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
            <p>© 2026 Te invito · @teinvitoapp</p>
            <p>Hecho con ❤️ en Argentina</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitación%20digital" target="_blank" rel="noopener noreferrer"
         className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 transition duration-300"
         aria-label="WhatsApp">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52--.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
}
