import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// POST /api/chat/join - Unirse al chat de una fiesta
// Body: { eventSlug, nickname, tableNumber, avatarColor? }
// O con token existente: { token }
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Reconexión con token existente
    if (body.token) {
      const participant = await prisma.chatParticipant.findUnique({
        where: { accessToken: body.token },
        include: { event: { select: { id: true, slug: true, title: true, chatEnabled: true } } },
      });

      if (!participant) {
        return NextResponse.json({ error: "Token inválido" }, { status: 401 });
      }

      if (!participant.event.chatEnabled) {
        return NextResponse.json({ error: "El chat no está habilitado para este evento" }, { status: 403 });
      }

      // Actualizar estado online
      await prisma.chatParticipant.update({
        where: { id: participant.id },
        data: { isOnline: true, lastSeen: new Date() },
      });

      return NextResponse.json({
        success: true,
        participant: {
          id: participant.id,
          nickname: participant.nickname,
          tableNumber: participant.tableNumber,
          avatarColor: participant.avatarColor,
          statusText: participant.statusText,
          token: participant.accessToken,
        },
        event: {
          id: participant.event.id,
          slug: participant.event.slug,
          title: participant.event.title,
        },
      });
    }

    // Nuevo ingreso
    const { eventSlug, nickname, tableNumber, avatarColor } = body;

    if (!eventSlug || !nickname || !tableNumber) {
      return NextResponse.json(
        { error: "Faltan datos: eventSlug, nickname y tableNumber son obligatorios" },
        { status: 400 }
      );
    }

    if (nickname.length > 30) {
      return NextResponse.json({ error: "El nickname no puede superar 30 caracteres" }, { status: 400 });
    }

    // Buscar evento
    const event = await prisma.event.findUnique({
      where: { slug: eventSlug, isActive: true },
    });

    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }

    if (!event.chatEnabled) {
      return NextResponse.json({ error: "El chat no está habilitado para este evento" }, { status: 403 });
    }

    // Verificar si ya existe este nickname en el evento
    const existing = await prisma.chatParticipant.findUnique({
      where: { eventId_nickname: { eventId: event.id, nickname } },
    });

    if (existing) {
      // Reconectar al participante existente
      await prisma.chatParticipant.update({
        where: { id: existing.id },
        data: { isOnline: true, lastSeen: new Date() },
      });

      return NextResponse.json({
        success: true,
        participant: {
          id: existing.id,
          nickname: existing.nickname,
          tableNumber: existing.tableNumber,
          avatarColor: existing.avatarColor,
          statusText: existing.statusText,
          token: existing.accessToken,
        },
        event: {
          id: event.id,
          slug: event.slug,
          title: event.title,
        },
        reconnected: true,
      });
    }

    // Crear nuevo participante
    const accessToken = uuidv4();
    const colors = ["#1E90FF", "#FF6347", "#32CD32", "#FFD700", "#FF69B4", "#8A2BE2", "#FF8C00", "#00CED1"];
    const finalColor = avatarColor || colors[Math.floor(Math.random() * colors.length)];

    const participant = await prisma.chatParticipant.create({
      data: {
        eventId: event.id,
        nickname,
        tableNumber,
        avatarColor: finalColor,
        accessToken,
        isOnline: true,
        lastSeen: new Date(),
      },
    });

    // Crear mensaje de sistema "se unió al chat"
    await prisma.chatMessage.create({
      data: {
        eventId: event.id,
        participantId: participant.id,
        message: `${nickname} (Mesa ${tableNumber}) se unió al chat 🎉`,
        messageType: "join",
        channel: "general",
      },
    });

    return NextResponse.json({
      success: true,
      participant: {
        id: participant.id,
        nickname: participant.nickname,
        tableNumber: participant.tableNumber,
        avatarColor: participant.avatarColor,
        statusText: participant.statusText,
        token: participant.accessToken,
      },
      event: {
        id: event.id,
        slug: event.slug,
        title: event.title,
      },
    });
  } catch (error) {
    console.error("Chat join error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
