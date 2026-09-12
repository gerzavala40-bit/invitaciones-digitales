import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvitationTemplate from "@/components/templates";
import type { EventData } from "@/components/templates/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mis XV Años | Clara",
  description: "Hagamos de esta noche algo inolvidable. Hacé clic para ver todos los detalles, la ubicación y confirmar tu asistencia.",
  openGraph: {
    title: "Mis XV Años | Clara",
    description: "Hagamos de esta noche algo inolvidable. Hacé clic para ver todos los detalles, la ubicación y confirmar tu asistencia.",
    url: `https://www.teinvitoapp.com.ar/15anos-clara`,
    siteName: "Te Invito App",
    images: [
      {
        url: "https://www.teinvitoapp.com.ar/foto-clara.jpg",
        width: 1200,
        height: 630,
        alt: "Mis XV Años | Clara",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mis XV Años | Clara",
    description: "Hagamos de esta noche algo inolvidable. Hacé clic para ver todos los detalles, la ubicación y confirmar tu asistencia.",
    images: ["https://www.teinvitoapp.com.ar/foto-clara.jpg"],
  },
};

export default async function ClaraPage() {
  try {
    const slug = '15anos-clara';
    const event = await prisma.event.findUnique({
      where: { slug, isActive: true },
      include: { photos: { orderBy: { order: "asc" } } },
    });

    if (!event) notFound();

    event.isTrial = false;
    event.dressCode = "Formal";

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
