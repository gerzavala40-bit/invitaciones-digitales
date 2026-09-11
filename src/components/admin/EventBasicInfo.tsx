import React from 'react';

interface EventBasicInfoProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

export function EventBasicInfo({ data, updateData, onNext }: EventBasicInfoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
          <input required type="text" value={data.title || ''} onChange={e => updateData({ title: e.target.value })} className="w-full border rounded-lg px-4 py-2" placeholder="Ej: Boda de Ana y Juan" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
          <select value={data.eventType || 'boda'} onChange={e => updateData({ eventType: e.target.value })} className="w-full border rounded-lg px-4 py-2">
            <option value="boda">Boda</option>
            <option value="15anos">15 Años</option>
            <option value="cumpleanos">Cumpleaños</option>
            <option value="bautismo">Bautismo</option>
            <option value="corporativo">Corporativo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input required type="date" value={data.eventDate || ''} onChange={e => updateData({ eventDate: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hora (opcional)</label>
          <input type="time" value={data.eventTime || ''} onChange={e => updateData({ eventTime: e.target.value })} className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Salón / Ubicación (Nombre)</label>
          <input required type="text" value={data.venueName || ''} onChange={e => updateData({ venueName: e.target.value })} className="w-full border rounded-lg px-4 py-2" placeholder="Ej: Estancia Las Rosas" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección del Salón</label>
          <input required type="text" value={data.venueAddress || ''} onChange={e => updateData({ venueAddress: e.target.value })} className="w-full border rounded-lg px-4 py-2" placeholder="Av. Siempre Viva 123" />
        </div>
      </div>
      <div className="flex justify-end pt-4 border-t">
        <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition font-medium">Siguiente Paso</button>
      </div>
    </form>
  );
}
