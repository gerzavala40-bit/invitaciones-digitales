import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/chat/messages?eventId=xxx&channel=general&after=timestamp
// Obtener mensajes del chat (polling)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const channel = searchParams.get("channel") || "general";
    const after = searchParams.get("after"); // ISO timestamp
    const token = searchParams.get("token");

    if (!eventId || !token) {
      return NextResponse.json({ error: "eventId y token son requeridos" }, { status: 400 });
    }

    // Validar token
    const participant = await prisma.chatParticipant.findUnique({
      where: { accessToken: token },
    });

    if (!participant || participant.eventId !== eventId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Actualizar lastSeen
    await prisma.chatParticipant.update({
      where: { id: participant.id },
      data: { lastSeen: new Date(), isOnline: true },
    });

    // Buscar mensajes
    const where: {
      eventId: string;
      channel: string;
      createdAt?: { gt: Date };
    } = {
      eventId,
      channel,
    };

    if (after) {
      where.createdAt = { gt: new Date(after) };
    }

    const messages = await prisma.chatMessage.findMany({
      where,
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
      orderBy: { createdAt: "asc" },
      take: 100, // Máximo 100 mensajes por request
    });

    return NextResponse.json({
      messages: messages.map((m) => ({
        id: m.id,
        message: m.message,
        messageType: m.messageType,
        channel: m.channel,
        fontColor: m.fontColor,
        createdAt: m.createdAt.toISOString(),
        sender: {
          id: m.participant.id,
          nickname: m.participant.nickname,
          tableNumber: m.participant.tableNumber,
          avatarColor: m.participant.avatarColor,
        },
      })),
    });
  } catch (error) {
    console.error("Chat messages GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// POST /api/chat/messages - Enviar un mensaje
// Body: { token, message, channel?, fontColor?, messageType? }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, message, channel, fontColor, messageType } = body;

    if (!token || !message) {
      return NextResponse.json({ error: "token y message son requeridos" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "El mensaje no puede superar 500 caracteres" }, { status: 400 });
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

    // Crear mensaje
    const chatMessage = await prisma.chatMessage.create({
      data: {
        eventId: participant.eventId,
        participantId: participant.id,
        message,
        messageType: messageType || "text",
        channel: channel || "general",
        fontColor: fontColor || "#000000",
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
        id: chatMessage.id,
        message: chatMessage.message,
        messageType: chatMessage.messageType,
        channel: chatMessage.channel,
        fontColor: chatMessage.fontColor,
        createdAt: chatMessage.createdAt.toISOString(),
        sender: {
          id: chatMessage.participant.id,
          nickname: chatMessage.participant.nickname,
          tableNumber: chatMessage.participant.tableNumber,
          avatarColor: chatMessage.participant.avatarColor,
        },
      },
    });
  } catch (error) {
    console.error("Chat messages POST error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
