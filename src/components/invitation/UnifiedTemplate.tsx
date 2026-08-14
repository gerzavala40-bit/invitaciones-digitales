'use client';
import { useState } from 'react';
import RSVPForm from './RSVPForm';
import MusicPlayer from './MusicPlayer';
import Countdown from './Countdown';
import EventLocation from './EventLocation';

export interface UnifiedTemplateProps {
  eventId: string;
  theme: 'dark' | 'light';
  title: string;
  subtitle: string;
  date: string;
  musicUrl: string;
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
  backgroundImageUrl?: string;
  customCssClass?: string;
}

export default function UnifiedTemplate(props: UnifiedTemplateProps) {
  const [splashOpen, setSplashOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  const handleOpenInvite = () => {
    setSplashOpen(true);
    setStartMusic(true);
  };

  const bgClass = props.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-pink-50 text-gray-900';
  
  return (
    <main className={`min-h-screen relative overflow-x-hidden ${bgClass} ${props.customCssClass || ''}`}>
      
      {/* Background Layer */}
      {props.backgroundImageUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 fixed"
          style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}
        />
      )}

      {/* Splash Screen Overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-transform duration-1000 ease-in-out ${splashOpen ? '-translate-y-full' : ''}`}>
        <div className="text-center p-6 bg-gray-900/80 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
          <p className="text-pink-400 font-medium tracking-widest uppercase mb-2 text-sm">{props.subtitle}</p>
          <h1 className="text-5xl font-bold text-white mb-8">{props.title}</h1>
          <button 
            onClick={handleOpenInvite}
            className="px-8 py-4 bg-pink-500 rounded-full text-white font-bold uppercase tracking-widest hover:bg-pink-600 transition-all hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
          >
            Abrir Invitación
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto pt-24 pb-32 px-6">
        
        {/* Header Section */}
        <section className="text-center mb-16">
          <h2 className="text-6xl font-extrabold mb-4">{props.title}</h2>
          <p className="text-xl opacity-80">{new Date(props.date).toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </section>

        {/* Countdown Section */}
        <section className="mb-16">
          <Countdown targetDate={props.date} theme={props.theme} />
        </section>

        {/* Location Section */}
        <section className="mb-16">
          <EventLocation 
            venueName={props.venueName} 
            venueAddress={props.venueAddress} 
            mapUrl={props.mapUrl} 
            theme={props.theme} 
          />
        </section>

        {/* RSVP Section */}
        <section className="mb-16 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-2">Confirmar Asistencia</h2>
          <p className="text-center opacity-75 mb-6">Por favor, confirmanos antes de la fecha límite.</p>
          <RSVPForm eventId={props.eventId} theme={props.theme} />
        </section>

      </div>

      {/* Music Player */}
      <MusicPlayer 
        musicUrl={props.musicUrl} 
        theme={props.theme} 
        autoPlay={startMusic} 
      />

    </main>
  );
}
