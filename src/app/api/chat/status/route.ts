import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT /api/chat/status - Actualizar estado personalizado o color
// Body: { token, statusText?, avatarColor?, fontColor? }
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { token, statusText, avatarColor } = body;

    if (!token) {
      return NextResponse.json({ error: "token es requerido" }, { status: 400 });
    }

    // Validar participante
    const participant = await prisma.chatParticipant.findUnique({
      where: { accessToken: token },
    });

    if (!participant) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Actualizar datos
    const updateData: { statusText?: string; avatarColor?: string; lastSeen: Date } = {
      lastSeen: new Date(),
    };

    if (statusText !== undefined) {
      if (statusText.length > 100) {
        return NextResponse.json({ error: "El estado no puede superar 100 caracteres" }, { status: 400 });
      }
      updateData.statusText = statusText;
    }

    if (avatarColor) {
      updateData.avatarColor = avatarColor;
    }

    const updated = await prisma.chatParticipant.update({
      where: { id: participant.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      participant: {
        id: updated.id,
        nickname: updated.nickname,
        tableNumber: updated.tableNumber,
        avatarColor: updated.avatarColor,
        statusText: updated.statusText,
      },
    });
  } catch (error) {
    console.error("Chat status error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
