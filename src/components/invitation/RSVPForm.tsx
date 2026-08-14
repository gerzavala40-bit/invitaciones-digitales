'use client';
import { useState } from 'react';

interface RSVPFormProps {
  eventId: string;
  theme?: 'dark' | 'light';
}

export default function RSVPForm({ eventId, theme = 'dark' }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    asiste: 'Si',
    name: '',
    diet: 'Sin restricciones',
    tshirt: 'M'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          guestName: formData.name,
          confirmed: formData.asiste === 'Si',
          dietaryNotes: formData.diet,
          // You can map other specific fields like tshirt into songRequest or another text field, 
          // or extend the Prisma schema. For now, adding it to dietaryNotes or similar.
          songRequest: `Talle: ${formData.tshirt}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Ocurrió un error al enviar tu confirmación.');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rsvp-success-msg p-6 border border-green-500 rounded-2xl bg-green-900/20 text-center">
        <h3 className="text-xl font-bold text-white mb-2">¡Confirmación Enviada! 🎉</h3>
        <p className="text-gray-300">Tus datos han sido guardados correctamente en la lista de invitados.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rsvp-form-container ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
      <div className="form-group mb-6 text-left">
        <label className="block mb-2 font-bold opacity-80">¿Asistís? *</label>
        <div className="form-radio-group flex gap-4">
          <label className={`form-radio-card flex-1 p-3 border rounded-xl text-center cursor-pointer transition-all ${formData.asiste === 'Si' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-600'}`}>
            <input type="radio" name="asiste" value="Si" checked={formData.asiste === 'Si'} onChange={handleChange} className="hidden" />
            <div className="form-radio-card-ui font-semibold">Sí, obvio 🍻</div>
          </label>
          <label className={`form-radio-card flex-1 p-3 border rounded-xl text-center cursor-pointer transition-all ${formData.asiste === 'No' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-600'}`}>
            <input type="radio" name="asiste" value="No" checked={formData.asiste === 'No'} onChange={handleChange} className="hidden" />
            <div className="form-radio-card-ui font-semibold">No puedo 😢</div>
          </label>
        </div>
      </div>
      
      <div className="form-group mb-6 text-left">
        <label className="block mb-2 font-bold opacity-80">Tu Nombre *</label>
        <input 
          type="text" 
          name="name"
          value={formData.name} 
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-pink-500 outline-none transition-all" 
          placeholder="Ej: Santiago Perez" 
          required 
        />
      </div>
      
      <div className="form-group mb-6 text-left">
        <label className="block mb-2 font-bold opacity-80">Restricciones Alimenticias</label>
        <select 
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-gray-800 border border-white/10 focus:border-pink-500 outline-none transition-all text-white"
        >
          <option value="Sin restricciones">Sin restricciones</option>
          <option value="Vegetariano">Vegetariano</option>
          <option value="Vegano">Vegano</option>
          <option value="Celíaco">Celíaco</option>
          <option value="Otros">Otros (avisar por chat)</option>
        </select>
      </div>
      
      <div className="form-group mb-8 text-left">
        <label className="block mb-2 font-bold opacity-80">Talle de Remera *</label>
        <select 
          name="tshirt"
          value={formData.tshirt}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-gray-800 border border-white/10 focus:border-pink-500 outline-none transition-all text-white"
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full p-4 rounded-full bg-pink-500 font-bold text-white uppercase tracking-widest hover:bg-pink-600 transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Guardando...' : 'Confirmar Asistencia'}
      </button>
    </form>
  );
}
