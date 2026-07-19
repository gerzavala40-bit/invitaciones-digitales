"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
  className?: string;
  boxClassName?: string;
  numberClassName?: string;
  labelClassName?: string;
  finishedText?: string;
}

export default function Countdown({
  targetDate,
  className = "",
  boxClassName = "",
  numberClassName = "",
  labelClassName = "",
  finishedText = "¡El evento ha comenzado!",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setFinished(true); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (finished) {
    return <p className={`text-2xl font-bold ${className}`}>{finishedText}</p>;
  }

  const units = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <div className={`grid grid-cols-4 gap-3 ${className}`}>
      {units.map((unit) => (
        <div key={unit.label} className={`rounded-xl p-4 text-center ${boxClassName}`}>
          <span className={`block text-4xl md:text-5xl font-bold ${numberClassName}`}>
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className={`text-xs uppercase tracking-wider mt-1 block ${labelClassName}`}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
