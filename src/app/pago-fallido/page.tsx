import Link from "next/link";

export default function PagoFallido() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago no procesado</h1>
        <p className="text-gray-500 mb-6">
          Hubo un problema con el pago. No se realizó ningún cobro. Podés intentar nuevamente o contactarnos por WhatsApp.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/#planes" className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition">
            Intentar nuevamente
          </Link>
          <a href="https://wa.me/5493425299942?text=Hola!%20Tuve%20un%20problema%20con%20el%20pago" target="_blank"
            className="border border-gray-300 px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition">
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
