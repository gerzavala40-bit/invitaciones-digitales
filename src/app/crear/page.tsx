"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/components/templates";

export default function CrearInvitacionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    templateId: "boda-elegante-oscuro",
    title: "",
    eventType: "boda",
    eventDate: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        // Log in automatically
        const loginRes = await fetch("/api/auth/client-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        
        if (loginRes.ok) {
          router.push("/dashboard");
        } else {
          router.push("/cliente/login");
        }
      } else {
        alert(data.error || "Error al crear cuenta");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-black p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Crea tu Invitación Gratis</h1>
          <p className="text-gray-400 mt-2 text-sm">Prueba cómo se ve con tus datos antes de pagar</p>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-black -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }}></div>
            
            {[1, 2, 3].map((num) => (
              <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= num ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}>
                {num}
              </div>
            ))}
          </div>

          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {/* Paso 1: Diseño */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-semibold text-center mb-6">1. Elige un diseño</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(TEMPLATES).map(([id, t]) => (
                    <div 
                      key={id}
                      onClick={() => setFormData({ ...formData, templateId: id })}
                      className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${formData.templateId === id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <h3 className="font-bold">{t.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 2: Detalles */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-semibold text-center mb-6">2. Detalles del Evento</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Tipo de Evento</label>
                  <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-black focus:border-black">
                    <option value="boda">Boda</option>
                    <option value="15anos">Mis 15 Años</option>
                    <option value="cumpleanos">Cumpleaños</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Título / Nombres (Ej: María & Juan)</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-black focus:border-black" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Fecha del Evento</label>
                  <input type="date" name="eventDate" required value={formData.eventDate} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-black focus:border-black" />
                </div>
              </div>
            )}

            {/* Paso 3: Cuenta */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-semibold text-center mb-6">3. Crea tu cuenta</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Esta cuenta te servirá para ver tu invitación y administrar tu lista de invitados.</p>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Tu Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-black focus:border-black" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Crea una contraseña</label>
                  <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-black focus:border-black" />
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="px-6 py-2 border rounded-lg hover:bg-gray-50 font-medium">Atrás</button>
              ) : (
                <div></div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium disabled:opacity-50"
              >
                {loading ? "Procesando..." : step === 3 ? "Crear mi Invitación" : "Siguiente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
