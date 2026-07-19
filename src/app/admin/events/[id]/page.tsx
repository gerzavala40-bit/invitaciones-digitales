import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventRsvpsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });

  if (!event) notFound();

  const totalGuests = event.rsvps.reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{event.title}</h1>
            <p className="text-sm text-gray-500">/{event.slug}</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Confirmaciones</p>
            <p className="text-2xl font-bold text-gray-900">{event.rsvps.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Total personas</p>
            <p className="text-2xl font-bold text-blue-600">{totalGuests}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Fecha evento</p>
            <p className="text-2xl font-bold text-gray-900">{new Date(event.eventDate).toLocaleDateString("es-AR")}</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Lista de confirmados</h2>
          </div>
          {event.rsvps.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400">
              <p>Aún no hay confirmaciones</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Personas</th>
                    <th className="px-6 py-3">Dieta</th>
                    <th className="px-6 py-3">Canción</th>
                    <th className="px-6 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {event.rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{rsvp.guestName}</td>
                      <td className="px-6 py-3 text-gray-600">{rsvp.guestCount}</td>
                      <td className="px-6 py-3 text-gray-600">{rsvp.dietaryNotes || "-"}</td>
                      <td className="px-6 py-3 text-gray-600">{rsvp.songRequest || "-"}</td>
                      <td className="px-6 py-3 text-gray-500 text-sm">{new Date(rsvp.createdAt).toLocaleDateString("es-AR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
