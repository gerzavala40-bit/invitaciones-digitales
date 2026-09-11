"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Participant {
  id: string;
  nickname: string;
  tableNumber: string;
  avatarColor: string;
  isOnline: boolean;
  lastSeen: string;
}

interface RecentMessage {
  id: string;
  message: string;
  messageType: string;
  createdAt: string;
  sender: {
    nickname: string;
    tableNumber: string;
    avatarColor: string;
  };
}

interface ChatAdminPanelProps {
  eventId: string;
  eventSlug: string;
  chatEnabled: boolean;
  participants: Participant[];
  recentMessages: RecentMessage[];
}

export default function ChatAdminPanel({
  eventId,
  eventSlug,
  chatEnabled,
  participants,
  recentMessages,
}: ChatAdminPanelProps) {
  const [isChatEnabled, setIsChatEnabled] = useState(chatEnabled);
  const [toggling, setToggling] = useState(false);
  const [qrFrom, setQrFrom] = useState("1");
  const [qrTo, setQrTo] = useState("20");
  const [generatedQrs, setGeneratedQrs] = useState<{ tableNumber: string; chatUrl: string }[]>([]);
  const [generatingQrs, setGeneratingQrs] = useState(false);
  const [showQrSection, setShowQrSection] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  // Toggle chat enabled/disabled
  const handleToggleChat = async () => {
    setToggling(true);
    try {
      const res = await fetch(`/api/admin/chat/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, enabled: !isChatEnabled }),
      });
      if (res.ok) {
        setIsChatEnabled(!isChatEnabled);
      }
    } catch (err) {
      console.error("Error toggling chat:", err);
    } finally {
      setToggling(false);
    }
  };

  // Generate QR codes for tables
  const handleGenerateQrs = () => {
    const from = parseInt(qrFrom);
    const to = parseInt(qrTo);
    if (isNaN(from) || isNaN(to) || from > to || to - from > 100) {
      alert("Rango inválido (máximo 100 mesas)");
      return;
    }

    setGeneratingQrs(true);
    const qrs: { tableNumber: string; chatUrl: string }[] = [];
    for (let i = from; i <= to; i++) {
      qrs.push({
        tableNumber: String(i),
        chatUrl: `${baseUrl}/chat/${eventSlug}?mesa=${i}`,
      });
    }
    setGeneratedQrs(qrs);
    setGeneratingQrs(false);
  };

  // Print QRs
  const handlePrintQrs = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Toggle Chat */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Habilitar Chat</h2>
            <p className="text-sm text-gray-500 mt-1">
              Activá o desactivá el chat en tiempo real para tu evento
            </p>
          </div>
          <button
            onClick={handleToggleChat}
            disabled={toggling}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isChatEnabled ? "bg-green-500" : "bg-gray-300"
            } ${toggling ? "opacity-50" : ""}`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                isChatEnabled ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* QR Generator */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">🎫 Generar QR por Mesa</h2>
            <p className="text-sm text-gray-500 mt-1">
              Generá códigos QR para las tarjetas de cada mesa. Los invitados escanean y entran al chat.
            </p>
          </div>
          <button
            onClick={() => setShowQrSection(!showQrSection)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showQrSection ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {showQrSection && (
          <div>
            {/* Range selector */}
            <div className="flex items-center gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Desde mesa</label>
                <input
                  type="number"
                  min="1"
                  value={qrFrom}
                  onChange={(e) => setQrFrom(e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Hasta mesa</label>
                <input
                  type="number"
                  min="1"
                  value={qrTo}
                  onChange={(e) => setQrTo(e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
              <div className="self-end">
                <button
                  onClick={handleGenerateQrs}
                  disabled={generatingQrs}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  Generar QRs
                </button>
              </div>
            </div>

            {/* Generated QRs */}
            {generatedQrs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    {generatedQrs.length} QR generados • Listos para imprimir
                  </p>
                  <button
                    onClick={handlePrintQrs}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimir todos
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-6">
                  {generatedQrs.map((qr) => (
                    <div
                      key={qr.tableNumber}
                      className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center print:border-black print:break-inside-avoid"
                    >
                      <p className="text-xs text-gray-500 mb-2 print:text-black">Party Chat</p>
                      <QRCodeSVG
                        value={qr.chatUrl}
                        size={120}
                        level="M"
                        className="mx-auto"
                      />
                      <div className="mt-2 bg-gray-900 text-white rounded-lg py-2">
                        <p className="text-lg font-bold">Mesa {qr.tableNumber}</p>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1 break-all print:text-black">
                        Escaneá para chatear 💬
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Participants */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">👥 Participantes ({participants.length})</h2>

        {participants.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            Nadie se conectó al chat todavía
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {participants.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: p.avatarColor }}
                  >
                    {p.nickname.charAt(0).toUpperCase()}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      p.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{p.nickname}</p>
                  <p className="text-xs text-gray-500">Mesa {p.tableNumber}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      p.isOnline
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.isOnline ? "En línea" : "Desconectado"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">💬 Últimos mensajes</h2>

        {recentMessages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No hay mensajes todavía
          </p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((m) => (
              <div key={m.id} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: m.sender.avatarColor }}
                >
                  {m.sender.nickname.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold" style={{ color: m.sender.avatarColor }}>
                      {m.sender.nickname}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Mesa {m.sender.tableNumber}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {new Date(m.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 truncate">
                    {m.messageType === "nudge" ? "📳 Zumbido" : m.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
