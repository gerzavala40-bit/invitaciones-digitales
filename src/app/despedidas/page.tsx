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
        alert("En este momento los pagos automáticos están en mantenimiento. Por favor elegí la opción de Pagar por Transferencia (WhatsApp).");
      }
    } catch (e) {
      alert("Error de conexión al iniciar pago.");
    } finally {
      setIsProcessingPayment("");
    }
  };

  const testimonials = [
    { name: "Lucía M.", event: "Viaje a Mendoza", text: "Fue la salvación para organizar la plata. Todos transfirieron viendo el CBU en la invitación y nos ahorró mil peleas en el grupo.", color: "#c0c0c0" },
    { name: "Julián P.", event: "Despedida en Tigre", text: "El itinerario ayudó a que nadie se pierda. Estaba la hora de la previa, la hora del asado y la ubicación de todo.", color: "#a0a0a0" },
    { name: "Sofi R.", event: "Despedida VIP", text: "Armamos una invitación con este estilo brutal. Le dio una onda súper exclusiva a la noche antes de salir a festejar.", color: "#ffffff" },
  ];

  return (
    <div className="bg-s-background text-s-on-background font-body-md min-h-screen overflow-x-hidden selection:bg-s-surface-variant selection:text-s-primary">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-s-container-padding-mobile md:px-s-container-padding-desktop py-4 chrome-glass">
        <div className="flex items-center gap-s-base">
          <span className="material-symbols-outlined text-s-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-display-xl text-headline-lg font-extrabold text-s-primary tracking-tighter uppercase">TE INVITO</h1>
        </div>
        <div className="hidden md:flex gap-4">
          <Link href="#proceso" className="font-label-caps text-label-caps text-s-secondary hover:text-s-primary px-4 py-3 uppercase transition-colors">Cómo Funciona</Link>
          <Link href="#super-poderes" className="font-label-caps text-label-caps text-s-secondary hover:text-s-primary px-4 py-3 uppercase transition-colors">Características</Link>
          <Link href="#pricing" className="font-label-caps text-label-caps bg-s-primary text-s-on-primary px-6 py-3 hover:bg-s-secondary transition-colors duration-300 uppercase">Planes</Link>
        </div>
        <button className="md:hidden text-s-on-surface hover:text-s-silver transition-colors active:scale-95">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </header>

      <main className="pt-[100px]">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center px-s-container-padding-mobile md:px-s-container-padding-desktop py-16 lg:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-s-gutter relative z-10">
            <Reveal y={20} delay={0.1} className="col-span-1 lg:col-span-9 lg:col-start-1 flex flex-col justify-center">
              <span className="font-label-caps text-label-caps text-s-secondary tracking-widest uppercase mb-4 border border-s-outline-variant rounded-full px-4 py-1 w-fit">Especial Despedidas</span>
              <h2 className="font-display-xl text-4xl md:text-display-xl text-s-primary mb-8 leading-none silver-gradient-text uppercase">La Mejor<br/>Noche</h2>
              <p className="font-body-md text-s-secondary max-w-2xl mb-12 text-lg">
                Te Invito redefine la organización de tu despedida con un estilo premium. Combinamos un diseño increíble con herramientas prácticas para que invitar, cobrar y organizar sea mucho más simple y elegante.
              </p>>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="#pricing" className="btn-chrome font-label-caps text-label-caps px-10 py-5 w-fit uppercase font-bold text-center">Elegir Plan</Link>
                <Link href="#proceso" className="chrome-border font-label-caps text-label-caps px-10 py-5 w-fit text-s-primary uppercase hover:bg-s-surface-variant transition-colors text-center">Ver Demo</Link>
              </div>
            </Reveal>
          </div>
          {/* Abstract background element */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-s-surface-variant/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </section>

        {/* Steps Section (01-03) */}
        <section className="py-32 px-s-container-padding-mobile md:px-s-container-padding-desktop border-t border-s-outline-variant" id="proceso">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-24 flex items-center gap-4">
              <span className="font-label-caps text-s-secondary uppercase tracking-widest">Cómo Funciona</span>
              <div className="h-[1px] bg-s-outline-variant flex-grow"></div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-s-gutter">
              {/* Step 01 */}
              <Reveal y={30} delay={0.1} className="relative group cursor-pointer">
                <div className="text-display-xl font-display-xl text-s-surface-variant group-hover:text-s-secondary transition-colors duration-500 absolute -top-16 -left-8 -z-10 opacity-50">01</div>
                <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-6 uppercase">Elegí tu Plan</h3>
                <p className="font-body-md text-s-secondary">
                  Seleccioná el plan que mejor se adapte a la onda de tu grupo, realizá el pago y envianos los datos de tu evento. Nosotros nos encargamos de todo el armado.
                </p>
                <div className="mt-8 w-12 h-[1px] bg-s-primary group-hover:w-full transition-all duration-500"></div>
              </Reveal>
              
              {/* Step 02 */}
              <Reveal y={30} delay={0.2} className="relative group cursor-pointer mt-12 md:mt-24">
                <div className="text-display-xl font-display-xl text-s-surface-variant group-hover:text-s-secondary transition-colors duration-500 absolute -top-16 -left-8 -z-10 opacity-50">02</div>
                <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-6 uppercase">Personalizamos</h3>
                <p className="font-body-md text-s-secondary">
                  Agregamos tu CBU, el itinerario de la noche, las ubicaciones y habilitamos todas las funciones para que tus amigos tengan todo listo en su celular.
                </p>
                <div className="mt-8 w-12 h-[1px] bg-s-primary group-hover:w-full transition-all duration-500"></div>
              </Reveal>
              
              {/* Step 03 */}
              <Reveal y={30} delay={0.3} className="relative group cursor-pointer mt-24 md:mt-48">
                <div className="text-display-xl font-display-xl text-s-surface-variant group-hover:text-s-secondary transition-colors duration-500 absolute -top-16 -left-8 -z-10 opacity-50">03</div>
                <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-6 uppercase">Compartí</h3>
                <p className="font-body-md text-s-secondary">
                  Enviá el enlace por WhatsApp y empezá a recibir confirmaciones de asistencia, comprobantes de pago y fotos de tus invitados de forma inmediata.
                </p>
                <div className="mt-8 w-12 h-[1px] bg-s-primary group-hover:w-full transition-all duration-500"></div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Feature Cards (Bento Grid) */}
        <section className="py-32 px-s-container-padding-mobile md:px-s-container-padding-desktop bg-s-surface-container-lowest" id="super-poderes">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-24">
              <h2 className="font-display-xl text-headline-lg md:text-display-xl text-s-primary silver-gradient-text uppercase text-center leading-none">Características<br/>Exclusivas</h2>
            </Reveal>
            
            <Stagger className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto lg:h-[800px]" stagger={0.1}>
              {/* Large Feature */}
              <StaggerItem className="md:col-span-2 md:row-span-2 chrome-border bg-s-surface p-12 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-s-surface-variant/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-4xl text-s-primary mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-4 leading-tight uppercase">Fondo Común<br/>Integrado</h3>
                </div>
                <div className="relative z-10 mt-12 md:mt-0">
                  <p className="font-body-md text-s-secondary mb-8 max-w-sm">
                    Recaudá la plata de la noche sin tener que perseguir a nadie. Agregamos tu CBU o Alias directo en la invitación para que organizar los pagos sea súper fácil.
                  </p>
                  <span className="font-label-caps text-s-primary uppercase inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                    Olvidate de las deudas <span className="material-symbols-outlined">arrow_right_alt</span>
                  </span>
                </div>
              </StaggerItem>
              
              {/* Medium Feature 1 */}
              <StaggerItem className="md:col-span-2 md:row-span-1 chrome-border bg-s-surface p-8 flex flex-col justify-between group">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-lg text-2xl md:text-3xl text-s-primary max-w-[200px] uppercase">Itinerario<br/>de la Noche</h3>
                  <span className="material-symbols-outlined text-3xl text-s-primary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                </div>
                <p className="font-body-md text-s-secondary mt-12">
                  Marcá las horas de la previa, la comida y el boliche con accesos directos y ubicaciones exactas en Google Maps.
                </p>
              </StaggerItem>
              
              {/* Small Feature 1 */}
              <StaggerItem className="md:col-span-1 md:row-span-1 chrome-border bg-s-surface p-8 flex flex-col justify-between group hover:bg-s-surface-variant transition-colors">
                <span className="material-symbols-outlined text-3xl text-s-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                <div>
                  <h3 className="font-headline-lg text-xl text-s-primary mb-2 uppercase">Asistencia RSVP</h3>
                  <p className="font-body-md text-s-secondary text-sm">Controlá quiénes asisten y sus dietas especiales en tiempo real.</p>
                </div>
              </StaggerItem>
              
              {/* Small Feature 2 */}
              <StaggerItem className="md:col-span-1 md:row-span-1 chrome-border bg-s-surface p-8 flex flex-col justify-between group hover:bg-s-surface-variant transition-colors">
                <span className="material-symbols-outlined text-3xl text-s-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                <div>
                  <h3 className="font-headline-lg text-xl text-s-primary mb-2 uppercase">Muro de Fotos</h3>
                  <p className="font-body-md text-s-secondary text-sm">Tus amigos pueden subir fotos durante la noche a una galería común.</p>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ========== PLANES ========== */}
        <section id="pricing" className="py-32 px-s-container-padding-mobile md:px-s-container-padding-desktop border-t border-s-outline-variant relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <Reveal className="mb-24 flex items-center gap-4">
              <span className="font-label-caps text-s-secondary uppercase tracking-widest">Nuestros Planes</span>
              <div className="h-[1px] bg-s-outline-variant flex-grow"></div>
            </Reveal>
            
            <Reveal className="mb-16">
              <h2 className="font-display-xl text-headline-lg md:text-display-xl text-s-primary mb-4 uppercase leading-none silver-gradient-text">
                Elegí tu<br/>Plan
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto mb-20">
              {/* Standard */}
              <div className="chrome-border bg-s-surface p-10 flex flex-col group hover:bg-s-surface-variant transition-colors">
                <h3 className="font-headline-md text-2xl uppercase tracking-widest mb-4 text-s-secondary">Despedida Estándar</h3>
                <p className="font-display-lg text-display-lg mb-3 text-s-primary">$25.000</p>
                <p className="font-label-caps text-label-caps text-s-outline mb-8 uppercase tracking-widest">Pago único vitalicio</p>
                <ul className="text-left font-body-md text-body-md space-y-4 mb-10 flex-1 text-s-secondary">
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">stop</span> Fondo Común (Alias/CBU)</li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">stop</span> Itinerario de la noche</li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">stop</span> RSVP simple</li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">stop</span> Diseño brutalista base</li>
                </ul>
                <button type="button" onClick={() => handleMercadoPagoCheckout("DESPEDIDA_STD")} disabled={isProcessingPayment === "DESPEDIDA_STD"} className="w-full py-4 chrome-border bg-s-background text-s-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-s-surface-bright transition-all disabled:opacity-50">
                  {isProcessingPayment === "DESPEDIDA_STD" ? "Autorizando..." : "Iniciar Estándar"}
                </button>
              </div>

              {/* Premium */}
              <div className="chrome-border bg-s-surface-container-high p-10 flex flex-col relative group">
                <div className="absolute top-0 right-0 bg-s-primary text-s-on-primary font-label-caps text-[10px] px-4 py-1 uppercase tracking-widest font-bold">
                  Recomendado
                </div>
                <h3 className="font-headline-md text-2xl uppercase tracking-widest mb-4 text-s-primary">Despedida PRO</h3>
                <p className="font-display-lg text-display-lg mb-3 text-s-primary">$45.000</p>
                <p className="font-label-caps text-label-caps text-s-secondary mb-8 uppercase tracking-widest">Pago único vitalicio</p>
                <ul className="text-left font-body-md text-body-md space-y-4 mb-10 flex-1 text-s-primary">
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">close</span> <strong>Todo lo del plan Estándar</strong></li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">close</span> <strong>RSVP Avanzado</strong> (Dietas/Talles)</li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">close</span> <strong>Party Chat</strong> (Privado)</li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">close</span> <strong>Party Cam</strong> (Muro fotos)</li>
                  <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-s-primary text-sm mt-1">close</span> Soporte VIP Prioritario</li>
                </ul>
                <button type="button" onClick={() => handleMercadoPagoCheckout("DESPEDIDA_PRO")} disabled={isProcessingPayment === "DESPEDIDA_PRO"} className="btn-chrome w-full py-4 font-label-caps text-label-caps uppercase tracking-widest disabled:opacity-50 font-bold">
                  {isProcessingPayment === "DESPEDIDA_PRO" ? "Autorizando..." : "Iniciar PRO"}
                </button>
              </div>
            </div>
            
            {/* Comparador Acordeon */}
            <div className="max-w-4xl mx-auto mt-12">
              <button 
                onClick={() => setShowCompare(!showCompare)}
                className="w-full py-6 px-8 bg-s-surface chrome-border flex items-center justify-between font-headline-md text-xl transition-colors uppercase"
              >
                Comparar Beneficios
                <div className={`transition-transform duration-300 ${showCompare ? "rotate-180 text-s-primary" : "text-s-secondary"}`}>
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
                    <div className="p-8 mt-4 bg-s-surface-container-low chrome-border text-base text-s-secondary">
                      <div className="grid grid-cols-3 font-label-caps text-s-primary border-b border-s-outline-variant pb-4 mb-4 uppercase tracking-widest">
                        <div>Característica</div>
                        <div className="text-center text-s-secondary">Estándar</div>
                        <div className="text-center text-s-primary">PRO</div>
                      </div>
                      {[
                        { name: "CBU y Fondo Común", std: true, pro: true },
                        { name: "Itinerario", std: true, pro: true },
                        { name: "Música de fondo", std: true, pro: true },
                        { name: "Google Maps", std: true, pro: true },
                        { name: "RSVP Simple", std: true, pro: true },
                        { name: "RSVP Avanzado", std: false, pro: true },
                        { name: "Party Cam", std: false, pro: true },
                        { name: "Party Chat privado", std: false, pro: true },
                      ].map((item, i) => (
                        <div key={i} className="grid grid-cols-3 py-4 border-b border-s-outline-variant/30 last:border-0 hover:bg-s-surface-variant transition-colors px-2 font-body-md">
                          <div className="text-s-primary uppercase text-sm">{item.name}</div>
                          <div className="text-center text-xl">{item.std ? "■" : <span className="opacity-10">□</span>}</div>
                          <div className="text-center text-xl">{item.pro ? "■" : <span className="opacity-10">□</span>}</div>
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
        <section className="py-32 px-s-container-padding-mobile md:px-s-container-padding-desktop bg-s-surface-container-lowest border-t border-s-outline-variant">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-24 flex items-center gap-4">
              <span className="font-label-caps text-s-secondary uppercase tracking-widest">Testimonios</span>
              <div className="h-[1px] bg-s-outline-variant flex-grow"></div>
            </Reveal>

            <Stagger className="grid md:grid-cols-3 gap-8" stagger={0.15}>
              {testimonials.map((t) => (
                <StaggerItem key={t.name} className="bg-s-surface chrome-border p-8 flex flex-col justify-between group hover:bg-s-surface-variant transition-colors">
                  <div>
                    <div className="flex gap-2 text-s-primary mb-8">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>change_history</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>change_history</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>change_history</span>
                    </div>
                    <p className="font-body-md text-s-secondary leading-relaxed mb-8 uppercase text-sm tracking-wide">
                      {t.text}
                    </p>
                  </div>
                  <div className="pt-8 border-t border-s-outline-variant flex items-center justify-between">
                    <div>
                      <p className="font-label-caps text-s-primary tracking-widest uppercase">{t.name}</p>
                      <p className="font-body-md text-s-secondary text-xs mt-1">{t.event}</p>
                    </div>
                    <div className="w-10 h-10 border border-s-primary flex items-center justify-center text-s-primary font-label-caps bg-s-surface-container">
                      {t.name[0]}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-s-container-padding-mobile md:px-s-container-padding-desktop border-t border-s-outline-variant relative overflow-hidden">
          <div className="max-w-container-max mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-display-xl text-headline-lg md:text-display-xl text-s-primary mb-12 uppercase leading-none silver-gradient-text">Empezá a<br/>Festejar</h2>
              <Link href="#pricing" className="btn-chrome font-label-caps text-label-caps px-16 py-6 uppercase text-lg inline-flex items-center gap-4 group">
                Crear Invitación
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </Reveal>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-16 px-s-container-padding-mobile md:px-s-container-padding-desktop flex flex-col md:flex-row justify-between items-center gap-s-base bg-s-surface-container-lowest border-t border-s-outline-variant flat">
        <div className="font-display-xl text-headline-lg font-bold text-s-primary tracking-tighter uppercase">TE INVITO</div>
        <ul className="flex flex-wrap gap-8 font-label-caps text-label-caps text-s-secondary justify-center md:justify-end">
          <li><Link className="hover:text-s-primary transition-colors text-s-on-surface-variant uppercase" href="#">Privacidad</Link></li>
          <li><Link className="hover:text-s-primary transition-colors text-s-on-surface-variant uppercase" href="#">Términos</Link></li>
          <li><Link className="hover:text-s-primary transition-colors text-s-on-surface-variant uppercase" href="#">Soporte</Link></li>
          <li><Link className="hover:text-s-primary transition-colors text-s-on-surface-variant uppercase" href="#">Instagram</Link></li>
        </ul>
        <div className="font-label-caps text-label-caps text-s-secondary opacity-80 hover:opacity-100 uppercase tracking-widest mt-8 md:mt-0 text-center">
          © 2026 TE INVITO. TODOS LOS DERECHOS RESERVADOS.
        </div>
      </footer>
    </div>
  );
}
