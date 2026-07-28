import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/chat/participants?eventId=xxx&token=xxx
// Obtener lista de participantes online del evento
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const token = searchParams.get("token");

    if (!eventId || !token) {
      return NextResponse.json({ error: "eventId y token son requeridos" }, { status: 400 });
    }

    // Validar token
    const currentParticipant = await prisma.chatParticipant.findUnique({
      where: { accessToken: token },
    });

    if (!currentParticipant || currentParticipant.eventId !== eventId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Considerar "online" a los que tuvieron actividad en los últimos 60 segundos
    const onlineThreshold = new Date(Date.now() - 60000);

    const participants = await prisma.chatParticipant.findMany({
      where: { eventId },
      select: {
        id: true,
        nickname: true,
        tableNumber: true,
        avatarColor: true,
        statusText: true,
        isOnline: true,
        lastSeen: true,
      },
      orderBy: { lastSeen: "desc" },
    });

    const formatted = participants.map((p) => ({
      ...p,
      isOnline: p.lastSeen >= onlineThreshold,
      lastSeen: p.lastSeen.toISOString(),
    }));

    return NextResponse.json({
      participants: formatted,
      totalOnline: formatted.filter((p) => p.isOnline).length,
      total: formatted.length,
    });
  } catch (error) {
    console.error("Chat participants error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
