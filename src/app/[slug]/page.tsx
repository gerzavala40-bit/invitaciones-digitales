import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvitationTemplate from "@/components/templates";
import type { EventData } from "@/components/templates/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug.startsWith("_") || slug === "favicon.ico") return {};

  try {
    const event = await prisma.event.findUnique({
      where: { slug, isActive: true },
      include: { photos: { orderBy: { order: "asc" } } },
    });

    if (!event) return {};

    const isClara = slug === '15anos-clara';
    const title = isClara 
      ? "Mis XV Años | Clara" 
      : `Te Invito | ${event.title || 'Invitación Especial'}`;
      
    const description = isClara 
      ? "Hagamos de esta noche algo inolvidable. Hacé clic para ver todos los detalles, la ubicación y confirmar tu asistencia."
      : "¡Estás invitado! Hacé clic para ver todos los detalles, ubicación y confirmar tu asistencia.";

    const imgUrl = event.photos[0]?.url || "/og-image.jpg";
    const absoluteImageUrl = imgUrl.startsWith('http') ? imgUrl : `https://www.teinvitoapp.com.ar${imgUrl}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.teinvitoapp.com.ar/${slug}`,
        siteName: "Te Invito App",
        images: [
          {
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: "es_AR",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [absoluteImageUrl],
      },
    };
  } catch (error) {
    return {};
  }
}


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

    if (slug === '15anos-clara') {
      event.isTrial = false;
      event.dressCode = "Formal";
    }

    const eventData: EventData = {
      ...event,
      eventDate: event.eventDate.toISOString(),
      photos: event.photos.map((p) => ({ url: p.url, order: p.order })),
    };

    return (
      <>
        <InvitationTemplate event={eventData} />
      </>
    );
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}
