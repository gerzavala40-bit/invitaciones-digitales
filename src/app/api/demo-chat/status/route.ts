import { NextResponse } from "next/server";
import { demoUpdateStatus, demoGetParticipantByToken } from "@/lib/demo-chat-store";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { token, statusText } = body;

    if (!token) {
      return NextResponse.json({ error: "token es requerido" }, { status: 400 });
    }

    if (statusText && statusText.length > 100) {
      return NextResponse.json({ error: "El estado no puede superar 100 caracteres" }, { status: 400 });
    }

    const participant = demoUpdateStatus(token, statusText || "");

    if (!participant) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      participant: {
        id: participant.id,
        nickname: participant.nickname,
        tableNumber: participant.tableNumber,
        avatarColor: participant.avatarColor,
        statusText: participant.statusText,
      },
    });
  } catch (error) {
    console.error("Demo chat status error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
