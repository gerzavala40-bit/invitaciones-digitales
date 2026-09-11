"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressStepper } from "@/components/ui/ProgressStepper";
import { EventBasicInfo } from "@/components/admin/EventBasicInfo";
import { EventTemplateSelector } from "@/components/admin/EventTemplateSelector";
import { EventGuestList } from "@/components/admin/EventGuestList";
import { EventReview } from "@/components/admin/EventReview";

const STEPS = [
  { id: "basic", title: "Información Básica" },
  { id: "template", title: "Plantilla" },
  { id: "guests", title: "Invitados" },
  { id: "review", title: "Revisar y Crear" },
];

export default function NewEventWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({
    eventType: 'boda',
    rsvpEnabled: true
  });
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);

  const updateData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setCreatedUrl(result.url);
      } else {
        alert("Error al crear evento: " + (result.error || ''));
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
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Evento creado!</h2>
          <p className="text-gray-500 mb-6">Tu invitación ya está lista</p>
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

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <ProgressStepper steps={STEPS} currentStep={currentStep} />
          
          <div className="mt-8">
            {currentStep === 0 && <EventBasicInfo data={formData} updateData={updateData} onNext={nextStep} />}
            {currentStep === 1 && <EventTemplateSelector data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 2 && <EventGuestList data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 3 && <EventReview data={formData} onBack={prevStep} onSubmit={handleSubmit} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
}
