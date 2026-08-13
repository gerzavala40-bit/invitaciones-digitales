"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import OnboardingQuiz from "@/components/OnboardingQuiz";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

function PhoneMockup({ title, url, desc, selected, onSelect, onPreview, customName }: { title: string, url: string, desc: string, selected: boolean, onSelect: () => void, onPreview: () => void, customName: string }) {
  return (
    <div className={"relative flex flex-col items-center group cursor-pointer transition-all duration-300 " + (selected ? "scale-100" : "hover:-translate-y-1")} onClick={onPreview}>
      <div className={"neo-phone-frame relative w-[220px] h-[420px] p-[4px] " + (selected ? "!border-[#FF6B9D] !shadow-[6px_6px_0px_#FF6B9D]" : "")}>
        {/* Notch */}
        <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[70px] h-[18px] bg-[#1a1a1a] rounded-b-xl z-20"></div>
        {/* Screen */}
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white">
          <iframe src={`${url}?preview=1${customName ? `&customName=${encodeURIComponent(customName)}` : ""}`} className="w-[375px] h-[812px] border-none pointer-events-none origin-top-left" style={{ transform: "scale(0.56)" }} tabIndex={-1} loading="lazy" />
        </div>
        {/* Selected badge */}
        <div className={"absolute -right-3 -top-3 w-8 h-8 bg-[#FF6B9D] border-[3px] border-[#1a1a1a] text-white flex items-center justify-center text-lg font-bold shadow-[3px_3px_0px_#1a1a1a] transition-opacity " + (selected ? "opacity-100" : "opacity-0")}>&#10003;</div>
      </div>
      <div className="mt-5 text-center w-full max-w-[220px]">
        <h3 className="font-bold text-lg text-[#1a1a1a]">{title}</h3>
        <p className="text-sm text-[#666] mt-1">{desc}</p>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={(e) => { e.stopPropagation(); onPreview(); }} className="flex-1 h-9 text-[12px] font-bold uppercase border-[3px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] hover:bg-[#4ECDC4] transition-all">Ver demo</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onSelect(); }} className="flex-1 h-9 text-[12px] font-bold uppercase border-[3px] border-[#1a1a1a] bg-[#FF6B9D] text-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] transition-all">Quiero este</button>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [customName, setCustomName] = useState("");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMercadoPagoCheckout = async (planId: string) => {
    setIsProcessingPayment(planId);
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, buyerEmail: "cliente@teinvitoapp.com.ar", buyerName: customName || "Cliente Web" }),
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

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 20);
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
    const lugar = (formData.get("lugar") as string) || "-";
    const plan = formData.get("plan") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const notas = (formData.get("notas") as string) || "-";

    let fechaFmt = fecha;
    try {
      const d = new Date(fecha + "T12:00:00");
      fechaFmt = d.toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    } catch (_) {}

    const msg = `Hola! Quiero pedir una invitacion digital \u{1F389}

*Estilo:* ${estilo}
*Evento:* ${evento}
*Nombres:* ${nombres}
*Fecha:* ${fechaFmt}
*Lugar:* ${lugar}
*Plan:* ${plan}
*Mi WhatsApp:* ${whatsapp}
*Notas:* ${notas}

Quedo a la espera para coordinar la sena!`;

    const url = "https://wa.me/5493425299942?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  };

  const demos = [
    { title: "Elegante Oscuro", url: "/demo-boda-elegante-oscuro.html", desc: "Boda", event: "Boda" },
    { title: "Floral Claro", url: "/demo-boda-floral-claro.html", desc: "Boda", event: "Boda" },
    { title: "Minimalista", url: "/demo-cumple-minimalista.html", desc: "Cumpleanos", event: "Cumpleanos" },
    { title: "15 Anos Glam", url: "/demo-15-camila-glam.html", desc: "15 Anos", event: "15 Anos" },
    { title: "Bautismo Tierno", url: "/demo-bautismo-benicio.html", desc: "Bautismo", event: "Bautismo" },
    { title: "Corporativo", url: "/demo-corporativo-gala.html", desc: "Corporativo", event: "Corporativo" },
    { title: "Boda Premium", url: "/demo-boda-premium.html", desc: "Boda", event: "Boda" },
    { title: "Cumple 30 Retro", url: "/demo-cumple-30-retro.html", desc: "Cumpleaños", event: "Cumpleaños" },
    { title: "Baby Shower", url: "/demo-babyshower-malena.html", desc: "Baby Shower", event: "Baby Shower" },
  ];

  const features = [
    { emoji: "\u23F1\uFE0F", title: "Cuenta regresiva", desc: "En vivo desde que abren el link" },
    { emoji: "\uD83D\uDCCD", title: "Mapa interactivo", desc: "Google Maps, un toque y llegan" },
    { emoji: "\u2705", title: "Confirmacion RSVP", desc: "Lista en tiempo real en tu panel" },
    { emoji: "\uD83C\uDFB5", title: "Musica de fondo", desc: "La cancion que elijan al abrir" },
    { emoji: "\uD83D\uDCF8", title: "Galeria de fotos", desc: "Carrusel con sus mejores momentos" },
    { emoji: "\uD83C\uDF81", title: "Seccion regalos", desc: "Alias/CBU con boton copiar" },
    { emoji: "\uD83D\uDC57", title: "Dress code", desc: "Indicaciones de vestimenta" },
    { emoji: "\uD83D\uDCC5", title: "Itinerario", desc: "Linea de tiempo del evento" },
    { emoji: "\uD83D\uDCF2", title: "Envios ilimitados", desc: "Un link, compartilo a todos" },
  ];

  const faqs = [
    { q: "Como es el proceso?", a: "Elegis un estilo de las demos, completas el formulario con los datos de tu evento y nos llega por WhatsApp. Coordinamos la sena (50%), disenamos y en 24 hs habiles te entregamos el link listo para compartir." },
    { q: "Puedo pedir cambios?", a: "Si. Te mandamos un preview antes de la entrega final. Podes pedir ajustes de textos, fotos o detalles. Al ser web, los cambios se ven al instante para todos." },
    { q: "Cuanto demora?", a: "Solo 24 horas desde que nos envias los datos de tu evento y abonas la sena." },
    { q: "Los envios tienen costo extra?", a: "No. Un solo link, envios ilimitados por WhatsApp a todos tus invitados." },
    { q: "Como pago?", a: "Transferencia (30% OFF), MercadoPago o tarjeta en hasta 3 cuotas. Sena del 50% para arrancar." },
    { q: "Mis invitados necesitan una app?", a: "No. Es una pagina web que se abre directo en el celular desde WhatsApp. 100% responsive." },
  ];

  const testimonials = [
    { name: "Valentina R.", event: "Boda", text: "Les mandamos la info y al otro dia ya teniamos todo listo. Nuestros invitados no paraban de decirnos lo linda que era.", color: "#FF6B9D" },
    { name: "Martin G.", event: "Cumpleanos 30", text: "Super simple todo el proceso. Yo no entiendo nada de diseño y me entregaron algo increible sin que me complique.", color: "#4ECDC4" },
    { name: "Carolina S.", event: "15 Anos", text: "Mi hija quedo fascinada con el resultado. No podia creer que fuera una web y no una app. Todos nos preguntaron donde la hicimos.", color: "#FF8C42" },
  ];

  return (
    <div className="font-sans bg-[#FFF9E0] text-[#1a1a1a] antialiased min-h-screen">
      {/* ========== NAV ========== */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b-[3px] border-[#1a1a1a] ${
          navScrolled ? "bg-[#FFF9E0]/95 backdrop-blur-sm py-3" : "py-4 bg-[#FFF9E0]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between">
            <Link href="#" className="inline-block bg-[#FF6B9D] px-4 py-2 border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] font-bold text-xl text-[#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a] transition-all">
              Te Invito ✨
            </Link>
            <div className="hidden md:flex items-center gap-3">
              <Link href="#pasos" className="px-4 py-2 text-sm font-semibold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] hover:bg-[#4ECDC4] transition-all">Proceso</Link>
              <Link href="#estilos" className="px-4 py-2 text-sm font-semibold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] hover:bg-[#4ECDC4] transition-all">Demos</Link>
              <Link href="#party-chat" className="px-4 py-2 text-sm font-semibold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] hover:bg-[#4ECDC4] transition-all">Party Chat</Link>
              <Link href="/despedidas" className="px-4 py-2 text-sm font-bold border-[2px] border-[#1a1a1a] bg-[#FF8C42] text-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] transition-all">🔥 Despedidas</Link>
              <Link href="#planes" className="px-4 py-2 text-sm font-semibold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1a1a1a] hover:bg-[#4ECDC4] transition-all">Planes</Link>
              <Link href="/cliente/login" className="px-4 py-2 text-sm font-bold border-[2px] border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:underline transition-all">Ingresar</Link>
              <Link href="/crear" className="px-4 py-2 text-sm font-bold border-[3px] border-[#1a1a1a] bg-[#1a1a1a] text-[#FFF9E0] shadow-[3px_3px_0px_#FF6B9D] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#FF6B9D] transition-all">Crear Gratis</Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 border-[2px] border-[#1a1a1a] bg-white shadow-[2px_2px_0px_#1a1a1a] active:translate-y-1 active:shadow-none flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined font-bold text-[#1a1a1a]">{isMobileMenuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FFF9E0] border-b-[3px] border-[#1a1a1a] flex flex-col gap-3 p-5 shadow-[0px_4px_0px_#1a1a1a] z-50">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#pasos" className="px-4 py-3 text-base font-bold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] text-center active:translate-y-1 active:shadow-none">Proceso</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#estilos" className="px-4 py-3 text-base font-bold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] text-center active:translate-y-1 active:shadow-none">Demos</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#party-chat" className="px-4 py-3 text-base font-bold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] text-center active:translate-y-1 active:shadow-none">Party Chat</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/despedidas" className="px-4 py-3 text-base font-bold border-[2px] border-[#1a1a1a] bg-[#FF8C42] shadow-[3px_3px_0px_#1a1a1a] text-center active:translate-y-1 active:shadow-none">🔥 Despedidas</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#planes" className="px-4 py-3 text-base font-bold border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] text-center active:translate-y-1 active:shadow-none">Planes</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/crear" className="px-4 py-3 text-base font-bold border-[2px] border-[#1a1a1a] bg-[#1a1a1a] text-[#FFF9E0] shadow-[3px_3px_0px_#FF6B9D] text-center active:translate-y-1 active:shadow-none">Crear Gratis</Link>
          </div>
        )}
      </nav>

      {/* ========== HERO ========== */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-16 px-5 overflow-hidden">
        {/* Floating stickers */}
        <Reveal className="hidden lg:block absolute top-40 left-[8%] bg-[#4ECDC4] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] px-5 py-3 font-bold text-sm -rotate-[8deg] animate-float-slow" y={0}>
          Bodas 💒
        </Reveal>
        <Reveal className="hidden lg:block absolute top-52 right-[10%] bg-[#FF8C42] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] px-5 py-3 font-bold text-sm rotate-[5deg] animate-float-slow" delay={0.2} y={0}>
          15 Anos 👑
        </Reveal>
        <Reveal className="hidden lg:block absolute bottom-32 left-[12%] bg-[#FF6B9D] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] px-5 py-3 font-bold text-sm rotate-[3deg] animate-float-slow" delay={0.4} y={0}>
          Cumples 🎂
        </Reveal>
        <Reveal className="hidden lg:block absolute bottom-40 right-[8%] bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] px-5 py-3 font-bold text-sm -rotate-[4deg] animate-float-slow" delay={0.6} y={0}>
          Baby Shower 🍼
        </Reveal>

        <Reveal y={20}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] max-w-[800px] mb-6 break-words px-2">
            Tu evento merece una<br className="sm:hidden" /> invitacion<br className="sm:hidden" />{" "}
            <span className="inline-block bg-[#FF6B9D] px-2 sm:px-3 border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] -rotate-1 mt-2 sm:mt-0 text-2xl sm:text-5xl md:text-6xl lg:text-7xl">
              que rompa
            </span>
          </h1>
        </Reveal>
        <Reveal y={20} delay={0.1}>
          <p className="text-lg text-[#555] max-w-[500px] mb-10 leading-relaxed">
            Creamos invitaciones digitales personalizadas que sorprenden. Modernas, divertidas y listas en 24 horas.
          </p>
        </Reveal>
        <Reveal y={20} delay={0.2}>
          <Link href="/crear" className="inline-block px-10 py-5 bg-[#1a1a1a] text-[#FFF9E0] text-lg font-bold border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#FF6B9D] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#FF6B9D] transition-all cursor-pointer">
            Diseñar mi invitacion →
          </Link>
        </Reveal>
      </header>

      {/* ========== PASOS ========== */}
      <section id="pasos" className="py-12 md:py-24 px-5 bg-white border-t-[3px] border-b-[3px] border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Asi de{" "}
              <span className="inline-block bg-[#4ECDC4] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">facil</span>{" "}
              es
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" stagger={0.1}>
            <StaggerItem className="bg-white border-[3px] border-[#FF6B9D] shadow-[6px_6px_0px_#FF6B9D] p-8 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#FF6B9D] transition-all">
              <div className="text-5xl font-bold text-[#FF6B9D] mb-3">01</div>
              <h3 className="text-lg font-bold mb-2">Elegi el estilo</h3>
              <p className="text-sm text-[#666] leading-relaxed">Mira nuestros disenos y elegi el que mas te guste. Tenemos de todo!</p>
            </StaggerItem>
            <StaggerItem className="bg-white border-[3px] border-[#4ECDC4] shadow-[6px_6px_0px_#4ECDC4] p-8 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#4ECDC4] transition-all">
              <div className="text-5xl font-bold text-[#4ECDC4] mb-3">02</div>
              <h3 className="text-lg font-bold mb-2">Mandanos los datos</h3>
              <p className="text-sm text-[#666] leading-relaxed">Por WhatsApp nos contas toda la info: fecha, lugar, nombres, lo que quieras.</p>
            </StaggerItem>
            <StaggerItem className="bg-white border-[3px] border-[#FF8C42] shadow-[6px_6px_0px_#FF8C42] p-8 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#FF8C42] transition-all">
              <div className="text-5xl font-bold text-[#FF8C42] mb-3">03</div>
              <h3 className="text-lg font-bold mb-2">Recibi el link en 24hs</h3>
              <p className="text-sm text-[#666] leading-relaxed">Te mandamos tu invitacion digital lista para compartir. Asi de rapido.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ========== DEMOS ========== */}
      <section id="estilos" className="py-12 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Mira los{" "}
              <span className="inline-block bg-[#FF8C42] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">estilos</span>
            </h2>
            <p className="text-lg text-[#555] max-w-lg mx-auto">Elegi una base y la personalizamos con tus colores, fotos y datos.</p>
          </Reveal>

          {/* Proba con tu nombre */}
          <Reveal className="max-w-md mx-auto mb-14">
            <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] p-4">
              <label className="block text-sm font-bold mb-2 text-center">Proba con tu nombre ✍️</label>
              <input
                type="text"
                placeholder="Ej: Ana y Juan"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full h-12 px-4 border-[3px] border-[#1a1a1a] text-center text-lg font-medium placeholder:text-[#999] focus:shadow-[4px_4px_0px_#4ECDC4] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all outline-none"
              />
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 place-items-center" stagger={0.06}>
            {demos.map((demo) => (
              <StaggerItem key={demo.title} className="w-full flex justify-center">
                <PhoneMockup
                  customName={customName}
                  title={demo.title}
                  url={demo.url}
                  desc={demo.desc}
                  selected={selectedStyle === demo.title}
                  onSelect={() => handleSelectStyle(demo.title, demo.event)}
                  onPreview={() => window.open(`/preview?url=${encodeURIComponent(demo.url)}${customName ? `&customName=${encodeURIComponent(customName)}` : ""}`, "_blank")}
                />
              </StaggerItem>
            ))}
          </Stagger>

          <p className="text-center mt-14 text-[#666] text-sm">
            No encontras el estilo ideal?{" "}
            <button type="button" onClick={handleSelectCustom} className="text-[#FF6B9D] font-bold hover:underline">Contanos que buscas</button>{" "}
            y lo disenamos a medida.
          </p>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-12 md:py-24 px-5 bg-white border-t-[3px] border-b-[3px] border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Lo que{" "}
              <span className="inline-block bg-[#4ECDC4] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">incluye</span>
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8 place-items-stretch" stagger={0.05}>
            {features.map((feat) => (
              <StaggerItem key={feat.title} className="w-full bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a] transition-all">
                <span className="text-3xl mb-3 block">{feat.emoji}</span>
                <h3 className="font-bold text-lg mb-1">{feat.title}</h3>
                <p className="text-sm text-[#666]">{feat.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========== PARTY CHAT - NUEVO FEATURE ========== */}
      <section id="party-chat" className="py-12 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="inline-block bg-[#1a1a1a] text-[#FFF9E0] text-xs font-bold px-4 py-2 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#FF6B9D] uppercase tracking-wider mb-6">
              Nuevo
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Party{" "}
              <span className="inline-block bg-[#4ECDC4] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">Chat</span>{" "}
              en vivo
            </h2>
            <p className="text-lg text-[#555] max-w-2xl mx-auto leading-relaxed">
              Un chat grupal exclusivo para tu fiesta. Cada mesa tiene su QR: los invitados lo escanean, eligen un apodo y empiezan a hablar entre todos. Ideal para casamientos donde no todos se conocen.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Left: mockup/visual */}
            <Reveal className="relative">
              <div className="bg-[#1a3a5c] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] rounded-xl overflow-hidden">
                {/* MSN-style header */}
                <div className="bg-gradient-to-r from-[#0058a8] to-[#3b8dd4] px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-white text-sm font-bold">Fiesta de Ana y Pedro - Party Messenger</span>
                  <span className="ml-auto text-white/60 text-xs bg-white/10 px-2 py-1 rounded">12 online</span>
                </div>
                {/* Messages */}
                <div className="bg-white p-4 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#FF6347]">El tio Carlos</span>
                    <span className="text-[10px] text-gray-400 ml-1">(Mesa 3) dice:</span>
                    <p className="text-sm bg-white rounded px-2 py-1">Que grande la novia!! Felicitaciones!!</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#8A2BE2]">La prima Laura</span>
                    <span className="text-[10px] text-gray-400 ml-1">(Mesa 7) dice:</span>
                    <p className="text-sm bg-white rounded px-2 py-1 text-[#8A2BE2]">Alguien sabe cuando cortan la torta?</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#FF8C00] font-bold bg-[#FFD700]/10 px-3 py-1 rounded-full">Pedro envio un zumbido!</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E90FF]">Mama de Ana</span>
                    <span className="text-[10px] text-gray-400 ml-1">(Mesa 1) dice:</span>
                    <p className="text-sm bg-white rounded px-2 py-1">Estoy llorando de la emocion</p>
                  </div>
                </div>
                {/* Input */}
                <div className="bg-[#eef3f7] border-t-2 border-[#7fbfff] p-3 flex gap-2">
                  <div className="flex-1 bg-white border-2 border-[#7fbfff] rounded px-3 py-2 text-sm text-gray-400">Escribi un mensaje...</div>
                  <div className="bg-[#4CAF50] text-white px-4 py-2 rounded text-sm font-bold">Enviar</div>
                </div>
              </div>
              {/* QR card floating */}
              <div className="absolute -bottom-6 -right-4 bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] p-3 rotate-3 w-28">
                <div className="w-full aspect-square bg-[#f0f0f0] border-2 border-gray-200 flex items-center justify-center mb-2">
                  <svg className="w-16 h-16 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2z"/>
                  </svg>
                </div>
                <p className="text-[9px] font-bold text-center">MESA 5</p>
              </div>
            </Reveal>

            {/* Right: features list */}
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#4ECDC4] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#4ECDC4] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">🎫</span> QR por mesa
                  </h3>
                  <p className="text-sm text-[#666] mt-1">Cada mesa tiene su propio QR. Los invitados lo escanean y entran al chat sin registrarse.</p>
                </div>

                <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#FF6B9D] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF6B9D] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">💬</span> Chat general + por mesa
                  </h3>
                  <p className="text-sm text-[#666] mt-1">Un chat para toda la fiesta y otro privado solo para tu mesa. Como MSN Messenger pero en tu evento.</p>
                </div>

                <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#FF8C42] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF8C42] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">📳</span> Zumbidos y colores
                  </h3>
                  <p className="text-sm text-[#666] mt-1">Mandales un zumbido que sacude la pantalla! Cada invitado elige su color de nick. Pura nostalgia MSN.</p>
                </div>

                <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">🔒</span> Solo dura tu fiesta
                  </h3>
                  <p className="text-sm text-[#666] mt-1">El chat se activa cuando vos quieras y se cierra al terminar. Privado y exclusivo para tu evento.</p>
                </div>
              </div>

              <a
                href="/demo-chat?mesa=5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-8 py-4 bg-[#1a1a1a] text-[#FFF9E0] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#4ECDC4] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#4ECDC4] transition-all"
              >
                Probar el chat demo →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== PARTY CAM - MURO DE FOTOS ========== */}
      <section id="party-cam" className="py-12 md:py-24 px-5 bg-white border-t-[3px] border-b-[3px] border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="inline-block bg-[#FF8C42] text-[#1a1a1a] text-xs font-bold px-4 py-2 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] uppercase tracking-wider mb-6">
              Incluido en Premium
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Party{" "}
              <span className="inline-block bg-[#FF6B9D] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">Cam</span>{" "}
            </h2>
            <p className="text-lg text-[#555] max-w-2xl mx-auto leading-relaxed">
              Un muro de fotos en tiempo real para tu fiesta. Los invitados sacan fotos, las suben escaneando un QR, y aparecen al instante en la pantalla gigante del salon.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Left: Visual mockup */}
            <Reveal>
              <div className="bg-[#0f0f0f] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] rounded-xl overflow-hidden">
                {/* Header pantalla */}
                <div className="bg-[#1a1a1a]/80 backdrop-blur px-6 py-4 flex items-center justify-between border-b border-white/10">
                  <div>
                    <p className="text-white font-bold text-lg">Boda de Juan & Ana</p>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">Party Cam</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-10 h-10 text-black">
                      <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z" fill="currentColor"/>
                      <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z" fill="currentColor"/>
                      <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z" fill="currentColor"/>
                      <rect x="60" y="60" width="10" height="10" fill="currentColor"/>
                      <rect x="75" y="70" width="15" height="15" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                {/* Grid de fotos simulado */}
                <div className="p-4 grid grid-cols-3 gap-3">
                  <div className="bg-white p-1.5 pb-6 shadow-lg rotate-1">
                    <div className="w-full aspect-square bg-gradient-to-br from-pink-200 to-pink-400 rounded-sm flex items-center justify-center text-3xl">🥂</div>
                    <p className="text-[9px] text-gray-600 mt-1 text-center italic">Familia Gomez</p>
                  </div>
                  <div className="bg-white p-1.5 pb-6 shadow-lg -rotate-1">
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-200 to-blue-400 rounded-sm flex items-center justify-center text-3xl">💃</div>
                    <p className="text-[9px] text-gray-600 mt-1 text-center italic">Mesa 7</p>
                  </div>
                  <div className="bg-white p-1.5 pb-6 shadow-lg rotate-2">
                    <div className="w-full aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-sm flex items-center justify-center text-3xl">🎂</div>
                    <p className="text-[9px] text-gray-600 mt-1 text-center italic">Los novios</p>
                  </div>
                  <div className="bg-white p-1.5 pb-6 shadow-lg -rotate-2">
                    <div className="w-full aspect-square bg-gradient-to-br from-green-200 to-emerald-400 rounded-sm flex items-center justify-center text-3xl">🎉</div>
                    <p className="text-[9px] text-gray-600 mt-1 text-center italic">Tio Carlos</p>
                  </div>
                  <div className="bg-white p-1.5 pb-6 shadow-lg rotate-1">
                    <div className="w-full aspect-square bg-gradient-to-br from-purple-200 to-purple-400 rounded-sm flex items-center justify-center text-3xl">❤️</div>
                    <p className="text-[9px] text-gray-600 mt-1 text-center italic">Amigas novia</p>
                  </div>
                  <div className="bg-white p-1.5 pb-6 shadow-lg -rotate-1">
                    <div className="w-full aspect-square bg-gradient-to-br from-rose-200 to-red-300 rounded-sm flex items-center justify-center text-3xl">📸</div>
                    <p className="text-[9px] text-gray-600 mt-1 text-center italic">El DJ</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: features */}
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#FF8C42] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF8C42] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">📸</span> Subida instantanea
                  </h3>
                  <p className="text-sm text-[#666] mt-1">El invitado saca una foto, escanea el QR y la sube en 2 toques. Sin descargar nada.</p>
                </div>

                <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#FF6B9D] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF6B9D] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">📺</span> Pantalla en vivo
                  </h3>
                  <p className="text-sm text-[#666] mt-1">Las fotos aparecen al instante en la pantalla del salon. Se actualiza sola cada 3 segundos.</p>
                </div>

                <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#4ECDC4] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#4ECDC4] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">🖼️</span> Estilo polaroid
                  </h3>
                  <p className="text-sm text-[#666] mt-1">Cada foto se muestra como una polaroid con el nombre del invitado. Queda hermoso en el proyector.</p>
                </div>

                <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a] transition-all">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">🎁</span> Recuerdo para los novios
                  </h3>
                  <p className="text-sm text-[#666] mt-1">Despues del evento recibis todas las fotos que subieron tus invitados. Momentos unicos desde su perspectiva.</p>
                </div>
              </div>

              <a
                href="/demo-wall/upload"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-8 py-4 bg-[#FF8C42] text-[#1a1a1a] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all"
              >
                Probar Party Cam demo →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== PLANES ========== */}
      <section id="planes" className="py-12 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Elegi tu{" "}
              <span className="inline-block bg-[#FF6B9D] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">plan</span>
            </h2>
            <p className="mt-4 text-[#555] text-lg">30% OFF abonando por transferencia</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Basico */}
            <div className="bg-white border-[3px] border-[#1a1a1a] border-t-[8px] border-t-[#4ECDC4] shadow-[6px_6px_0px_#1a1a1a] p-8 text-center hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all flex flex-col">
              <h3 className="text-xl font-bold uppercase mb-3">Basico</h3>
              <p className="text-4xl font-bold mb-1">$25.000</p>
              <p className="text-sm text-[#888] mb-6">por invitacion</p>
              <ul className="text-left text-sm space-y-3 mb-8 flex-1">
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Cuenta regresiva + mapa</li>
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Confirmacion WhatsApp</li>
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Regalos + dress code</li>
                <li className="flex gap-2 items-start"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Envios ilimitados</li>
              </ul>
              <div className="flex flex-col gap-2 mt-auto">
                <button type="button" onClick={() => handleMercadoPagoCheckout("BASICO")} disabled={isProcessingPayment === "BASICO"} className="w-full py-4 bg-[#1a1a1a] text-[#FFF9E0] font-bold text-sm uppercase border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#4ECDC4] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#4ECDC4] transition-all disabled:opacity-50">
                  {isProcessingPayment === "BASICO" ? "Procesando..." : "Lo quiero!"}
                </button>
                <button type="button" onClick={() => { document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }); }} className="text-xs text-[#888] hover:text-[#1a1a1a] py-2 underline transition">
                  Pagar por transferencia (-30%)
                </button>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-white border-[3px] border-[#1a1a1a] border-t-[8px] border-t-[#FF6B9D] shadow-[6px_6px_0px_#1a1a1a] p-8 text-center hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all flex flex-col relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FF6B9D] text-white text-[11px] font-bold px-4 py-1.5 border-[2px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] uppercase tracking-wider">★ Popular</div>
              <h3 className="text-xl font-bold uppercase mb-3">Premium</h3>
              <p className="text-4xl font-bold mb-1">$45.000</p>
              <p className="text-sm text-[#888] mb-6">por invitacion</p>
              <ul className="text-left text-sm space-y-3 mb-8 flex-1">
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Todo lo del Basico</li>
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> RSVP propio</li>
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Musica + Galeria</li>
                <li className="flex gap-2 items-start font-bold"><span className="text-[#FF6B9D] font-bold">&#10003;</span> Party Cam (Gratis)</li>
              </ul>
              <div className="flex flex-col gap-2 mt-auto">
                <button type="button" onClick={() => handleMercadoPagoCheckout("PREMIUM")} disabled={isProcessingPayment === "PREMIUM"} className="w-full py-4 bg-[#FF6B9D] text-white font-bold text-sm uppercase border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#FF6B9D] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF6B9D] transition-all disabled:opacity-50">
                  {isProcessingPayment === "PREMIUM" ? "Procesando..." : "Lo quiero!"}
                </button>
                <button type="button" onClick={() => { document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }); }} className="text-xs text-[#888] hover:text-[#1a1a1a] py-2 underline transition">
                  Pagar por transferencia (-30%)
                </button>
              </div>
            </div>

            {/* Premium Plus */}
            <div className="bg-white border-[3px] border-[#1a1a1a] border-t-[8px] border-t-[#FF8C42] shadow-[6px_6px_0px_#1a1a1a] p-8 text-center hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all flex flex-col">
              <h3 className="text-xl font-bold uppercase mb-3">Premium Plus</h3>
              <p className="text-4xl font-bold mb-1">$65.000</p>
              <p className="text-sm text-[#888] mb-6">por invitacion</p>
              <ul className="text-left text-sm space-y-3 mb-8 flex-1">
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Todo lo del Premium</li>
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Personalizada + trivia</li>
                <li className="flex gap-2 items-start border-b-2 border-dashed border-[#eee] pb-3"><span className="text-[#FF8C42] font-bold">&#10003;</span> Tu propio dominio</li>
                <li className="flex gap-2 items-start"><span className="text-[#4ECDC4] font-bold">&#10003;</span> Fotos ilimitadas + soporte</li>
              </ul>
              <div className="flex flex-col gap-2 mt-auto">
                <button type="button" onClick={() => handleMercadoPagoCheckout("PREMIUM_PLUS")} disabled={isProcessingPayment === "PREMIUM_PLUS"} className="w-full py-4 bg-[#1a1a1a] text-[#FFF9E0] font-bold text-sm uppercase border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#FF8C42] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FF8C42] transition-all disabled:opacity-50">
                  {isProcessingPayment === "PREMIUM_PLUS" ? "Procesando..." : "Lo quiero!"}
                </button>
                <button type="button" onClick={() => { document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }); }} className="text-xs text-[#888] hover:text-[#1a1a1a] py-2 underline transition">
                  Pagar por transferencia (-30%)
                </button>
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-[#888] text-sm">Sena 50% para iniciar. 30% OFF abonando por transferencia.</p>
        </div>
      </section>

      {/* ========== TESTIMONIOS ========== */}
      <section className="py-12 md:py-24 px-5 bg-white border-t-[3px] border-b-[3px] border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">Testimonios 💬</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 place-items-stretch" stagger={0.1}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="w-full bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-7 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all">
                <div className="flex gap-1 text-[#FF8C42] text-lg mb-4">★★★★★</div>
                <p className="text-[#444] leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-[3px] border-[#1a1a1a] flex items-center justify-center font-bold text-white" style={{ background: t.color }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-[#888]">{t.event}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-12 md:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Preguntas{" "}
              <span className="inline-block bg-[#4ECDC4] px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">frecuentes</span>
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="font-bold text-lg pr-4">{faq.q}</span>
                  <span className="w-8 h-8 border-[2px] border-[#1a1a1a] flex items-center justify-center text-xl font-light flex-shrink-0 transition-transform" style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 -mt-1">
                    <p className="text-[#555] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-12 md:py-24 px-5 bg-[#FF6B9D] border-t-[3px] border-b-[3px] border-[#1a1a1a]">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-6">
            Tu invitacion esta a un click ✨
          </h2>
          <p className="text-lg text-[#1a1a1a]/80 mb-8 max-w-md mx-auto">En 24 hs tenes tu invitacion web lista para sorprender a todos por WhatsApp.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button type="button" onClick={() => setIsQuizOpen(true)} className="px-8 py-4 bg-[#1a1a1a] text-[#FFF9E0] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all cursor-pointer">
              Empezar ahora →
            </button>
            <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-[#1a1a1a] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all">
              Hablar por WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ========== FORMULARIO ========== */}
      <section id="pedido" className="py-12 md:py-24 px-5">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Contanos de tu evento 📝</h2>
            <p className="text-[#555]">Completa los datos y te contactamos por WhatsApp para confirmar.</p>
          </Reveal>

          {/* Selected style banner */}
          {selectedStyle && (
            <div className="mb-6 p-4 bg-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#4ECDC4] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#4ECDC4] border-[2px] border-[#1a1a1a] flex items-center justify-center font-bold text-white">&#10003;</div>
                <div>
                  <p className="text-xs text-[#888] uppercase tracking-wide font-bold">Estilo elegido</p>
                  <p className="font-bold text-lg">{selectedStyle}</p>
                </div>
              </div>
              <button type="button" onClick={handleClearStyle} className="text-xs text-[#888] hover:text-[#1a1a1a] underline font-bold">Cambiar</button>
            </div>
          )}

          <form id="order-form" className="bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-6 sm:p-8 space-y-5" onSubmit={handleSubmitOrder}>
            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Tipo de evento *</label>
              <select name="evento" required value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className="neo-input w-full">
                <option value="">Seleccionar...</option>
                <option value="Boda">Boda</option>
                <option value="15 Anos">15 Anos</option>
                <option value="Bautismo">Bautismo</option>
                <option value="Cumpleanos">Cumpleanos</option>
                <option value="Corporativo">Corporativo / Empresa</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Nombre(s) *</label>
                <input type="text" name="nombres" required placeholder="Ej: Valentina & Matias" className="neo-input w-full" />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Fecha del evento *</label>
                <input type="date" name="fecha" required className="neo-input w-full" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Ciudad / Lugar</label>
              <input type="text" name="lugar" placeholder="Ej: Cordoba, Salon Los Alamos" className="neo-input w-full" />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Plan *</label>
              <div className="grid grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input type="radio" name="plan" value="Basico" required className="peer sr-only" />
                  <div className="p-3 border-[3px] border-[#1a1a1a] text-center peer-checked:bg-[#4ECDC4] peer-checked:shadow-[4px_4px_0px_#1a1a1a] transition-all hover:bg-[#f5f5f5]">
                    <p className="font-bold text-sm">Basico</p>
                    <p className="text-xs text-[#888]">$25.000</p>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="plan" value="Premium" defaultChecked className="peer sr-only" />
                  <div className="p-3 border-[3px] border-[#1a1a1a] text-center peer-checked:bg-[#FF6B9D] peer-checked:text-white peer-checked:shadow-[4px_4px_0px_#1a1a1a] transition-all hover:bg-[#f5f5f5]">
                    <p className="font-bold text-sm">Premium</p>
                    <p className="text-xs">$45.000</p>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="plan" value="Premium Plus" className="peer sr-only" />
                  <div className="p-3 border-[3px] border-[#1a1a1a] text-center peer-checked:bg-[#FF8C42] peer-checked:text-white peer-checked:shadow-[4px_4px_0px_#1a1a1a] transition-all hover:bg-[#f5f5f5]">
                    <p className="font-bold text-sm">Plus</p>
                    <p className="text-xs">$65.000</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Tu WhatsApp *</label>
              <input type="tel" name="whatsapp" required placeholder="Ej: 351 123 4567" className="neo-input w-full" />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-[#555] mb-2">Notas (opcional)</label>
              <textarea name="notas" rows={3} placeholder="Colores preferidos, frase especial, link de fotos..." className="neo-input w-full resize-none"></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-[#1a1a1a] text-[#FFF9E0] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#FF6B9D] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#FF6B9D] transition-all flex items-center justify-center gap-2">
              📲 Enviar pedido por WhatsApp
            </button>
            <p className="text-center text-xs text-[#888] mt-2">Sin compromiso. Te enviamos el diseno y el link para abonar luego.</p>
          </form>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#1a1a1a] text-white py-14 px-5 border-t-[3px] border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <span className="inline-block bg-[#4ECDC4] px-4 py-2 border-[3px] border-white shadow-[4px_4px_0px_white] font-bold text-xl text-[#1a1a1a]">Te Invito</span>
              <p className="mt-3 text-sm text-white/60 max-w-xs">Invitaciones digitales a medida. Modernas, divertidas y listas en 24hs.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="#estilos" className="hover:text-[#4ECDC4] transition">Estilos</Link>
              <Link href="#pasos" className="hover:text-[#4ECDC4] transition">Proceso</Link>
              <Link href="#planes" className="hover:text-[#4ECDC4] transition">Precios</Link>
              <Link href="#pedido" className="hover:text-[#4ECDC4] transition">Hacer pedido</Link>
              <a href="https://www.instagram.com/teinvitoapp/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B9D] transition">Instagram</a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>&copy; 2026 Te invito &middot; @teinvitoapp</p>
            <p>Hecho con ❤️ en Argentina</p>
          </div>
        </div>
      </footer>

      <OnboardingQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={(styleTitle) => {
          setSelectedStyle(styleTitle);
          setIsQuizOpen(false);
          document.getElementById("estilos")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* WhatsApp flotante */}
      <a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitaci%C3%B3n%20digital" target="_blank" rel="noopener noreferrer"
         className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] text-white flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a] transition-all"
         aria-label="WhatsApp">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
}
