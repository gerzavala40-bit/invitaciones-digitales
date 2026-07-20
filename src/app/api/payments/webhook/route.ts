import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Verificar que la request viene de MercadoPago
function verifyWebhookSignature(request: Request, body: string): boolean {
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  if (!xSignature || !xRequestId) {
    // Si no hay headers de firma, verificar por IP o aceptar en desarrollo
    // En producción, SIEMPRE rechazar si no hay firma
    if (process.env.NODE_ENV === "production") {
      return false;
    }
    return true; // Solo en desarrollo
  }

  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    // Si no hay webhook secret configurado, no podemos verificar
    console.warn("MP_WEBHOOK_SECRET no configurado - webhook no verificado");
    return true;
  }

  // Extraer ts y hash del header x-signature
  // Formato: "ts=TIMESTAMP,v1=HASH"
  const parts = xSignature.split(",");
  const tsMatch = parts.find((p) => p.trim().startsWith("ts="));
  const hashMatch = parts.find((p) => p.trim().startsWith("v1="));

  if (!tsMatch || !hashMatch) return false;

  const ts = tsMatch.split("=")[1];
  const receivedHash = hashMatch.split("=")[1];

  // Reconstruir el string a firmar
  // MercadoPago firma: "id:[data.id];request-id:[x-request-id];ts:[ts];"
  const dataId = JSON.parse(body).data?.id || "";
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  // Generar HMAC con el secret
  const generatedHash = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  return generatedHash === receivedHash;
}

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();

    // Verificar firma
    if (!verifyWebhookSignature(request, bodyText)) {
      console.error("Webhook signature verification failed");
      return new Response("Unauthorized", { status: 401 });
    }

    const body = JSON.parse(bodyText);

    // MercadoPago envía notificaciones de tipo "payment"
    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (!paymentId || typeof paymentId !== "string" && typeof paymentId !== "number") {
        return new Response("OK", { status: 200 });
      }

      // Consultar detalle del pago en MP (verificación server-side)
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

      // Doble verificación: solo aceptar pagos aprobados
      if (payment.status === "approved" && payment.status_detail === "accredited") {
        const email = payment.payer?.email;
        const externalRef = payment.external_reference || "";
        const planId = externalRef.split("_")[0] || "BASICO";

        // Validar que el planId es válido
        const validPlans = ["BASICO", "PREMIUM", "PREMIUM_PLUS", "EXPRESS"];
        if (!validPlans.includes(planId)) {
          console.error("Plan inválido en webhook:", planId);
          return new Response("OK", { status: 200 });
        }

        if (email && typeof email === "string" && email.includes("@")) {
          // Verificar idempotencia: no procesar el mismo pago dos veces
          const existingPayment = await prisma.user.findFirst({
            where: { email, plan: planId },
          });

          if (!existingPayment) {
            await prisma.user.upsert({
              where: { email },
              update: { plan: planId },
              create: {
                email: email.toLowerCase().trim(),
                name: payment.payer?.first_name || "Cliente",
                password: crypto.randomBytes(32).toString("hex"), // Password seguro aleatorio
                plan: planId,
              },
            });
            console.log(`Pago aprobado: ${email} → Plan ${planId}`);
          }
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("OK", { status: 200 });
  }
}
