import React from 'react';

interface EventReviewProps {
  data: any;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export function EventReview({ data, onBack, onSubmit, loading }: EventReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Revisión Final</h3>
        <p className="text-sm text-gray-500">Revisa que todos los datos sean correctos antes de generar la invitación.</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-6 border border-gray-200">
        
        {/* Info Básica */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Información Principal</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">Título del Evento</p>
              <p className="font-semibold text-gray-900">{data.title || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Tipo</p>
              <p className="font-semibold text-gray-900 capitalize">{data.eventType || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Fecha</p>
              <p className="font-semibold text-gray-900">{data.eventDate || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Hora</p>
              <p className="font-semibold text-gray-900">{data.eventTime || '-'}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Ubicación */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ubicación</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2">
              <p className="text-gray-500 mb-0.5">Salón</p>
              <p className="font-semibold text-gray-900">{data.venueName || '-'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500 mb-0.5">Dirección</p>
              <p className="font-semibold text-gray-900">{data.venueAddress || '-'}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Diseño y Config */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Diseño & Configuración</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">Plantilla Elegida</p>
              <p className="font-semibold text-gray-900">{data.templateId || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">RSVP</p>
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${data.rsvpEnabled !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {data.rsvpEnabled !== false ? 'Habilitado' : 'Deshabilitado'}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-between pt-6 border-t mt-8">
        <button onClick={onBack} disabled={loading} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition disabled:opacity-50">
          Atrás
        </button>
        <button 
          onClick={onSubmit} 
          disabled={loading} 
          className="bg-emerald-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Creando...
            </>
          ) : (
            'Crear Evento'
          )}
        </button>
      </div>
    </div>
  );
}
