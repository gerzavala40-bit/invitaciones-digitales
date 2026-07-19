import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvitationTemplate from "@/components/templates";
import type { EventData } from "@/components/templates/types";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

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
}
