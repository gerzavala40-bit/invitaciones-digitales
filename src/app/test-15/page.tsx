import CamilaGlam from "@/components/templates/CamilaGlam";
import { EventData } from "@/components/templates/types";

// Dummy data para testear TODAS las funciones nuevas en una plantilla de 15 años
const dummyEvent: EventData = {
  id: "test-15-id-1",
  slug: "test-15",
  title: "Camila",
  eventType: "15 Años",
  eventDate: "2026-11-20T12:00:00Z",
  eventTime: "21:30",
  venueName: "Salón La Estrella",
  venueAddress: "Av. Siempre Viva 123, Ciudad",
  ceremonyName: "Parroquia San Miguel",
  ceremonyAddress: "Calle Principal 456",
  ceremonyTime: "20:00",
  templateId: "camila-glam",
  primaryColor: "#E85A8C",
  dressCode: "Gala Elegante",
  phrase: "Hay momentos en la vida que imaginamos, soñamos y esperamos... y hay otros que no podemos esperar a compartir con las personas que más queremos.",
  rsvpEnabled: true,
  isActive: true,
  guestbookEnabled: true,
  photos: [
    { url: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=600&auto=format&fit=crop", order: 0 },
    { url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop", order: 1 },
    { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop", order: 2 },
  ],
  timeline: [
    { id: "t1", time: "20:00", title: "Ceremonia", description: "Misa en Parroquia San Miguel", order: 1, icon: "church" },
    { id: "t2", time: "21:30", title: "Recepción", description: "Cocktail de bienvenida y fotos", order: 2, icon: "glass" },
    { id: "t3", time: "22:30", title: "Entrada Principal", description: "¡A bailar y celebrar!", order: 3, icon: "music" },
    { id: "t4", time: "00:00", title: "Mesa Dulce", description: "Corte de la torta", order: 4, icon: "cake" },
    { id: "t5", time: "04:00", title: "Fin de Fiesta", description: "Carnaval carioca", order: 5, icon: "party" }
  ],
  messages: [
    { id: "m1", guestName: "Tía Marta", message: "Cami, sos la princesa más hermosa. ¡Disfrutá mucho tu noche!", createdAt: new Date() },
    { id: "m2", guestName: "Tus primos", message: "¡A romperla hoy prima! Te queremos infinito.", createdAt: new Date() }
  ],
  bankAlias: "camila.xv.fiesta",
  bankHolder: "Camila González"
};

export default function Test15Page() {
  return (
    <>
      <div className="fixed top-0 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 z-50 rounded-br-lg shadow-lg">
        MODO PRUEBA
      </div>
      <CamilaGlam event={dummyEvent} />
    </>
  );
}
