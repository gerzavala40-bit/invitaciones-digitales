import React from "react";

interface EventStatsProps {
  totalEvents: number;
  activeEvents: number;
  totalRsvps: number;
}

export function EventStats({ totalEvents, activeEvents, totalRsvps }: EventStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Stat 1 */}
      <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/15 to-white/5 hover:from-purple-500/50 hover:to-white/5 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="bg-[#111111] p-6 rounded-[15px] h-full relative z-10 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 text-purple-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="text-sm font-medium text-white/50 tracking-wide uppercase">Total Eventos</p>
          </div>
          <p className="text-4xl font-bold text-white mt-auto">{totalEvents}</p>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/15 to-white/5 hover:from-emerald-500/50 hover:to-white/5 transition-all duration-500">
        <div className="bg-[#111111] p-6 rounded-[15px] h-full relative z-10 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-sm font-medium text-white/50 tracking-wide uppercase">Eventos Activos</p>
          </div>
          <p className="text-4xl font-bold text-emerald-400 mt-auto">{activeEvents}</p>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/15 to-white/5 hover:from-blue-500/50 hover:to-white/5 transition-all duration-500">
        <div className="bg-[#111111] p-6 rounded-[15px] h-full relative z-10 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 text-blue-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <p className="text-sm font-medium text-white/50 tracking-wide uppercase">Confirmaciones</p>
          </div>
          <p className="text-4xl font-bold text-blue-400 mt-auto">{totalRsvps}</p>
        </div>
      </div>
    </div>
  );
}
