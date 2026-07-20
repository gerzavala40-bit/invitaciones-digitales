import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createAuthCookieResponse } from "@/lib/auth";

// Rate limiting simple en memoria (para producción usar Upstash)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutos

function isRateLimited(ip: string): boolean {
  const record = loginAttempts.get(ip);
  if (!record) return false;

  // Reset si pasó el lockout
  if (Date.now() - record.lastAttempt > LOCKOUT_MS) {
    loginAttempts.delete(ip);
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

function recordAttempt(ip: string): void {
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
  record.count += 1;
  record.lastAttempt = Date.now();
  loginAttempts.set(ip, record);
}

function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

export async function POST(request: NextRequest) {
  // Obtener IP para rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Verificar rate limit
  if (isRateLimited(ip)) {
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
      recordAttempt(ip);
      // Respuesta genérica para no revelar si el email existe
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // Login exitoso
    clearAttempts(ip);
    return createAuthCookieResponse({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
