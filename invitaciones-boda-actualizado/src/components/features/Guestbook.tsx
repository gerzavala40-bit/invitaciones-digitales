"use client";

import { useState } from "react";
import { EventData } from "../templates/types";

export default function Guestbook({ event, className = "" }: { event: EventData; className?: string }) {
  const [messages, setMessages] = useState(event.messages || []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !message) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, guestName: name, message }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages([data.message, ...messages]);
        setSent(true);
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <h2 className="text-3xl font-display text-center mb-8">Libro de Firmas</h2>
      
      {/* Formulario */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl mb-12 shadow-lg">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-xl text-green-400 mb-2">¡Mensaje enviado!</p>
            <button onClick={() => setSent(false)} className="text-sm underline opacity-80">Escribir otro</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Tu nombre" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="bg-black/20 border border-white/20 rounded p-3 outline-none focus:border-current"
              required
            />
            <textarea 
              placeholder="Dejale un mensaje a los novios / homenajeados..." 
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="bg-black/20 border border-white/20 rounded p-3 outline-none focus:border-current h-24 resize-none"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 bg-current text-black font-semibold py-3 rounded hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "ENVIANDO..." : "DEJAR MENSAJE"}
            </button>
          </form>
        )}
      </div>

      {/* Muro */}
      <div className="grid gap-4 md:grid-cols-2">
        {messages.map((m) => (
          <div key={m.id} className="bg-white/5 border border-white/10 p-5 rounded-lg text-left break-words">
            <p className="opacity-90 mb-3 whitespace-pre-wrap">{m.message}</p>
            <p className="text-sm font-semibold opacity-60">— {m.guestName}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="col-span-full text-center opacity-50 italic">Sé el primero en dejar un mensaje.</p>
        )}
      </div>
    </div>
  );
}
