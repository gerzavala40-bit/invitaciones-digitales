"use client";

import { useState, useRef } from "react";

export default function UploadDemoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1080;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to 70% quality JPEG
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      try {
        setUploading(true); // Mostrar algo mientras comprime si tarda un poco
        const compressed = await compressImage(selected);
        setPreview(compressed);
      } catch (err) {
        console.error("Compression failed", err);
        alert("Error procesando la foto");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpload = async () => {
    if (!preview) return;
    setUploading(true);

    try {
      // For the demo we just send the base64 string directly
      // In production, we compress it first and send to Vercel Blob / S3
      const res = await fetch("/api/demo-wall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preview, uploader: name }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Hubo un error subiendo la foto.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-ink-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-ink-900 mb-2">¡Foto subida!</h1>
        <p className="text-ink-600 mb-8">Mirá la pantalla gigante del salón, ¡ya debería aparecer tu foto!</p>
        <button
          onClick={() => { setSuccess(false); setFile(null); setPreview(null); }}
          className="h-12 px-6 rounded-full text-white bg-terracotta-600 font-semibold"
        >
          Subir otra foto
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-soft text-center border border-ink-100">
        <h1 className="font-display text-2xl text-ink-900 tracking-tight mb-2">Party Cam</h1>
        <p className="text-sm text-ink-500 mb-8">Compartí tus fotos de la fiesta en la pantalla gigante.</p>

        {!preview ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-square bg-ink-50 border-2 border-dashed border-ink-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-ink-100 transition mb-6"
          >
            <svg className="w-12 h-12 text-ink-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="font-medium text-ink-700">Tocar para sacar foto</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="mb-6 relative">
            <img src={preview} alt="Preview" className="w-full h-auto max-h-[300px] object-cover rounded-2xl shadow-sm" />
            <button 
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="text-left mb-8">
          <label className="block text-sm font-semibold text-ink-700 mb-2">Tu nombre (opcional)</label>
          <input 
            type="text" 
            placeholder="Ej: Familia Gómez" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-ink-50 border border-ink-200 outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500 transition"
          />
        </div>

        <button 
          onClick={handleUpload}
          disabled={!preview || uploading}
          className="w-full h-12 rounded-full text-white bg-terracotta-600 font-semibold disabled:opacity-50 hover:bg-terracotta-700 transition"
        >
          {uploading ? "Enviando..." : "Enviar a la pantalla"}
        </button>
      </div>
    </div>
  );
}
