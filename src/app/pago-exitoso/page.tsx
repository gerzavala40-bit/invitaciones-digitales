import Link from "next/link";

export default function PagoExitoso() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago confirmado!</h1>
        <p className="text-gray-500 mb-6">
          Tu pago fue procesado correctamente. En las próximas horas vas a recibir un email con los pasos para armar tu invitación.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-800 text-sm font-medium">¿Qué sigue?</p>
          <p className="text-green-700 text-sm mt-1">Te vamos a contactar por WhatsApp para recopilar los datos de tu evento.</p>
        </div>
        <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
