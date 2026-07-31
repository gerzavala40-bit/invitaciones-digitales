import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import ImportExcelButton from "@/app/admin/events/[id]/ImportExcelButton";
import { getClientSession } from "@/lib/client-auth";

export const dynamic = "force-dynamic";

export default async function DashboardEventPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getClientSession();
  if (!session) redirect("/cliente/login");

  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id, userId: session.userId }, // SECURITY: Check ownership
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });

  if (!event) notFound();

  const totalGuests = event.rsvps.reduce((sum, r) => sum + r.guestCount, 0);
  const confirmedCount = event.rsvps.filter((r) => r.confirmed).length;
  const attendedCount = event.rsvps.filter((r) => r.attended).length;
  const pendingCount = confirmedCount - attendedCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{event.title}</h1>
              <p className="text-sm text-gray-500">/{event.slug}</p>
            </div>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-black">
            Volver
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {event.isTrial && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-amber-800 font-bold text-lg">Estás en Modo Prueba</h2>
              <p className="text-amber-700 text-sm mt-1">
                La confirmación de asistencia (RSVP) está bloqueada en la invitación pública. Activa tu invitación para empezar a recibir confirmaciones.
              </p>
            </div>
            <a 
              href={`https://wa.me/5491100000000?text=Hola,%20quiero%20activar%20mi%20invitacion%20${event.slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-green-700 transition whitespace-nowrap"
            >
              Pagar para Activar
            </a>
          </div>
        )}

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
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="font-semibold text-gray-900">Lista de confirmados</h2>
            {event.rsvps.length > 0 && (
              <div className="flex gap-2">
                <ImportExcelButton eventId={event.id} />
                <a
                  href={`/api/rsvp/export?eventId=${event.id}`}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Exportar Excel
                </a>
              </div>
            )}
          </div>
          {event.rsvps.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400">
              <p>Aún no hay confirmaciones. {event.isTrial ? "Activa tu invitación para recibirlas." : "Comparte tu enlace."}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Personas</th>
                    <th className="px-6 py-3">Mesa</th>
                    <th className="px-6 py-3">Dieta</th>
                    <th className="px-6 py-3">Cancion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {event.rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{rsvp.guestName}</td>
                      <td className="px-6 py-3 text-gray-600">{rsvp.guestCount}</td>
                      <td className="px-6 py-3 font-semibold text-gray-800">{rsvp.tableNumber || "-"}</td>
                      <td className="px-6 py-3 text-gray-600">{rsvp.dietaryNotes || "-"}</td>
                      <td className="px-6 py-3 text-gray-600">{rsvp.songRequest || "-"}</td>
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
