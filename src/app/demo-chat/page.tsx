"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import MSNLogin from "@/components/chat/MSNLogin";
import DemoChatWindow from "./DemoChatWindow";

interface ParticipantData {
  id: string;
  nickname: string;
  tableNumber: string;
  avatarColor: string;
  statusText: string | null;
  token: string;
}

function DemoChatContent() {
  const searchParams = useSearchParams();
  const mesaParam = searchParams.get("mesa") || String(Math.floor(Math.random() * 10) + 1);

  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for saved session
  useEffect(() => {
    const savedToken = localStorage.getItem("demo-chat-token");
    if (savedToken) {
      reconnectWithToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const reconnectWithToken = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/demo-chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        const data = await res.json();
        setParticipant(data.participant);
      } else {
        localStorage.removeItem("demo-chat-token");
      }
    } catch {
      localStorage.removeItem("demo-chat-token");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (nickname: string, avatarColor: string) => {
    setLoginLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/demo-chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, tableNumber: mesaParam, avatarColor }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al unirse al chat");
        return;
      }

      localStorage.setItem("demo-chat-token", data.participant.token);
      setParticipant(data.participant);
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("demo-chat-token");
    setParticipant(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a3a5c] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-white/60 text-sm">Conectando al chat...</p>
        </div>
      </div>
    );
  }

  if (!participant) {
    return (
      <MSNLogin
        eventTitle="🎉 Fiesta Demo"
        eventSlug="demo-fiesta"
        tableNumber={mesaParam}
        onLogin={handleLogin}
        loading={loginLoading}
        error={error}
      />
    );
  }

  return (
    <DemoChatWindow
      participant={participant}
      onLogout={handleLogout}
    />
  );
}

export default function DemoChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1a3a5c] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-white/60 text-sm">Cargando chat...</p>
          </div>
        </div>
      }
    >
      <DemoChatContent />
    </Suspense>
  );
}
