"use client";

import { useState } from "react";

interface RsvpFormProps {
  eventSlug: string;
  inputClassName?: string;
  buttonClassName?: string;
  labelClassName?: string;
}

export default function RsvpForm({ eventSlug, inputClassName = "", buttonClassName = "", labelClassName = "" }: RsvpFormProps) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      eventSlug,
      guestName: formData.get("nombre") as string,
      guestCount: parseInt(formData.get("personas") as string) || 1,
      dietaryNotes: formData.get("alimentacion") as string,
      songRequest: formData.get("cancion") as string,
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const responseData = await res.json();
        setSuccess(true);
        setQrCode(responseData.qrCode || null);
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      alert("Error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm mb-1 ${labelClassName}`}>Nombre completo</label>
        <input type="text" name="nombre" required className={`w-full px-4 py-3 rounded-lg ${inputClassName}`} />
      </div>
      <div>
        <label className={`block text-sm mb-1 ${labelClassName}`}>Cantidad de personas</label>
        <select name="personas" required className={`w-full px-4 py-3 rounded-lg ${inputClassName}`}>
          <option value="">Seleccionar</option>
          <option value="1">1 persona</option>
          <option value="2">2 personas</option>
          <option value="3">3 personas</option>
          <option value="4">4+ personas</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm mb-1 ${labelClassName}`}>Restricción alimentaria</label>
        <input type="text" name="alimentacion" placeholder="Ej: vegano, celíaco, ninguna" className={`w-full px-4 py-3 rounded-lg ${inputClassName}`} />
      </div>
      <div>
        <label className={`block text-sm mb-1 ${labelClassName}`}>Canción infaltable</label>
        <input type="text" name="cancion" placeholder="Artista - Nombre" className={`w-full px-4 py-3 rounded-lg ${inputClassName}`} />
      </div>
      <button type="submit" disabled={loading} className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${buttonClassName} ${loading ? "opacity-50" : ""}`}>
        {loading ? "Enviando..." : "Confirmar Asistencia"}
      </button>
      {success && (
        <div className="text-center mt-2">
          <p className="text-green-500 text-sm animate-pulse">✓ Confirmación enviada correctamente</p>
          {qrCode && (
            <a
              href={`/mi-entrada/${qrCode}`}
              className="inline-block mt-2 text-sm underline text-blue-400 hover:text-blue-300"
            >
              Ver mi entrada QR
            </a>
          )}
        </div>
      )}
    </form>
  );
}
