import React from 'react';
import Link from 'next/link';

export function QuickActions() {
  return (
    <div className="bg-[#111111] rounded-[15px] p-6 border border-white/5 h-full">
      <h3 className="text-lg font-medium text-white/90 mb-4">Acciones Rápidas</h3>
      <div className="space-y-3">
        <Link href="/admin/events/new" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/80 group">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <span className="group-hover:text-white transition-colors">Crear Nuevo Evento</span>
        </Link>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/80 text-left group">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          </div>
          <span className="group-hover:text-white transition-colors">Exportar RSVPs Generales</span>
        </button>
        <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/80 group">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
          </div>
          <span className="group-hover:text-white transition-colors">Configuración Global</span>
        </Link>
      </div>
    </div>
  );
}
