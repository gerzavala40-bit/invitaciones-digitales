import { NextResponse } from "next/server";

const PLANS = {
  BASICO: { title: "Plan Básico - Invitación Digital", price: 25000 },
  PREMIUM: { title: "Plan Premium - Invitación Digital", price: 45000 },
  PREMIUM_PLUS: { title: "Plan Premium Plus - Invitación Digital", price: 65000 },
  EXPRESS: { title: "Add-on Express 24hs", price: 8000 },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, buyerEmail, buyerName, buyerPhone } = body;

    const plan = PLANS[planId as keyof typeof PLANS];
    if (!plan) {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 });
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
          email: buyerEmail,
          name: buyerName,
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
        statement_descriptor: "INVITACIONES DIGITALES",
      }),
    });

    if (!mpResponse.ok) {
      const error = await mpResponse.json();
      console.error("MercadoPago error:", error);
      return NextResponse.json({ error: "Error al crear pago" }, { status: 500 });
    }

    const preference = await mpResponse.json();

    return NextResponse.json({
      success: true,
      checkoutUrl: preference.init_point,
      sandboxUrl: preference.sandbox_init_point,
      preferenceId: preference.id,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
