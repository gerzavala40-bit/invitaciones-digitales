'use client';
import { useRef, useState, useEffect } from 'react';

interface MusicPlayerProps {
  musicUrl: string;
  autoPlay?: boolean;
  theme?: 'dark' | 'light';
  onPlayStart?: () => void;
}

export default function MusicPlayer({ musicUrl, autoPlay = false, theme = 'dark', onPlayStart }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Allow parent components (like a Splash Screen) to trigger play
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          if (onPlayStart) onPlayStart();
        })
        .catch(e => console.log("Auto-play prevented by browser:", e));
    }
  }, [autoPlay, onPlayStart]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const btnBg = theme === 'dark' ? 'bg-pink-500' : 'bg-gray-200';
  const iconColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      <button 
        onClick={toggleMusic}
        className={`music-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${btnBg} ${isPlaying ? 'animate-pulse' : ''}`}
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> // Pause Icon
        ) : (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> // Play Icon
        )}
      </button>
    </>
  );
}
