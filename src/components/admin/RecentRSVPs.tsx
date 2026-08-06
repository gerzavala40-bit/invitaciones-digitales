import React from 'react';

interface RecentRSVPsProps {
  rsvps: any[];
}

export function RecentRSVPs({ rsvps }: RecentRSVPsProps) {
  return (
    <div className="bg-[#111111] rounded-[15px] p-6 border border-white/5 h-full">
      <h3 className="text-lg font-medium text-white/90 mb-4">Últimas Confirmaciones</h3>
      {rsvps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-sm text-white/40">No hay confirmaciones recientes.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {rsvps.map((rsvp, idx) => (
            <li key={idx} className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0 group">
              <div>
                <span className="text-white/80 block group-hover:text-white transition-colors">{rsvp.guestName}</span>
                <span className="text-xs text-white/30">{rsvp.eventName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">{rsvp.guestCount} {rsvp.guestCount === 1 ? 'persona' : 'personas'}</span>
                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${rsvp.confirmed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {rsvp.confirmed ? 'Va' : 'No va'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
