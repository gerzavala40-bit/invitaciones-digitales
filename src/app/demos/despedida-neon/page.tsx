'use client';
import './style.css';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';
import RSVPForm from '@/components/invitation/RSVPForm';

function DemoContent() {
    
    const searchParams = useSearchParams();
    const customName = searchParams.get('customName') || 'Julieta';
    const avatarUrl = searchParams.get('avatar');
    const bgUrl = searchParams.get('bg');
    
    const [splashOpen, setSplashOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    const [countdown, setCountdown] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
    const [copyMsgOpacity, setCopyMsgOpacity] = useState(0);
    
    const [muroComments, setMuroComments] = useState<any[]>([]);
    const [muroInput, setMuroInput] = useState({ author: '', text: '', tag: 'Fiesta' });
    
    const [rsvpData, setRsvpData] = useState({ asiste: 'Si', name: '', diet: 'Sin restricciones', tshirt: 'M' });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 45);
        targetDate.setHours(22, 0, 0, 0);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = targetDate.getTime() - now;
            if (diff <= 0) return;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            setCountdown({
                days: days < 10 ? '0' + days : days.toString(),
                hours: hours < 10 ? '0' + hours : hours.toString(),
                mins: minutes < 10 ? '0' + minutes : minutes.toString(),
                secs: seconds < 10 ? '0' + seconds : seconds.toString()
            });
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleOpenInvite = () => {
        setSplashOpen(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
        }
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true));
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyMsgOpacity(1);
            setTimeout(() => setCopyMsgOpacity(0), 2000);
        });
    };

    const handleMuroSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!muroInput.author || !muroInput.text) return;
        setMuroComments([{...muroInput, id: Date.now()}, ...muroComments]);
        setMuroInput({...muroInput, text: '', author: ''});
    };

    const handleRsvpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let message = rsvpData.asiste === "Si" 
            ? `¡Hola! Confirmo mi asistencia para la despedida de ${customName} 🎉

*Nombre:* ${rsvpData.name}
*Asiste:* Sí, obvio 🍻
*Dieta:* ${rsvpData.diet}
*Talle:* ${rsvpData.tshirt}`
            : `¡Hola! Lamentablemente no puedo asistir para la despedida de ${customName} 😢

*Nombre:* ${rsvpData.name}
*Asiste:* No puedo`;
        
        window.open(`https://wa.me/5493425299942?text=${encodeURIComponent(message)}`, '_blank');
    };


    return (
        <div className="demo-wrapper">
            

  {/*  SPLASH SCREEN  */}
  <div className={`splash-screen ${splashOpen ? 'slide-up' : ''}`} id="splashScreen">
    <div className="splash-glow-bg"></div>
    <div className="splash-card">
      <div className="splash-logo">🔥</div>
      <p className="splash-eyebrow">La despedida de</p>
      <h1 className="splash-title splash-name">Julieta</h1>
      <button className="btn-enter" id="btnOpenInvite" onClick={handleOpenInvite}>Entrar a la joda</button>
    </div>
  </div>

  {/*  MUSIC BACKGROUND PLAYER  */}
  <audio id="music" ref={audioRef} loop>
    <source src="/assets-demos/bad-bunny.mp3" type="audio/mpeg" />
    <source src="/assets-demos/se-menea.mp3" type="audio/mpeg" />
  </audio>
  
  <div className="music-control" id="btnMusic" onClick={toggleMusic} title="Play/Pause Música">
    <svg viewBox="0 0 24 24" id="svgMusicPlay">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <svg viewBox="0 0 24 24" id="svgMusicNote" >
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
  </div>

  {/*  WRAPPER (MOBILE ONLY CONTAINER)  */}
  <div className="wrap">

    {/*  HERO  */}
    <section className="hero">
      <div className="hero-bg-overlay"></div>
      <div className="hero-bg-img" id="heroBgImage"></div>
      
      <div className="hero-content">
        <div className="hero-avatar-wrapper">
          <div className="hero-avatar" id="heroAvatarContainer">
            🍾
          </div>
        </div>
        
        <p className="hero-eyebrow">Despedida de Soltera</p>
        <h1 className="hero-title splash-name">Julieta</h1>
        
        {/*  COUNTDOWN  */}
        <div className="countdown-section">
          <div className="countdown-grid">
            <div className="countdown-item">
              <span className="countdown-num" id="cd-days">{countdown.days}</span>
              <span className="countdown-label">Días</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-num" id="cd-hours">{countdown.hours}</span>
              <span className="countdown-label">Hs</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-num" id="cd-mins">{countdown.mins}</span>
              <span className="countdown-label">Min</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-num" id="cd-secs">{countdown.secs}</span>
              <span className="countdown-label">Seg</span>
            </div>
          </div>
        </div>
        
        <div className="divider-vertical"></div>
      </div>
    </section>

    {/*  FRASE  */}
    <section className="phrase-section">
      <div className="phrase-card">
        <span className="quote-mark">“</span>
        <p className="phrase-text">Lo que pasa en la despedida... no se sube a Instagram.</p>
        <span className="quote-mark" >“</span>
      </div>
    </section>

    {/*  FONDO COMÚN  */}
    <section className="vaca-section">
      <h2 className="section-title">Fondo Común 💸</h2>
      <p className="section-desc">Para que la noche sea épica y nadie se preocupe por sacar la billetera, armamos un fondo común. Transfiere tu parte a este Alias.</p>
      
      <div className="vaca-card">
        <p className="vaca-eyebrow">Alias / CBU</p>
        <p className="vaca-alias" id="vacaAliasText">juli.despedida.mp</p>
        <p className="vaca-holder">Titular: Julieta Martinez</p>
        
        <button className="btn-copy" id="btnCopyAlias" onClick={() => handleCopy("JULI.DESPEDIDA.MP")}>Copiar Alias</button>
        <div className="copy-success-msg" id="copySuccessMsg">¡Alias copiado al portapapeles!</div>
      </div>
    </section>

    {/*  ITINERARIO  */}
    <section>
      <h2 className="section-title" >Itinerario de la Muerte 🍻</h2>
      <p className="section-desc">Seguí el cronograma oficial para no perderte de nada.</p>
      
      <div className="itinerario-card">
        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-time">22:00 HS</p>
            <h4 className="timeline-title">Previa</h4>
            <p className="timeline-desc">Arrancamos tranqui en el bar con unos tragos y juegos para romper el hielo.</p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-time">00:00 HS</p>
            <h4 className="timeline-title">Cena Bizarra</h4>
            <p className="timeline-desc">Cena grupal con shows sorpresa y prendas picantes para Juli.</p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-time">02:00 HS</p>
            <h4 className="timeline-title">Boliche</h4>
            <p className="timeline-desc">Nos mudamos a la pista principal para bailar hasta que salga el sol.</p>
          </div>
          
        </div>
      </div>
    </section>

    {/*  COORDENADAS / LUGAR  */}
    <section className="lugar-section">
      <h2 className="section-title">Coordenadas 📍</h2>
      <p className="section-desc">Punto de encuentro inicial y horarios oficiales.</p>
      
      <div className="lugar-card">
        <p className="lugar-time">22:00 HS</p>
        <p className="lugar-name">Bar La Previa</p>
        <p className="lugar-address">Av. Libertador 1234, Buenos Aires</p>
        
        <a href="https://maps.google.com/?q=Av.+Libertador+1234,+Buenos+Aires" target="_blank" className="btn-maps">Ver en Google Maps</a>
        <button className="btn-calendar" id="btnAddToCalendar">Añadir al Calendario</button>
      </div>
    </section>

    {/*  DRESS CODE  */}
    <section>
      <h2 className="section-title">Dress Code 👗👕</h2>
      <p className="section-desc">Vestimenta requerida para la noche.</p>
      
      <div className="dress-card">
        <div className="dress-icons">🖤🔥</div>
        <span className="dress-badge">Total Black</span>
      </div>
    </section>

    {/*  SCRAPBOOK / GALLERY  */}
    <section className="gallery-section">
      <h2 className="section-title">Scrapbook 📸</h2>
      <p className="section-desc">Nuestros mejores momentos juntos.</p>
      
      <div className="gallery-grid">
        <div className="gallery-img">
          <img src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&q=80" alt="Foto 1" />
        </div>
        <div className="gallery-img">
          <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80" alt="Foto 2" />
        </div>
        <div className="gallery-img">
          <img src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80" alt="Foto 3" />
        </div>
      </div>
    </section>

    {/*  PARTY CHAT  */}
    <section className="chat-section">
      <h2 className="section-title" >Party Chat 💬</h2>
      <p className="section-desc">Sumate al chat secreto de la despedida. Elegí tu color y empezá a mandar zumbidos.</p>
      
      <a href="demo-chat.html?mesa=Amigos" className="btn-chat">Entrar al Chat</a>
    </section>

    {/*  MURO DE LA VERGÜENZA  */}
    <section>
      <h2 className="section-title">El Muro de la Vergüenza 🤐</h2>
      <p className="section-desc">Dejá una anécdota, un consejo o una amenaza. Lo que pasa en la despedida... queda en el muro.</p>
      
      <div className="muro-card">
        <form id="formMuro" onSubmit={handleMuroSubmit}>
          <textarea className="muro-input" id="muroText" rows={3} placeholder="Escribí tu mensaje anónimo acá..." value={muroInput.text} onChange={e => setMuroInput({...muroInput, text: e.target.value})}></textarea>
          <div className="muro-meta-inputs">
            <input type="text" className="muro-meta-input" id="muroAuthor" placeholder="Firma / Apodo" required />
            <select className="muro-meta-input" id="muroTag">
              <option value="Joda">🍻 Joda</option>
              <option value="Amor">❤️ Amor</option>
              <option value="Peligro">⚠️ Peligro</option>
              <option value="Secreto">🤫 Secreto</option>
            </select>
          </div>
          <button type="submit" className="btn-muro-submit">Publicar Mensaje</button>
        </form>
        
        <div className="muro-messages" id="muroList">
          {/*  Static Messages  */}
          <div className="muro-msg">
            <div className="muro-msg-header">
              <span className="muro-msg-author">Caro L.</span>
              <span className="muro-msg-tag">🍻 Joda</span>
            </div>
            <p className="muro-msg-text">¡Qué manija tengo! Juli, preparate porque no vas a dormir por 48 horas. ¡Tequila para todas!</p>
          </div>
          <div className="muro-msg">
            <div className="muro-msg-header">
              <span className="muro-msg-author">Matias G.</span>
              <span className="muro-msg-tag">🤫 Secreto</span>
            </div>
            <p className="muro-msg-text">El CBU de la vaquita ya está explotado de transferencias. Juli, nos encargamos de que sea inolvidable.</p>
          </div>
          <div className="muro-msg">
            <div className="muro-msg-header">
              <span className="muro-msg-author">Sofi R.</span>
              <span className="muro-msg-tag">⚠️ Peligro</span>
            </div>
            <p className="muro-msg-text">¡Cuidado con las sorpresas de la cena! Hay prendas que no vas a querer que el novio vea. 😈</p>
          </div>
        </div>
      </div>
    </section>

    {/*  RSVP  */}
    <section className="rsvp-section">
      <h2 className="section-title">Confirmar Asistencia</h2>
      <p className="section-desc">Confirmá rápido así calculamos cuánto escabio comprar.</p>
      
      <div className="rsvp-card">
        <RSVPForm eventId="demo-despedida-neon" theme="dark" />
      </div>
    </section>

    {/*  FOOTER  */}
    <footer>
      <p className="footer-title">Despedida de Julieta</p>
      <p className="footer-tag">Armado con 🔥 por TeInvitoApp</p>
    </footer>

  </div>

  {/*  INTERACTIVE JS SCRIPTS  */}
  
        </div>
    );
}

export default function DemoDespedidaNeon() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <DemoContent />
        </Suspense>
    );
}
