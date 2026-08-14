'use client';
import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // ISO string e.g. "2026-12-31T23:59:59"
  theme?: 'dark' | 'light';
}

export default function Countdown({ targetDate, theme = 'dark' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isClient) return null; // Avoid hydration mismatch

  const boxBg = theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`flex justify-center gap-4 ${textColor}`}>
      {[
        { label: 'DÍAS', value: timeLeft.days },
        { label: 'HORAS', value: timeLeft.hours },
        { label: 'MINS', value: timeLeft.minutes },
        { label: 'SEGS', value: timeLeft.seconds }
      ].map((item, index) => (
        <div key={index} className={`flex flex-col items-center justify-center w-20 h-24 rounded-2xl border backdrop-blur-sm ${boxBg}`}>
          <span className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</span>
          <span className="text-xs tracking-widest mt-1 opacity-80">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
