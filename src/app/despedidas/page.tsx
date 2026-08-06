"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { motion, AnimatePresence } from "framer-motion";

export default function DespedidasLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [customName, setCustomName] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState("");
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMercadoPagoCheckout = async (planId: string) => {
    setIsProcessingPayment(planId);
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, buyerEmail: "cliente@teinvitoapp.com.ar", buyerName: customName || "Cliente Web Despedida" }),
      });
      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("En este momento los pagos automaticos estan en mantenimiento. Por favor elegi la opcion de Pagar por Transferencia (WhatsApp).");
      }
    } catch (e) {
      alert("Error de conexion al iniciar pago.");
    } finally {
      setIsProcessingPayment("");
    }
  };

  const testimonials = [
    { name: "Lucía M.", event: "Viaje a Mendoza", text: "Fue la salvación para organizar la plata. Todos transfirieron viendo el CBU en la invitación y nos ahorró mil peleas en el grupo.", color: "#FF6B9D" },
    { name: "Julián P.", event: "Despedida en Tigre", text: "El itinerario ayudó a que nadie se pierda. Estaba la hora de la previa, la hora del asado y la ubicación de todo.", color: "#4ECDC4" },
    { name: "Sofi R.", event: "Despedida VIP", text: "Armamos una invitación estilo Neón. Le dio una onda súper exclusiva a la noche antes de salir a festejar.", color: "#FF8C42" },
  ];

  return (
    <div className="bg-s-background text-s-on-background font-body-md min-h-screen overflow-x-hidden selection:bg-s-primary-container selection:text-s-on-primary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-s-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(255,174,221,0.1)]">
        <div className="flex items-center justify-between px-s-container-padding-mobile md:px-s-container-padding-desktop h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-s-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
            <span className="font-headline-md text-headline-md font-bold text-s-primary tracking-tight">Te Invito</span>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-s-on-surface hover:text-s-primary transition-colors font-label-caps text-label-caps uppercase" href="#proceso">Cómo Funciona</Link>
            <Link className="text-s-on-surface hover:text-s-primary transition-colors font-label-caps text-label-caps uppercase" href="#super-poderes">Súper Poderes</Link>
            <Link className="text-s-on-surface hover:text-s-primary transition-colors font-label-caps text-label-caps uppercase" href="#pricing">Precios</Link>
          </nav>
          <button className="md:hidden text-s-on-surface hover:text-s-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-s-container-padding-mobile md:px-s-container-padding-desktop pt-24 pb-s-section-gap overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-s-background/80 backdrop-blur-sm z-10"></div>
            <div className="bg-cover bg-center w-full h-full opacity-60" data-alt="A vibrant, high-energy nightclub atmosphere captured from a slightly elevated angle." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnJzh82hzEHio3q8Vu5vGM_a0NkoN5Q_8hsODD7DcNaDPhdbmqLC5YjtEa1e60S5yfZc26ETXbXBrm70LB7fbQAp78apX_ea_YH4VieOK2IB3wQS371qFzy5OHfgfpl0lWyvt-nd086TXXdNoctgvhYd4VccG-Kyy8hAE7OaMHiC9VanONzveG4MESAImdVd8bROZGkLvR_1XI0QXPUEsOP-iNaroh2kZC2oi8z6z8YOyC-72Ex0sGPA')" }}></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
            <Reveal y={20} delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-s-primary/30 bg-s-primary/10 backdrop-blur-md">
                <span className="material-symbols-outlined text-s-primary text-sm">local_fire_department</span>
                <span className="font-label-caps text-label-caps text-s-primary tracking-widest uppercase">Especial Despedidas</span>
              </div>
            </Reveal>
            <Reveal y={20} delay={0.2}>
              <h1 className="font-display-lg text-display-lg md:text-[72px] md:leading-[80px] font-extrabold text-white text-glow-primary tracking-tighter">
                la mejor noche
              </h1>
            </Reveal>
            <Reveal y={20} delay={0.3}>
              <p className="font-body-lg text-body-lg text-s-on-surface-variant max-w-2xl mx-auto">
                Organiza la despedida perfecta sin dolores de cabeza. La invitación digital definitiva para juntar plata, compartir el itinerario y subir fotos en vivo.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.4}>
              <Link className="group relative inline-flex items-center justify-center px-8 py-4 bg-s-primary text-s-on-primary font-label-caps text-label-caps uppercase rounded-lg shadow-[0_0_30px_rgba(255,174,221,0.4)] hover:shadow-[0_0_50px_rgba(255,174,221,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden" href="#pricing">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2 font-bold tracking-wider">
                  Ver Demo en Vivo
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Glow Divider */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-s-primary/50 to-transparent shadow-[0_0_10px_rgba(255,174,221,0.5)]"></div>

        {/* Process Section */}
        <section className="py-24 px-s-container-padding-mobile md:px-s-container-padding-desktop max-w-7xl mx-auto" id="proceso">
          <Reveal className="text-center mb-16">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4 uppercase">Organizarla nunca fue tan fácil</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-s-gutter" stagger={0.15}>
            {/* Step 1 */}
            <StaggerItem className="bg-s-surface-container-high rounded-xl p-8 border border-white/5 relative overflow-hidden group hover:border-s-primary/30 transition-colors">
              <div className="absolute -right-4 -top-4 text-9xl font-display-lg text-s-surface-variant/30 font-black z-0 group-hover:text-s-primary/10 transition-colors">01</div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-s-primary/20 flex items-center justify-center border border-s-primary/50 text-s-primary mb-4 shadow-[0_0_15px_rgba(255,174,221,0.2)]">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white">Adquiere la Plantilla</h3>
                <p className="font-body-md text-body-md text-s-on-surface-variant">Elige nuestro diseño exclusivo 'Electric Social', realiza el pago y envíanos los detalles por WhatsApp.</p>
              </div>
            </StaggerItem>
            {/* Step 2 */}
            <StaggerItem className="bg-s-surface-container-high rounded-xl p-8 border border-white/5 relative overflow-hidden group hover:border-s-tertiary/30 transition-colors">
              <div className="absolute -right-4 -top-4 text-9xl font-display-lg text-s-surface-variant/30 font-black z-0 group-hover:text-s-tertiary/10 transition-colors">02</div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-s-tertiary/20 flex items-center justify-center border border-s-tertiary/50 text-s-tertiary mb-4 shadow-[0_0_15px_rgba(0,218,243,0.2)]">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white">Preparamos tu Enlace</h3>
                <p className="font-body-md text-body-md text-s-on-surface-variant">Configuramos el CBU, el itinerario detallado de la velada y el formulario RSVP para tus invitados.</p>
              </div>
            </StaggerItem>
            {/* Step 3 */}
            <StaggerItem className="bg-s-surface-container-high rounded-xl p-8 border border-white/5 relative overflow-hidden group hover:border-s-secondary-container/50 transition-colors">
              <div className="absolute -right-4 -top-4 text-9xl font-display-lg text-s-surface-variant/30 font-black z-0 group-hover:text-s-secondary-container/20 transition-colors">03</div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-s-secondary-container/20 flex items-center justify-center border border-s-secondary-container/50 text-s-secondary-fixed mb-4 shadow-[0_0_15px_rgba(112,0,255,0.2)]">
                  <span className="material-symbols-outlined">send</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white">Compártelo</h3>
                <p className="font-body-md text-body-md text-s-on-surface-variant">Envía el enlace al grupo. Todos podrán transferir, confirmar asistencia y conocer el cronograma al instante.</p>
              </div>
            </StaggerItem>
          </Stagger>
        </section>

        {/* Features Section (Bento Grid) */}
        <section className="py-24 px-s-container-padding-mobile md:px-s-container-padding-desktop bg-s-surface-container-lowest" id="super-poderes">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4 uppercase">Características Exclusivas</h2>
              <p className="font-body-lg text-body-lg text-s-on-surface-variant">Todo lo necesario para una celebración legendaria e impecable.</p>
            </Reveal>
            <Stagger className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-s-gutter" stagger={0.1}>
              {/* Feature 1: Fondo Común (Large) */}
              <StaggerItem className="md:col-span-2 md:row-span-1 bg-s-surface-container-high rounded-xl p-8 border border-white/5 neon-border flex flex-col justify-end relative overflow-hidden min-h-[250px] hover:scale-[1.02] transition-transform">
                <div className="absolute right-0 top-0 w-32 h-32 bg-s-primary/20 blur-[50px]"></div>
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-4xl text-s-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  <h3 className="font-headline-md text-headline-md text-white mb-2 uppercase">Fondo Común</h3>
                  <p className="font-body-md text-body-md text-s-on-surface-variant">Visualiza CBU/Alias para gestionar los aportes de manera elegante y eficiente. Sin complicaciones.</p>
                </div>
              </StaggerItem>
              {/* Feature 2: Itinerario */}
              <StaggerItem className="md:col-span-1 md:row-span-1 bg-s-surface-container-high rounded-xl p-6 border border-white/5 hover:bg-s-surface-bright hover:scale-[1.02] transition-all">
                <span className="material-symbols-outlined text-3xl text-s-tertiary mb-4">calendar_month</span>
                <h3 className="font-headline-md text-headline-md text-white text-lg mb-2 uppercase">Itinerario</h3>
                <p className="font-body-md text-body-md text-s-on-surface-variant text-sm">Cronograma detallado de cada momento de la celebración.</p>
              </StaggerItem>
              {/* Feature 3: RSVP */}
              <StaggerItem className="md:col-span-1 md:row-span-1 bg-s-surface-container-high rounded-xl p-6 border border-white/5 hover:bg-s-surface-bright hover:scale-[1.02] transition-all">
                <span className="material-symbols-outlined text-3xl text-s-secondary-fixed mb-4">fact_check</span>
                <h3 className="font-headline-md text-headline-md text-white text-lg mb-2 uppercase">RSVP Ampliado</h3>
                <p className="font-body-md text-body-md text-s-on-surface-variant text-sm">Gestión sofisticada de dietas, alergias y preferencias de los invitados.</p>
              </StaggerItem>
              {/* Feature 4: Party Cam (Tall) */}
              <StaggerItem className="md:col-span-1 md:row-span-1 bg-s-surface-container-high rounded-xl p-6 border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4oQjmmf6vwVzCoO00gKDBYWtFo7IkOuw-uaE2kDCPqYn_Zr2DxWvYmFO2u6GWn6aRvDIWboQwYAYXzDbmdmnChjZIOWPQx0Ef3VSmt9dlDVMaZcB32RHxxHQLha20WRaNnaJxLPBgB4NjoD2Ng8abWHfN3pSawIWKGqEvHrIuhBB5s6bMNeHrdwalsKbenBFFMs7H8jdOLrbTeY0dK3f1eSztkKXuDtStY3Sfc8UyydUCGumBDm42Kg')" }}></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <span className="material-symbols-outlined text-3xl text-white mb-4">photo_camera</span>
                  <h3 className="font-headline-md text-headline-md text-white text-lg mb-2 uppercase">Galería en Vivo</h3>
                  <p className="font-body-md text-body-md text-s-on-surface-variant text-sm">Muro interactivo para compartir instantáneas del evento en tiempo real.</p>
                </div>
              </StaggerItem>
              {/* Feature 5: Party Chat */}
              <StaggerItem className="md:col-span-1 md:row-span-1 bg-s-surface-container-high rounded-xl p-6 border border-white/5 hover:bg-s-surface-bright hover:scale-[1.02] transition-all">
                <span className="material-symbols-outlined text-3xl text-s-primary mb-4">forum</span>
                <h3 className="font-headline-md text-headline-md text-white text-lg mb-2 uppercase">Chat Privado</h3>
                <p className="font-body-md text-body-md text-s-on-surface-variant text-sm">Espacio de comunicación exclusivo para los asistentes.</p>
              </StaggerItem>
              {/* Feature 6 & 7: Map & Music (Combined Wide) */}
              <StaggerItem className="md:col-span-2 md:row-span-1 flex flex-col sm:flex-row gap-s-gutter">
                <div className="flex-1 bg-s-surface-container-high rounded-xl p-6 border border-white/5 hover:bg-s-surface-bright hover:scale-[1.02] transition-all">
                  <span className="material-symbols-outlined text-3xl text-s-tertiary mb-4">location_on</span>
                  <h3 className="font-headline-md text-headline-md text-white text-lg mb-2 uppercase">Ubicación</h3>
                  <p className="font-body-md text-body-md text-s-on-surface-variant text-sm">Coordenadas exactas del lugar del evento vía Google Maps.</p>
                </div>
                <div className="flex-1 bg-s-surface-container-high rounded-xl p-6 border border-white/5 hover:bg-s-surface-bright hover:scale-[1.02] transition-all">
                  <span className="material-symbols-outlined text-3xl text-s-secondary-fixed mb-4">music_note</span>
                  <h3 className="font-headline-md text-headline-md text-white text-lg mb-2 uppercase">Banda Sonora</h3>
                  <p className="font-body-md text-body-md text-s-on-surface-variant text-sm">La música que define el estilo de la velada de fondo.</p>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ========== PLANES ========== */}
        <section id="pricing" className="py-24 px-s-container-padding-mobile md:px-s-container-padding-desktop relative border-t border-white/5">
          <div className="max-w-6xl mx-auto relative z-10">
            <Reveal className="text-center mb-16">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4">
                Elige tu Plan
              </h2>
              <p className="font-body-lg text-body-lg text-s-on-surface-variant max-w-2xl mx-auto">
                Se paga una sola vez y la invitación queda activa para siempre.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto mb-20">
              {/* Standard */}
              <div className="bg-s-surface-container-high border border-white/10 rounded-2xl p-10 text-center hover:border-s-tertiary/50 transition-all duration-500 flex flex-col shadow-xl">
                <h3 className="font-headline-md text-headline-md uppercase tracking-widest mb-4 text-s-on-surface-variant">Despedida Estándar</h3>
                <p className="font-display-lg text-display-lg mb-3 text-white">$25.000</p>
                <p className="font-label-caps text-label-caps text-s-tertiary mb-8 uppercase tracking-widest">Pago único</p>
                <ul className="text-left font-body-md text-body-md space-y-4 mb-10 flex-1 text-s-on-surface-variant">
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-tertiary">check_circle</span> Fondo Común (Alias/CBU)</li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-tertiary">check_circle</span> Itinerario de la noche</li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-tertiary">check_circle</span> RSVP simple por WhatsApp</li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-tertiary">check_circle</span> Diseño temático "Neón"</li>
                </ul>
                <div className="flex flex-col gap-4 mt-auto">
                  <button type="button" onClick={() => handleMercadoPagoCheckout("DESPEDIDA_STD")} disabled={isProcessingPayment === "DESPEDIDA_STD"} className="w-full py-4 bg-white/10 text-white font-label-caps text-label-caps uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 border border-white/10">
                    {isProcessingPayment === "DESPEDIDA_STD" ? "Procesando..." : "Lo quiero Estándar"}
                  </button>
                  <p className="font-label-caps text-[10px] text-s-on-surface-variant uppercase tracking-wide">Acceso inmediato. Creador web.</p>
                </div>
              </div>

              {/* Premium */}
              <div className="bg-s-surface-container-high border border-s-primary rounded-2xl p-10 text-center neon-border hover:shadow-[0_0_30px_rgba(255,174,221,0.3)] transition-all duration-500 flex flex-col relative z-10 transform lg:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-s-primary text-s-on-primary font-label-caps text-label-caps px-6 py-2 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
                  Recomendado
                </div>
                <h3 className="font-headline-md text-headline-md uppercase tracking-widest mb-4 text-s-primary">Despedida PRO</h3>
                <p className="font-display-lg text-display-lg mb-3 text-white">$45.000</p>
                <p className="font-label-caps text-label-caps text-s-primary mb-8 uppercase tracking-widest">Pago único</p>
                <ul className="text-left font-body-md text-body-md space-y-4 mb-10 flex-1 text-white">
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-primary">star</span> <strong>Todo lo del plan Estándar</strong></li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-primary">check_circle</span> <strong>RSVP Avanzado</strong> (Dietas/Talles)</li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-primary">check_circle</span> <strong>Party Chat</strong> (Privado)</li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-primary">check_circle</span> <strong>Party Cam</strong> (Muro fotos)</li>
                  <li className="flex gap-4 items-center"><span className="material-symbols-outlined text-s-primary">check_circle</span> Soporte VIP por WhatsApp</li>
                </ul>
                <div className="flex flex-col gap-4 mt-auto">
                  <button type="button" onClick={() => handleMercadoPagoCheckout("DESPEDIDA_PRO")} disabled={isProcessingPayment === "DESPEDIDA_PRO"} className="w-full py-4 bg-s-primary text-s-on-primary font-label-caps text-label-caps uppercase rounded-lg hover:scale-[1.02] transition-transform shadow-[0_5px_15px_rgba(255,174,221,0.4)] disabled:opacity-50 tracking-widest">
                    {isProcessingPayment === "DESPEDIDA_PRO" ? "Procesando..." : "Lo quiero PRO"}
                  </button>
                  <p className="font-label-caps text-[10px] text-s-primary uppercase tracking-wide">Acceso inmediato. Creador web.</p>
                </div>
              </div>
            </div>

            {/* Comparador Acordeon */}
            <div className="max-w-4xl mx-auto mt-12">
              <button 
                onClick={() => setShowCompare(!showCompare)}
                className="w-full py-5 px-8 bg-s-surface-container-high hover:bg-s-surface-bright rounded-xl flex items-center justify-between font-headline-md text-xl transition-colors border border-white/5"
              >
                ¿Qué incluye exactamente cada plan?
                <div className={`transition-transform duration-300 ${showCompare ? "rotate-180 text-s-primary" : "text-s-on-surface-variant"}`}>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </button>
              <AnimatePresence>
                {showCompare && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 mt-4 bg-s-surface-container-lowest rounded-xl border border-white/5 text-base text-s-on-surface-variant shadow-2xl">
                      <div className="grid grid-cols-3 font-bold text-white border-b border-white/10 pb-4 mb-4 text-lg">
                        <div>Característica</div>
                        <div className="text-center text-s-tertiary">Estándar</div>
                        <div className="text-center text-s-primary">PRO</div>
                      </div>
                      {[
                        { name: "CBU y Fondo Común", std: true, pro: true },
                        { name: "Itinerario", std: true, pro: true },
                        { name: "Música de fondo", std: true, pro: true },
                        { name: "Google Maps", std: true, pro: true },
                        { name: "RSVP Simple (Si/No)", std: true, pro: true },
                        { name: "RSVP Avanzado (Alergias)", std: false, pro: true },
                        { name: "Party Cam (Muro interactivo)", std: false, pro: true },
                        { name: "Party Chat privado", std: false, pro: true },
                      ].map((item, i) => (
                        <div key={i} className="grid grid-cols-3 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-2">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-center text-xl">{item.std ? "✅" : <span className="opacity-30">❌</span>}</div>
                          <div className="text-center text-xl">{item.pro ? "✅" : <span className="opacity-30">❌</span>}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIOS ========== */}
        <section className="py-24 px-s-container-padding-mobile md:px-s-container-padding-desktop bg-s-surface-container-lowest border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4">Lo que dicen los <span className="text-glow-primary text-s-primary">Organizadores</span></h2>
            </Reveal>

            <Stagger className="grid md:grid-cols-3 gap-s-gutter" stagger={0.15}>
              {testimonials.map((t) => (
                <StaggerItem key={t.name} className="bg-s-surface-container-high border border-white/5 p-8 rounded-xl text-left hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                  <div className="flex gap-1 text-s-primary text-xl mb-6">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <p className="font-body-md text-body-md text-s-on-surface-variant leading-relaxed mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center font-headline-md text-white rounded-full shadow-lg" style={{ background: t.color }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-headline-md text-lg text-white">{t.name}</p>
                      <p className="font-label-caps text-label-caps text-s-on-surface-variant uppercase tracking-wider mt-1">{t.event}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-s-surface-container-lowest border-t border-white/5 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-s-base px-s-container-padding-mobile md:px-s-container-padding-desktop py-s-base w-full max-w-7xl mx-auto min-h-[80px]">
          <div className="font-headline-md text-headline-md text-s-primary font-bold">
            Te Invito 🔥
          </div>
          <div className="text-s-on-surface-variant font-label-caps text-label-caps">
            © 2026 Te Invito. Organiza tu celebración perfecta.
          </div>
          <nav className="flex gap-4">
            <Link className="text-s-on-surface-variant hover:text-s-primary transition-colors font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Privacidad</Link>
            <Link className="text-s-on-surface-variant hover:text-s-primary transition-colors font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Términos</Link>
            <Link className="text-s-on-surface-variant hover:text-s-primary transition-colors font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Soporte</Link>
            <Link className="text-s-on-surface-variant hover:text-s-primary transition-colors font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Instagram</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
