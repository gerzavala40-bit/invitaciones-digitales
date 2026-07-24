"use client";

import { EventData } from "../templates/types";

export default function Timeline({ event, className = "" }: { event: EventData; className?: string }) {
  if (!event.timeline || event.timeline.length === 0) return null;

  // Icons map
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case "rings": return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9a9 9 0 01-9 9zm0-14a5 5 0 100 10 5 5 0 000-10z"></path></svg>;
      case "glass": return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 4h14M8 4v7a4 4 0 004 4v5m0 0v2m0-2h-3m3 0h3"></path></svg>;
      case "camera": return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
      case "music": return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>;
      default: return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <h2 className="text-3xl font-display text-center mb-10">Itinerario</h2>
      
      <div className="relative">
        {/* Linea vertical */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-current opacity-20 -translate-x-1/2"></div>
        
        <div className="space-y-8">
          {event.timeline.map((item, i) => (
            <div key={item.id} className={`relative flex items-center md:justify-between w-full fade-in ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              
              {/* Icono central */}
              <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-[#111] border border-current -translate-x-1/2 flex items-center justify-center z-10 text-current">
                {renderIcon(item.icon || "clock")}
              </div>
              
              {/* Contenido (Derecha en mobile, alternado en desktop) */}
              <div className="w-full md:w-[45%] pl-16 md:pl-0">
                <div className={`bg-white/5 border border-white/10 p-4 rounded-lg shadow-sm ${i % 2 === 0 ? "md:text-right" : "text-left"}`}>
                  <p className="text-sm font-bold opacity-70 mb-1">{item.time}</p>
                  <h3 className="text-lg font-display mb-1">{item.title}</h3>
                  {item.description && <p className="text-sm opacity-60">{item.description}</p>}
                </div>
              </div>
              
              {/* Espaciador invisible para desktop */}
              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
