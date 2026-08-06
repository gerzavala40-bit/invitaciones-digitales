import React, { useEffect, useState } from 'react';
import { TEMPLATES } from "@/components/templates";

interface EventTemplateSelectorProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function EventTemplateSelector({ data, updateData, onNext, onBack }: EventTemplateSelectorProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/template-suggestions?type=${data.eventType || 'boda'}`)
      .then(r => r.json())
      .then(res => {
        setSuggestions(res.suggestions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [data.eventType]);

  // Si falló la API, mostramos al menos las hardcodeadas en base a TEMPLATES
  const templatesToShow = suggestions.length > 0 
    ? suggestions 
    : Object.keys(TEMPLATES || {}).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Sugerencias para tu evento</h3>
          <p className="text-sm text-gray-500">Hemos filtrado las mejores plantillas para {data.eventType || 'boda'}</p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templatesToShow.map(t => {
            const templateInfo = TEMPLATES?.[t as keyof typeof TEMPLATES];
            return (
              <button 
                key={t} 
                onClick={() => updateData({ templateId: t })}
                className={`p-4 border-2 rounded-xl flex flex-col gap-3 transition-all text-left ${data.templateId === t ? 'border-purple-500 bg-purple-50/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="w-full aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-medium uppercase tracking-wider">{t}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">{templateInfo?.name || t}</span>
                  <span className="text-xs text-gray-500 block truncate">{templateInfo?.description || 'Plantilla Premium'}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
      
      <div className="flex justify-between pt-6 border-t mt-8">
        <button onClick={onBack} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">Atrás</button>
        <button onClick={onNext} disabled={!data.templateId} className="bg-black text-white px-6 py-2.5 rounded-lg disabled:opacity-50 font-medium hover:bg-gray-800 transition">Siguiente Paso</button>
      </div>
    </div>
  );
}
