import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/chat/nudge - Enviar un zumbido
// Body: { token, channel }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, channel } = body;

    if (!token) {
      return NextResponse.json({ error: "token es requerido" }, { status: 400 });
    }

    // Validar participante
    const participant = await prisma.chatParticipant.findUnique({
      where: { accessToken: token },
      include: { event: { select: { chatEnabled: true } } },
    });

    if (!participant) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!participant.event.chatEnabled) {
      return NextResponse.json({ error: "El chat está deshabilitado" }, { status: 403 });
    }

    // Crear mensaje de nudge
    const nudgeMessage = await prisma.chatMessage.create({
      data: {
        eventId: participant.eventId,
        participantId: participant.id,
        message: `${participant.nickname} envió un zumbido! 📳`,
        messageType: "nudge",
        channel: channel || "general",
      },
      include: {
        participant: {
          select: {
            id: true,
            nickname: true,
            tableNumber: true,
            avatarColor: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: {
        id: nudgeMessage.id,
        message: nudgeMessage.message,
        messageType: nudgeMessage.messageType,
        channel: nudgeMessage.channel,
        fontColor: nudgeMessage.fontColor,
        createdAt: nudgeMessage.createdAt.toISOString(),
        sender: {
          id: nudgeMessage.participant.id,
          nickname: nudgeMessage.participant.nickname,
          tableNumber: nudgeMessage.participant.tableNumber,
          avatarColor: nudgeMessage.participant.avatarColor,
        },
      },
    });
  } catch (error) {
    console.error("Chat nudge error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
