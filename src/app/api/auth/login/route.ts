import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, getSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!validateCredentials(email, password)) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
