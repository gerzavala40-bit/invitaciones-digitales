import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvitationTemplate from "@/components/templates";
import type { EventData } from "@/components/templates/types";

export const dynamic = "force-dynamic";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Evitar que rutas del sistema se procesen como slugs
  if (slug.startsWith("_") || slug === "favicon.ico") {
    notFound();
  }

  try {
    const event = await prisma.event.findUnique({
      where: { slug, isActive: true },
      include: { photos: { orderBy: { order: "asc" } } },
    });

    if (!event) notFound();

    const eventData: EventData = {
      ...event,
      eventDate: event.eventDate.toISOString(),
      photos: event.photos.map((p) => ({ url: p.url, order: p.order })),
    };

    return (
      <>
        {event.isTrial && (
          <div className="fixed top-0 left-0 w-full z-[9999] bg-amber-500 text-black text-center py-2 px-4 shadow-md flex items-center justify-center gap-4">
            <span className="font-bold text-sm">⚠️ Esta es una prueba de tu invitación.</span>
            <a 
              href={`https://wa.me/5491100000000?text=Hola,%20quiero%20activar%20mi%20invitacion%20${event.slug}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-3 py-1 rounded text-xs font-bold hover:bg-gray-800 transition"
            >
              Activar Ahora
            </a>
          </div>
        )}
        <InvitationTemplate event={eventData} />
      </>
    );
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}
