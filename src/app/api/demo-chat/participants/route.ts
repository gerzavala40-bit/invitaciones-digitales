import { NextResponse } from "next/server";
import { demoGetParticipants, demoGetParticipantByToken } from "@/lib/demo-chat-store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "token es requerido" }, { status: 400 });
    }

    const currentParticipant = demoGetParticipantByToken(token);
    if (!currentParticipant) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const participants = demoGetParticipants();

    return NextResponse.json({
      participants: participants.map((p) => ({
        id: p.id,
        nickname: p.nickname,
        tableNumber: p.tableNumber,
        avatarColor: p.avatarColor,
        statusText: p.statusText,
        isOnline: p.isOnline,
        lastSeen: p.lastSeen.toISOString ? p.lastSeen.toISOString() : new Date(p.lastSeen).toISOString(),
      })),
      totalOnline: participants.filter((p) => p.isOnline).length,
      total: participants.length,
    });
  } catch (error) {
    console.error("Demo chat participants error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
