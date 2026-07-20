import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE = "admin_session";

export function getSessionToken(): string {
  const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
  return btoa(secret).slice(0, 32);
}

export function createAuthCookieResponse(data: object): NextResponse {
  const response = NextResponse.json(data);
  response.cookies.set(ADMIN_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 horas (no 7 días)
    path: "/",
  });
  return response;
}

export function clearAuthResponse(): NextResponse {
  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_URL || "http://localhost:3000")
  );
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@miplataforma.com";
  const adminPasswordHash =
    process.env.ADMIN_PASSWORD_HASH ||
    "$2a$12$defaulthashplaceholdervalue000000000000000000000";

  if (email !== adminEmail) return false;

  // Si ADMIN_PASSWORD_HASH está seteado, usar bcrypt
  if (process.env.ADMIN_PASSWORD_HASH) {
    return bcrypt.compare(password, adminPasswordHash);
  }

  // Fallback temporal: comparación directa (MIGRAR A HASH ASAP)
  const adminPassword = process.env.ADMIN_PASSWORD || "";
  if (!adminPassword) return false;
  return password === adminPassword;
}

// Utilidad para generar hash (correr una vez para obtener el hash)
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
