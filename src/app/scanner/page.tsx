"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface ScanResult {
  success: boolean;
  message: string;
  guestName?: string;
  guestCount?: number;
  status?: string;
  error?: string;
}

export default function ScannerPage() {
  const [eventSlug, setEventSlug] = useState("");
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scannerReady, setScannerReady] = useState(true);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Authentication: verify event slug + PIN
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventSlug.trim()) {
      setAuthError("Ingresa el codigo del evento");
      return;
    }
    if (pin.length !== 4) {
      setAuthError("El PIN debe tener 4 digitos");
      return;
    }
    setAuthLoading(true);
    setAuthError("");

    try {
      // Verify credentials by making a test call with a dummy QR
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrCode: "__auth_check__", pin, eventSlug: eventSlug.trim() }),
      });
      const data = await res.json();

      // If PIN is wrong (401) or event not found (404), show error
      if (res.status === 401) {
        setAuthError("PIN incorrecto");
        setAuthLoading(false);
        return;
      }
      if (res.status === 404 && data.error === "Evento no encontrado") {
        setAuthError("Evento no encontrado. Verifica el codigo.");
        setAuthLoading(false);
        return;
      }

      // If we get 404 for QR not found or 400, it means auth passed
      // (the dummy QR won't exist but credentials are valid)
      setAuthenticated(true);
    } catch {
      setAuthError("Error de conexion. Intenta de nuevo.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle scan result and confirm entry
  const handleConfirmEntry = useCallback(async (qrCode: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrCode, pin, eventSlug: eventSlug.trim() }),
      });
      const data = await res.json();

      if (!res.ok && !data.success && data.success !== false) {
        setScanResult({
          success: false,
          message: data.error || "Error desconocido",
          status: "error",
        });
      } else {
        setScanResult(data);
      }
    } catch {
      setScanResult({ success: false, message: "Error de conexion", status: "error" });
    } finally {
      setLoading(false);
    }
  }, [pin, eventSlug]);

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
    if (!authenticated || !scanning || !scannerReady || scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "scanner-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    scannerRef.current = scanner;

    async function onScanSuccess(decodedText: string) {
      setScanning(false);
      await handleConfirmEntry(decodedText);
    }

    scanner.render(onScanSuccess, () => {
      // Ignore scan errors (camera noise)
    });

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
      scannerRef.current = null;
    };
  }, [authenticated, scanning, scannerReady, handleConfirmEntry]);

  // Authentication screen: event slug + PIN
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Scanner de Acceso</h1>
            <p className="text-gray-400 mt-2">Ingresa los datos del evento para comenzar</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Codigo del evento (slug)</label>
              <input
                type="text"
                value={eventSlug}
                onChange={(e) => {
                  setEventSlug(e.target.value);
                  setAuthError("");
                }}
                placeholder="ej: boda-maria-y-pedro"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 text-lg"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">PIN de acceso (4 digitos)</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                pattern="[0-9]*"
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPin(val);
                  setAuthError("");
                }}
                placeholder="****"
                className="w-full text-center text-4xl tracking-[0.5em] bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/50"
              />
            </div>

            {authError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3">
                <p className="text-red-400 text-sm text-center">{authError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? "VERIFICANDO..." : "INGRESAR"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Scanner screen
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Scanner de Acceso</h1>
          <p className="text-gray-500 text-sm mt-1">{eventSlug}</p>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-400">Verificando...</p>
          </div>
        )}

        {scanResult && !loading ? (
          <div className="mb-8">
            {scanResult.status === "admitted" ? (
              <div className="bg-green-900/30 border-2 border-green-500 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-400 mb-3">{scanResult.guestName}</h2>
                <div className="bg-green-500/20 rounded-xl py-3 px-4 mb-4">
                  <p className="text-2xl font-bold text-green-300">
                    {scanResult.guestCount} {scanResult.guestCount === 1 ? "persona" : "personas"}
                  </p>
                </div>
                <p className="text-lg font-semibold text-green-400">ACCESO AUTORIZADO</p>
              </div>
            ) : scanResult.status === "already_attended" ? (
              <div className="bg-yellow-900/30 border-2 border-yellow-500 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-yellow-400 mb-3">{scanResult.guestName}</h2>
                <div className="bg-yellow-500/20 rounded-xl py-3 px-4 mb-4">
                  <p className="text-2xl font-bold text-yellow-300">
                    {scanResult.guestCount} {scanResult.guestCount === 1 ? "persona" : "personas"}
                  </p>
                </div>
                <p className="text-lg font-semibold text-yellow-400">YA INGRESO PREVIAMENTE</p>
              </div>
            ) : (
              <div className="bg-red-900/30 border-2 border-red-500 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-red-400">{scanResult.message || scanResult.error}</p>
              </div>
            )}

            <button
              onClick={handleScanNext}
              className="mt-6 w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition text-lg"
            >
              ESCANEAR SIGUIENTE
            </button>
          </div>
        ) : !loading ? (
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div id="scanner-reader" className="w-full"></div>
            <p className="text-center text-gray-400 p-4 text-sm">
              Apunta la camara al codigo QR del invitado
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
