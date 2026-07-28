import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/admin/chat/toggle - Activar/desactivar chat de un evento
// Body: { eventId, enabled }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, enabled } = body;

    if (!eventId || typeof enabled !== "boolean") {
      return NextResponse.json(
        { error: "eventId y enabled (boolean) son requeridos" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }

    await prisma.event.update({
      where: { id: eventId },
      data: { chatEnabled: enabled },
    });

    return NextResponse.json({
      success: true,
      chatEnabled: enabled,
    });
  } catch (error) {
    console.error("Toggle chat error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
