import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory fallback para desarrollo
const memoryStore = new Map<string, { count: number; firstRequest: number }>();
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of memoryStore.entries()) {
    if (now - record.firstRequest > 60000) memoryStore.delete(key);
  }
}, 60000);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

// Configurar Upstash si están las variables
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
): Promise<{ success: boolean; remaining: number }> {
  // 1. Usar Redis si está configurado (PRODUCCIÓN)
  if (redis) {
    const windowSecs = Math.max(1, Math.floor(config.windowMs / 1000));
    const rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.maxRequests, `${windowSecs} s`),
      ephemeralCache: memoryStore as any,
    });
    const result = await rl.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  }

  // 2. Fallback in-memory (DESARROLLO)
  const now = Date.now();
  const record = memoryStore.get(identifier);

  if (!record || now - record.firstRequest > config.windowMs) {
    memoryStore.set(identifier, { count: 1, firstRequest: now });
    return { success: true, remaining: config.maxRequests - 1 };
  }

  if (record.count >= config.maxRequests) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  memoryStore.set(identifier, record);
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
