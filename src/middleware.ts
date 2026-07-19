import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Proteger rutas /admin
  const session = request.cookies.get("admin_session");
  const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
  // Usar btoa en lugar de Buffer (compatible con Edge Runtime)
  const expectedToken = btoa(secret).slice(0, 32);

  if (!session || session.value !== expectedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
