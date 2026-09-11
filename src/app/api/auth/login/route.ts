import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createAuthCookieResponse } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Obtener IP para rate limiting
  const ip = getClientIp(request as any);

  // Verificar rate limit (max 5 intentos por IP cada 15 min)
  const { success } = await rateLimit(`login:${ip}`, { maxRequests: 5, windowMs: 15 * 60 * 1000 });
  
  if (!success) {
    return NextResponse.json(
      { error: "Demasiados intentos. Esperá 15 minutos." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    // Validación básica
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    if (email.length > 100 || password.length > 100) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const isValid = await validateCredentials(email, password);

    if (!isValid) {
      // Respuesta genérica para no revelar si el email existe
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // Login exitoso
    return createAuthCookieResponse({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
