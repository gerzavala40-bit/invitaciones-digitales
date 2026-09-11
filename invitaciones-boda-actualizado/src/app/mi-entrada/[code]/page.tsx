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
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
        {/* Event info */}
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
          {rsvp.event.eventTime && (
            <p className="text-sm text-gray-500 mt-1">{rsvp.event.eventTime} hs</p>
          )}
          {rsvp.event.venueName && (
            <p className="text-sm text-gray-400 mt-1">{rsvp.event.venueName}</p>
          )}
        </div>

        {/* Guest name */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-900">Entrada para {rsvp.guestName}</p>
        </div>

        {/* Guest count - prominent */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl py-4 px-6 text-center mb-6">
          <p className="text-white text-sm font-medium uppercase tracking-wider mb-1">Entrada valida para</p>
          <p className="text-white text-4xl font-bold">
            {rsvp.guestCount} {rsvp.guestCount === 1 ? "persona" : "personas"}
          </p>
        </div>

        {/* QR Code */}
        <QrDisplay qrCode={rsvp.qrCode!} />

        {/* Instruction note */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-gray-700">Instrucciones</p>
          </div>
          <p className="text-sm text-gray-600">
            Mostra este QR en la puerta del evento para ingresar con tu grupo.
          </p>
        </div>
      </div>
    </div>
  );
}
