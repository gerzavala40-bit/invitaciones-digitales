import { NextResponse } from "next/server";
import { createPaymentSchema } from "@/lib/validators";

const PLANS: Record<string, { title: string, price: number }> = {
  BASICO: { title: "Plan Básico - Invitación Digital", price: 25000 },
  PREMIUM: { title: "Plan Premium - Invitación Digital", price: 45000 },
  PREMIUM_PLUS: { title: "Plan Premium Plus - Invitación Digital", price: 65000 },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar con Zod
    const result = createPaymentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { planId, buyerEmail, buyerName, buyerPhone } = result.data;
    const plan = PLANS[planId];

    if (!process.env.MP_ACCESS_TOKEN) {
      return NextResponse.json({ error: "Pagos no configurados" }, { status: 503 });
    }

    // Crear preferencia de pago en MercadoPago
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        items: [{
          id: planId,
          title: plan.title,
          quantity: 1,
          unit_price: plan.price,
          currency_id: "ARS",
        }],
        payer: {
          email: buyerEmail || undefined,
          name: buyerName || undefined,
          phone: buyerPhone ? { number: buyerPhone } : undefined,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/pago-exitoso`,
          failure: `${process.env.NEXT_PUBLIC_URL}/pago-fallido`,
          pending: `${process.env.NEXT_PUBLIC_URL}/pago-pendiente`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_URL}/api/payments/webhook`,
        external_reference: `${planId}_${Date.now()}`,
        statement_descriptor: "TEINVITOAPP",
      }),
    });

    if (!mpResponse.ok) {
      console.error("MercadoPago error:", await mpResponse.text());
      return NextResponse.json({ error: "Error al crear pago" }, { status: 500 });
    }

    const preference = await mpResponse.json();

    return NextResponse.json({
      success: true,
      checkoutUrl: preference.init_point,
      preferenceId: preference.id,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
