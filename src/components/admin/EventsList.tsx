import React from "react";
import Link from "next/link";

interface EventsListProps {
  events: any[]; // Se puede tipar mejor según Prisma
}

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/15 to-white/5">
      <div className="bg-[#111111] rounded-[15px] h-full w-full overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <h2 className="text-lg font-medium text-white/90">Gestión de Eventos</h2>
        </div>
        
        {events.length === 0 ? (
          <div className="px-6 py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="text-lg text-white/60 mb-3">No hay eventos creados todavía</p>
            <Link href="/admin/events/new" className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium hover:underline underline-offset-4">
              Comienza creando tu primer evento
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {events.map((event) => (
              <div key={event.id} className="group px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.04] transition-colors duration-300 gap-4">
                
                {/* Event Info */}
                <div>
                  <p className="font-medium text-white/90 text-lg group-hover:text-purple-400 transition-colors">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-sm text-white/40">
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> /{event.slug}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="uppercase tracking-wider text-[11px]">{event.templateId}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{new Date(event.eventDate).toLocaleDateString("es-AR", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="flex flex-wrap items-center gap-4">
                  
                  {/* Status Badge */}
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
                    event.isActive 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                      : "bg-white/5 text-white/50 border-white/10"
                  }`}>
                    {event.isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                    {event.isActive ? "Activo" : "Inactivo"}
                  </span>
                  
                  {/* RSVP Badge */}
                  <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    {event._count?.rsvps || 0}
                  </span>

                  <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

                  {/* Action Links */}
                  <Link 
                    href={`/${event.slug}`} 
                    target="_blank" 
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Ver Web
                  </Link>
                  
                  <Link 
                    href={`/admin/events/${event.id}`} 
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Gestionar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
