import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QrDisplay from "./QrDisplay";

export const dynamic = "force-dynamic";

export default async function MiEntradaPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const rsvp = await prisma.rSVP.findUnique({
    where: { qrCode: code },
    include: { event: true },
  });

  if (!rsvp) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Entrada no encontrada</h1>
          <p className="text-gray-500">El codigo QR no es valido o no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{rsvp.event.title}</h1>
          <p className="text-sm text-gray-500">
            {new Date(rsvp.event.eventDate).toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <QrDisplay qrCode={rsvp.qrCode!} />

        <div className="text-center mt-6">
          <p className="text-lg font-semibold text-gray-900">{rsvp.guestName}</p>
          <p className="text-sm text-gray-500">{rsvp.guestCount} persona(s)</p>
        </div>

        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tu entrada digital</p>
          <p className="text-sm text-gray-600">
            Presenta este codigo QR en la puerta del evento para ingresar.
          </p>
        </div>
      </div>
    </div>
  );
}
