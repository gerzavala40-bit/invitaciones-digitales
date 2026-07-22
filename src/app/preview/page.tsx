"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PreviewContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "/";

  // Redirigir directamente al HTML en celulares
  useEffect(() => {
    if (window.innerWidth < 768 && url !== "/") {
      window.location.replace(url);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-ink-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="fixed top-0 inset-x-0 h-16 bg-white border-b border-ink-200 z-50 flex items-center justify-between px-6 shadow-sm">
        <Link href="/" className="font-display text-xl tracking-tight text-ink-900">
          Te <em className="italic text-terracotta-600">invito</em>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold text-ink-600 hover:text-ink-900 transition">
            Volver a estilos
          </Link>
          <Link href="/#pedido" className="h-9 px-4 rounded-full text-sm font-semibold text-white bg-terracotta-600 hover:bg-terracotta-700 flex items-center transition shadow-soft">
            Pedir este diseño
          </Link>
        </div>
      </div>

      <div className="mt-16 relative w-[390px] h-[844px] bg-[#1a1a1a] rounded-[55px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-[14px] border-[4px] border-[#333]">
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-[#1a1a1a] rounded-b-[24px] z-20 flex justify-center pt-2">
           <div className="w-16 h-1.5 rounded-full bg-white/10"></div>
        </div>
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
          <iframe src={url} className="w-full h-full border-none" allow="autoplay; fullscreen" />
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-100 flex items-center justify-center font-display text-ink-500 text-lg">Cargando vista previa...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
