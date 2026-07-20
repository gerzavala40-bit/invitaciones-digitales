/**
 * Rate limiting simple en memoria.
 * Para producción a escala, migrar a @upstash/ratelimit con Redis.
 * Este approach funciona bien para serverless con bajo tráfico.
 */

interface RateLimitRecord {
  count: number;
  firstRequest: number;
}

const store = new Map<string, RateLimitRecord>();

// Limpiar registros viejos periódicamente (evitar memory leak)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now - record.firstRequest > 60000) {
      store.delete(key);
    }
  }
}, 60000); // Limpiar cada minuto

export interface RateLimitConfig {
  maxRequests: number; // Máximo de requests
  windowMs: number; // Ventana de tiempo en ms
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = store.get(identifier);

  // Si no hay registro o la ventana expiró, crear nuevo
  if (!record || now - record.firstRequest > config.windowMs) {
    store.set(identifier, { count: 1, firstRequest: now });
    return { success: true, remaining: config.maxRequests - 1 };
  }

  // Si superó el límite
  if (record.count >= config.maxRequests) {
    return { success: false, remaining: 0 };
  }

  // Incrementar contador
  record.count += 1;
  store.set(identifier, record);
  return { success: true, remaining: config.maxRequests - record.count };
}

/**
 * Obtener IP del request (funciona en Vercel)
 */
export function getClientIp(request: Request): string {
  const headers = new Headers(request.headers);
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
