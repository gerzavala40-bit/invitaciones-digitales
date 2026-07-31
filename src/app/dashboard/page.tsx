import { prisma } from "@/lib/prisma";
import { getClientSession } from "@/lib/client-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TEMPLATES } from "@/components/templates";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getClientSession();
  if (!session) redirect("/cliente/login");

  const events = await prisma.event.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { rsvps: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Mi Panel</h1>
        <button className="text-sm font-medium text-gray-500 hover:text-black">Cerrar Sesión</button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        
        {events.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Aún no tienes invitaciones</h2>
            <p className="text-gray-500 mb-6">Crea tu primera invitación gratis para probar el servicio.</p>
            <Link href="/crear" className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">
              Crear Invitación
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => {
              const template = TEMPLATES[event.templateId as keyof typeof TEMPLATES];
              
              return (
                <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                  {event.isTrial && (
                    <div className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-2 text-center uppercase tracking-wider">
                      Modo Prueba
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{new Date(event.eventDate).toLocaleDateString("es-AR")}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="text-2xl font-bold text-gray-900">{event._count.rsvps}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Invitados Confirmados</div>
                    </div>
                    
                    {event.isTrial && (
                      <div className="mb-4">
                        <a 
                          href={`https://wa.me/5491100000000?text=Hola, quiero activar mi invitacion ${event.slug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full bg-green-600 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                        >
                          Pagar para Activar
                        </a>
                        <p className="text-xs text-gray-400 text-center mt-2">Activa para recibir confirmaciones reales.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 grid grid-cols-2 bg-gray-50">
                    <a href={`/${event.slug}`} target="_blank" className="p-3 text-center text-sm font-medium text-gray-600 hover:text-black border-r border-gray-100 transition">
                      Ver Invitación
                    </a>
                    <Link href={`/dashboard/events/${event.id}`} className="p-3 text-center text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                      Gestionar Lista
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
