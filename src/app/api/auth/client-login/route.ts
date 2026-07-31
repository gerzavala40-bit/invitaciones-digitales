import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== "CLIENT") {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // Generar JWT
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "dev-secret");
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    const response = NextResponse.json({ success: true });
    
    response.cookies.set("client_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Client login error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
