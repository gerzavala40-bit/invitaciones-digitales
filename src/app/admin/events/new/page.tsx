"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/components/templates";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string | boolean> = {};
    formData.forEach((value, key) => { data[key] = value as string; });
    data.rsvpEnabled = formData.get("rsvpEnabled") === "on";

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setCreatedUrl(result.url);
      } else {
        alert("Error al crear evento");
      }
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (createdUrl) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Evento creado!</h2>
          <p className="text-gray-500 mb-6">Tu invitación ya está online</p>
          <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <code className="text-sm text-gray-800">{typeof window !== "undefined" ? window.location.origin : ""}{createdUrl}</code>
          </div>
          <div className="flex gap-3">
            <a href={createdUrl} target="_blank" className="flex-1 bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition text-center">
              Ver invitación
            </a>
            <button onClick={() => router.push("/admin")} className="flex-1 border border-gray-300 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition">
              Ir al panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => router.push("/admin")} className="text-gray-500 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Crear Nuevo Evento</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* DATOS BASICOS */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Datos del evento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título (Ej: Valentina & Matías)</label>
                <input type="text" name="title" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de evento</label>
                <select name="eventType" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black">
                  <option value="boda">Boda</option>
                  <option value="15anos">15 Años</option>
                  <option value="bautismo">Bautismo</option>
                  <option value="cumpleanos">Cumpleaños</option>
                  <option value="corporativo">Corporativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                <select name="templateId" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black">
                  {Object.entries(TEMPLATES).map(([id, t]) => (
                    <option key={id} value={id}>{t.name} - {t.description}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del evento</label>
                <input type="datetime-local" name="eventDate" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora (Ej: 21:00)</label>
                <input type="text" name="eventTime" required placeholder="21:00" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
            </div>
          </section>

          {/* UBICACION */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Ubicación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del salón</label>
                <input type="text" name="venueName" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input type="text" name="venueAddress" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coordenadas (lat,lng) - opcional</label>
                <input type="text" name="venueLatLng" placeholder="-31.4201,-64.1888" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dress Code (opcional)</label>
                <input type="text" name="dressCode" placeholder="Elegante formal" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ceremonia - Nombre (opcional)</label>
                <input type="text" name="ceremonyName" placeholder="Parroquia San José" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ceremonia - Dirección</label>
                <input type="text" name="ceremonyAddress" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
            </div>
          </section>

          {/* FINANZAS */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Sección Regalos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alias</label>
                <input type="text" name="bankAlias" placeholder="nombre.apellido.mp" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CBU (opcional)</label>
                <input type="text" name="bankCBU" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Titular de la cuenta</label>
                <input type="text" name="bankHolder" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
            </div>
          </section>

          {/* CONFIG */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Configuración</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="rsvpEnabled" defaultChecked className="w-5 h-5 rounded border-gray-300" />
                <span className="text-sm text-gray-700">Habilitar confirmación de asistencia (RSVP)</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha límite RSVP (opcional)</label>
                <input type="text" name="rsvpDeadline" placeholder="1 de Noviembre" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" />
              </div>
            </div>
          </section>

          {/* SUBMIT */}
          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white text-lg transition ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}>
            {loading ? "Creando..." : "Crear Evento y Generar URL"}
          </button>
        </form>
      </div>
    </div>
  );
}
