"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import MSNMessageBubble from "@/components/chat/MSNMessageBubble";
import MSNContactList from "@/components/chat/MSNContactList";
import MSNStatusBar from "@/components/chat/MSNStatusBar";

interface ChatMessage {
  id: string;
  message: string;
  messageType: string;
  channel: string;
  fontColor: string;
  createdAt: string;
  sender: {
    id: string;
    nickname: string;
    tableNumber: string;
    avatarColor: string;
  };
}

interface Participant {
  id: string;
  nickname: string;
  tableNumber: string;
  avatarColor: string;
  statusText: string | null;
  isOnline: boolean;
}

interface DemoChatWindowProps {
  participant: {
    id: string;
    nickname: string;
    tableNumber: string;
    avatarColor: string;
    token: string;
  };
  onLogout: () => void;
}

export default function DemoChatWindow({ participant, onLogout }: DemoChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");
  const [showContacts, setShowContacts] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [nudgeShake, setNudgeShake] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [showStatusInput, setShowStatusInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTime = useRef<string | null>(null);

  const mesaChannel = `mesa-${participant.tableNumber}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages (polling) - uses demo API
  const fetchMessages = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        channel: activeChannel,
        token: participant.token,
      });
      if (lastMessageTime.current) {
        params.set("after", lastMessageTime.current);
      }

      const res = await fetch(`/api/demo-chat/messages?${params}`);
      if (!res.ok) return;

      const data = await res.json();
      if (data.messages && data.messages.length > 0) {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = data.messages.filter((m: ChatMessage) => !existingIds.has(m.id));
          if (newMsgs.length === 0) return prev;

          // Check for nudge from others
          const hasNudge = newMsgs.some(
            (m: ChatMessage) => m.messageType === "nudge" && m.sender.id !== participant.id
          );
          if (hasNudge) {
            triggerNudge();
          }

          return [...prev, ...newMsgs];
        });

        const lastMsg = data.messages[data.messages.length - 1];
        lastMessageTime.current = lastMsg.createdAt;
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }, [activeChannel, participant.token, participant.id]);

  // Fetch participants
  const fetchParticipants = useCallback(async () => {
    try {
      const params = new URLSearchParams({ token: participant.token });
      const res = await fetch(`/api/demo-chat/participants?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setParticipants(data.participants || []);
    } catch (err) {
      console.error("Error fetching participants:", err);
    }
  }, [participant.token]);

  // Polling
  useEffect(() => {
    fetchMessages();
    fetchParticipants();

    const msgInterval = setInterval(fetchMessages, 2000);
    const participantInterval = setInterval(fetchParticipants, 8000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(participantInterval);
    };
  }, [fetchMessages, fetchParticipants]);

  // Reset messages when switching channels
  useEffect(() => {
    setMessages([]);
    lastMessageTime.current = null;
  }, [activeChannel]);

  // Nudge effect
  const triggerNudge = () => {
    setNudgeShake(true);
    // Vibrate on mobile if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
    setTimeout(() => setNudgeShake(false), 600);
  };

  // Send message
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      const res = await fetch("/api/demo-chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: participant.token,
          message: inputMessage.trim(),
          channel: activeChannel,
          fontColor,
        }),
      });

      if (res.ok) {
        setInputMessage("");
        fetchMessages();
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Send nudge
  const handleNudge = async () => {
    try {
      await fetch("/api/demo-chat/nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: participant.token,
          channel: activeChannel,
        }),
      });
      triggerNudge();
      fetchMessages();
    } catch (err) {
      console.error("Error sending nudge:", err);
    }
  };

  // Update status
  const handleStatusUpdate = async () => {
    try {
      await fetch("/api/demo-chat/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: participant.token,
          statusText: statusText.trim(),
        }),
      });
      setShowStatusInput(false);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const onlineCount = participants.filter((p) => p.isOnline).length;

  const FONT_COLORS = [
    "#000000", "#FF0000", "#0000FF", "#008000",
    "#FF6600", "#800080", "#FF1493", "#006400",
    "#8B0000", "#00008B", "#FFD700", "#4169E1",
  ];

  return (
    <div className={`min-h-screen bg-[#1a3a5c] flex flex-col items-center p-2 sm:p-4 ${nudgeShake ? "animate-shake" : ""}`}>
      {/* Main chat container */}
      <div className="w-full max-w-lg flex flex-col h-[100dvh] max-h-[100dvh]">
        {/* MSN Window Title Bar */}
        <div className="bg-gradient-to-r from-[#0058a8] to-[#3b8dd4] rounded-t-xl px-3 py-2 flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-white text-sm font-bold flex-1 truncate">
            🎉 Fiesta Demo - Party Messenger
          </span>
          <button
            onClick={() => setShowContacts(!showContacts)}
            className="text-white/80 hover:text-white text-xs bg-white/10 px-2 py-1 rounded"
          >
            👥 {onlineCount}
          </button>
          <button
            onClick={onLogout}
            className="text-white/80 hover:text-white"
            title="Salir"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Status bar */}
        <MSNStatusBar
          nickname={participant.nickname}
          avatarColor={participant.avatarColor}
          tableNumber={participant.tableNumber}
          statusText={statusText}
          showStatusInput={showStatusInput}
          onStatusClick={() => setShowStatusInput(!showStatusInput)}
          onStatusChange={setStatusText}
          onStatusSave={handleStatusUpdate}
        />

        {/* Channel tabs */}
        <div className="bg-[#d6e5f3] border-x-2 border-[#7fbfff] flex shrink-0">
          <button
            onClick={() => setActiveChannel("general")}
            className={`flex-1 py-2 text-xs font-bold transition ${
              activeChannel === "general"
                ? "bg-white text-[#0058a8] border-b-2 border-[#0058a8]"
                : "text-[#666] hover:bg-white/50"
            }`}
          >
            💬 Chat General
          </button>
          <button
            onClick={() => setActiveChannel(mesaChannel)}
            className={`flex-1 py-2 text-xs font-bold transition ${
              activeChannel === mesaChannel
                ? "bg-white text-[#0058a8] border-b-2 border-[#0058a8]"
                : "text-[#666] hover:bg-white/50"
            }`}
          >
            🪑 Mi Mesa ({participant.tableNumber})
          </button>
        </div>

        {/* Contact list (sidebar overlay) */}
        {showContacts && (
          <div className="relative">
            <MSNContactList
              participants={participants}
              currentParticipantId={participant.id}
              onClose={() => setShowContacts(false)}
            />
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 bg-white border-x-2 border-[#7fbfff] overflow-y-auto p-3 space-y-1 min-h-0">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <p className="text-4xl mb-2">💬</p>
              <p className="text-sm">
                {activeChannel === "general"
                  ? "¡Sé el primero en saludar!"
                  : `Chat privado de la Mesa ${participant.tableNumber}`}
              </p>
              <p className="text-xs mt-2 text-gray-300">
                Tip: Abrí otra pestaña en /demo-chat?mesa=3 para simular otro invitado
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <MSNMessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender.id === participant.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-[#eef3f7] border-2 border-t-0 border-[#7fbfff] rounded-b-xl p-2 shrink-0">
          {/* Toolbar */}
          <div className="flex items-center gap-1 mb-2 px-1">
            {/* Font color */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-7 h-7 rounded border border-gray-300 hover:border-[#0058a8] transition flex items-center justify-center text-xs font-bold"
                style={{ color: fontColor }}
                title="Color de texto"
              >
                A
              </button>
              {showColorPicker && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 z-10">
                  {FONT_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => { setFontColor(color); setShowColorPicker(false); }}
                      className={`w-6 h-6 rounded border ${fontColor === color ? "border-black border-2" : "border-gray-200"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Nudge button */}
            <button
              onClick={handleNudge}
              className="px-2 py-1 text-xs bg-[#FFD700]/20 border border-[#FFD700] rounded hover:bg-[#FFD700]/40 transition"
              title="Enviar zumbido"
            >
              📳 Zumbido
            </button>

            <div className="flex-1" />

            <span className="text-[10px] text-gray-400">
              {activeChannel === "general" ? "Chat General" : `Mesa ${participant.tableNumber}`}
            </span>
          </div>

          {/* Message input */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribí un mensaje..."
              maxLength={500}
              className="flex-1 px-3 py-2 border-2 border-[#7fbfff] rounded-lg bg-white text-sm focus:outline-none focus:border-[#0058a8]"
              style={{ color: fontColor }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white font-bold px-4 py-2 rounded-lg hover:from-[#45a049] hover:to-[#3d8b3d] disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Demo banner */}
        <div className="mt-2 text-center">
          <p className="text-[10px] text-white/40">
            MODO DEMO • Los mensajes se pierden al reiniciar el server • Abrí varias pestañas para probar
          </p>
        </div>
      </div>

      {/* Shake animation style */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
