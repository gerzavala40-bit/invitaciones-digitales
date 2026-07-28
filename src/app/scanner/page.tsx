"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface ScanResult {
  success: boolean;
  message: string;
  guestName?: string;
  guestCount?: number;
}

export default function ScannerPage() {
  const [pin, setPin] = useState("");
  const [pinVerified, setPinVerified] = useState(false);
  const [pinError, setPinError] = useState("");
  const [scanning, setScanning] = useState(true);
  const [scannerReady, setScannerReady] = useState(true);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // PIN verification
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setPinError("El PIN debe tener 4 digitos");
      return;
    }
    // Store PIN and proceed - the actual verification happens when scanning
    setPinVerified(true);
    setPinError("");
  };

  // Handle resuming scanner after result dismissal
  const handleScanNext = useCallback(() => {
    setScanResult(null);
    setScannerReady(false);
    // Delay to allow camera release before re-initializing
    setTimeout(() => {
      setScannerReady(true);
      setScanning(true);
    }, 500);
  }, []);

  // QR Scanner
  useEffect(() => {
    if (!pinVerified || !scanning || !scannerReady || scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "scanner-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    scannerRef.current = scanner;

    async function onScanSuccess(decodedText: string) {
      setScanning(false);
      setLoading(true);

      try {
        const res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qrCode: decodedText, pin }),
        });
        const data = await res.json();
        setScanResult(data);
      } catch {
        setScanResult({ success: false, message: "Error de conexion" });
      } finally {
        setLoading(false);
      }
    }

    scanner.render(onScanSuccess, () => {
      // Ignore scan errors
    });

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
      scannerRef.current = null;
    };
  }, [pinVerified, scanning, scannerReady, pin]);

  // PIN entry screen
  if (!pinVerified) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Scanner de Acceso</h1>
            <p className="text-gray-400 mt-2">Ingresa el PIN para continuar</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPin(val);
                setPinError("");
              }}
              placeholder="****"
              className="w-full text-center text-4xl tracking-[0.5em] bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/50"
              autoFocus
            />
            {pinError && (
              <p className="text-red-400 text-sm text-center">{pinError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition"
            >
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Scanner screen
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Scanner de Acceso</h1>

      {loading && (
        <div className="w-full max-w-sm p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-400">Verificando...</p>
        </div>
      )}

      {scanResult && !loading ? (
        <div
          className={`w-full max-w-sm p-8 rounded-xl shadow-2xl text-center mb-8 ${
            scanResult.success
              ? "bg-green-600/20 border border-green-500"
              : "bg-red-600/20 border border-red-500"
          }`}
        >
          {scanResult.success ? (
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
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
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-4">{scanResult.message}</h2>
            </>
          )}

          <button
            onClick={handleScanNext}
            className="mt-8 w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            ESCANEAR SIGUIENTE
          </button>
        </div>
      ) : !loading ? (
        <div className="w-full max-w-sm bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div id="scanner-reader" className="w-full"></div>
          <p className="text-center text-gray-400 p-4 text-sm">
            Apunta la camara al codigo QR del invitado
          </p>
        </div>
      ) : null}
    </div>
  );
}
