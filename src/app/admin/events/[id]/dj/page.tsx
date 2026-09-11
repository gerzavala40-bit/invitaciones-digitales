import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function DJPanel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const event = await prisma.event.findUnique({
    where: { id },
    include: { rsvps: true },
  });

  if (!event) notFound();

  // Filtramos solo los RSVPs que dejaron una canción
  const songRequests = event.rsvps.filter(r => r.songRequest && r.songRequest.trim().length > 0);

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2">DJ Panel</h1>
      <p className="text-gray-400 mb-8">Pedidos de canciones para: {event.title}</p>
      
      <div className="bg-ink-800 rounded-lg shadow border border-ink-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-ink-900 border-b border-ink-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Canción Pedida</th>
              <th className="px-6 py-4 font-semibold text-gray-400">Invitado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700">
            {songRequests.length > 0 ? (
              songRequests.map(r => (
                <tr key={r.id} className="hover:bg-ink-700/50 transition">
                  <td className="px-6 py-4 font-medium text-lg">{r.songRequest}</td>
                  <td className="px-6 py-4 text-gray-300">{r.guestName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  Todavía no hay canciones solicitadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
