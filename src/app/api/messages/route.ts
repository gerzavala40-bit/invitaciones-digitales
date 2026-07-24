import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, guestName, message } = body;

    if (!eventId || !guestName || !message) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const newMessage = await prisma.guestMessage.create({
      data: {
        eventId,
        guestName,
        message,
        isApproved: true, // Por defecto se aprueban (se podría hacer moderación)
      },
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error guardando mensaje:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
