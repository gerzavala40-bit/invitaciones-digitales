import { NextResponse } from "next/server";
import { demoGetMessages, demoSendMessage, demoGetParticipantByToken } from "@/lib/demo-chat-store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const channel = searchParams.get("channel") || "general";
    const after = searchParams.get("after") || undefined;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "token es requerido" }, { status: 400 });
    }

    const participant = demoGetParticipantByToken(token);
    if (!participant) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Update lastSeen
    participant.lastSeen = new Date();
    participant.isOnline = true;

    const messages = demoGetMessages(channel, after);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Demo chat messages GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, message, channel, fontColor } = body;

    if (!token || !message) {
      return NextResponse.json({ error: "token y message son requeridos" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "El mensaje no puede superar 500 caracteres" }, { status: 400 });
    }

    const chatMessage = demoSendMessage(
      token,
      message,
      channel || "general",
      fontColor || "#000000",
      "text"
    );

    if (!chatMessage) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: chatMessage });
  } catch (error) {
    console.error("Demo chat messages POST error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
