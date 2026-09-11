"use client";

import { useState } from "react";

interface MSNLoginProps {
  eventTitle: string;
  eventSlug: string;
  tableNumber: string;
  onLogin: (nickname: string, avatarColor: string) => void;
  loading: boolean;
  error: string | null;
}

const AVATAR_COLORS = [
  "#1E90FF", "#FF6347", "#32CD32", "#FFD700",
  "#FF69B4", "#8A2BE2", "#FF8C00", "#00CED1",
  "#DC143C", "#228B22", "#4169E1", "#FF1493",
];

export default function MSNLogin({ eventTitle, tableNumber, onLogin, loading, error }: MSNLoginProps) {
  const [nickname, setNickname] = useState("");
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onLogin(nickname.trim(), selectedColor);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3a5c] flex items-center justify-center p-4">
      {/* MSN-style login window */}
      <div className="w-full max-w-sm">
        {/* Window Title Bar */}
        <div className="bg-gradient-to-r from-[#0058a8] to-[#3b8dd4] rounded-t-lg px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse delay-100"></div>
          </div>
          <span className="text-white text-sm font-bold flex-1">Party Messenger</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-white text-[8px]">_</div>
            <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-white text-[8px]">□</div>
            <div className="w-4 h-4 bg-red-500/80 rounded-sm flex items-center justify-center text-white text-[8px]">✕</div>
          </div>
        </div>

        {/* Window Body */}
        <div className="bg-[#eef3f7] border-x-2 border-b-2 border-[#0058a8]/30 rounded-b-lg p-6">
          {/* Logo/Icon area */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#333]">{eventTitle}</h1>
            <p className="text-sm text-[#666] mt-1">Chat de la fiesta</p>
            <div className="inline-block bg-[#0058a8]/10 text-[#0058a8] text-xs font-bold px-3 py-1 rounded-full mt-2">
              Mesa {tableNumber}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#333] mb-1 uppercase tracking-wide">
                Tu apodo
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Ej: El tío Carlos 🎩"
                maxLength={30}
                className="w-full px-4 py-3 border-2 border-[#7fbfff] rounded-lg bg-white text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#0058a8] focus:ring-2 focus:ring-[#0058a8]/20 text-lg"
                autoFocus
              />
            </div>

            {/* Color picker */}
            <div>
              <label className="block text-xs font-bold text-[#333] mb-2 uppercase tracking-wide">
                Color de tu nick
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === color
                        ? "border-[#333] scale-125 shadow-lg"
                        : "border-transparent hover:scale-110"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            {nickname && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Así te van a ver:</p>
                <p className="font-bold text-lg" style={{ color: selectedColor }}>
                  {nickname} <span className="text-xs text-gray-400">dice:</span>
                </p>
                <p className="text-sm text-gray-700">Hola a todos! 🎉</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!nickname.trim() || loading}
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white font-bold py-3 px-6 rounded-lg hover:from-[#45a049] hover:to-[#3d8b3d] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Conectando...
                </span>
              ) : (
                "🎉 Entrar al Chat"
              )}
            </button>
          </form>

          {/* MSN-style footer */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-[10px] text-gray-400">
              Party Messenger v1.0 • Powered by TeInvitoApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
