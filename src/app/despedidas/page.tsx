"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Import dynamic to avoid SSR issues with Three.js
const DiscoBall3D = dynamic(() => import("@/components/DiscoBall3D"), { ssr: false });

export default function DespedidasLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [customName, setCustomName] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState("");

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

  const features = [
    { emoji: "💸", title: "Fondo Común", desc: "Muestra CBU/Alias para juntar plata fácil" },
    { emoji: "📅", title: "Itinerario", desc: "Línea de tiempo de toda la noche/viaje" },
    { emoji: "✅", title: "RSVP Ampliado", desc: "Consultá dietas, alergias y talles" },
    { emoji: "📸", title: "Party Cam", desc: "Muro en vivo para subir las fotos" },
    { emoji: "💬", title: "Party Chat", desc: "Chat privado tipo MSN para la joda" },
    { emoji: "📍", title: "Google Maps", desc: "Ubicación exacta del bar/quinta" },
    { emoji: "🎵", title: "Música", desc: "La canción que los representa de fondo" },
  ];

  const testimonials = [
    { name: "Lucía M.", event: "Viaje a Mendoza", text: "Fue la salvación para organizar la plata. Todos transfirieron viendo el CBU en la invitación y nos ahorró mil peleas en el grupo.", color: "#FF6B9D" },
    { name: "Julián P.", event: "Despedida en Tigre", text: "El itinerario ayudó a que nadie se pierda. Estaba la hora de la previa, la hora del asado y la ubicación de todo.", color: "#4ECDC4" },
    { name: "Sofi R.", event: "Despedida VIP", text: "Armamos una invitación estilo Neón. Le dio una onda súper exclusiva a la noche antes de salir a festejar.", color: "#FF8C42" },
  ];

  return (
    <div className="font-sans bg-black text-white antialiased min-h-screen">
      {/* ========== NAV ========== */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b-[2px] border-white/10 ${
          navScrolled ? "bg-black/95 backdrop-blur-md py-3" : "py-4 bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-block bg-gradient-to-r from-gray-200 to-gray-400 px-4 py-2 border-[2px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] font-bold text-xl text-[#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a] transition-all">
              Te Invito 🪩
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#como-funciona" className="relative group px-2 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all">
                Proceso
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF8C42] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#features" className="relative group px-2 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all">
                Súper Poderes
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF8C42] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#planes" className="relative group px-2 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all">
                Planes
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/" className="relative px-6 py-2.5 text-sm font-bold rounded-full border border-white/20 text-white bg-transparent hover:bg-white/5 hover:border-gray-400 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all overflow-hidden group">
                <span className="relative z-10">Volver al inicio</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden">
        {/* Disco Ball Drop Animation */}
        <div className="absolute inset-0 z-0">
          <DiscoBall3D />
        </div>

        {/* UI Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none mt-[25vh]">
          <Reveal y={20} delay={0.1}>
            <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs sm:text-sm tracking-[0.1em] text-white uppercase font-bold flex items-center gap-2 border border-white/10">
              <span>🪩</span> ESPECIAL DESPEDIDAS
            </div>
          </Reveal>
          
          <Reveal y={20} delay={0.2}>
            <h1 className="font-black text-[12vw] md:text-[8vw] lg:text-[5vw] tracking-tighter mt-8 text-white uppercase">
              la mejor noche
            </h1>
          </Reveal>

          <Reveal y={20} delay={0.3} className="pointer-events-auto mt-8">
            <Link href="/preview?url=/demo-despedida&customName=Julieta" target="_blank" className="relative group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-black rounded-full overflow-hidden border border-gray-500/50 hover:border-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02]">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-600 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
              <span className="relative z-10 flex items-center gap-2">Ver Demo en Vivo <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ========== COMO FUNCIONA ========== */}
      <section id="como-funciona" className="py-24 px-5 bg-white/5 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Organizarla nunca fue tan <span className="text-[#4ECDC4]">fácil</span>
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" stagger={0.1}>
            <StaggerItem className="bg-[#1a1a24] border border-white/10 p-8 hover:border-white/30 transition-all rounded-2xl">
              <div className="text-5xl font-bold text-[#FF6B9D] mb-3 opacity-80">01</div>
              <h3 className="text-xl font-bold mb-2">Comprá la plantilla</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Elegís el diseño "Neón" o "Party", hacés el pago y nos mandás los datos por WhatsApp.</p>
            </StaggerItem>
            <StaggerItem className="bg-[#1a1a24] border border-white/10 p-8 hover:border-white/30 transition-all rounded-2xl">
              <div className="text-5xl font-bold text-[#4ECDC4] mb-3 opacity-80">02</div>
              <h3 className="text-xl font-bold mb-2">Armamos el Link</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Cargamos el CBU, el itinerario (previa, cena, boliche) y las preguntas para los invitados.</p>
            </StaggerItem>
            <StaggerItem className="bg-[#1a1a24] border border-white/10 p-8 hover:border-white/30 transition-all rounded-2xl">
              <div className="text-5xl font-bold text-[#FF8C42] mb-3 opacity-80">03</div>
              <h3 className="text-xl font-bold mb-2">Pasalo al Grupo</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Mandás el link al grupo de WhatsApp. Todos transfieren, confirman y saben a qué hora es todo.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Súper Poderes de la <span className="text-[#FF6B9D]">Plantilla</span>
            </h2>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.05}>
            {features.map((feat) => (
              <StaggerItem key={feat.title} className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all rounded-2xl text-left">
                <span className="text-3xl mb-4 block bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl">{feat.emoji}</span>
                <h3 className="font-bold text-lg mb-2 text-white">{feat.title}</h3>
                <p className="text-sm text-gray-400">{feat.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========== PLANES ========== */}
      <section id="planes" className="py-24 px-5 bg-white/5 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Elige el <span className="text-[#4ECDC4]">Plan</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg">Se paga una sola vez y lo usan todos los invitados.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Standard */}
            <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 transition-all flex flex-col">
              <h3 className="text-xl font-bold uppercase mb-3 text-white">Despedida Estándar</h3>
              <p className="text-4xl font-bold mb-1">$25.000</p>
              <p className="text-sm text-gray-500 mb-6">Un solo pago</p>
              <ul className="text-left text-sm space-y-3 mb-8 flex-1 text-gray-300">
                <li className="flex gap-2 items-start pb-2"><span className="text-[#4ECDC4] font-bold">✓</span> Fondo Común (Alias/CBU)</li>
                <li className="flex gap-2 items-start pb-2"><span className="text-[#4ECDC4] font-bold">✓</span> Itinerario de la noche</li>
                <li className="flex gap-2 items-start pb-2"><span className="text-[#4ECDC4] font-bold">✓</span> RSVP simple por WhatsApp</li>
                <li className="flex gap-2 items-start"><span className="text-[#4ECDC4] font-bold">✓</span> Diseño temático "Neón"</li>
              </ul>
              <div className="flex flex-col gap-2 mt-auto">
                <button type="button" onClick={() => handleMercadoPagoCheckout("DESPEDIDA_STD")} disabled={isProcessingPayment === "DESPEDIDA_STD"} className="w-full py-4 bg-white/10 text-white font-bold text-sm uppercase rounded-xl hover:bg-white/20 transition-all disabled:opacity-50">
                  {isProcessingPayment === "DESPEDIDA_STD" ? "Procesando..." : "Lo quiero"}
                </button>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-[#1a1a24] border border-[#FF6B9D] rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(255,107,157,0.1)] hover:shadow-[0_0_40px_rgba(255,107,157,0.2)] transition-all flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF8C42] to-[#FF6B9D] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                La Mejor Opción
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 text-white">Despedida PRO</h3>
              <p className="text-4xl font-bold mb-1">$45.000</p>
              <p className="text-sm text-gray-500 mb-6">Un solo pago</p>
              <ul className="text-left text-sm space-y-3 mb-8 flex-1 text-gray-300">
                <li className="flex gap-2 items-start pb-2"><span className="text-[#FF6B9D] font-bold">✓</span> Todo lo del plan Estándar</li>
                <li className="flex gap-2 items-start pb-2"><span className="text-[#FF6B9D] font-bold">✓</span> RSVP Avanzado (Dietas y Talles)</li>
                <li className="flex gap-2 items-start pb-2"><span className="text-[#FF6B9D] font-bold">✓</span> Party Chat (Privado para el grupo)</li>
                <li className="flex gap-2 items-start pb-2"><span className="text-[#FF6B9D] font-bold">✓</span> Módulo Party Cam (Muro fotos en vivo)</li>
                <li className="flex gap-2 items-start"><span className="text-[#FF6B9D] font-bold">✓</span> Muro de firmas y anécdotas</li>
              </ul>
              <div className="flex flex-col gap-2 mt-auto">
                <button type="button" onClick={() => handleMercadoPagoCheckout("DESPEDIDA_PRO")} disabled={isProcessingPayment === "DESPEDIDA_PRO"} className="w-full py-4 bg-gradient-to-r from-[#FF8C42] to-[#FF6B9D] text-white font-bold text-sm uppercase rounded-xl hover:opacity-90 transition-all disabled:opacity-50">
                  {isProcessingPayment === "DESPEDIDA_PRO" ? "Procesando..." : "Lo quiero"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIOS ========== */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">Lo que dicen los <span className="text-[#FF8C42]">Organizadores</span></h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6" stagger={0.1}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="bg-white/5 border border-white/10 p-7 rounded-2xl text-left">
                <div className="flex gap-1 text-[#FF8C42] text-lg mb-4">★★★★★</div>
                <p className="text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-white rounded-full" style={{ background: t.color }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.event}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-10 text-center border-t border-white/10 bg-[#0f0f13]">
        <Link href="/" className="font-bold text-xl text-white mb-2 block">Te Invito 🔥</Link>
        <p className="text-gray-500 text-sm">Organiza la despedida perfecta. © 2026</p>
      </footer>
    </div>
  );
}
