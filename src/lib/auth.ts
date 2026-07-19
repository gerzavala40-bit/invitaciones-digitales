import { NextRequest, NextResponse } from "next/server";

// Simple auth: verifica cookie de sesión admin
const ADMIN_COOKIE = "admin_session";

export function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get(ADMIN_COOKIE);
  return session?.value === getSessionToken();
}

export function getSessionToken(): string {
  const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
  // Usar btoa compatible con Edge Runtime y Node
  if (typeof btoa !== "undefined") {
    return btoa(secret).slice(0, 32);
  }
  return Buffer.from(secret).toString("base64").slice(0, 32);
}

export function createAuthResponse(redirectTo: string = "/admin"): NextResponse {
  const response = NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
  response.cookies.set(ADMIN_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });
  return response;
}

export function clearAuthResponse(): NextResponse {
  const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}

export function validateCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@miplataforma.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return email === adminEmail && password === adminPassword;
}
