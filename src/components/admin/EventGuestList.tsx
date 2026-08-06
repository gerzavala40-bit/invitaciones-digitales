import React from 'react';

interface EventGuestListProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function EventGuestList({ data, updateData, onNext, onBack }: EventGuestListProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Opciones de Invitados (RSVP)</h3>
        <p className="text-sm text-gray-500">Configura cómo tus invitados confirmarán su asistencia.</p>
      </div>

      <div className="space-y-4">
        <label className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-colors ${data.rsvpEnabled !== false ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
          <input 
            type="checkbox" 
            checked={data.rsvpEnabled !== false} 
            onChange={e => updateData({ rsvpEnabled: e.target.checked })} 
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
          />
          <div>
            <p className="font-semibold text-gray-900">Habilitar Confirmación de Asistencia (RSVP)</p>
            <p className="text-sm text-gray-500 mt-0.5">Muestra el formulario para que los invitados confirmen.</p>
          </div>
        </label>
        
        {data.rsvpEnabled !== false && (
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Límite de Confirmación</label>
              <input 
                type="date" 
                value={data.rsvpDeadline || ''} 
                onChange={e => updateData({ rsvpDeadline: e.target.value })} 
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-4 py-2.5 border" 
              />
              <p className="text-xs text-gray-500 mt-1.5">Si se deja vacío, no habrá límite de tiempo.</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={data.askForDiet === true} 
                  onChange={e => updateData({ askForDiet: e.target.checked })} 
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                />
                <span className="text-sm text-gray-700">Preguntar por restricciones alimentarias (Celiaco, Vegano, etc)</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t mt-8">
        <button onClick={onBack} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">Atrás</button>
        <button onClick={onNext} className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">Siguiente Paso</button>
      </div>
    </div>
  );
}
