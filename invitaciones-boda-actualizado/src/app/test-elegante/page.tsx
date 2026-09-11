import BodaElegante from "@/components/templates/BodaElegante";
import { EventData } from "@/components/templates/types";

// Dummy data para que puedas testear TODAS las funciones nuevas
const dummyEvent: EventData = {
  id: "test-elegante-id-123",
  slug: "test-elegante",
  title: "Lucía & Martín",
  eventType: "boda",
  eventDate: new Date(Date.now() + 86400000 * 30).toISOString(),
  eventTime: "21:00",
  ceremonyName: "Parroquia San Benito",
  ceremonyAddress: "Villanueva 905, CABA",
  ceremonyTime: "20:00",
  venueName: "Palacio Sans Souci",
  venueAddress: "Paz 705, Victoria",
  templateId: "boda-elegante",
  primaryColor: "#d4af37",
  phrase: "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.",
  dressCode: "Gala / Black Tie",
  bankAlias: "LUCIA.MARTIN.BODA",
  bankHolder: "Lucía Fernández",
  rsvpEnabled: true,
  guestbookEnabled: true, // ¡ACTIVADO!
  isActive: true,
  photos: [
    { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc", order: 0 },
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552", order: 1 },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf", order: 2 },
  ],
  timeline: [
    { id: "1", time: "20:00", title: "Ceremonia", icon: "ceremony", order: 0 },
    { id: "2", time: "21:00", title: "Recepción", icon: "drinks", order: 1 },
    { id: "3", time: "22:00", title: "Cena", icon: "dinner", order: 2 },
    { id: "4", time: "23:30", title: "Fiesta", icon: "party", order: 3 },
  ],
  messages: [] // Muro de firmas arranca vacío
};

export default function TestElegantePage() {
  return <BodaElegante event={dummyEvent} />;
}
