"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import MSNLogin from "@/components/chat/MSNLogin";
import MSNChatWindow from "@/components/chat/MSNChatWindow";

interface ParticipantData {
  id: string;
  nickname: string;
  tableNumber: string;
  avatarColor: string;
  statusText: string | null;
  token: string;
}

interface EventData {
  id: string;
  slug: string;
  title: string;
}

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const mesaParam = searchParams.get("mesa") || "1";

  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState("Fiesta");

  // Check for saved session in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem(`chat-token-${slug}`);
    if (savedToken) {
      reconnectWithToken(savedToken);
    } else {
      // Fetch event title for the login screen
      fetchEventInfo();
      setLoading(false);
    }
  }, [slug]);

  const fetchEventInfo = async () => {
    try {
      // We'll try to join with a dummy to get event info - or just set a generic title
      // For now, set slug as title until we get the real one
      setEventTitle(slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    } catch {
      // Use slug as fallback title
    }
  };

  const reconnectWithToken = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        const data = await res.json();
        setParticipant(data.participant);
        setEventData(data.event);
        setEventTitle(data.event.title);
      } else {
        // Token inválido, limpiar
        localStorage.removeItem(`chat-token-${slug}`);
      }
    } catch {
      localStorage.removeItem(`chat-token-${slug}`);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const handleLogin = async (nickname: string, avatarColor: string) => {
    setLoginLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: slug,
          nickname,
          tableNumber: mesaParam,
          avatarColor,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al unirse al chat");
        return;
      }

      // Guardar token en localStorage
      localStorage.setItem(`chat-token-${slug}`, data.participant.token);
      setParticipant(data.participant);
      setEventData(data.event);
      setEventTitle(data.event.title);
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(`chat-token-${slug}`);
    setParticipant(null);
    setEventData(null);
  };

  // Loading state
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

  // Not logged in - show MSN login
  if (!participant || !eventData) {
    return (
      <MSNLogin
        eventTitle={eventTitle}
        eventSlug={slug}
        tableNumber={mesaParam}
        onLogin={handleLogin}
        loading={loginLoading}
        error={error}
      />
    );
  }

  // Logged in - show chat
  return (
    <MSNChatWindow
      eventId={eventData.id}
      eventTitle={eventTitle}
      participant={participant}
      onLogout={handleLogout}
    />
  );
}
