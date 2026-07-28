import { NextResponse } from "next/server";
import { demoSendNudge } from "@/lib/demo-chat-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, channel } = body;

    if (!token) {
      return NextResponse.json({ error: "token es requerido" }, { status: 400 });
    }

    const nudgeMessage = demoSendNudge(token, channel || "general");

    if (!nudgeMessage) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: nudgeMessage });
  } catch (error) {
    console.error("Demo chat nudge error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
