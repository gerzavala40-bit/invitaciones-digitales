"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ImportExcelButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/rsvp/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        alert(data.message);
        router.refresh();
      } else {
        alert(data.error || "Error al importar");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input 
        type="file" 
        accept=".xlsx,.xls,.csv" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        {loading ? "Importando..." : "Importar Excel"}
      </button>
    </>
  );
}
