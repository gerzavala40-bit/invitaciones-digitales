import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, Calendar, Music2, Camera, Copy, CheckCircle2, CalendarPlus, 
  ChevronLeft, ChevronRight, Send, Plus, Trash2, Smartphone, Clock, 
  Heart, Disc, Gift, X, Sparkles, Map 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Tipos para YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

// ==============================
// COMPONENTES AUXILIARES
// ==============================

const Particles = () => {
  const particles = Array.from({ length: 35 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/40"
          style={{
            width: Math.random() * 5 + 2 + 'px',
            height: Math.random() * 5 + 2 + 'px',
            left: Math.random() * 100 + 'vw',
            top: Math.random() * 100 + 'vh',
          }}
          animate={{
            y: [0, -120 - Math.random() * 250],
            x: Math.random() * 60 - 30,
            opacity: [0, 0.85, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const GifIcon = ({ src, FallbackIcon }: { src: string, FallbackIcon: any }) => {
  const [error, setError] = useState(false);
  if (error) return <FallbackIcon size={32} strokeWidth={1} className="text-accent mb-6 mx-auto" />;
  return <img src={src} alt="icon" className="w-16 h-16 mb-6 mx-auto object-contain" onError={() => setError(true)} />;
};

const MagneticDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      className="relative mx-auto py-12 w-32 flex justify-center items-center cursor-pointer z-40"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 160, damping: 15, mass: 0.1 }}
      >
        <motion.div
          initial={{ height: "12px", width: "12px", borderRadius: "50%" }}
          whileInView={{ height: "70px", width: "1px", borderRadius: "0%" }}
          viewport={{ margin: "-150px", once: false }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="bg-accent shadow-[0_0_15px_rgba(194,169,144,0.8)]"
        />
      </motion.div>
    </motion.div>
  );
};

// ==============================
// APP PRINCIPAL UNIFICADA
// ==============================

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedHashtag, setCopiedHashtag] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showDesktopQR, setShowDesktopQR] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  
  // YouTube Player State
  const ytPlayerRef = useRef<any>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form State (1 a 8 invitados)
  const [guests, setGuests] = useState([{ id: Date.now(), name: '', lastName: '', age: 'Adulto', diet: 'Ninguno', drink: '', song: '' }]);
  const [attendance, setAttendance] = useState('yes');
  const [needsTransport, setNeedsTransport] = useState('NO');
  const [needsLodging, setNeedsLodging] = useState('NO');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const photos = [
    '/gallery/1.jpeg',
    '/gallery/2.jpeg',
    '/gallery/3.jpeg',
    '/gallery/4.jpeg',
    '/gallery/WhatsApp Image 2026-08-03 at 07.41.28.jpeg'
  ];

  const milestones = [
    { year: '2021', title: 'El Primer Flechazo', desc: 'Nos conocimos en una tarde de primavera y supimos que era especial.' },
    { year: '2023', title: 'Nuestro Primer Viaje', desc: 'Recorrimos el sur del país creando recuerdos inolvidables juntos.' },
    { year: '2025', title: 'La Propuesta', desc: 'Bajo las estrellas y con el mar de fondo, dijimos SÍ para siempre.' }
  ];

  const itinerary = [
    { time: '17:00 HS', title: 'Ceremonia', desc: 'Parroquia San Francisco de Asís', icon: Heart },
    { time: '19:00 HS', title: 'Recepción & Cocktail', desc: 'Jardines de Estancia La Sofía', icon: Sparkles },
    { time: '21:00 HS', title: 'Cena de Gala', desc: 'Gran Salón Principal', icon: Clock },
    { time: '00:00 HS', title: 'Fiesta & Party Cam', desc: 'Pista de Baile & DJ Set Live', icon: Disc }
  ];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Init YouTube API, Countdown & QR Check
  useEffect(() => {
    document.body.classList.add('locked');

    if (window.innerWidth >= 1024) {
      setShowDesktopQR(true);
    }

    // Countdown logic
    const targetDate = new Date('2026-10-24T17:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: 'myDIeOjqQos',
        playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel': 0, 'loop': 1, 'playlist': 'myDIeOjqQos' }
      });
    };

    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (ytPlayerRef.current && ytPlayerRef.current.getPlayerState) {
      const state = ytPlayerRef.current.getPlayerState();
      if (state === 1) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const enterSite = () => {
    setShowSplash(false);
    document.body.classList.remove('locked');
    setTimeout(() => {
      if (ytPlayerRef.current && ytPlayerRef.current.playVideo) {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    }, 800);
  };

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextPhoto = () => setCurrentPhoto((p) => (p + 1) % photos.length);
  const prevPhoto = () => setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);

  const addGuest = () => {
    if (guests.length < 8) {
      setGuests([...guests, { id: Date.now(), name: '', lastName: '', age: 'Adulto', diet: 'Ninguno', drink: '', song: '' }]);
    }
  };

  const removeGuest = (id: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter(g => g.id !== id));
    }
  };

  const updateGuest = (id: number, field: string, value: string) => {
    setGuests(guests.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `*CONFIRMACIÓN DE ASISTENCIA - BODA CAMILA & MATEO*\n\n`;
    if (attendance === 'no') {
      msg += `Lamentablemente no podremos asistir.\nInvitado principal: ${guests[0].name} ${guests[0].lastName}\n`;
    } else {
      msg += `*¡Sí, asistiremos con mucha alegría!*\n\n`;
      msg += `*Cantidad de invitados:* ${guests.length}\n`;
      guests.forEach((g, i) => {
        msg += `\n👤 *Invitado ${i + 1}:* ${g.name} ${g.lastName} (${g.age})\n`;
        if (g.diet !== 'Ninguno') msg += `   🍽️ Dieta: ${g.diet}\n`;
        if (g.drink) msg += `   🍷 Bebida: ${g.drink}\n`;
        if (g.song) msg += `   🎵 Canción sugerida: ${g.song}\n`;
      });
      msg += `\n🚌 *Traslado:* ${needsTransport}`;
      msg += `\n🏨 *Hospedaje:* ${needsLodging}`;
    }
    msg += `\n📱 *Teléfono:* ${phone}`;
    if (message) msg += `\n💬 *Mensaje:* ${message}`;
    
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20261024T200000Z\nDTEND:20261025T030000Z\nSUMMARY:Boda Camila y Mateo\nDESCRIPTION:¡Te esperamos para celebrar nuestra boda!\nLOCATION:Estancia La Sofía\nEND:VEVENT\nEND:VCALENDAR`;
  const appleCalendarHref = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
  const googleCalendarHref = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Camila+y+Mateo&dates=20261024T200000Z/20261025T030000Z&details=¡Te+esperamos+para+celebrar+nuestra+boda!&location=Estancia+La+Sofía";

  return (
    <div className="relative bg-background text-primary font-sans overflow-hidden min-h-screen selection:bg-accent selection:text-white">
      
      {/* Hidden YouTube Player */}
      <div id="yt-player" className="hidden absolute w-0 h-0"></div>

      <Particles />

      {/* Desktop QR Modal */}
      <AnimatePresence>
        {showDesktopQR && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-8"
          >
            <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl relative border border-accent/20">
              <button onClick={() => setShowDesktopQR(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background hover:bg-accent hover:text-white transition-colors">
                <X size={16} />
              </button>
              <h2 className="text-2xl font-heading text-primary mb-2">Para una mejor experiencia</h2>
              <p className="text-primary/60 text-sm mb-8">Escaneá este código QR para ver la invitación en tu celular.</p>
              <div className="bg-background p-4 rounded-2xl mx-auto w-fit mb-8 border border-accent/20">
                <QRCodeSVG value={window.location.href} size={200} bgColor="transparent" fgColor="#1A1C20" />
              </div>
              <button onClick={() => setShowDesktopQR(false)} className="w-full py-4 bg-accent text-white rounded-xl uppercase tracking-widest text-xs font-semibold hover:bg-accentHover transition-colors flex items-center justify-center gap-2">
                <Smartphone size={16} /> Continuar en PC
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Modal */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl">
              <button onClick={() => setShowMapModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-background hover:bg-accent hover:text-white transition-colors z-10">
                <X size={20} />
              </button>
              <h3 className="text-2xl font-heading text-center mb-6 text-primary">Ubicación del Evento</h3>
              <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner">
                <iframe 
                  title="Mapa del Evento"
                  src="https://maps.google.com/maps?q=Estancia%20La%20Sofia%20Buenos%20Aires&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full border-0" 
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bank Modal */}
      <AnimatePresence>
        {showBankModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl text-center">
              <button onClick={() => setShowBankModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-background hover:bg-accent hover:text-white transition-colors z-10">
                <X size={20} />
              </button>
              <Gift size={40} className="text-accent mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-3xl font-heading text-primary mb-2">Datos Bancarios</h3>
              <p className="text-primary/60 text-sm mb-6">Podés realizar tu regalo por transferencia bancaria:</p>
              
              <div className="space-y-4 text-left bg-background p-6 rounded-2xl border border-accent/20 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-primary/10">
                  <div><span className="text-[10px] uppercase text-primary/50 tracking-widest block">CBU</span><span className="font-mono text-sm font-medium">0000003100022314329967</span></div>
                  <button onClick={() => copyToClipboard('0000003100022314329967', setCopiedCbu)} className="text-accent p-2 hover:scale-110 transition-transform">
                    {copiedCbu ? <CheckCircle2 size={20} className="text-green-600" /> : <Copy size={20} />}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div><span className="text-[10px] uppercase text-primary/50 tracking-widest block">Alias</span><span className="font-mono text-sm font-medium">camila.y.mateo</span></div>
                  <button onClick={() => copyToClipboard('camila.y.mateo', setCopiedAlias)} className="text-accent p-2 hover:scale-110 transition-transform">
                    {copiedAlias ? <CheckCircle2 size={20} className="text-green-600" /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              <button onClick={() => setShowBankModal(false)} className="w-full py-4 bg-primary text-white uppercase tracking-widest text-xs rounded-xl hover:bg-accent transition-colors">
                Entendido
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Control */}
      <AnimatePresence>
        {!showSplash && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            onClick={toggleAudio}
            className="fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl hover:bg-white/90 transition-all duration-500"
          >
            <motion.div animate={isPlaying ? { rotate: 360 } : {}} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
              <Music2 strokeWidth={1.5} className={isPlaying ? "text-accent" : "text-primary"} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 right-0 h-1/2 bg-background border-b border-accent/20 flex flex-col justify-end pb-8 items-center"
              initial={{ y: 0 }} exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }}
            >
               <h1 className="text-7xl md:text-9xl text-accent font-heading font-light tracking-widest">C & M</h1>
            </motion.div>

            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-background border-t border-accent/20 flex flex-col justify-start pt-12 items-center"
              initial={{ y: 0 }} exit={{ y: "100%", transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }}
            >
              <p className="tracking-[0.5em] text-xs font-medium mb-10 text-primary/60 uppercase">24 . 10 . 2026</p>
              <button onClick={enterSite} className="px-10 py-4 rounded-none border border-accent text-accent uppercase tracking-[0.3em] text-xs hover:bg-accent hover:text-white transition-all duration-500 bg-transparent">
                Abrir Invitación
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="relative z-10" animate={{ opacity: showSplash ? 0 : 1 }} transition={{ duration: 1, delay: 0.5 }}>
        
        {/* Editorial Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: `url('/hero-bg.jpg')`, y: heroY, opacity: heroOpacity }} />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] -z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-background -z-10" />
          
          <div className="relative z-10 text-center px-4 pt-32">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="text-accent uppercase tracking-[0.4em] font-light mb-8 text-xs">Celebramos nuestro amor</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-7xl md:text-9xl lg:text-[11rem] font-heading text-primary leading-none mb-8">Camila <br/> <span className="text-accent italic">&</span> Mateo</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="uppercase tracking-[0.3em] text-xs font-medium text-primary/60">Sábado, 24 de Octubre 2026</motion.p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-20 space-y-36">
          
          {/* Cuenta Regresiva (Countdown) */}
          <section className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-heading text-accent uppercase tracking-widest mb-10 font-light">Cuenta Regresiva</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-heading text-primary font-light">{timeLeft.days}</span>
                  <span className="text-xs uppercase tracking-widest text-primary/60 mt-2">Días</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-heading text-primary font-light">{timeLeft.hours}</span>
                  <span className="text-xs uppercase tracking-widest text-primary/60 mt-2">Horas</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-heading text-primary font-light">{timeLeft.minutes}</span>
                  <span className="text-xs uppercase tracking-widest text-primary/60 mt-2">Minutos</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-heading text-primary font-light">{timeLeft.seconds}</span>
                  <span className="text-xs uppercase tracking-widest text-primary/60 mt-2">Segundos</span>
                </div>
              </div>
            </motion.div>
          </section>

          <MagneticDivider />

          {/* Nuestra Historia */}
          <section className="text-center">
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-heading font-light mb-16 text-primary">Nuestra Historia</motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
              {milestones.map((item, idx) => (
                <motion.div key={idx} whileHover={{ y: -8 }} className="glass-card p-8 text-center transition-all">
                  <span className="text-accent text-3xl font-heading font-light block mb-4">{item.year}</span>
                  <h4 className="text-xl font-heading mb-3">{item.title}</h4>
                  <p className="text-primary/70 text-sm font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <MagneticDivider />

          {/* Details & Map */}
          <section>
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-heading font-light text-center mb-20 text-primary">Los Detalles</motion.h3>
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <motion.div whileHover={{ y: -10 }} className="glass-card flex flex-col items-center text-center p-12 transition-all duration-500">
                <GifIcon src="/icons/ffffff-blanco-icono-3.gif" FallbackIcon={Calendar} />
                <h4 className="text-3xl font-heading mb-2">Ceremonia</h4>
                <p className="font-light tracking-widest text-sm mb-6 text-accent uppercase">17:00 hrs</p>
                <p className="text-primary/70 mb-10 font-light leading-relaxed">Parroquia San Francisco de Asís<br />Ciudad, Centro</p>
                <button onClick={() => setShowMapModal(true)} className="mt-auto px-8 py-4 border border-accent/30 text-primary uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-all duration-500 w-full flex items-center justify-center gap-2">
                  <Map size={14} /> Ver Ubicación
                </button>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="glass-card flex flex-col items-center text-center p-12 transition-all duration-500">
                <GifIcon src="/icons/C2A990-marron-claro-icono-1.gif" FallbackIcon={MapPin} />
                <h4 className="text-3xl font-heading mb-2">Recepción</h4>
                <p className="font-light tracking-widest text-sm mb-6 text-accent uppercase">19:00 hrs</p>
                <p className="text-primary/70 mb-10 font-light leading-relaxed">Estancia La Sofía<br />Ruta 2, Km 45</p>
                <button onClick={() => setShowMapModal(true)} className="mt-auto px-8 py-4 border border-accent/30 text-primary uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-all duration-500 w-full flex items-center justify-center gap-2">
                  <Map size={14} /> Ver Ubicación
                </button>
              </motion.div>
            </div>

            <motion.div className="flex flex-col sm:flex-row justify-center gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <a href={googleCalendarHref} target="_blank" rel="noreferrer" className="px-8 py-4 bg-accent text-white uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-accentHover transition-colors"><CalendarPlus size={16} /> Agendar en Google</a>
              <a href={appleCalendarHref} download="boda.ics" className="px-8 py-4 border border-primary text-primary uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-colors"><CalendarPlus size={16} /> Agendar en Apple</a>
            </motion.div>
          </section>

          <MagneticDivider />

          {/* Itinerario del Evento */}
          <section className="text-center">
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-heading font-light mb-16 text-primary">Itinerario</motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {itinerary.map((step, index) => {
                const IconComp = step.icon;
                return (
                  <motion.div key={index} whileHover={{ scale: 1.03 }} className="glass-card p-8 flex flex-col items-center text-center">
                    <IconComp size={28} className="text-accent mb-4" strokeWidth={1.5} />
                    <span className="text-accent font-semibold tracking-widest text-xs mb-2 block">{step.time}</span>
                    <h4 className="text-xl font-heading mb-2">{step.title}</h4>
                    <p className="text-primary/60 text-xs font-light">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <MagneticDivider />

          {/* Photo Gallery Carousel */}
          <section className="text-center">
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-heading font-light mb-16 text-primary">Momentos Únicos</motion.h3>
            <div className="relative max-w-4xl mx-auto p-4 group">
              <div className="overflow-hidden rounded-sm relative shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img key={currentPhoto} src={photos[currentPhoto]} alt="Gallery" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="w-full h-auto aspect-[16/10] object-cover" />
                </AnimatePresence>
                <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/30 backdrop-blur-lg hover:bg-white/60 transition-colors opacity-0 group-hover:opacity-100 border border-white/20"><ChevronLeft className="text-primary" /></button>
                <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/30 backdrop-blur-lg hover:bg-white/60 transition-colors opacity-0 group-hover:opacity-100 border border-white/20"><ChevronRight className="text-primary" /></button>
              </div>
            </div>
          </section>

          <MagneticDivider />

          {/* Party Cam & Instagram AR Filter */}
          <section className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card p-12">
              <Camera size={40} className="text-accent mx-auto mb-6" strokeWidth={1} />
              <h3 className="text-4xl font-heading font-light mb-4 text-primary">Party Cam & Instagram</h3>
              <p className="text-primary/70 font-light text-sm leading-relaxed mb-8">
                ¡Queremos ver la fiesta a través de tus ojos! Usá nuestro filtro oficial y etiquetanos en tus historias usando el hashtag oficial:
              </p>
              
              <div className="inline-flex items-center gap-4 bg-white/40 backdrop-blur-lg px-8 py-4 rounded-full border border-white/60 mb-8">
                <span className="font-heading text-2xl text-accent font-medium">#BodaCamilaYMateo</span>
                <button onClick={() => copyToClipboard('#BodaCamilaYMateo', setCopiedHashtag)} className="text-accent hover:text-primary transition-colors">
                  {copiedHashtag ? <CheckCircle2 size={20} className="text-green-600" /> : <Copy size={20} />}
                </button>
              </div>

              <div>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="px-8 py-4 bg-accent text-white uppercase tracking-widest text-xs rounded-full hover:bg-accentHover transition-colors inline-flex items-center gap-2">
                  <Camera size={16} /> Abrir Filtro de Instagram
                </a>
              </div>
            </motion.div>
          </section>

          <MagneticDivider />

          {/* Advanced RSVP Form */}
          <section className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-16">
              <GifIcon src="/icons/ffffff-blanco-icono-8.gif" FallbackIcon={Send} />
              <h3 className="text-4xl md:text-5xl font-heading font-light text-center mb-4 text-primary">Confirmá tu Asistencia</h3>
              <p className="text-center text-primary/60 font-light mb-12">Por favor, indícanos quiénes nos acompañarán en este día tan especial.</p>
              
              <form onSubmit={handleRsvpSubmit} className="space-y-10">
                <div className="flex gap-4 mb-8">
                  <button type="button" onClick={() => setAttendance('yes')} className={`flex-1 py-4 border transition-all text-xs uppercase tracking-[0.1em] ${attendance === 'yes' ? 'bg-accent border-accent text-white' : 'bg-transparent border-primary/20 text-primary hover:border-accent/50'}`}>Sí, asistiremos</button>
                  <button type="button" onClick={() => setAttendance('no')} className={`flex-1 py-4 border transition-all text-xs uppercase tracking-[0.1em] ${attendance === 'no' ? 'bg-primary border-primary text-white' : 'bg-transparent border-primary/20 text-primary hover:border-primary/50'}`}>No podremos</button>
                </div>

                <AnimatePresence>
                  {guests.map((guest, index) => (
                    <motion.div key={guest.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 pb-8 border-b border-primary/10 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h4 className="text-accent uppercase tracking-widest text-sm font-semibold">Invitado {index + 1}</h4>
                        {guests.length > 1 && (
                          <button type="button" onClick={() => removeGuest(guest.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <input type="text" required value={guest.name} onChange={(e) => updateGuest(guest.id, 'name', e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light placeholder:text-primary/30" placeholder="Nombre" />
                        <input type="text" required value={guest.lastName} onChange={(e) => updateGuest(guest.id, 'lastName', e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light placeholder:text-primary/30" placeholder="Apellido" />
                      </div>

                      {attendance === 'yes' && (
                        <>
                          <div className="grid grid-cols-2 gap-6">
                            <select value={guest.age} onChange={(e) => updateGuest(guest.id, 'age', e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light text-primary/70">
                              <option value="Adulto">Adulto</option><option value="Menor">Menor</option><option value="Niño">Niño</option>
                            </select>
                            <select value={guest.diet} onChange={(e) => updateGuest(guest.id, 'diet', e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light text-primary/70">
                              <option value="Ninguno">Dieta normal</option><option value="Vegetariano">Vegetariano</option><option value="Vegano">Vegano</option><option value="Celíaco">Celíaco</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <input type="text" value={guest.drink} onChange={(e) => updateGuest(guest.id, 'drink', e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light placeholder:text-primary/30" placeholder="Bebida favorita" />
                            <input type="text" value={guest.song} onChange={(e) => updateGuest(guest.id, 'song', e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light placeholder:text-primary/30" placeholder="Canción recomendada" />
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {attendance === 'yes' && guests.length < 8 && (
                  <button type="button" onClick={addGuest} className="w-full py-4 border border-dashed border-accent/50 text-accent uppercase tracking-widest text-xs hover:bg-accent/10 transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} /> Agregar otro invitado
                  </button>
                )}

                {attendance === 'yes' && (
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-primary/70 mb-2">¿Necesitan Traslado?</label>
                      <select value={needsTransport} onChange={(e) => setNeedsTransport(e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none font-light">
                        <option value="NO">No</option><option value="SI">Sí, necesitamos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-primary/70 mb-2">¿Necesitan Hospedaje?</label>
                      <select value={needsLodging} onChange={(e) => setNeedsLodging(e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none font-light">
                        <option value="NO">No</option><option value="SI">Sí, necesitamos</option>
                      </select>
                    </div>
                  </div>
                )}

                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light placeholder:text-primary/30" placeholder="Teléfono de contacto" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-white/30 border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-accent transition-colors font-light placeholder:text-primary/30 h-24 resize-none" placeholder="Sumá un mensaje bonito..."></textarea>

                <button type="submit" className="w-full py-6 bg-primary text-white uppercase tracking-[0.2em] text-xs hover:bg-accent transition-colors mt-8 flex items-center justify-center gap-3">
                  <Send size={16} strokeWidth={1.5} /> Confirmar vía WhatsApp
                </button>
              </form>
            </motion.div>
          </section>

          <MagneticDivider />

          {/* Info Section (Dress Code & Gifts) */}
          <section className="text-center max-w-2xl mx-auto pb-32">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-16">
              <div>
                <GifIcon src="/icons/C2A990-marron-claro-icono-20.gif" FallbackIcon={Camera} />
                <h4 className="text-3xl font-heading font-light text-accent mb-6">Dress Code</h4>
                <p className="uppercase tracking-[0.3em] font-medium text-sm mb-4">Formal Elegante</p>
                <p className="text-primary/60 text-sm font-light">Rogamos evitar el color blanco y tonos beige claros.</p>
              </div>

              <div>
                <GifIcon src="/icons/ffffff-blanco-icono-13.gif" FallbackIcon={Gift} />
                <h4 className="text-3xl font-heading font-light text-accent mb-6">Mesa de Regalos</h4>
                <p className="text-primary/60 mb-8 text-sm font-light leading-relaxed">Tu presencia es nuestro mejor regalo. <br/> Si deseas tener un detalle con nosotros, puedes ver los datos bancarios aquí:</p>
                <button onClick={() => setShowBankModal(true)} className="px-8 py-4 bg-accent text-white uppercase tracking-widest text-xs rounded-full hover:bg-accentHover transition-colors inline-flex items-center gap-2">
                  <Gift size={16} /> Ver Datos Bancarios
                </button>
              </div>
            </motion.div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
