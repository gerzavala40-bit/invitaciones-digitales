"use client";

import { useEffect, useState, use, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function DoorScanner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; guestName?: string; guestCount?: number } | null>(null);
  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scanning || scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    scannerRef.current = scanner;

    async function onScanSuccess(decodedText: string) {
      setScanning(false);
      // Remove scanner.pause(true) because it crashes when scanning a file
      
      try {
        const res = await fetch("/api/checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rsvpId: decodedText }),
        });
        const data = await res.json();
        setScanResult(data);
      } catch (error) {
        setScanResult({ success: false, message: "Error de conexión" });
      }
    }

    scanner.render(onScanSuccess, (error) => {
      // Ignorar errores
    });

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
      scannerRef.current = null;
    };
  }, [scanning]);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Control de Acceso</h1>
      
      {scanResult ? (
        <div className={`w-full max-w-sm p-8 rounded-xl shadow-2xl text-center mb-8 ${scanResult.success ? "bg-green-600/20 border border-green-500" : "bg-red-600/20 border border-red-500"}`}>
          {scanResult.success ? (
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-3xl font-bold text-green-400 mb-2">{scanResult.guestName}</h2>
              <p className="text-xl text-green-200 mb-4">{scanResult.guestCount} persona(s)</p>
              <p className="font-semibold text-green-400 bg-green-900/50 px-4 py-2 rounded-full inline-block">
                ACCESO AUTORIZADO
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-4">{scanResult.message || (scanResult as any).error}</h2>
            </>
          )}

          <button 
            onClick={() => {
              setScanResult(null);
              setScanning(true);
            }} 
            className="mt-8 w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            ESCANEAR OTRO
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div id="reader" className="w-full"></div>
          <p className="text-center text-gray-400 p-4 text-sm">Apunta la cámara al código QR del invitado</p>
        </div>
      )}
    </div>
  );
}
