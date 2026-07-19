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

    return <InvitationTemplate event={eventData} />;
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}
