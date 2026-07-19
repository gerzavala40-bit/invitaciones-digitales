import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // MercadoPago envía notificaciones de tipo "payment"
    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (!paymentId) {
        return new Response("OK", { status: 200 });
      }

      // Consultar detalle del pago en MP
      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
        }
      );

      if (!mpResponse.ok) {
        console.error("Error consultando pago:", paymentId);
        return new Response("OK", { status: 200 });
      }

      const payment = await mpResponse.json();

      if (payment.status === "approved") {
        // Pago aprobado: crear usuario y activar su cuenta
        const email = payment.payer?.email;
        const externalRef = payment.external_reference || "";
        const planId = externalRef.split("_")[0] || "BASICO";

        if (email) {
          // Crear o actualizar usuario con el plan pagado
          await prisma.user.upsert({
            where: { email },
            update: { plan: planId },
            create: {
              email,
              name: payment.payer?.first_name || "Cliente",
              password: `temp_${Date.now()}`, // Temporal, se cambia en onboarding
              plan: planId,
            },
          });

          console.log(`Pago aprobado: ${email} → Plan ${planId}`);
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("OK", { status: 200 });
  }
}
