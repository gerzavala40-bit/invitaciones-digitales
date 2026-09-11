import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ChatAdminPanel from "./ChatAdminPanel";

export const dynamic = "force-dynamic";

export default async function ChatAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      chatParticipants: {
        orderBy: { lastSeen: "desc" },
      },
      chatMessages: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          participant: {
            select: { nickname: true, tableNumber: true, avatarColor: true },
          },
        },
      },
    },
  });

  if (!event) notFound();

  const onlineThreshold = new Date(Date.now() - 60000);
  const onlineCount = event.chatParticipants.filter(
    (p) => p.lastSeen >= onlineThreshold
  ).length;
  const totalMessages = await prisma.chatMessage.count({
    where: { eventId: event.id },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href={`/admin/events/${id}`} className="text-gray-500 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">💬 Chat de la Fiesta</h1>
            <p className="text-sm text-gray-500">{event.title} • /{event.slug}</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Estado</p>
            <p className={`text-lg font-bold ${event.chatEnabled ? "text-green-600" : "text-red-500"}`}>
              {event.chatEnabled ? "✅ Activo" : "❌ Desactivado"}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Participantes</p>
            <p className="text-2xl font-bold text-gray-900">{event.chatParticipants.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-200">
            <p className="text-sm text-gray-500">En línea ahora</p>
            <p className="text-2xl font-bold text-blue-600">{onlineCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-purple-200">
            <p className="text-sm text-gray-500">Mensajes totales</p>
            <p className="text-2xl font-bold text-purple-600">{totalMessages}</p>
          </div>
        </div>

        {/* Admin Panel (Client Component) */}
        <ChatAdminPanel
          eventId={event.id}
          eventSlug={event.slug}
          chatEnabled={event.chatEnabled}
          participants={event.chatParticipants.map((p) => ({
            id: p.id,
            nickname: p.nickname,
            tableNumber: p.tableNumber,
            avatarColor: p.avatarColor,
            isOnline: p.lastSeen >= onlineThreshold,
            lastSeen: p.lastSeen.toISOString(),
          }))}
          recentMessages={event.chatMessages.map((m) => ({
            id: m.id,
            message: m.message,
            messageType: m.messageType,
            createdAt: m.createdAt.toISOString(),
            sender: {
              nickname: m.participant.nickname,
              tableNumber: m.participant.tableNumber,
              avatarColor: m.participant.avatarColor,
            },
          }))}
        />
      </div>
    </div>
  );
}
