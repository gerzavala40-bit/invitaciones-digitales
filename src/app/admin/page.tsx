import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { rsvps: true } } },
  });

  const totalRsvps = events.reduce((sum, e) => sum + e._count.rsvps, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Panel Admin</h1>
          <Link href="/admin/events/new" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            + Nuevo Evento
          </Link>
        </div>
      </header>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500">Total Eventos</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{events.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500">Eventos Activos</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{events.filter(e => e.isActive).length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500">Total Confirmaciones</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{totalRsvps}</p>
          </div>
        </div>

        {/* EVENTS LIST */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Eventos</h2>
          </div>
          {events.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400">
              <p className="text-lg mb-2">No hay eventos todavía</p>
              <Link href="/admin/events/new" className="text-blue-600 hover:underline text-sm">Crear tu primer evento</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {events.map((event) => (
                <div key={event.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      /{event.slug} · {event.templateId} · {new Date(event.eventDate).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{event._count.rsvps} RSVP</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${event.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {event.isActive ? "Activo" : "Inactivo"}
                    </span>
                    <Link href={`/${event.slug}`} target="_blank" className="text-blue-600 text-sm hover:underline">Ver</Link>
                    <Link href={`/admin/events/${event.id}`} className="text-gray-600 text-sm hover:underline">RSVPs</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
