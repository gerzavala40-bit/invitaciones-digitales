import { NextResponse } from "next/server";
import { demoJoinChat, demoGetParticipantByToken } from "@/lib/demo-chat-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Reconexión con token
    if (body.token) {
      const participant = demoGetParticipantByToken(body.token);
      if (!participant) {
        return NextResponse.json({ error: "Token inválido" }, { status: 401 });
      }
      participant.isOnline = true;
      participant.lastSeen = new Date();

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
          id: "demo-event",
          slug: "demo-fiesta",
          title: "🎉 Fiesta Demo",
        },
      });
    }

    // Nuevo ingreso
    const { nickname, tableNumber, avatarColor } = body;

    if (!nickname || !tableNumber) {
      return NextResponse.json(
        { error: "nickname y tableNumber son obligatorios" },
        { status: 400 }
      );
    }

    if (nickname.length > 30) {
      return NextResponse.json(
        { error: "El nickname no puede superar 30 caracteres" },
        { status: 400 }
      );
    }

    const colors = ["#1E90FF", "#FF6347", "#32CD32", "#FFD700", "#FF69B4", "#8A2BE2", "#FF8C00", "#00CED1"];
    const finalColor = avatarColor || colors[Math.floor(Math.random() * colors.length)];

    const { participant, isReconnect } = demoJoinChat(nickname, tableNumber, finalColor);

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
        id: "demo-event",
        slug: "demo-fiesta",
        title: "🎉 Fiesta Demo",
      },
      reconnected: isReconnect,
    });
  } catch (error) {
    console.error("Demo chat join error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
